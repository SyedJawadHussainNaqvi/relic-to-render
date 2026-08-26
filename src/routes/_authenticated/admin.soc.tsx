import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PrimaryButton, GhostButton, SectionTitle, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/soc")({
  component: SocDashboard,
});

type Tab = "headers" | "performance" | "controls" | "violations";

type RouteCheck = {
  id: string;
  path: string;
  status_code: number | null;
  passed: boolean;
  failures: string[];
  response_ms: number | null;
};

type Control = {
  id: string;
  code: string;
  title: string;
  category: string;
  owner: string | null;
  status: string;
  last_reviewed_at: string | null;
  next_review_at: string | null;
  evidence: string | null;
  sort_order: number;
};

const statusOptions = ["implemented", "in_progress", "not_started", "not_applicable"];

function Badge({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[12px] font-semibold ${
        ok ? "bg-brand/10 text-brand" : "bg-destructive/10 text-destructive"
      }`}
    >
      {children}
    </span>
  );
}

function useLatestRun() {
  return useQuery({
    queryKey: ["soc-latest-run"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_scan_runs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

function HeadersTab() {
  const { data: run, isLoading } = useLatestRun();
  const { data: checks = [] } = useQuery({
    queryKey: ["soc-route-checks", run?.id],
    enabled: Boolean(run?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_route_checks")
        .select("id, path, status_code, passed, failures, response_ms")
        .eq("run_id", run!.id)
        .order("path");
      if (error) throw error;
      return (data ?? []) as unknown as RouteCheck[];
    },
  });

  if (isLoading) return <p className="text-[14px] text-muted-foreground">Loading latest scan…</p>;
  if (!run)
    return (
      <Card>
        <p className="text-[14px] text-muted-foreground">
          No scan recorded yet. The scheduled collector writes a run every hour, and the build-time
          suite can push one on demand.
        </p>
      </Card>
    );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Routes checked</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">{run.routes_total}</p>
        </Card>
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Passing</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">{run.routes_passed}</p>
        </Card>
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Failing</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">{run.routes_failed}</p>
        </Card>
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">CSP violations (24h)</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">{run.csp_violations}</p>
        </Card>
      </div>
      <p className="text-[13px] text-muted-foreground">
        Target {run.target} — last run {new Date(run.started_at).toLocaleString()} ({run.source})
      </p>
      <Card>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Route</th>
              <th className="py-2">Status</th>
              <th className="py-2">Headers &amp; CSP</th>
              <th className="py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((row) => (
              <tr key={row.id} className="border-t border-border align-top">
                <td className="py-2 font-medium text-brand">{row.path}</td>
                <td className="py-2">{row.status_code ?? "—"}</td>
                <td className="py-2">
                  {row.passed ? (
                    <Badge ok>All required headers present</Badge>
                  ) : (
                    <ul className="list-disc pl-4 text-destructive">
                      {(row.failures ?? []).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-2">{row.response_ms ? `${row.response_ms} ms` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function PerformanceTab() {
  const { data: uptime = [] } = useQuery({
    queryKey: ["soc-uptime"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_uptime_samples")
        .select("checked_at, path, status_code, response_ms, is_up")
        .order("checked_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: vitals = [] } = useQuery({
    queryKey: ["soc-vitals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_web_vitals")
        .select("metric, value, rating, path, device, recorded_at")
        .order("recorded_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data ?? [];
    },
  });

  const availability = uptime.length
    ? Math.round((uptime.filter((s) => s.is_up).length / uptime.length) * 10000) / 100
    : null;
  const avgMs = uptime.length
    ? Math.round(uptime.reduce((n, s) => n + (s.response_ms ?? 0), 0) / uptime.length)
    : null;

  const byMetric = useMemo(() => {
    const groups = new Map<string, number[]>();
    for (const row of vitals) {
      const list = groups.get(row.metric) ?? [];
      list.push(row.value);
      groups.set(row.metric, list);
    }
    return [...groups.entries()].map(([metric, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      const p75 = sorted[Math.floor(sorted.length * 0.75)] ?? 0;
      return { metric, samples: values.length, p75 };
    });
  }, [vitals]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Availability (recent)</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">
            {availability === null ? "—" : `${availability}%`}
          </p>
        </Card>
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Avg response time</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">
            {avgMs === null ? "—" : `${avgMs} ms`}
          </p>
        </Card>
        <Card>
          <p className="text-[12px] uppercase tracking-wider text-muted-foreground">Vitals samples</p>
          <p className="mt-1 font-display text-2xl font-semibold text-brand">{vitals.length}</p>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Real visitor experience (75th percentile)" />
        {byMetric.length === 0 ? (
          <p className="mt-2 text-[13px] text-muted-foreground">
            No visitor measurements recorded yet.
          </p>
        ) : (
          <table className="mt-3 w-full text-left text-[13px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="py-2">Metric</th>
                <th className="py-2">P75</th>
                <th className="py-2">Samples</th>
              </tr>
            </thead>
            <tbody>
              {byMetric.map((row) => (
                <tr key={row.metric} className="border-t border-border">
                  <td className="py-2 font-medium text-brand">{row.metric}</td>
                  <td className="py-2">
                    {row.metric === "CLS" ? row.p75.toFixed(3) : `${Math.round(row.p75)} ms`}
                  </td>
                  <td className="py-2">{row.samples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card>
        <SectionTitle title="Latest availability samples" />
        <table className="mt-3 w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Checked</th>
              <th className="py-2">Route</th>
              <th className="py-2">Status</th>
              <th className="py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {uptime.slice(0, 25).map((row, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2">{new Date(row.checked_at).toLocaleString()}</td>
                <td className="py-2 font-medium text-brand">{row.path}</td>
                <td className="py-2">
                  <Badge ok={row.is_up}>{row.status_code ?? "error"}</Badge>
                </td>
                <td className="py-2">{row.response_ms ?? "—"} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function ControlsTab() {
  const { data: controls = [], refetch } = useQuery({
    queryKey: ["soc-controls"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_controls")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as unknown as Control[];
    },
  });
  const [saving, setSaving] = useState<string | null>(null);

  async function update(id: string, patch: Partial<Control>) {
    setSaving(id);
    await supabase.from("soc_controls").update(patch).eq("id", id);
    setSaving(null);
    await refetch();
  }

  return (
    <Card>
      <SectionTitle title="Security control register" />
      <table className="mt-3 w-full text-left text-[13px]">
        <thead>
          <tr className="text-muted-foreground">
            <th className="py-2">Control</th>
            <th className="py-2">Category</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Status</th>
            <th className="py-2">Next review</th>
          </tr>
        </thead>
        <tbody>
          {controls.map((c) => (
            <tr key={c.id} className="border-t border-border align-top">
              <td className="py-2">
                <p className="font-semibold text-brand">
                  {c.code} — {c.title}
                </p>
                {c.evidence ? <p className="text-muted-foreground">{c.evidence}</p> : null}
              </td>
              <td className="py-2">{c.category}</td>
              <td className="py-2">
                <input
                  className={inputClass}
                  defaultValue={c.owner ?? ""}
                  onBlur={(e) => e.target.value !== (c.owner ?? "") && update(c.id, { owner: e.target.value })}
                />
              </td>
              <td className="py-2">
                <select
                  className={inputClass}
                  value={c.status}
                  onChange={(e) => update(c.id, { status: e.target.value })}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2">
                <input
                  type="date"
                  className={inputClass}
                  defaultValue={c.next_review_at ?? ""}
                  onChange={(e) =>
                    update(c.id, {
                      next_review_at: e.target.value || null,
                      last_reviewed_at: new Date().toISOString().slice(0, 10),
                    })
                  }
                />
                {saving === c.id ? <span className="text-muted-foreground">saving…</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function ViolationsTab() {
  const { data: rows = [] } = useQuery({
    queryKey: ["soc-violations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_csp_violations")
        .select("*")
        .order("reported_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });

  const grouped = useMemo(() => {
    const map = new Map<string, { directive: string; blocked: string; path: string; count: number }>();
    for (const row of rows) {
      const key = `${row.effective_directive}|${row.blocked_uri}|${row.document_uri}`;
      const existing = map.get(key);
      if (existing) existing.count += row.occurrences ?? 1;
      else
        map.set(key, {
          directive: row.effective_directive ?? row.violated_directive ?? "unknown",
          blocked: row.blocked_uri ?? "—",
          path: row.document_uri ?? "—",
          count: row.occurrences ?? 1,
        });
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [rows]);

  return (
    <Card>
      <SectionTitle title="Content-Security-Policy violations" />
      {grouped.length === 0 ? (
        <p className="mt-2 text-[13px] text-brand">
          No violations reported. Every page loads within the strict policy.
        </p>
      ) : (
        <table className="mt-3 w-full text-left text-[13px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-2">Directive</th>
              <th className="py-2">Blocked</th>
              <th className="py-2">Page</th>
              <th className="py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map((row, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2 font-medium text-brand">{row.directive}</td>
                <td className="py-2 break-all">{row.blocked}</td>
                <td className="py-2 break-all">{row.path}</td>
                <td className="py-2">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function SocDashboard() {
  const [tab, setTab] = useState<Tab>("headers");
  const { data: run } = useLatestRun();

  async function exportReport() {
    const [{ data: checks }, { data: controls }, { data: uptime }, { data: vitals }, { data: violations }] =
      await Promise.all([
        supabase.from("soc_route_checks").select("*").eq("run_id", run?.id ?? "").order("path"),
        supabase.from("soc_controls").select("*").order("sort_order"),
        supabase.from("soc_uptime_samples").select("*").order("checked_at", { ascending: false }).limit(200),
        supabase.from("soc_web_vitals").select("*").order("recorded_at", { ascending: false }).limit(500),
        supabase.from("soc_csp_violations").select("*").order("reported_at", { ascending: false }).limit(200),
      ]);

    const { buildSocReport } = await import("@/lib/soc-report");
    const html = buildSocReport({
      run,
      checks: checks ?? [],
      controls: controls ?? [],
      uptime: uptime ?? [],
      vitals: vitals ?? [],
      violations: violations ?? [],
    });
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `duet-soc-report-${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "headers", label: "Headers & CSP" },
    { id: "performance", label: "Performance" },
    { id: "controls", label: "Controls" },
    { id: "violations", label: "Violations" },
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="SOC sections" className="flex flex-wrap gap-2">
          {tabs.map((t) =>
            t.id === tab ? (
              <PrimaryButton key={t.id} type="button" onClick={() => setTab(t.id)}>
                {t.label}
              </PrimaryButton>
            ) : (
              <GhostButton key={t.id} type="button" onClick={() => setTab(t.id)}>
                {t.label}
              </GhostButton>
            ),
          )}
        </nav>
        <GhostButton type="button" onClick={exportReport}>
          Export SOC report
        </GhostButton>
      </div>

      {tab === "headers" ? <HeadersTab /> : null}
      {tab === "performance" ? <PerformanceTab /> : null}
      {tab === "controls" ? <ControlsTab /> : null}
      {tab === "violations" ? <ViolationsTab /> : null}
    </section>
  );
}
