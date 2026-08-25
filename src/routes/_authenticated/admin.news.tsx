import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, DangerButton, Field, GhostButton, PrimaryButton, SectionTitle, inputClass } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/_authenticated/admin/news")({
  component: NewsAdmin,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  published_at: string;
  sort_order: number;
  is_published: boolean;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function NewsAdmin() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-news"] });
    qc.invalidateQueries({ queryKey: ["news-posts"] });
  };

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Post[];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Post> }) => {
      const { error } = await supabase.from("news_posts").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const create = useMutation({
    mutationFn: async (input: { title: string; body: string; image_url: string }) => {
      const { error } = await supabase.from("news_posts").insert({
        slug: slugify(input.title) || `post-${Date.now()}`,
        title: input.title,
        body: input.body,
        excerpt: input.body.slice(0, 300),
        image_url: input.image_url || null,
        sort_order: (posts.at(-1)?.sort_order ?? 0) + 10,
        is_published: true,
      });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const [draft, setDraft] = useState({ title: "", body: "", image_url: "" });

  return (
    <div className="space-y-6">
      <SectionTitle
        title="News & events"
        hint="Write a new announcement or edit an existing one. Paragraphs are separated by a blank line."
      />

      <Card>
        <h3 className="font-display text-[15px] font-semibold text-brand">New post</h3>
        <div className="mt-4 space-y-3">
          <Field label="Title">
            <input
              className={inputClass}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </Field>
          <Field label="Image URL (optional)">
            <input
              className={inputClass}
              value={draft.image_url}
              onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <textarea
              rows={7}
              className={inputClass}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <PrimaryButton
            disabled={create.isPending || !draft.title.trim()}
            onClick={() => {
              create.mutate(draft);
              setDraft({ title: "", body: "", image_url: "" });
            }}
          >
            Publish post
          </PrimaryButton>
          {create.isError ? (
            <span className="text-[13px] text-destructive">{(create.error as Error).message}</span>
          ) : null}
        </div>
      </Card>

      {isLoading ? <p className="text-[14px] text-muted-foreground">Loading posts…</p> : null}

      <div className="space-y-4">
        {posts.map((p) => (
          <Card key={p.id}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputClass}
                  defaultValue={p.title}
                  onBlur={(e) => update.mutate({ id: p.id, patch: { title: e.target.value } })}
                />
              </Field>
              <Field label="Order">
                <input
                  type="number"
                  className={inputClass}
                  defaultValue={p.sort_order}
                  onBlur={(e) =>
                    update.mutate({ id: p.id, patch: { sort_order: Number(e.target.value) } })
                  }
                />
              </Field>
              <Field label="Image URL">
                <input
                  className={inputClass}
                  defaultValue={p.image_url ?? ""}
                  onBlur={(e) =>
                    update.mutate({ id: p.id, patch: { image_url: e.target.value || null } })
                  }
                />
              </Field>
              <Field label="Excerpt (card preview)">
                <input
                  className={inputClass}
                  defaultValue={p.excerpt ?? ""}
                  onBlur={(e) => update.mutate({ id: p.id, patch: { excerpt: e.target.value } })}
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Body">
                <textarea
                  rows={8}
                  className={inputClass}
                  defaultValue={p.body}
                  onBlur={(e) => update.mutate({ id: p.id, patch: { body: e.target.value } })}
                />
              </Field>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <GhostButton
                onClick={() => update.mutate({ id: p.id, patch: { is_published: !p.is_published } })}
              >
                {p.is_published ? "Published — click to hide" : "Hidden — click to publish"}
              </GhostButton>
              <DangerButton
                onClick={() => {
                  if (confirm("Delete this post?")) remove.mutate(p.id);
                }}
              >
                Delete
              </DangerButton>
              <span className="text-[12px] text-muted-foreground">/{p.slug}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
