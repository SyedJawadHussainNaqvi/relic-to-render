#!/usr/bin/env node
/**
 * Dependency vulnerability gate.
 *
 * Runs `npm audit --json` and fails the build when any advisory at or above the
 * configured severity threshold is found. Advisories affecting TanStack (and
 * other watched) packages are always reported, whatever their severity, so new
 * issues in the framework surface on every build.
 *
 *   node scripts/security/audit-deps.mjs [--level=high] [--json=reports/dependency-audit.json]
 */
import { execFile } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

const SEVERITY_ORDER = ["info", "low", "moderate", "high", "critical"];
/** Packages whose advisories are always reported, even below the fail threshold. */
const WATCHED = [/^@tanstack\//, /^vite$/, /^nitro$/, /^react(-dom)?$/, /^@supabase\//];

function arg(name, fallback) {
  const hit = process.argv.slice(2).find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

const failLevel = arg("level", "high");
const jsonOut = arg("json", "reports/dependency-audit.json");
const failIndex = SEVERITY_ORDER.indexOf(failLevel);

async function audit() {
  try {
    const { stdout } = await run("npm", ["audit", "--json"], {
      maxBuffer: 64 * 1024 * 1024,
    });
    return JSON.parse(stdout);
  } catch (error) {
    // npm audit exits non-zero when vulnerabilities exist; the JSON is still on stdout.
    if (error && typeof error.stdout === "string" && error.stdout.trim()) {
      return JSON.parse(error.stdout);
    }
    throw error;
  }
}

const report = await audit();
const advisories = Object.values(report.vulnerabilities ?? {}).map((v) => ({
  name: v.name,
  severity: v.severity,
  range: v.range,
  fixAvailable:
    typeof v.fixAvailable === "object" && v.fixAvailable
      ? `${v.fixAvailable.name}@${v.fixAvailable.version}`
      : Boolean(v.fixAvailable),
  titles: (v.via ?? [])
    .filter((entry) => typeof entry === "object" && entry !== null)
    .map((entry) => entry.title)
    .filter(Boolean),
  watched: WATCHED.some((re) => re.test(v.name)),
}));

const blocking = advisories.filter((a) => SEVERITY_ORDER.indexOf(a.severity) >= failIndex);
const watched = advisories.filter((a) => a.watched && !blocking.includes(a));

const summary = {
  generated_at: new Date().toISOString(),
  fail_level: failLevel,
  totals: report.metadata?.vulnerabilities ?? {},
  blocking,
  watched,
};

mkdirSync(dirname(jsonOut), { recursive: true });
writeFileSync(jsonOut, `${JSON.stringify(summary, null, 2)}\n`);

const fmt = (a) =>
  `  - ${a.name} (${a.severity}) ${a.range} -> fix: ${a.fixAvailable}${
    a.titles.length ? `\n      ${a.titles.join("\n      ")}` : ""
  }`;

if (watched.length) {
  console.log(`Watched-package advisories below ${failLevel}:`);
  console.log(watched.map(fmt).join("\n"));
}

if (blocking.length) {
  console.error(`\nDependency audit FAILED: ${blocking.length} advisory(ies) >= ${failLevel}`);
  console.error(blocking.map(fmt).join("\n"));
  console.error(`\nReport written to ${jsonOut}`);
  process.exit(1);
}

const t = summary.totals;
console.log(
  `Dependency audit OK — no advisories >= ${failLevel} (total: ${t.total ?? 0}; critical ${
    t.critical ?? 0
  }, high ${t.high ?? 0}, moderate ${t.moderate ?? 0}, low ${t.low ?? 0}).`,
);
console.log(`Report written to ${jsonOut}`);
