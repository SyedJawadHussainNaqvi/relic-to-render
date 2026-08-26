import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, SectionTitle, inputClass } from "@/components/admin/AdminUI";
import { statusOptions, type Control } from "./shared";

export default function ControlsTab() {
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

  const update = useCallback(
    async (id: string, patch: Partial<Control>) => {
      setSaving(id);
      await supabase.from("soc_controls").update(patch).eq("id", id);
      setSaving(null);
      await refetch();
    },
    [refetch],
  );

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
                  onBlur={(e) =>
                    e.target.value !== (c.owner ?? "") && update(c.id, { owner: e.target.value })
                  }
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
