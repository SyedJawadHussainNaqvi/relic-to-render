import { describe, expect, it } from "vitest";
// @ts-expect-error - plain JS helper shared with the build scripts
import { validateJsonLd, validateHtml } from "../scripts/seo/validate-jsonld.mjs";

const TARGET = process.env["SEO_TARGET"];

type Row = { path: string; passed: boolean; errors: string[]; types: string[] };
type Report = { pages_total: number; pages_failed: number; results: Row[] };

describe("structured data (JSON-LD)", () => {
  it("is valid on every public route", async () => {
    const report: Report = await validateJsonLd({ target: TARGET });
    const failures = report.results
      .filter((r) => !r.passed)
      .map((r) => `${r.path}: ${r.errors.join(", ")}`);
    expect(failures, failures.join("\n")).toEqual([]);
    expect(report.pages_total).toBeGreaterThan(50);
  }, 180_000);

  it("keeps the homepage CollegeOrUniversity schema complete", async () => {
    const report: Report = await validateJsonLd({ target: TARGET, paths: ["/"] });
    const home = report.results[0]!;
    expect(home.errors, home.errors.join("\n")).toEqual([]);
    expect(home.types).toContain("CollegeOrUniversity");
    expect(home.types).toContain("PostalAddress");
  }, 60_000);

  it("rejects broken structured data", () => {
    const bad = validateHtml(
      "/",
      `<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollegeOrUniversity","name":"","url":"/relative"}</script>`,
    );
    expect(bad.passed).toBe(false);
    expect(bad.errors.join(" ")).toMatch(/empty string|absolute URL|missing required property/);

    const malformed = validateHtml(
      "/x",
      `<script type="application/ld+json">{ not json }</script>`,
    );
    expect(malformed.passed).toBe(false);
    expect(malformed.errors.join(" ")).toMatch(/invalid JSON/);
  });
});
