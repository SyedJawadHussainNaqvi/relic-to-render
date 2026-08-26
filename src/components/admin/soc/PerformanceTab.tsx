import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, SectionTitle } from "@/components/admin/AdminUI";
import { Badge, MetricCard } from "./shared";

const UPTIME_ROWS_SHOWN = 25;

type UptimeRow = {
  checked_at: string;
  path: string;
  status_code: number | null;
  response_ms: number | null;
  is_up: boolean;
};

const UptimeRowView = memo(function UptimeRowView({ row }: { row: UptimeRow }) {
  return (
    <tr className="border-t border-border">
      <td className="py-2">{new Date(row.checked_at).toLocaleString()}</td>
      <td className="py-2 font-medium text-brand">{row.path}</td>
      <td className="py-2">
        <Badge ok={row.is_up}>{row.status_code ?? "error"}</Badge>
      </td>
      <td className="py-2">{row.response_ms ?? "—"} ms</td>
    </tr>
  );
});

export default function PerformanceTab() {
  const { data: uptime = [] } = useQuery({
    queryKey: ["soc-uptime"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soc_uptime_samples")
        .select("checked_at, path, status_code, response_ms, is_up")
        .order("checked_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as unknown as UptimeRow[];
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

  // Aggregations over up to 1500 rows — computed once per data change, not per render.
  const { availability, avgMs } = useMemo(() => {
    if (!uptime.length) return { availability: null as number | null, avgMs: null as number | null };
    let up = 0;
    let total = 0;
    for (const s of uptime) {
      if (s.is_up) up += 1;
      total += s.response_ms ?? 0;
    }
    return {
      availability: Math.round((up / uptime.length) * 10000) / 100,
      avgMs: Math.round(total / uptime.length),
    };
  }, [uptime]);

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

  // Only the visible slice is turned into DOM nodes.
  const recentUptime = useMemo(() => uptime.slice(0, UPTIME_ROWS_SHOWN), [uptime]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Availability (recent)"
          value={availability === null ? "—" : `${availability}%`}
        />
        <MetricCard label="Avg response time" value={avgMs === null ? "—" : `${avgMs} ms`} />
        <MetricCard label="Vitals samples" value={vitals.length} />
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
            {recentUptime.map((row) => (
              <UptimeRowView key={`${row.checked_at}-${row.path}`} row={row} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
