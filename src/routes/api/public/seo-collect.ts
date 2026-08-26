import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const jsonldPayload = z.object({
  kind: z.literal("jsonld"),
  source: z.string().max(40).default("build"),
  report: z.object({
    target: z.string().max(300),
    pages_total: z.number().int().nonnegative(),
    pages_passed: z.number().int().nonnegative(),
    pages_failed: z.number().int().nonnegative(),
    results: z
      .array(
        z.object({
          path: z.string().max(300),
          types: z.array(z.string().max(80)).default([]),
          errors: z.array(z.string().max(500)).default([]),
          warnings: z.array(z.string().max(500)).default([]),
        }),
      )
      .max(500),
  }),
});

async function storeJsonLdRun(payload: z.infer<typeof jsonldPayload>) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { report, source } = payload;
  const { data: run, error } = await supabaseAdmin
    .from("seo_jsonld_runs")
    .insert({
      source,
      target: report.target,
      pages_total: report.pages_total,
      pages_passed: report.pages_passed,
      pages_failed: report.pages_failed,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  const issues = report.results.flatMap((page) => [
    ...page.errors.map((message) => ({
      run_id: run!.id,
      path: page.path,
      severity: "error",
      message,
      schema_types: page.types,
    })),
    ...page.warnings.map((message) => ({
      run_id: run!.id,
      path: page.path,
      severity: "warning",
      message,
      schema_types: page.types,
    })),
  ]);
  if (issues.length) await supabaseAdmin.from("seo_jsonld_issues").insert(issues);
  return { run_id: run!.id, issues: issues.length };
}

/**
 * Scheduled collector. With no body it stores the Search Console sitemap state
 * and the indexing status of every key page; with a `kind: "jsonld"` body it
 * records a structured-data validation run from the build pipeline.
 * Requires the scheduler's bearer secret.
 */
export const Route = createFileRoute("/api/public/seo-collect")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        try {
          const raw = await request.text();
          if (raw.trim()) {
            const parsed = jsonldPayload.safeParse(JSON.parse(raw));
            if (!parsed.success) {
              return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
            }
            return Response.json({ ok: true, ...(await storeJsonLdRun(parsed.data)) });
          }
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
