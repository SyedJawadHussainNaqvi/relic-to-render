import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/admin/AdminUI";
import { Badge, MetricCard, useLatestRun, type RouteCheck } from "./shared";

const CheckRow = memo(function CheckRow({ row }: { row: RouteCheck }) {
  return (
    <tr className="border-t border-border align-top">
      <td className="py-2 font-medium text-brand">{row.path}</td>
      <td className="py-2">{row.status_code ?? "—"}</td>
      <td className="py-2">
        {row.passed ? (
          <Badge ok>All required headers present</Badge>
        ) : (
          <ul className="list-disc pl-4 text-destructive">
            {(row.failures ?? []).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </td>
      <td className="py-2">{row.response_ms ? `${row.response_ms} ms` : "—"}</td>
    </tr>
  );
});

export default function HeadersTab() {
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
        <MetricCard label="Routes checked" value={run.routes_total} />
        <MetricCard label="Passing" value={run.routes_passed} />
        <MetricCard label="Failing" value={run.routes_failed} />
        <MetricCard label="CSP violations (24h)" value={run.csp_violations} />
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
              <CheckRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
