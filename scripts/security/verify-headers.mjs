/**
 * Verifies security headers and the Content-Security-Policy on EVERY public
 * route of the production build (or a live target).
 *
 *   node scripts/security/verify-headers.mjs                 # local dist/client
 *   node scripts/security/verify-headers.mjs https://www.duet.edu.pk
 *
 * Writes reports/security-headers.json and exits non-zero on any failure.
 */
import { mkdir, writeFile } from "node:fs/promises";
import {
  FORBIDDEN_HEADERS,
  REQUIRED_HEADERS,
  basePageDirectives,
  inlineScripts,
  sha256Base64,
} from "./headers-config.mjs";
import { serveStatic, sitemapPaths } from "./serve-static.mjs";

const REQUIRED_META_DIRECTIVES = [
  "default-src",
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "connect-src",
  "object-src",
  "base-uri",
  "form-action",
];

function metaPolicy(html) {
  const m = /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i.exec(html);
  return m?.[1] ?? null;
}

function directiveMap(policy) {
  const out = {};
  for (const part of policy.split(";")) {
    const [name, ...values] = part.trim().split(/\s+/);
    if (name) out[name.toLowerCase()] = values;
  }
  return out;
}

/** Checks one HTML route. Returns a result row. */
export async function checkRoute(origin, path) {
  const failures = [];
  const started = Date.now();
  const res = await fetch(new URL(path, origin), { redirect: "manual" });
  const responseMs = Date.now() - started;
  const html = await res.text();
  const headers = Object.fromEntries(res.headers.entries());
  const isHtml = (headers["content-type"] ?? "").includes("text/html");

  if (res.status !== 200) failures.push(`status ${res.status}`);

  for (const [name, expected] of Object.entries(REQUIRED_HEADERS)) {
    const actual = headers[name];
    if (!actual) failures.push(`missing header ${name}`);
    else if (actual !== expected) failures.push(`header ${name} is "${actual}", expected "${expected}"`);
  }
  for (const name of FORBIDDEN_HEADERS) {
    if (headers[name]) failures.push(`header ${name} must not be sent`);
  }

  const headerCsp = headers["content-security-policy"];
  if (!headerCsp) failures.push("missing header content-security-policy");
  else if (!/frame-ancestors/.test(headerCsp)) failures.push("header CSP lacks frame-ancestors");

  if (isHtml) {
    const cache = headers["cache-control"] ?? "";
    if (!/must-revalidate|no-cache|max-age=0/.test(cache)) {
      failures.push(`HTML cache-control should revalidate, got "${cache}"`);
    }
    if (!headers["etag"]) failures.push("missing etag");

    const policy = metaPolicy(html);
    if (!policy) {
      failures.push("page is missing its Content-Security-Policy meta tag");
    } else {
      const directives = directiveMap(policy);
      for (const name of REQUIRED_META_DIRECTIVES) {
        if (!directives[name]) failures.push(`CSP is missing ${name}`);
      }
      const scriptSrc = directives["script-src"] ?? [];
      if (scriptSrc.includes("'unsafe-inline'")) failures.push("CSP script-src allows 'unsafe-inline'");
      if (scriptSrc.includes("'unsafe-eval'")) failures.push("CSP script-src allows 'unsafe-eval'");
      if (scriptSrc.includes("*") || scriptSrc.includes("http:")) failures.push("CSP script-src is too broad");
      if ((directives["object-src"] ?? []).join(" ") !== "'none'") failures.push("CSP object-src must be 'none'");

      // Every inline script on the page must be covered by a hash.
      const needed = [...new Set(inlineScripts(html).map(sha256Base64))];
      const missing = needed.filter((hash) => !scriptSrc.includes(`'${hash}'`));
      if (missing.length) failures.push(`${missing.length} inline script(s) not covered by a CSP hash`);

      // The non-script directives must match the shared configuration exactly.
      for (const expected of basePageDirectives()) {
        if (!policy.includes(expected)) failures.push(`CSP directive drifted: expected "${expected}"`);
      }
    }
  }

  return { path, status_code: res.status, passed: failures.length === 0, failures, headers, response_ms: responseMs };
}

export async function verifyHeaders({ target, root = "dist/client" } = {}) {
  const local = target ? null : await serveStatic({ root });
  const origin = target ?? local.origin;
  const paths = target
    ? await sitemapPaths(root).catch(() => ["/"])
    : [...(await sitemapPaths(root)), "/robots.txt", "/sitemap.xml"];

  const results = [];
  try {
    for (const path of paths) results.push(await checkRoute(origin, path));
  } finally {
    await local?.close();
  }

  const failed = results.filter((r) => !r.passed);
  return {
    target: origin,
    generated_at: new Date().toISOString(),
    routes_total: results.length,
    routes_passed: results.length - failed.length,
    routes_failed: failed.length,
    results,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = await verifyHeaders({ target: process.argv[2] });
  await mkdir("reports", { recursive: true });
  await writeFile("reports/security-headers.json", JSON.stringify(report, null, 2));
  for (const row of report.results) {
    if (!row.passed) console.error(`FAIL ${row.path}\n  - ${row.failures.join("\n  - ")}`);
  }
  console.log(
    `[verify-headers] ${report.routes_passed}/${report.routes_total} route(s) passed on ${report.target}`,
  );
  if (report.routes_failed) process.exit(1);
}
