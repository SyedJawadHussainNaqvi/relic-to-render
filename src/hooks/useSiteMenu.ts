import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { buildMenu, navQueryOptions, type SiteMenu } from "@/lib/site-content";

/** Live navigation from the database, falling back to the recovered static menu. */
export function useSiteMenu(): SiteMenu {
  const { data } = useQuery(navQueryOptions);
  // buildMenu walks the whole nav tree; recompute only when the rows change.
  return useMemo(() => buildMenu(data ?? []), [data]);
}
