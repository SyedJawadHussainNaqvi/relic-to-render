/**
 * Server-only collection logic shared by the admin refresh action and the
 * scheduled collector: reads Search Console state and stores a history row.
 */
import {
  SEO_SITEMAP_URL,
  SEO_SITE_URL,
  keyPageUrls,
} from "./seo-monitor-config";
import { inspectUrl, readSitemapStatus, resolveSiteUrl } from "./seo-gsc.server";

export type CollectSummary = {
  site_url: string;
  sitemap: {
    submitted_urls: number;
    indexed_urls: number;
    errors: number;
    warnings: number;
    last_downloaded: string | null;
    is_pending: boolean;
  };
  pages_checked: number;
  pages_indexed: number;
};

export async function collectSeoSnapshot(source: "manual" | "scheduled"): Promise<CollectSummary> {
  const siteUrl = await resolveSiteUrl(SEO_SITE_URL);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const status = await readSitemapStatus(siteUrl, SEO_SITEMAP_URL);
  const web = status.contents?.find((c) => c.type === "web") ?? status.contents?.[0];
  const snapshot = {
    source,
    site_url: siteUrl,
    sitemap_url: SEO_SITEMAP_URL,
    last_submitted: status.lastSubmitted ?? null,
    last_downloaded: status.lastDownloaded ?? null,
    is_pending: Boolean(status.isPending),
    errors: Number(status.errors ?? 0),
    warnings: Number(status.warnings ?? 0),
    submitted_urls: Number(web?.submitted ?? 0),
    indexed_urls: Number(web?.indexed ?? 0),
    notes: null as string | null,
  };
  await supabaseAdmin.from("seo_sitemap_snapshots").insert(snapshot);

  type PageRow = { source: string; site_url: string; page_url: string } & Record<string, unknown>;
  const rows: PageRow[] = [];
  let indexed = 0;
  for (const pageUrl of keyPageUrls()) {
    try {
      const result = await inspectUrl(siteUrl, pageUrl);
      const index = result.inspectionResult?.indexStatusResult ?? {};
      if (/^Submitted and indexed|^Indexed/i.test(index.coverageState ?? "")) indexed += 1;
      rows.push({
        source,
        site_url: siteUrl,
        page_url: pageUrl,
        verdict: index.verdict ?? null,
        coverage_state: index.coverageState ?? null,
        robots_txt_state: index.robotsTxtState ?? null,
        indexing_state: index.indexingState ?? null,
        page_fetch_state: index.pageFetchState ?? null,
        crawled_as: index.crawledAs ?? null,
        google_canonical: index.googleCanonical ?? null,
        user_canonical: index.userCanonical ?? null,
        last_crawl_time: index.lastCrawlTime ?? null,
        rich_results_verdict: result.inspectionResult?.richResultsResult?.verdict ?? null,
        in_sitemap: (index.sitemap ?? []).length > 0,
        raw: result.inspectionResult ?? null,
      });
    } catch (error) {
      rows.push({
        source,
        site_url: siteUrl,
        page_url: pageUrl,
        verdict: "ERROR",
        coverage_state: String(error).slice(0, 300),
        in_sitemap: false,
      });
    }
  }
  if (rows.length) await supabaseAdmin.from("seo_page_checks").insert(rows as never);

  return {
    site_url: siteUrl,
    sitemap: {
      submitted_urls: snapshot.submitted_urls,
      indexed_urls: snapshot.indexed_urls,
      errors: snapshot.errors,
      warnings: snapshot.warnings,
      last_downloaded: snapshot.last_downloaded,
      is_pending: snapshot.is_pending,
    },
    pages_checked: rows.length,
    pages_indexed: indexed,
  };
}
