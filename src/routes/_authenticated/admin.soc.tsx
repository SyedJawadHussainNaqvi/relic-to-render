import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PrimaryButton, GhostButton } from "@/components/admin/AdminUI";
import { useLatestRun } from "@/components/admin/soc/shared";

export const Route = createFileRoute("/_authenticated/admin/soc")({
  component: SocDashboard,
});

// Non-critical panels: each tab ships as its own chunk, loaded on demand.
const HeadersTab = lazy(() => import("@/components/admin/soc/HeadersTab"));
const PerformanceTab = lazy(() => import("@/components/admin/soc/PerformanceTab"));
const ControlsTab = lazy(() => import("@/components/admin/soc/ControlsTab"));
const ViolationsTab = lazy(() => import("@/components/admin/soc/ViolationsTab"));

type Tab = "headers" | "performance" | "controls" | "violations";

const tabs: { id: Tab; label: string }[] = [
  { id: "headers", label: "Headers & CSP" },
  { id: "performance", label: "Performance" },
  { id: "controls", label: "Controls" },
  { id: "violations", label: "Violations" },
];

function SocDashboard() {
  const [tab, setTab] = useState<Tab>("headers");
  const { data: run } = useLatestRun();

  const exportReport = useCallback(async () => {
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
  }, [run]);

  const selectTab = useCallback((id: Tab) => setTab(id), []);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="SOC sections" className="flex flex-wrap gap-2">
          {tabs.map((t) =>
            t.id === tab ? (
              <PrimaryButton key={t.id} type="button" onClick={() => selectTab(t.id)}>
                {t.label}
              </PrimaryButton>
            ) : (
              <GhostButton key={t.id} type="button" onClick={() => selectTab(t.id)}>
                {t.label}
              </GhostButton>
            ),
          )}
        </nav>
        <GhostButton type="button" onClick={exportReport}>
          Export SOC report
        </GhostButton>
      </div>

      <Suspense fallback={<p className="text-[14px] text-muted-foreground">Loading panel…</p>}>
        {tab === "headers" ? <HeadersTab /> : null}
        {tab === "performance" ? <PerformanceTab /> : null}
        {tab === "controls" ? <ControlsTab /> : null}
        {tab === "violations" ? <ViolationsTab /> : null}
      </Suspense>
    </section>
  );
}
