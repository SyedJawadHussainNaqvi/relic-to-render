/**
 * Validates the JSON-LD structured data on EVERY public route of the
 * production build (or a live target) and fails the build when it breaks.
 *
 *   node scripts/seo/validate-jsonld.mjs                    # local dist/client
 *   node scripts/seo/validate-jsonld.mjs https://www.duet.edu.pk
 *
 * Writes reports/seo-jsonld.json and exits non-zero on any error.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { serveStatic, sitemapPaths } from "../security/serve-static.mjs";

const SCHEMA_CONTEXT = "https://schema.org";

/** Types the site must keep valid, with their required properties. */
const REQUIRED_PROPS = {
  CollegeOrUniversity: ["name", "url", "description", "address"],
  Organization: ["name", "url"],
  EducationalOrganization: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  Article: ["headline"],
  NewsArticle: ["headline"],
  WebSite: ["name", "url"],
};

/** Routes that must carry a specific schema type. */
const REQUIRED_ON_PATH = {
  "/": ["CollegeOrUniversity"],
  "/academics": ["BreadcrumbList"],
  "/admissions": ["BreadcrumbList"],
};

const URL_PROPS = new Set(["url", "logo", "image", "sameAs", "contentUrl", "item"]);

function extractBlocks(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push(m[1].trim());
  return blocks;
}

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function typesOf(node) {
  const t = node?.["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
}

function walk(node, path, visit, topLevel = true) {
  if (Array.isArray(node)) {
    node.forEach((child, i) => walk(child, `${path}[${i}]`, visit, topLevel));
    return;
  }
  if (!node || typeof node !== "object") return;
  // A bare @graph wrapper is not an entity: its members are the top-level entities.
  if (Array.isArray(node["@graph"])) {
    walk(node["@graph"], `${path}.@graph`, visit, topLevel);
    return;
  }
  visit(node, path, topLevel);
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("@")) continue;
    walk(value, `${path}.${key}`, visit, false);
  }
}

/**
 * Validates one entity node. Required-property checks apply to top-level
 * entities only; nested nodes (addresses, sub-organisations, contact points)
 * are checked for shape, URLs and dates.
 */
function checkNode(node, nodePath, topLevel = true) {
  const issues = [];
  const types = typesOf(node);
  if (types.length === 0) {
    issues.push(`${nodePath}: object has no @type`);
    return issues;
  }

  if (topLevel) {
    for (const type of types) {
      for (const prop of REQUIRED_PROPS[type] ?? []) {
        const value = node[prop];
        const empty =
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0);
        if (empty) issues.push(`${nodePath}: ${type} is missing required property "${prop}"`);
      }
    }
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("@")) continue;
    if (typeof value === "string" && value.trim() === "") {
      issues.push(`${nodePath}: property "${key}" is an empty string`);
    }
    if (URL_PROPS.has(key)) {
      const urls = (Array.isArray(value) ? value : [value]).filter((v) => typeof v === "string");
      for (const url of urls) {
        if (!/^https?:\/\//.test(url)) {
          issues.push(`${nodePath}: "${key}" must be an absolute URL, got "${url}"`);
        }
      }
    }
    if (/^date[A-Za-z]*|.*Date$/.test(key) && typeof value === "string") {
      if (Number.isNaN(Date.parse(value))) {
        issues.push(`${nodePath}: "${key}" is not a valid date ("${value}")`);
      }
    }
  }

  if (types.includes("PostalAddress") && !node["addressCountry"]) {
    issues.push(`${nodePath}: PostalAddress is missing addressCountry`);
  }

  if (types.includes("BreadcrumbList")) {
    const items = Array.isArray(node["itemListElement"]) ? node["itemListElement"] : [];
    items.forEach((item, i) => {
      const p = `${nodePath}.itemListElement[${i}]`;
      if (!typesOf(item).includes("ListItem")) issues.push(`${p}: must be a ListItem`);
      if (!item?.name) issues.push(`${p}: ListItem is missing name`);
      if (item?.position !== i + 1) {
        issues.push(`${p}: position must be ${i + 1}, got ${JSON.stringify(item?.position)}`);
      }
    });
  }

  return issues;
}

export function validateHtml(path, html) {
  const errors = [];
  const warnings = [];
  const blocks = extractBlocks(html);
  const foundTypes = new Set();

  if (blocks.length === 0) {
    warnings.push("page has no JSON-LD structured data");
  }

  blocks.forEach((raw, index) => {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(raw));
    } catch (error) {
      errors.push(`block[${index}]: invalid JSON — ${String(error.message ?? error)}`);
      return;
    }

    const roots = Array.isArray(parsed) ? parsed : [parsed];
    for (const root of roots) {
      if (root?.["@context"] !== SCHEMA_CONTEXT && !root?.["@graph"]) {
        errors.push(`block[${index}]: @context must be "${SCHEMA_CONTEXT}"`);
      }
    }

    walk(parsed, `block[${index}]`, (node, nodePath, topLevel) => {
      for (const type of typesOf(node)) foundTypes.add(type);
      errors.push(...checkNode(node, nodePath, topLevel));
    });
  });

  for (const type of REQUIRED_ON_PATH[path] ?? []) {
    if (!foundTypes.has(type)) errors.push(`route must expose ${type} structured data`);
  }

  return {
    path,
    blocks: blocks.length,
    types: [...foundTypes].sort(),
    errors,
    warnings,
    passed: errors.length === 0,
  };
}

export async function validateJsonLd({ target, root = "dist/client", paths } = {}) {
  const local = target ? null : await serveStatic({ root });
  const origin = target ?? local.origin;
  const routes = paths ?? (await sitemapPaths(root).catch(() => ["/"]));

  const results = [];
  try {
    for (const path of routes) {
      const res = await fetch(new URL(path, origin), { redirect: "follow" });
      const html = await res.text();
      if (res.status !== 200) {
        results.push({
          path,
          blocks: 0,
          types: [],
          errors: [`status ${res.status}`],
          warnings: [],
          passed: false,
        });
        continue;
      }
      results.push(validateHtml(path, html));
    }
  } finally {
    await local?.close();
  }

  const failed = results.filter((r) => !r.passed);
  return {
    target: origin,
    generated_at: new Date().toISOString(),
    pages_total: results.length,
    pages_passed: results.length - failed.length,
    pages_failed: failed.length,
    results,
  };
}

/**
 * Optionally pushes the run to the SEO monitoring dashboard.
 * Set SEO_REPORT_URL (e.g. https://www.duet.edu.pk/api/public/seo-collect)
 * and CRON_SECRET to record structured-data history.
 */
async function publishReport(report) {
  const url = process.env.SEO_REPORT_URL;
  const secret = process.env.CRON_SECRET;
  if (!url || !secret) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ kind: "jsonld", source: "build", report }),
    });
    console.log(`[validate-jsonld] report upload ${res.status}`);
  } catch (error) {
    console.warn(`[validate-jsonld] report upload failed: ${String(error)}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = await validateJsonLd({ target: process.argv[2] });
  await mkdir("reports", { recursive: true });
  await writeFile("reports/seo-jsonld.json", JSON.stringify(report, null, 2));
  for (const row of report.results) {
    if (!row.passed) console.error(`FAIL ${row.path}\n  - ${row.errors.join("\n  - ")}`);
  }
  console.log(
    `[validate-jsonld] ${report.pages_passed}/${report.pages_total} page(s) have valid structured data on ${report.target}`,
  );
  await publishReport(report);
  if (report.pages_failed) process.exit(1);
}
