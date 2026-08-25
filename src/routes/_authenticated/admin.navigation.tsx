import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { navKey } from "@/lib/site-content";
import { Card, DangerButton, Field, GhostButton, PrimaryButton, SectionTitle, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/navigation")({
  component: NavAdmin,
});

type NavItem = {
  id: string;
  section: string;
  parent_key: string | null;
  label: string;
  to_path: string | null;
  href: string | null;
  sort_order: number;
  is_published: boolean;
};

const sections = [
  { key: "main", title: "Main menu", hint: "Top-level groups and their dropdown items." },
  { key: "utility", title: "Utility bar", hint: "Small links in the purple bar (right side)." },
  { key: "cemet", title: "DUET-CEMET bar", hint: "Links in the purple bar (left side)." },
] as const;

function NavAdmin() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-nav"] });
    qc.invalidateQueries({ queryKey: ["nav-items"] });
  };

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-nav"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nav_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as NavItem[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<NavItem> }) => {
      const { error } = await supabase.from("nav_items").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("nav_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const create = useMutation({
    mutationFn: async (item: Omit<NavItem, "id">) => {
      const { error } = await supabase.from("nav_items").insert(item);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const [draft, setDraft] = useState({
    section: "main",
    parent: "",
    label: "",
    to: "",
    href: "",
  });

  const groups = items.filter((i) => i.section === "main" && !i.parent_key);

  function nextOrder(section: string, parent: string | null) {
    const siblings = items.filter((i) => i.section === section && (i.parent_key ?? "") === (parent ?? ""));
    return (siblings.at(-1)?.sort_order ?? 0) + 10;
  }

  function Row({ item }: { item: NavItem }) {
    return (
      <div className="grid gap-3 border-t border-border py-3 sm:grid-cols-[1.2fr_1fr_1fr_5rem]">
        <Field label="Label">
          <input
            className={inputClass}
            defaultValue={item.label}
            onBlur={(e) => update.mutate({ id: item.id, patch: { label: e.target.value } })}
          />
        </Field>
        <Field label="Internal path">
          <input
            className={inputClass}
            placeholder="/admissions"
            defaultValue={item.to_path ?? ""}
            onBlur={(e) =>
              update.mutate({ id: item.id, patch: { to_path: e.target.value || null } })
            }
          />
        </Field>
        <Field label="External link">
          <input
            className={inputClass}
            placeholder="https://…"
            defaultValue={item.href ?? ""}
            onBlur={(e) => update.mutate({ id: item.id, patch: { href: e.target.value || null } })}
          />
        </Field>
        <Field label="Order">
          <input
            type="number"
            className={inputClass}
            defaultValue={item.sort_order}
            onBlur={(e) =>
              update.mutate({ id: item.id, patch: { sort_order: Number(e.target.value) } })
            }
          />
        </Field>
        <div className="flex flex-wrap items-center gap-2 sm:col-span-4">
          <GhostButton
            onClick={() => update.mutate({ id: item.id, patch: { is_published: !item.is_published } })}
          >
            {item.is_published ? "Visible — click to hide" : "Hidden — click to show"}
          </GhostButton>
          <DangerButton
            onClick={() => {
              if (confirm(`Delete "${item.label}"?`)) remove.mutate(item.id);
            }}
          >
            Delete
          </DangerButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Navigation"
        hint="Edit the header menus and utility links. Use an internal path for pages on this site, or an external link for other systems."
      />

      <Card>
        <h3 className="font-display text-[15px] font-semibold text-brand">Add a link</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Section">
            <select
              className={inputClass}
              value={draft.section}
              onChange={(e) => setDraft({ ...draft, section: e.target.value, parent: "" })}
            >
              {sections.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.title}
                </option>
              ))}
            </select>
          </Field>
          {draft.section === "main" ? (
            <Field label="Place under">
              <select
                className={inputClass}
                value={draft.parent}
                onChange={(e) => setDraft({ ...draft, parent: e.target.value })}
              >
                <option value="">Top level (new menu group)</option>
                {groups.map((g) => (
                  <option key={g.id} value={navKey(g.label)}>
                    {g.label}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}
          <Field label="Label">
            <input
              className={inputClass}
              value={draft.label}
              onChange={(e) => setDraft({ ...draft, label: e.target.value })}
            />
          </Field>
          <Field label="Internal path">
            <input
              className={inputClass}
              placeholder="/admissions"
              value={draft.to}
              onChange={(e) => setDraft({ ...draft, to: e.target.value })}
            />
          </Field>
          <Field label="External link">
            <input
              className={inputClass}
              placeholder="https://…"
              value={draft.href}
              onChange={(e) => setDraft({ ...draft, href: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <PrimaryButton
            disabled={create.isPending || !draft.label.trim()}
            onClick={() => {
              const parent = draft.section === "main" && draft.parent ? draft.parent : null;
              create.mutate({
                section: draft.section,
                parent_key: parent,
                label: draft.label,
                to_path: draft.to || null,
                href: draft.href || null,
                sort_order: nextOrder(draft.section, parent),
                is_published: true,
              });
              setDraft({ section: draft.section, parent: draft.parent, label: "", to: "", href: "" });
            }}
          >
            Add link
          </PrimaryButton>
          {create.isError ? (
            <span className="text-[13px] text-destructive">{(create.error as Error).message}</span>
          ) : null}
        </div>
      </Card>

      {isLoading ? <p className="text-[14px] text-muted-foreground">Loading navigation…</p> : null}

      {sections.map((s) => (
        <div key={s.key} className="space-y-4">
          <SectionTitle title={s.title} hint={s.hint} />
          {s.key === "main" ? (
            groups.map((g) => (
              <Card key={g.id}>
                <h4 className="font-display text-[15px] font-semibold text-brand">{g.label}</h4>
                <Row item={g} />
                <div className="mt-2 pl-0 sm:pl-6">
                  {items
                    .filter((i) => i.section === "main" && i.parent_key === navKey(g.label))
                    .map((child) => (
                      <Row key={child.id} item={child} />
                    ))}
                </div>
              </Card>
            ))
          ) : (
            <Card>
              {items
                .filter((i) => i.section === s.key && !i.parent_key)
                .map((i) => (
                  <Row key={i.id} item={i} />
                ))}
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}
