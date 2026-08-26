/**
 * Builds a standalone, printable SOC report from dashboard data.
 */
type Row = Record<string, unknown>;

function escape(value: unknown) {
  return String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function table(caption: string, columns: string[], rows: Row[]) {
  if (!rows.length) return `<h2>${escape(caption)}</h2><p>No records.</p>`;
  const head = columns.map((c) => `<th>${escape(c)}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${columns
          .map((c) => `<td>${escape(Array.isArray(row[c]) ? (row[c] as unknown[]).join("; ") : row[c])}</td>`)
          .join("")}</tr>`,
    )
    .join("");
  return `<h2>${escape(caption)}</h2><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export function buildSocReport(input: {
  run: Row | null | undefined;
  checks: Row[];
  controls: Row[];
  uptime: Row[];
  vitals: Row[];
  violations: Row[];
}) {
  const generated = new Date().toISOString();
  const run = input.run;
  const summary = run
    ? `<p><strong>Target:</strong> ${escape(run["target"])}<br>
       <strong>Scan started:</strong> ${escape(run["started_at"])}<br>
       <strong>Routes:</strong> ${escape(run["routes_total"])} checked,
       ${escape(run["routes_passed"])} passing, ${escape(run["routes_failed"])} failing<br>
       <strong>CSP violations (24h):</strong> ${escape(run["csp_violations"])}</p>`
    : "<p>No scan run recorded.</p>";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>DUET SOC report ${generated.slice(0, 10)}</title>
<style>
 body{font-family:system-ui,sans-serif;margin:2rem;color:#1c1c22;}
 h1{color:#4B338C} h2{color:#4B338C;margin-top:2rem;border-bottom:3px solid #F99A03;display:inline-block}
 table{border-collapse:collapse;width:100%;font-size:13px;margin-top:.5rem}
 th,td{border:1px solid #ddd;padding:6px;text-align:left;vertical-align:top}
 th{background:#f4f2fa}
</style></head><body>
<h1>DUET security operations report</h1>
<p>Generated ${escape(generated)}</p>
${summary}
${table("Route header & CSP checks", ["path", "status_code", "passed", "failures", "response_ms"], input.checks)}
${table("Security control register", ["code", "title", "category", "owner", "status", "last_reviewed_at", "next_review_at"], input.controls)}
${table("Availability samples", ["checked_at", "path", "status_code", "response_ms", "is_up"], input.uptime)}
${table("Core Web Vitals samples", ["recorded_at", "metric", "value", "rating", "path", "device"], input.vitals)}
${table("CSP violations", ["reported_at", "effective_directive", "blocked_uri", "document_uri", "occurrences"], input.violations)}
</body></html>`;
}
