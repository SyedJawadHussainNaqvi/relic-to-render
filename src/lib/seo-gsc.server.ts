/**
 * Server-only Google Search Console reader used by the SEO monitoring
 * dashboard and the scheduled collector. All calls go through the Lovable
 * connector gateway; no Google credentials live in this project.
 */
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

type SiteEntry = { siteUrl: string; permissionLevel?: string };

function headers() {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const connectionApiKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!lovableApiKey || !connectionApiKey) {
    throw new Error(
      "Google Search Console is not connected for this project (missing gateway credentials).",
    );
  }
  return {
    Authorization: `Bearer ${lovableApiKey}`,
    "X-Connection-Api-Key": connectionApiKey,
  };
}

async function gsc<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers: { ...headers(), ...(init?.headers ?? {}) } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Search Console request failed [${res.status}]: ${body.slice(0, 500)}`);
  }
  if (res.status === 204) return {} as T;
  return (await res.json()) as T;
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

/** Resolves the verified property covering `targetUrl`, preferring its exact root. */
export async function resolveSiteUrl(targetUrl: string): Promise<string> {
  const { siteEntry = [] } = await gsc<{ siteEntry?: SiteEntry[] }>("/webmasters/v3/sites");
  const target = new URL(targetUrl);
  const matches = siteEntry.filter(
    (e) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, target),
  );
  if (matches.length === 0) {
    throw new Error("No verified Search Console property covers this site.");
  }
  const exact = matches.find((e) => e.siteUrl === target.origin + "/");
  return (exact ?? matches[0]!).siteUrl;
}

export type SitemapStatus = {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  errors?: string;
  warnings?: string;
  contents?: { type?: string; submitted?: string; indexed?: string }[];
};

export async function readSitemapStatus(siteUrl: string, sitemapUrl: string) {
  return gsc<SitemapStatus>(
    `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
  );
}

export async function submitSitemap(siteUrl: string, sitemapUrl: string) {
  await gsc(
    `/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "PUT" },
  );
}

export type InspectionResult = {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      pageFetchState?: string;
      crawledAs?: string;
      googleCanonical?: string;
      userCanonical?: string;
      lastCrawlTime?: string;
      sitemap?: string[];
    };
    richResultsResult?: { verdict?: string };
  };
};

/** Reads the status of a URL's version in Google's index (no live test, no crawl request). */
export async function inspectUrl(siteUrl: string, inspectionUrl: string) {
  return gsc<InspectionResult>("/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl, siteUrl }),
  });
}
