import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, DangerButton, Field, GhostButton, PrimaryButton, SectionTitle, inputClass } from "@/components/admin/AdminUI";
import { asset } from "@/content/assets";
import assetsJson from "@/content/assets.json";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: SliderAdmin,
});

type Slide = {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  link_to: string | null;
  sort_order: number;
  is_published: boolean;
};

const imageNames = Object.keys(assetsJson as Record<string, string>).filter((n) =>
  /\.(jpe?g|png|webp|gif)$/i.test(n),
);

function SliderAdmin() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-slides"] });
    qc.invalidateQueries({ queryKey: ["slider-slides"] });
  };

  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["admin-slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slider_slides")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Slide[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Slide> }) => {
      const { error } = await supabase.from("slider_slides").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("slider_slides").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const create = useMutation({
    mutationFn: async (slide: Omit<Slide, "id">) => {
      const { error } = await supabase.from("slider_slides").insert(slide);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const [draft, setDraft] = useState({ name: imageNames[0] ?? "", url: "", alt: "", caption: "", link: "" });

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Homepage slider"
        hint="Reorder, retitle, hide or add slides. Unpublished slides stay hidden from visitors."
      />

      <Card>
        <h3 className="font-display text-[15px] font-semibold text-brand">Add a slide</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Image from the media library">
            <select
              className={inputClass}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            >
              <option value="">— use a custom URL —</option>
              {imageNames.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Or custom image URL">
            <input
              className={inputClass}
              value={draft.url}
              placeholder="https://…"
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            />
          </Field>
          <Field label="Alt text (for accessibility)">
            <input
              className={inputClass}
              value={draft.alt}
              onChange={(e) => setDraft({ ...draft, alt: e.target.value })}
            />
          </Field>
          <Field label="Caption shown on the slide">
            <input
              className={inputClass}
              value={draft.caption}
              onChange={(e) => setDraft({ ...draft, caption: e.target.value })}
            />
          </Field>
          <Field label="Optional link (e.g. /admissions)">
            <input
              className={inputClass}
              value={draft.link}
              onChange={(e) => setDraft({ ...draft, link: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <PrimaryButton
            disabled={create.isPending}
            onClick={() => {
              const image = draft.url || asset(draft.name) || "";
              if (!image) return;
              create.mutate({
                image_url: image,
                alt_text: draft.alt || draft.caption || "Dawood University",
                caption: draft.caption || null,
                link_to: draft.link || null,
                sort_order: (slides.at(-1)?.sort_order ?? 0) + 10,
                is_published: true,
              });
              setDraft({ name: imageNames[0] ?? "", url: "", alt: "", caption: "", link: "" });
            }}
          >
            Add slide
          </PrimaryButton>
          {create.isError ? (
            <span className="text-[13px] text-destructive">{(create.error as Error).message}</span>
          ) : null}
        </div>
      </Card>

      {isLoading ? <p className="text-[14px] text-muted-foreground">Loading slides…</p> : null}

      <div className="space-y-4">
        {slides.map((s) => (
          <Card key={s.id}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <img
                src={s.image_url}
                alt={s.alt_text}
                className="h-28 w-44 flex-shrink-0 rounded object-cover"
              />
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <Field label="Caption">
                  <input
                    className={inputClass}
                    defaultValue={s.caption ?? ""}
                    onBlur={(e) => update.mutate({ id: s.id, patch: { caption: e.target.value } })}
                  />
                </Field>
                <Field label="Alt text">
                  <input
                    className={inputClass}
                    defaultValue={s.alt_text}
                    onBlur={(e) => update.mutate({ id: s.id, patch: { alt_text: e.target.value } })}
                  />
                </Field>
                <Field label="Image URL">
                  <input
                    className={inputClass}
                    defaultValue={s.image_url}
                    onBlur={(e) => update.mutate({ id: s.id, patch: { image_url: e.target.value } })}
                  />
                </Field>
                <Field label="Order">
                  <input
                    type="number"
                    className={inputClass}
                    defaultValue={s.sort_order}
                    onBlur={(e) =>
                      update.mutate({ id: s.id, patch: { sort_order: Number(e.target.value) } })
                    }
                  />
                </Field>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <GhostButton
                onClick={() => update.mutate({ id: s.id, patch: { is_published: !s.is_published } })}
              >
                {s.is_published ? "Published — click to hide" : "Hidden — click to publish"}
              </GhostButton>
              <DangerButton
                onClick={() => {
                  if (confirm("Delete this slide?")) remove.mutate(s.id);
                }}
              >
                Delete
              </DangerButton>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
