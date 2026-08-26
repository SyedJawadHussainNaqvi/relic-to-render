import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { campusBg } from "@/content/assets";
import { newsQueryOptions } from "@/lib/site-content";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — DUET Karachi" },
      {
        name: "description",
        content:
          "Announcements, convocation news, industrial visits and events from Dawood University of Engineering & Technology, Karachi.",
      },
      { property: "og:title", content: "News & Events — DUET Karachi" },
      {
        property: "og:description",
        content: "Announcements and events from Dawood University of Engineering & Technology.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/news" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/news" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(newsQueryOptions),
  component: NewsPage,
});

function NewsPage() {
  const { data } = useQuery(newsQueryOptions);
  const entries = data ?? [];
  return (
    <main>
      <div
        className="border-b border-border bg-brand-dark bg-cover bg-center"
        style={campusBg ? { backgroundImage: `url(${campusBg})` } : undefined}
      >
        <div className="bg-brand/80">
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-14">
            <h1 className="font-display text-2xl font-semibold text-white sm:text-4xl">
              News &amp; Events
            </h1>
            <p className="mt-2 text-[13px] text-white/75">
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
              <span className="px-1.5">/</span>
              <span>News &amp; Events</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-10">
        {entries.map((post) => (
          <article key={post.id} className="rounded border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-brand">{post.title}</h2>
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                loading="lazy"
                className="mt-4 max-h-96 w-full rounded object-cover"
              />
            ) : null}
            <div className="mt-3 space-y-3">
              {post.body.split("\n\n").filter(Boolean).map((p, i) => (
                <p key={i} className="text-[15px] leading-7 text-foreground/90">
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
