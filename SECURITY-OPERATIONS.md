# DUET security operations (firewall, headers, SOC dashboard)

## 1. Automated header & CSP checks

Everything is derived from one source of truth: `scripts/security/headers-config.mjs`.

| Command | What it does |
| --- | --- |
| `npm run build:static` | Builds the site and injects a strict per-page CSP. Every inline script is pinned by SHA-256 (no `'unsafe-inline'`, no `'unsafe-eval'`). |
| `npm run security:headers` | Serves `dist/client` with the exact `.htaccess` headers and asserts required headers + CSP directives on **every route in `sitemap.xml`**. |
| `npm run security:browsers` | Loads the key routes in Chromium, Firefox and WebKit and records any policy violation (no-violation report). |
| `npx vitest run tests/security-headers.test.ts` | Same checks as a test, suitable for CI. |

Latest run: 68/68 routes pass; Chromium, Firefox and WebKit each report **zero**
violations.

Inline-script hashes are computed with a spec-compliant HTML parser (`parse5`);
a regex is not safe here because serialized page data can shift where the
browser ends a script element.

## 2. Firewall (`public/.htaccess`)

Shipped with the static build and active at the Apache layer:

- blocks unused request methods (TRACE/TRACK, etc.)
- blocks scraper/scanner user agents (Ahrefs, Semrush, DotBot, MJ12, sqlmap, nikto …)
- blocks exploit probes (`wp-admin`, `wp-login.php`, `xmlrpc.php`, `.env`, `.git`, `phpmyadmin`, backup/archive files)
- blocks image/PDF hotlinking from foreign origins
- forces HTTPS + canonical `www`, redirects `/admin` and `/auth` to the app host
- security headers: HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`,
  `Content-Security-Policy: frame-ancestors 'self'` (+ `report-uri`)
- brotli/gzip compression, immutable asset caching, revalidated HTML, ETags

### Cloudflare WAF (recommended in front of Hostinger)

1. Enable **Full (strict)** SSL, **Always Use HTTPS**, HSTS, and Brotli.
2. Managed Rules: enable **Cloudflare Managed Ruleset** and **OWASP Core Ruleset**
   (paranoia level 1, block at score ≥ 40).
3. Custom rules:
   - `(http.request.uri.path contains "/wp-" or http.request.uri.path contains "xmlrpc.php" or http.request.uri.path contains "/.env")` → **Block**
   - `(http.request.method in {"TRACE" "TRACK" "CONNECT"})` → **Block**
   - `(http.request.uri.path eq "/api/public/csp-report" and not http.request.method eq "POST")` → **Block**
4. Rate limiting: 60 requests / 10 s per IP on `/` (managed challenge),
   20 requests / 60 s on `/api/public/*`.
5. Bots: enable Bot Fight Mode; allow Googlebot/Bingbot verified bots.

## 3. SOC dashboard

`/admin/soc` (staff only, on the app host) has four tabs:

- **Headers & CSP** – latest scan run, pass/fail per route, exact failure reasons
- **Performance** – availability %, average response time, real-visitor Core Web
  Vitals at the 75th percentile, latest uptime samples
- **Controls** – editable security control register (owner, status, review dates)
- **Violations** – grouped CSP violation reports

"Export SOC report" downloads a standalone HTML report of everything above.

### Data sources

| Endpoint | Purpose | Auth |
| --- | --- | --- |
| `POST /api/public/csp-report` | browser CSP violation sink | public, write-only, size-capped |
| `POST /api/public/web-vitals` | anonymous Core Web Vitals from visitors | public, write-only, validated |
| `POST /api/public/soc-collect` | scheduled uptime + header scanner | `Authorization: Bearer <cron secret>` |

All three write with the privileged server client; only admins can read the
tables (RLS).

### Scheduling the collector

Call the collector hourly from any scheduler (Cloudflare Worker cron, cron-job.org,
or `pg_cron` + `pg_net`):

```
POST https://<app-host>/api/public/soc-collect
Authorization: Bearer <LOVABLE_CRON_SECRET>
```

Optional environment variables:

- `SOC_MONITOR_TARGET` – site to probe (default `https://www.duet.edu.pk`)
- `SOC_REPORT_ORIGIN` / `VITE_SOC_REPORT_ORIGIN` – absolute app-host origin used
  for `report-uri` and the vitals beacon when the frontend is served from
  Hostinger. Set both before running `npm run build:static`, otherwise the
  static site reports to its own origin only.
