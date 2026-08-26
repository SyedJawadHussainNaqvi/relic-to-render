# Security headers, CSP hardening, firewall and SOC dashboard

Four deliverables: automated header/CSP verification on every route, a strict CSP with no `unsafe-inline`, firewall hardening (Apache now + a Cloudflare rule set), and a staff-only SOC dashboard backed by real collected data plus a shareable report.

## 1. Strict CSP (remove `unsafe-inline`)

The site ships prerendered HTML that contains inline scripts (JSON-LD structured data and the hydration payload), and those differ page by page, so one global policy cannot cover them with hashes.

Approach:
- Keep the site-wide policy in `.htaccess`, but with `script-src 'self'` — no `unsafe-inline`.
- At build time, after prerendering, compute a SHA-256 hash for every inline script in each generated page and inject a per-page `<meta http-equiv="Content-Security-Policy">` carrying `script-src 'self' 'sha256-…'` for exactly that page. Both policies are enforced together, so the effective rule allows only the exact inline scripts we shipped.
- Style: keep `style-src 'unsafe-inline'` for now (the framework emits inline styles); it is far lower risk than script injection. Tightening it later is a separate change.

## 2. Automated checks on every route

- A verification script walks every route in `sitemap.xml` plus `/robots.txt` and `/sitemap.xml`, serves the production build through a local Apache-equivalent header layer parsed from `.htaccess`, and asserts on each route: CSP present and identical policy set, no `unsafe-inline` in `script-src`, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, COOP, correct `Cache-Control` for HTML vs hashed assets, ETag present, and no `X-Powered-By`.
- A browser pass loads the same routes and records every `securitypolicyviolation` event and CSP console error, producing a **no-violation report** per browser engine (Chromium always; Firefox and WebKit included when their engines are available in the run environment, otherwise the report states which engines were covered).
- Both run as a test suite (`bunx vitest run`) so regressions fail fast, and can be run against the live domain too.
- Results are written as machine-readable JSON so the dashboard and the report share one source of truth.

## 3. Firewall

**Apache (`.htaccess`, applied now)**
- Block dotfiles, backup/source extensions, and directory listings.
- Allow only GET/HEAD/POST; deny TRACE/TRACK.
- Block known bad-bot and scraper user agents, and empty user agents on POST.
- Block common exploit probe paths (`/wp-admin`, `/.env`, `/vendor/phpunit`, `/xmlrpc.php`, `/.git`).
- Hotlink protection for media so bandwidth is not consumed by other sites.
- Keep the existing HTTPS redirect, staff-area redirect and clean-URL rules untouched.

**Cloudflare WAF (documented rule set to apply on the domain)**
- Managed ruleset + OWASP core rules on, bot fight mode on.
- Rate limiting: sensitive paths and generic abuse thresholds.
- Country/ASN challenge rules for known abuse sources, tuned so Pakistani traffic is never challenged.
- Cache rules matching the `.htaccess` policy so static assets are served from edge.
- Delivered as a step-by-step document plus a JSON rule export; needs the domain's DNS on Cloudflare to activate.

## 4. SOC dashboard + report

**Data (collected automatically)**
New tables: header/CSP scan runs and per-route results, uptime/response-time samples, Core Web Vitals samples, and a SOC control register. All staff-read only, written by a server-side collector.

A public collector endpoint (signature-verified, not browsable) runs on a schedule and records: response time and status for each key route, current security header state, and CSP violation counts. Real visitor Core Web Vitals are reported from the site itself into the same store.

**Dashboard** at a protected `/admin/soc` route, tabbed:
- *Headers & CSP* — pass/fail per route from the latest run, with the exact missing header called out.
- *Performance* — uptime, TTFB/response time trend, and real-user LCP/CLS/INP.
- *Controls* — SOC-style control register (access control, backups, logging, incident response, change management, vendor management) with owner, status and last-review date, editable by staff.
- *Violations* — CSP violation reports grouped by directive and route.

**Report** — a script that renders the same data into a self-contained HTML/markdown SOC report suitable for handing to an auditor.

## Order of work

1. Database tables + policies for scan, performance, violation and control data.
2. CSP hash injection in the build, `.htaccess` CSP tightened, firewall rules added.
3. Verification script + test suite + multi-browser no-violation report.
4. Collector endpoint, schedule, and real-user vitals reporting.
5. `/admin/soc` dashboard and the report generator.
6. Full production build, run the checks, and confirm zero violations.

## Technical notes

- Build hook lives in `scripts/sanitize-static.mjs` (already post-processes the prerendered output); hash injection is added there so both Lovable-hosted and Hostinger static builds get it.
- Header assertions parse `public/.htaccess` so the tests verify the file that actually ships, and can additionally be pointed at `https://www.duet.edu.pk` for live verification.
- Collector uses a TanStack server route under `src/routes/api/public/` with the existing signature-verification helper; scheduling via the database scheduler.
- CSP violation reports need a `report-to`/`report-uri` endpoint; that is added as a public route with strict payload validation and rate limiting so it cannot be used to flood the table.
- The staff dashboard stays on the app host (`/admin` is redirected off the static host, as today).
