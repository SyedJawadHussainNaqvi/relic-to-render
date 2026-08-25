import { useQuery } from "@tanstack/react-query";
import { buildMenu, navQueryOptions, type SiteMenu } from "@/lib/site-content";

/** Live navigation from the database, falling back to the recovered static menu. */
export function useSiteMenu(): SiteMenu {
  const { data } = useQuery(navQueryOptions);
  return buildMenu(data ?? []);
}
