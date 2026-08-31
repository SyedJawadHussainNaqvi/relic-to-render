import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Refreshes the Search Console snapshot. Admin-only. */
export const refreshSeoMonitoring = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .in("role", ["admin", "super_admin"]);
    if (error) throw new Error(error.message);
    if (!roles?.length) throw new Error("Admin role required.");

    const { collectSeoSnapshot } = await import("./seo-monitor.server");
    return collectSeoSnapshot("manual");
  });

/** Re-submits the sitemap to Search Console. Admin-only. */
export const resubmitSitemap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roles, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .in("role", ["admin", "super_admin"]);
    if (error) throw new Error(error.message);
    if (!roles?.length) throw new Error("Admin role required.");

    const { SEO_SITEMAP_URL, SEO_SITE_URL } = await import("./seo-monitor-config");
    const { resolveSiteUrl, submitSitemap, readSitemapStatus } = await import("./seo-gsc.server");
    const siteUrl = await resolveSiteUrl(SEO_SITE_URL);
    await submitSitemap(siteUrl, SEO_SITEMAP_URL);
    const status = await readSitemapStatus(siteUrl, SEO_SITEMAP_URL);
    return {
      site_url: siteUrl,
      last_submitted: status.lastSubmitted ?? null,
      last_downloaded: status.lastDownloaded ?? null,
      errors: Number(status.errors ?? 0),
      warnings: Number(status.warnings ?? 0),
    };
  });
