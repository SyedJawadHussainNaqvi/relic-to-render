import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: PageSkeleton,
    defaultPendingMs: 150,
    defaultNotFoundComponent: () => <UnderConstruction />,
  });

  // Dehydrate/hydrate the query cache with the SSR payload so the first client
  // render matches the server HTML (prevents hydration mismatches).
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};
