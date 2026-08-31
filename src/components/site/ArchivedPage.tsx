import { Link } from "@tanstack/react-router";
import { Blocks, type Block } from "./Blocks";
import { campusBg } from "@/content/assets";
import { mainMenu } from "@/content/menu";
import pages from "@/content/pages.json";
import { UnderConstruction } from "./UnderConstruction";

type PageData = {
  title: string;
  description: string;
  sidebar: { text: string; to: string }[];
  blocks: Block[];
};

const all = pages as unknown as Record<string, PageData>;

export function getPage(path: string): PageData | undefined {
  return all[path];
}

/** A page whose only content is a "Coming Soon..." placeholder has no real body. */
function isPlaceholder(blocks: Block[]) {
  return (
    blocks.length > 0 &&
    blocks.every((b) => b.t === "h" && /coming\s*soon/i.test((b as { text: string }).text))
  );
}

export function ArchivedPage({ path }: { path: string }) {
  const page = all[path];
  if (!page) return <UnderConstruction path={path} />;
  const hasBody = page.blocks.length > 0 && !isPlaceholder(page.blocks);


  const group = mainMenu.find((g) => g.to === path);
  const sidebar =
    page.sidebar.length > 0
      ? page.sidebar
      : (group?.items ?? []).filter((i) => i.to).map((i) => ({ text: i.label, to: i.to as string }));

  return (
    <main>
      <div
        className="relative border-b border-border bg-brand-dark bg-cover bg-center"
        style={campusBg ? { backgroundImage: `url(${campusBg})` } : undefined}
      >
        <div className="bg-brand/80">
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-14">
            <h1 className="font-display text-2xl font-semibold text-white sm:text-4xl">{page.title}</h1>
            <p className="mt-2 text-[13px] text-white/75">
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
              <span className="px-1.5">/</span>
              <span>{page.title}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <article>
          {page.blocks.length > 0 ? (
            <Blocks blocks={page.blocks} />
          ) : (
            <div className="space-y-4">
              <p className="text-[15px] leading-7 text-foreground/90">
                {page.title} section of Dawood University of Engineering &amp; Technology. Browse the
                pages below.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {sidebar.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      className="block rounded border border-border bg-card px-4 py-3 text-[14.5px] text-brand hover:border-accent"
                    >
                      {s.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {sidebar.length > 0 && page.blocks.length > 0 ? (
          <aside>
            <div className="rounded border border-border bg-card">
              <h2 className="border-b border-border bg-brand px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-white">
                In this section
              </h2>
              <ul className="divide-y divide-border">
                {sidebar.map((s) => (
                  <li key={s.to + s.text}>
                    <Link
                      to={s.to}
                      className="block px-4 py-2.5 text-[14px] text-foreground hover:bg-muted hover:text-brand"
                      activeProps={{ className: "bg-muted font-semibold text-brand" }}
                    >
                      {s.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  );
}
