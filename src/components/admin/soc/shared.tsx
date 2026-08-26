import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RouteCheck = {
  id: string;
  path: string;
  status_code: number | null;
  passed: boolean;
  failures: string[];
  response_ms: number | null;
};

export type Control = {
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

export const statusOptions = ["implemented", "in_progress", "not_started", "not_applicable"];

/** Small status pill; memoized because metric tables render it once per row. */
export const Badge = memo(function Badge({
  ok,
  children,
}: {
  ok: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[12px] font-semibold ${
        ok ? "bg-brand/10 text-brand" : "bg-destructive/10 text-destructive"
      }`}
    >
      {children}
    </span>
  );
});

export function useLatestRun() {
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

export const MetricCard = memo(function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded border border-border bg-card p-5">
      <p className="text-[12px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-brand">{value}</p>
    </div>
  );
});
