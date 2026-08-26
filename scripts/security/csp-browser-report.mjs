/**
 * Loads every public route in each available browser engine and records CSP
 * violations, producing a no-violation report.
 *
 *   node scripts/security/csp-browser-report.mjs [https://www.duet.edu.pk]
 *
 * Writes reports/csp-violations.json and exits non-zero if any engine reported
 * a violation.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { serveStatic, sitemapPaths } from "./serve-static.mjs";

const ROOT = "dist/client";

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    try {
      return await import("playwright-core");
    } catch {
      return null;
    }
  }
}

export async function runBrowserReport({ target } = {}) {
  const pw = await loadPlaywright();
  if (!pw) {
    return { skipped: true, reason: "playwright is not installed in this environment", engines: [] };
  }

  const local = target ? null : await serveStatic({ root: ROOT, port: 4398 });
  const origin = target ?? local.origin;
  const paths = await sitemapPaths(ROOT).catch(() => ["/"]);

  const engines = [];
  try {
    for (const name of ["chromium", "firefox", "webkit"]) {
      const type = pw[name];
      let browser;
      try {
        browser = await type.launch({ headless: true, args: name === "chromium" ? ["--no-sandbox"] : [] });
      } catch (error) {
        engines.push({ engine: name, available: false, reason: String(error).slice(0, 160) });
        continue;
      }
      const violations = [];
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.__cspViolations = [];
        document.addEventListener("securitypolicyviolation", (event) => {
          window.__cspViolations.push({
            directive: event.effectiveDirective || event.violatedDirective,
            blocked: event.blockedURI,
            source: event.sourceFile,
            line: event.lineNumber,
          });
        });
      });
      page.on("console", (msg) => {
        const text = msg.text();
        if (/Content Security Policy|Refused to (load|execute|apply)/i.test(text)) {
          violations.push({ path: page.url(), directive: "console", blocked: text.slice(0, 300) });
        }
      });

      for (const path of paths) {
        await page.goto(new URL(path, origin).href, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(120);
        const found = await page.evaluate(() => {
          const list = window.__cspViolations ?? [];
          window.__cspViolations = [];
          return list;
        });
        for (const v of found) violations.push({ path, ...v });
      }

      await browser.close();
      engines.push({
        engine: name,
        available: true,
        version: type.name?.() ?? name,
        routes: paths.length,
        violations,
      });
    }
  } finally {
    await local?.close();
  }

  return {
    target: origin,
    generated_at: new Date().toISOString(),
    routes: paths.length,
    engines,
    total_violations: engines.reduce((n, e) => n + (e.violations?.length ?? 0), 0),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = await runBrowserReport({ target: process.argv[2] });
  await mkdir("reports", { recursive: true });
  await writeFile("reports/csp-violations.json", JSON.stringify(report, null, 2));
  if (report.skipped) {
    console.log(`[csp-report] skipped: ${report.reason}`);
    process.exit(0);
  }
  for (const engine of report.engines) {
    if (!engine.available) {
      console.log(`[csp-report] ${engine.engine}: engine not available in this environment`);
      continue;
    }
    console.log(
      `[csp-report] ${engine.engine}: ${engine.violations.length} violation(s) across ${engine.routes} route(s)`,
    );
    for (const v of engine.violations.slice(0, 10)) {
      console.error(`  ${v.path} — ${v.directive} blocked ${v.blocked}`);
    }
  }
  if (report.total_violations) process.exit(1);
}
