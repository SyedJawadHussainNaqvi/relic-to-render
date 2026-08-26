/**
 * Single source of truth for the site's security headers and CSP.
 *
 * The enforcing CSP lives in a per-page <meta> tag injected at build time so
 * every inline script can be pinned by SHA-256 hash (no 'unsafe-inline').
 * `.htaccess` adds the directives a meta tag cannot express (frame-ancestors,
 * reporting) plus all non-CSP headers.
 */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export const SUPABASE_ORIGIN = "https://ldbqlcfrphmmiwtllsxm.supabase.co";

/** Absolute origin that accepts CSP violation reports (optional). */
export function reportOrigin() {
  return (process.env["SOC_REPORT_ORIGIN"] ?? "").replace(/\/$/, "");
}

export function reportUri() {
  const origin = reportOrigin();
  return origin ? `${origin}/api/public/csp-report` : "";
}

/** Directives that make up the enforcing page policy, minus script-src. */
export function basePageDirectives() {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "frame-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    `connect-src 'self' https://*.supabase.co ${SUPABASE_ORIGIN}${
      reportOrigin() ? ` ${reportOrigin()}` : ""
    }`,
    "upgrade-insecure-requests",
  ];
}

/** Full enforcing policy for one page, given its inline script hashes. */
export function pagePolicy(hashes) {
  const scriptSrc = ["script-src 'self'", ...hashes.map((h) => `'${h}'`)].join(" ");
  const uri = reportUri();
  return [scriptSrc, ...basePageDirectives(), ...(uri ? [`report-uri ${uri}`] : [])].join("; ");
}

/** Header-level policy: only what a meta tag cannot set. */
export function headerPolicy() {
  const uri = reportUri();
  return [`frame-ancestors 'self'`, ...(uri ? [`report-uri ${uri}`] : [])].join("; ");
}

export function sha256Base64(source) {
  return `sha256-${createHash("sha256").update(source, "utf8").digest("base64")}`;
}

/**
 * Inline <script> bodies of an HTML document, in document order.
 *
 * Uses a spec-compliant HTML parser rather than a regex: serialized page data
 * can contain sequences (`<!--`, `<script`) that change where the parser ends
 * the script, and a hash taken from the wrong slice never matches the browser.
 */
export function inlineScripts(html) {
  const { parse } = parse5;
  const out = [];

  const visit = (node) => {
    if (node.nodeName === "script") {
      const attrs = new Map((node.attrs ?? []).map((a) => [a.name, a.value]));
      const text = (node.childNodes ?? []).map((c) => c.value ?? "").join("");
      if (!attrs.has("src") && text) out.push(text);
      return;
    }
    for (const child of node.childNodes ?? []) visit(child);
  };

  visit(parse(html));
  return out;
}

/** Non-CSP headers every HTML response must carry. */
export const REQUIRED_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "geolocation=(), microphone=(), camera=()",
  "cross-origin-opener-policy": "same-origin",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
};

export const FORBIDDEN_HEADERS = ["x-powered-by", "server-timing-debug"];

/**
 * Very small `.htaccess` reader: collects `Header always set` / `Header set`
 * pairs so the local verification server can serve the exact same headers
 * that ship to Apache.
 */
export async function parseHtaccessHeaders(path = "public/.htaccess") {
  const text = await readFile(path, "utf8");
  const global = {};
  const byPattern = [];
  let pattern = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const open = /^<FilesMatch\s+"([^"]+)"\s*>$/i.exec(line);
    if (open) {
      pattern = new RegExp(open[1]);
      continue;
    }
    if (/^<\/FilesMatch>$/i.test(line)) {
      pattern = null;
      continue;
    }
    const header = /^Header\s+(?:always\s+)?set\s+([A-Za-z-]+)\s+"([\s\S]*)"(?:\s+env=\w+)?$/.exec(line);
    if (!header) continue;
    const [, name, value] = header;
    if (pattern) byPattern.push({ pattern, name, value });
    else global[name] = value;
  }
  return { global, byPattern };
}
