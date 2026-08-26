import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Real-user Core Web Vitals sink. Write-only: the site posts anonymous
 * measurements here, and only admins can read them back from the dashboard.
 */
const schema = z.object({
  metric: z.enum(["LCP", "CLS", "INP", "TTFB", "FCP"]),
  value: z.number().finite().min(0).max(600_000),
  rating: z.enum(["good", "needs-improvement", "poor"]).optional(),
  path: z.string().max(300),
  device: z.enum(["mobile", "tablet", "desktop"]).optional(),
});

export const Route = createFileRoute("/api/public/web-vitals")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        if (raw.length > 4_000) return new Response(null, { status: 413 });

        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch {
          return new Response(null, { status: 204 });
        }

        const result = schema.safeParse(parsed);
        if (!result.success) return new Response(null, { status: 204 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("soc_web_vitals").insert({
          metric: result.data.metric,
          value: result.data.value,
          rating: result.data.rating ?? null,
          path: result.data.path,
          device: result.data.device ?? null,
        });
        return new Response(null, { status: 204 });
      },
    },
  },
});
