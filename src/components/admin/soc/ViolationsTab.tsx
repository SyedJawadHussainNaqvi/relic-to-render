import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, SectionTitle } from "@/components/admin/AdminUI";

export default function ViolationsTab() {
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
    const map = new Map<string, { key: string; directive: string; blocked: string; path: string; count: number }>();
    for (const row of rows) {
      const key = `${row.effective_directive}|${row.blocked_uri}|${row.document_uri}`;
      const existing = map.get(key);
      if (existing) existing.count += row.occurrences ?? 1;
      else
        map.set(key, {
          key,
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
            {grouped.map((row) => (
              <tr key={row.key} className="border-t border-border">
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
