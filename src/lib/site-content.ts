import { queryOptions } from "@tanstack/react-query";
import { fetchNavItems, fetchNewsPosts, fetchSlides } from "./site-content.functions";
import { cemetLinks, mainMenu, utilityLinks, type MenuGroup, type MenuItem } from "@/content/menu";
import { sliderImages } from "@/content/assets";

export type NavRow = {
  id: string;
  section: string;
  parent_key: string | null;
  label: string;
  to_path: string | null;
  href: string | null;
  sort_order: number;
};

export type SlideRow = {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  link_to: string | null;
  sort_order: number;
};

export type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  published_at: string;
  sort_order: number;
};

export function navKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type SiteMenu = {
  main: MenuGroup[];
  utility: MenuItem[];
  cemet: MenuItem[];
};

/** Static recovered menu, used until the database answers (and if it ever fails). */
export const staticMenu: SiteMenu = { main: mainMenu, utility: utilityLinks, cemet: cemetLinks };

export function buildMenu(rows: NavRow[]): SiteMenu {
  if (!rows.length) return staticMenu;
  const toItem = (r: NavRow): MenuItem => ({
    label: r.label,
    ...(r.to_path ? { to: r.to_path } : {}),
    ...(r.href ? { href: r.href } : {}),
  });
  const flat = (section: string) =>
    rows.filter((r) => r.section === section && !r.parent_key).map(toItem);
  const main = rows
    .filter((r) => r.section === "main" && !r.parent_key)
    .map<MenuGroup>((g) => ({
      label: g.label,
      ...(g.to_path ? { to: g.to_path } : {}),
      items: rows.filter((r) => r.section === "main" && r.parent_key === navKey(g.label)).map(toItem),
    }));
  return {
    main: main.length ? main : staticMenu.main,
    utility: flat("utility"),
    cemet: flat("cemet"),
  };
}

export const navQueryOptions = queryOptions({
  queryKey: ["nav-items"],
  queryFn: () => fetchNavItems() as Promise<NavRow[]>,
  staleTime: 30_000,
});

export const slidesQueryOptions = queryOptions({
  queryKey: ["slider-slides"],
  queryFn: () => fetchSlides() as Promise<SlideRow[]>,
  staleTime: 30_000,
});

export const newsQueryOptions = queryOptions({
  queryKey: ["news-posts"],
  queryFn: () => fetchNewsPosts() as Promise<NewsRow[]>,
  staleTime: 30_000,
});

/** Slides shown on the homepage; falls back to the recovered images. */
export function resolveSlides(rows: SlideRow[]) {
  if (!rows.length) return sliderImages.map((s) => ({ src: s.src, alt: s.alt, caption: s.alt }));
  return rows.map((r) => ({ src: r.image_url, alt: r.alt_text, caption: r.caption ?? r.alt_text }));
}
