import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, GhostButton, PrimaryButton, SectionTitle } from "@/components/admin/AdminUI";
import { refreshSeoMonitoring, resubmitSitemap } from "@/lib/seo-monitor.functions";
import { isIndexed } from "@/lib/seo-monitor-config";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  component: SeoDashboard,
});

type Tab = "overview" | "pages" | "structured";

type Snapshot = {
  id: string;
  captured_at: string;
  site_url: string;
  sitemap_url: string;
  last_submitted: string | null;
  last_downloaded: string | null;
  is_pending: boolean;
  errors: number;
  warnings: number;
  submitted_urls: number;
  indexed_urls: number;
};

type PageCheck = {
  id: string;
  checked_at: string;
  page_url: string;
  verdict: string | null;
  coverage_state: string | null;
  last_crawl_time: string | null;
  google_canonical: string | null;
  rich_results_verdict: string | null;
  in_sitemap: boolean;
};

type JsonLdRun = {
  id: string;
  started_at: string;
  source: string;
  target: string;
  pages_total: number;
  pages_passed: number;
  pages_failed: number;
};

type JsonLdIssue = { id: string; path: string; severity: string; message: string };

function fmt(value: string | null | undefined) {
  return value ? new Date(value).toLocaleString() : "—";
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: "bad" | "good" }) {
  return (
    <Card>
      <p className="text-[12px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={`mt-1 font-display text-2xl font-semibold ${
          tone === "bad" ? "text-destructive" : "text-brand"
        }`}
      >
        {value}
      </p>
    </Card>
  );
}

function useSnapshots() {
  return useQuery({
    queryKey: ["seo-snapshots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_sitemap_snapshots")
        .select(
          "id, captured_at, site_url, sitemap_url, last_submitted, last_downloaded, is_pending, errors, warnings, submitted_urls, indexed_urls",
        )
        .order("captured_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as unknown as Snapshot[];
    },
  });
}

function OverviewTab() {
  const { data: snapshots = [], isLoading } = useSnapshots();
  const latest = snapshots[0];

  if (isLoading) return <p className="text-[14px] text-muted-foreground">Loading Search Console data…</p>;
  if (!latest)
    return (
      <Card>
        <p className="text-[14px] text-muted-foreground">
          No Search Console snapshot recorded yet. Use “Refresh from Search Console” above — the
          scheduled collector then keeps the history up to date.
        </p>
      </Card>
    );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="URLs in sitemap" value={latest.submitted_urls} />
        <Stat label="Indexed by Google" value={latest.indexed_urls} />
        <Stat label="Sitemap errors" value={latest.errors} tone={latest.errors ? "bad" : undefined} />
        <Stat
          label="Sitemap warnings"
          value={latest.warnings}
          tone={latest.warnings ? "bad" : undefined}
        />
      </div>
      <p className="text-[13px] text-muted-foreground">
        Property {latest.site_url} — sitemap {latest.sitemap_url}. Last submitted{" "}
        {fmt(latest.last_submitted)}; last downloaded by Google {fmt(latest.last_downloaded)}
        {latest.is_pending ? " (processing)" : ""}.
      </p>
      <Card>
        <SectionTitle title="Discovery & indexing history" hint="One row per collection run" />
        <table className="mt-3 w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Checked</th>
              <th className="py-2">Submitted</th>
              <th className="py-2">Indexed</th>
              <th className="py-2">Errors</th>
              <th className="py-2">Warnings</th>
              <th className="py-2">Google last fetched</th>
            </tr>
          </thead>
          <tbody>
            {snapshots.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="py-2">{fmt(row.captured_at)}</td>
                <td className="py-2">{row.submitted_urls}</td>
                <td className="py-2">{row.indexed_urls}</td>
                <td className={`py-2 ${row.errors ? "text-destructive" : ""}`}>{row.errors}</td>
                <td className={`py-2 ${row.warnings ? "text-destructive" : ""}`}>{row.warnings}</td>
                <td className="py-2">{fmt(row.last_downloaded)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function PagesTab() {
  const { data: checks = [], isLoading } = useQuery({
    queryKey: ["seo-page-checks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_page_checks")
        .select(
          "id, checked_at, page_url, verdict, coverage_state, last_crawl_time, google_canonical, rich_results_verdict, in_sitemap",
        )
        .order("checked_at", { ascending: false })
        .limit(400);
      if (error) throw error;
      return (data ?? []) as unknown as PageCheck[];
    },
  });

  const latestPerPage = useMemo(() => {
    const seen = new Map<string, PageCheck>();
    for (const row of checks) if (!seen.has(row.page_url)) seen.set(row.page_url, row);
    return [...seen.values()].sort((a, b) => a.page_url.localeCompare(b.page_url));
  }, [checks]);

  if (isLoading) return <p className="text-[14px] text-muted-foreground">Loading page statuses…</p>;
  if (latestPerPage.length === 0)
    return (
      <Card>
        <p className="text-[14px] text-muted-foreground">
          No page inspections stored yet. Refresh from Search Console to record the first set.
        </p>
      </Card>
    );

  const indexed = latestPerPage.filter((r) => isIndexed(r.coverage_state)).length;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Key pages tracked" value={latestPerPage.length} />
        <Stat label="Indexed" value={indexed} />
        <Stat
          label="Not indexed yet"
          value={latestPerPage.length - indexed}
          tone={latestPerPage.length - indexed ? "bad" : undefined}
        />
      </div>
      <Card>
        <SectionTitle
          title="Indexing status per key page"
          hint="Read from Google's index — requesting indexing is only possible in the Search Console UI"
        />
        <table className="mt-3 w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Page</th>
              <th className="py-2">Coverage</th>
              <th className="py-2">Verdict</th>
              <th className="py-2">Last crawled</th>
              <th className="py-2">Rich results</th>
              <th className="py-2">Checked</th>
            </tr>
          </thead>
          <tbody>
            {latestPerPage.map((row) => (
              <tr key={row.id} className="border-t border-border align-top">
                <td className="py-2 font-medium text-brand">
                  {new URL(row.page_url).pathname}
                  {row.in_sitemap ? "" : " ⚠"}
                </td>
                <td
                  className={`py-2 ${isIndexed(row.coverage_state) ? "" : "text-destructive"}`}
                >
                  {row.coverage_state ?? "—"}
                </td>
                <td className="py-2">{row.verdict ?? "—"}</td>
                <td className="py-2">{fmt(row.last_crawl_time)}</td>
                <td className="py-2">{row.rich_results_verdict ?? "—"}</td>
                <td className="py-2 text-muted-foreground">{fmt(row.checked_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-[12px] text-muted-foreground">
          ⚠ marks a page Google has not linked to the sitemap yet.
        </p>
      </Card>
    </div>
  );
}

function StructuredTab() {
  const { data: runs = [], isLoading } = useQuery({
    queryKey: ["seo-jsonld-runs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_jsonld_runs")
        .select("id, started_at, source, target, pages_total, pages_passed, pages_failed")
        .order("started_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as unknown as JsonLdRun[];
    },
  });
  const latest = runs[0];
  const { data: issues = [] } = useQuery({
    queryKey: ["seo-jsonld-issues", latest?.id],
    enabled: Boolean(latest?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_jsonld_issues")
        .select("id, path, severity, message")
        .eq("run_id", latest!.id)
        .order("path");
      if (error) throw error;
      return (data ?? []) as unknown as JsonLdIssue[];
    },
  });

  if (isLoading) return <p className="text-[14px] text-muted-foreground">Loading validation runs…</p>;

  return (
    <div className="space-y-4">
      {!latest ? (
        <Card>
          <p className="text-[14px] text-muted-foreground">
            No structured-data run recorded yet. Every production build runs{" "}
            <code>npm run seo:jsonld</code>, which fails the build on invalid JSON-LD and can push its
            report here.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Pages validated" value={latest.pages_total} />
            <Stat label="Valid" value={latest.pages_passed} />
            <Stat
              label="Invalid"
              value={latest.pages_failed}
              tone={latest.pages_failed ? "bad" : undefined}
            />
          </div>
          <p className="text-[13px] text-muted-foreground">
            Last run {fmt(latest.started_at)} on {latest.target} ({latest.source}).
          </p>
          <Card>
            <SectionTitle title="Structured-data problems" hint="From the latest validation run" />
            {issues.length === 0 ? (
              <p className="mt-3 text-[14px] text-muted-foreground">
                No structured-data errors — CollegeOrUniversity, Organization and BreadcrumbList all
                validate.
              </p>
            ) : (
              <table className="mt-3 w-full text-left text-[13px]">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="py-2">Page</th>
                    <th className="py-2">Severity</th>
                    <th className="py-2">Problem</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((row) => (
                    <tr key={row.id} className="border-t border-border align-top">
                      <td className="py-2 font-medium text-brand">{row.path}</td>
                      <td className="py-2">{row.severity}</td>
                      <td className="py-2">{row.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </>
      )}
      <Card>
        <SectionTitle title="Validation history" />
        <table className="mt-3 w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Run</th>
              <th className="py-2">Source</th>
              <th className="py-2">Pages</th>
              <th className="py-2">Failed</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="py-2">{fmt(row.started_at)}</td>
                <td className="py-2">{row.source}</td>
                <td className="py-2">{row.pages_total}</td>
                <td className={`py-2 ${row.pages_failed ? "text-destructive" : ""}`}>
                  {row.pages_failed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SeoDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [message, setMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const refresh = useServerFn(refreshSeoMonitoring);
  const resubmit = useServerFn(resubmitSitemap);

  const refreshMutation = useMutation({
    mutationFn: () => refresh(),
    onSuccess: (data) => {
      setMessage(
        `Refreshed: ${data.sitemap.submitted_urls} sitemap URLs, ${data.sitemap.indexed_urls} indexed, ${data.pages_indexed}/${data.pages_checked} key pages indexed.`,
      );
      queryClient.invalidateQueries({ queryKey: ["seo-snapshots"] });
      queryClient.invalidateQueries({ queryKey: ["seo-page-checks"] });
    },
    onError: (error: Error) => setMessage(error.message),
  });

  const resubmitMutation = useMutation({
    mutationFn: () => resubmit(),
    onSuccess: (data) =>
      setMessage(
        `Sitemap re-submitted to ${data.site_url} — ${data.errors} error(s), ${data.warnings} warning(s).`,
      ),
    onError: (error: Error) => setMessage(error.message),
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Sitemap & discovery" },
    { id: "pages", label: "Indexing status" },
    { id: "structured", label: "Structured data" },
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle
          title="SEO monitoring"
          hint="Google Search Console discovery, indexing and structured-data health over time"
        />
        <div className="flex flex-wrap gap-2">
          <PrimaryButton
            type="button"
            disabled={refreshMutation.isPending}
            onClick={() => refreshMutation.mutate()}
          >
            {refreshMutation.isPending ? "Refreshing…" : "Refresh from Search Console"}
          </PrimaryButton>
          <GhostButton
            type="button"
            disabled={resubmitMutation.isPending}
            onClick={() => resubmitMutation.mutate()}
          >
            {resubmitMutation.isPending ? "Submitting…" : "Re-submit sitemap"}
          </GhostButton>
        </div>
      </div>

      {message ? (
        <p className="rounded border border-border bg-muted px-3 py-2 text-[13px] text-foreground">
          {message}
        </p>
      ) : null}

      <nav className="flex flex-wrap gap-2 border-b border-border pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded px-3 py-1.5 text-[13px] font-semibold ${
              tab === t.id ? "bg-brand text-white" : "text-brand hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "overview" ? <OverviewTab /> : null}
      {tab === "pages" ? <PagesTab /> : null}
      {tab === "structured" ? <StructuredTab /> : null}
    </section>
  );
}
