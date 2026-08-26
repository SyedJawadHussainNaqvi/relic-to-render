/** Shared configuration for SEO monitoring (safe to import in the browser). */
export const SEO_SITE_URL = "https://www.duet.edu.pk/";
export const SEO_SITEMAP_URL = "https://www.duet.edu.pk/sitemap.xml";

/** Pages whose Google indexing status is tracked on every collection run. */
export const SEO_KEY_PAGES = [
  "/",
  "/about-duet",
  "/about-duet/vision-mission",
  "/academics",
  "/admissions",
  "/undergrad-programs",
  "/postgraduate-programs",
  "/faculty-departments",
  "/academic-calendar",
  "/fee-structure",
  "/scholarships",
  "/examinations",
  "/results",
  "/downloads",
  "/news",
] as const;

export function keyPageUrls(): string[] {
  return SEO_KEY_PAGES.map((path) => new URL(path, SEO_SITE_URL).toString());
}

/** Coverage states that mean the page is not yet in Google's index. */
export function isIndexed(coverageState: string | null | undefined): boolean {
  if (!coverageState) return false;
  return /^Submitted and indexed|^Indexed/i.test(coverageState);
}
