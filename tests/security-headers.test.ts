import { describe, expect, it } from "vitest";
// @ts-expect-error - plain JS helper shared with the build scripts
import { verifyHeaders } from "../scripts/security/verify-headers.mjs";
// @ts-expect-error - plain JS helper shared with the build scripts
import { runBrowserReport } from "../scripts/security/csp-browser-report.mjs";

const TARGET = process.env["SECURITY_TARGET"];

type Row = { path: string; passed: boolean; failures: string[] };
type Report = { routes_total: number; routes_failed: number; results: Row[] };

describe("security headers and CSP", () => {
  it("passes on every public route", async () => {
    const report: Report = await verifyHeaders({ target: TARGET });
    const failures = report.results
      .filter((r) => !r.passed)
      .map((r) => `${r.path}: ${r.failures.join(", ")}`);
    expect(failures, failures.join("\n")).toEqual([]);
    expect(report.routes_total).toBeGreaterThan(50);
  }, 180_000);

  it("reports no CSP violations in real browsers", async () => {
    const report = await runBrowserReport({ target: TARGET });
    if (report.skipped) return;
    const offenders = report.engines
      .filter((e: { available: boolean; violations?: unknown[] }) => e.available && e.violations?.length)
      .map((e: { engine: string; violations: unknown[] }) => `${e.engine}: ${JSON.stringify(e.violations)}`);
    expect(offenders, offenders.join("\n")).toEqual([]);
  }, 600_000);
});
