import { Link } from "@tanstack/react-router";
import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "@/lib/site-content";
import { useSiteMenu } from "@/hooks/useSiteMenu";

const SectionCard = memo(function SectionCard({
  label,
  to,
  summary,
}: {
  label: string;
  to: string;
  summary: string;
}) {
  return (
    <Link
      to={to}
      className="rounded border border-border bg-card p-5 transition-colors hover:border-accent"
    >
      <h3 className="font-display text-[15px] font-semibold text-brand">{label}</h3>
      <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{summary}</p>
    </Link>
  );
});

/** Below-the-fold homepage content: loaded as a separate chunk after the hero paints. */
export default function HomeSections() {
  const { main: mainMenu } = useSiteMenu();
  const { data: news } = useQuery(newsQueryOptions);

  const cards = useMemo(
    () =>
      mainMenu.slice(0, 8).map((g) => ({
        label: g.label,
        to: g.to ?? "/",
        summary:
          g.items
            .slice(0, 3)
            .map((i) => i.label)
            .join(" · ") || "Openings and opportunities at DUET",
      })),
    [mainMenu],
  );

  const newsEntries = useMemo(
    () =>
      (news ?? []).slice(0, 6).map((post) => ({
        id: post.id,
        title: post.title,
        summary:
          post.excerpt ||
          post.body.split("\n\n")[0] ||
          "Read the full announcement from Dawood University.",
      })),
    [news],
  );

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-4 py-12">
        <h2 className="font-display text-2xl font-semibold text-brand">Explore the University</h2>
        <div className="mt-1 h-1 w-24 bg-accent" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <SectionCard key={c.label} label={c.label} to={c.to} summary={c.summary} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand">News &amp; Events</h2>
              <div className="mt-1 h-1 w-24 bg-accent" />
            </div>
            <Link to="/news" className="text-[13px] font-semibold text-brand hover:text-accent-strong">
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {newsEntries.map((post) => (
              <article key={post.id} className="rounded border border-border bg-card p-5">
                <h3 className="font-display text-[15px] font-semibold leading-6 text-brand">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-4 text-[13.5px] leading-6 text-muted-foreground">
                  {post.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
