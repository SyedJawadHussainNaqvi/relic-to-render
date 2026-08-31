/**
 * Content integrity audit for src/content/pages.json.
 *
 *   node scripts/content/audit-content.mjs
 *
 * Flags pages whose body does not belong to a university site: foreign-language
 * injections, spam/SEO-poisoning vocabulary, off-topic articles and duplicated
 * bodies. Exits non-zero when any page fails so CI catches unauthorized edits.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";

const PAGES = new URL("../../src/content/pages.json", import.meta.url);

/** Function words that only appear when non-English copy has been pasted in. */
const FOREIGN = /\b(yang|adalah|dengan|untuk|namun|dalam|tidak|sebagai|karena|merupakan|очень|бесплатно|para|porque|também)\b/i;

/** Spam / SEO-poisoning vocabulary. */
const SPAM = /\b(slot|gacor|situs|judi|casino|togel|maxwin|bandar|poker|viagra|cialis|escort|betting|crypto\s*signals|forex\s*bonus)\b/i;

/** Topics that never belong on a DUET page body. */
const OFF_TOPIC = /\b(kisah|prajurit|angkat besi|celebrity|box office|film review)\b/i;

function textOf(page) {
  const parts = [page.title ?? "", page.description ?? ""];
  for (const b of page.blocks ?? []) {
    if (b.text) parts.push(b.text);
    if (Array.isArray(b.items)) {
      for (const it of b.items) parts.push(typeof it === "string" ? it : (it?.text ?? ""));
    }
    if (Array.isArray(b.rows)) for (const row of b.rows) parts.push(row.join(" "));
  }
  return parts.join("\n");
}

export async function auditContent() {
  const pages = JSON.parse(await readFile(PAGES, "utf8"));
  const results = [];
  const bodies = new Map();

  for (const [path, page] of Object.entries(pages)) {
    const text = textOf(page);
    const errors = [];

    const foreign = text.match(FOREIGN);
    if (foreign) errors.push(`non-English content ("${foreign[0]}")`);
    const spam = text.match(SPAM);
    if (spam) errors.push(`spam keyword ("${spam[0]}")`);
    const off = text.match(OFF_TOPIC);
    if (off) errors.push(`off-topic content ("${off[0]}")`);

    const words = text.split(/\s+/).filter(Boolean).length;
    const body = (page.blocks ?? []).length ? textOf({ blocks: page.blocks }).trim() : "";
    if (body && words > 60) {
      const key = body.slice(0, 200).toLowerCase();
      const prev = bodies.get(key);
      if (prev) errors.push(`body duplicated from ${prev}`);
      else bodies.set(key, path);
    }

    results.push({ path, words, passed: errors.length === 0, errors });
  }

  const failed = results.filter((r) => !r.passed);
  const report = {
    generated_at: new Date().toISOString(),
    pages_total: results.length,
    pages_failed: failed.length,
    results,
  };
  await mkdir(new URL("../../reports/", import.meta.url), { recursive: true });
  await writeFile(
    new URL("../../reports/content-audit.json", import.meta.url),
    JSON.stringify(report, null, 2),
  );
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = await auditContent();
  for (const row of report.results.filter((r) => !r.passed)) {
    console.error(`[audit-content] ${row.path}: ${row.errors.join("; ")}`);
  }
  if (report.pages_failed > 0) {
    console.error(`[audit-content] ${report.pages_failed}/${report.pages_total} page(s) failed`);
    process.exit(1);
  }
  console.log(`[audit-content] ${report.pages_total} page(s) clean`);
}
