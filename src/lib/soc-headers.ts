/**
 * Header expectations shared by the scheduled collector and the dashboard.
 * Mirrors scripts/security/headers-config.mjs (which the build/test suite uses).
 */
export const REQUIRED_HEADERS: Record<string, string> = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "geolocation=(), microphone=(), camera=()",
  "cross-origin-opener-policy": "same-origin",
  "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
};

export const REQUIRED_CSP_DIRECTIVES = [
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

export function cspFromHtml(html: string): string | null {
  const match = /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i.exec(html);
  return match?.[1] ?? null;
}

/** Evaluates one response; returns the list of problems (empty means pass). */
export function evaluateHeaders(
  status: number,
  headers: Headers,
  html: string | null,
): string[] {
  const failures: string[] = [];
  if (status !== 200) failures.push(`status ${status}`);

  for (const [name, expected] of Object.entries(REQUIRED_HEADERS)) {
    const actual = headers.get(name);
    if (!actual) failures.push(`missing header ${name}`);
    else if (actual !== expected) failures.push(`header ${name} is "${actual}"`);
  }
  if (headers.get("x-powered-by")) failures.push("header x-powered-by must not be sent");

  const headerCsp = headers.get("content-security-policy");
  if (!headerCsp) failures.push("missing header content-security-policy");
  else if (!headerCsp.includes("frame-ancestors")) failures.push("header CSP lacks frame-ancestors");

  if (html) {
    const policy = cspFromHtml(html);
    if (!policy) {
      failures.push("page is missing its Content-Security-Policy meta tag");
    } else {
      for (const directive of REQUIRED_CSP_DIRECTIVES) {
        if (!new RegExp(`(^|;)\\s*${directive}\\s`, "i").test(policy)) {
          failures.push(`CSP is missing ${directive}`);
        }
      }
      const scriptSrc = /(?:^|;)\s*script-src\s([^;]+)/i.exec(policy)?.[1] ?? "";
      if (scriptSrc.includes("'unsafe-inline'")) failures.push("CSP script-src allows 'unsafe-inline'");
      if (scriptSrc.includes("'unsafe-eval'")) failures.push("CSP script-src allows 'unsafe-eval'");
      if (!/'sha256-/.test(scriptSrc)) failures.push("CSP script-src has no inline script hashes");
    }
  }
  return failures;
}
