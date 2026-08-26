import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

/**
 * Scheduled collector: stores the Search Console sitemap state and the
 * indexing status of every key page. Requires the scheduler's bearer secret.
 */
export const Route = createFileRoute("/api/public/seo-collect")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        try {
          const { collectSeoSnapshot } = await import("@/lib/seo-monitor.server");
          const summary = await collectSeoSnapshot("scheduled");
          return Response.json({ ok: true, ...summary });
        } catch (error) {
          console.error("[seo-collect] failed", error);
          return Response.json({ ok: false, error: String(error).slice(0, 500) }, { status: 502 });
        }
      },
    },
  },
});
