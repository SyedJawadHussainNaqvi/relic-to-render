# DUET Karachi — Website Restoration & Improvement Report

**Site:** https://www.duet.edu.pk (also https://duet.edu.pk)
**Report date:** 31 August 2026
**Prepared by:** Quantum Horizons Pvt Ltd

---

## 1. Executive summary

The original duet.edu.pk website and its primary backup were lost. Because the site was
public-facing, the content was recovered from archived public snapshots and rebuilt as a
modern, fast, secure web application.

Current state:

- Full public website live on **duet.edu.pk** and **www.duet.edu.pk**
- **73 page routes**, **64 archived content pages**, **67 restored media/PDF assets**
- Content-managed homepage slider, news and navigation (no redeploy needed to update)
- Technical SEO complete: sitemap, robots, canonicals, structured data, Search Console
- Security hardened: CSP + security headers, CMS email allowlist, SOC dashboard, CI vulnerability scanning
- Automated build gates for structured data and content integrity
- Global footer credit: *Secured and Developed By Quantum Horizons Pvt Ltd*

---

## 2. Phase 1 — Site restoration

- Recovered the site from a clean 2024 Internet Archive snapshot.
- Parsed ~55 archived HTML pages into structured content (`src/content/pages.json`,
  now 64 pages) rather than fragile copied markup.
- Restored images and official PDF documents (regulations, forms, annual report,
  department documents) into `public/media/` — 67 assets.
- Re-derived the university brand identity (primary `#4B338C`, accent `#F99A03`),
  typography and layout, and rebuilt the header, mega-menu, footer and page shells.
- Created the full routing tree — 73 routes covering About, Academics, Admissions,
  Examinations, Research, Students, Faculty & Departments, Downloads, Tenders,
  Careers, Alumni, Contacts, Newsletter and all sub-pages.
- Verified the rebuilt site page-by-page with automated browser testing.

## 3. Phase 2 — Content management system (CMS)

- Backend database and authentication added (Lovable Cloud).
- Tables with row-level security for: slider slides, news posts, navigation items,
  user roles, and the CMS email allowlist.
- Admin area at `/admin`:
  - **Homepage slider manager** — add/replace/reorder slides
  - **News manager** — publish and edit announcements
  - **Navigation manager** — edit menu structure without code changes
- Data fetched through cached queries so editorial changes appear immediately for
  visitors without a redeployment.

## 4. Phase 3 — Hosting, domain and traffic capacity

- Evaluated Hostinger hosting options; concluded shared/cloud hosting cannot run a
  persistent server process, so the site was moved to a **fully static pre-rendered
  build** — every page is generated ahead of time as plain HTML.
- Result: extremely high traffic tolerance, near-instant page delivery, no server
  to crash during admission rushes or result announcements.
- Produced deployment guides: `DEPLOY-HOSTINGER-STATIC.md`, `DEPLOY-HOSTINGER.md`.
- Added `scripts/sanitize-static.mjs` to strip build-tool identifiers and staff-only
  code from the public bundle.
- **DNS cutover completed** in the registrar/cPanel so both `duet.edu.pk` and
  `www.duet.edu.pk` resolve to the live site.
- Build output currently pre-renders **76 pages**.

## 5. Phase 4 — SEO programme

On-page:

- Unique `<title>` and meta description on every content route (42+ rewritten and
  optimised), each under search-result truncation limits.
- Canonical URLs and Open Graph / Twitter card metadata per page.
- Single `H1` per page and corrected heading hierarchy; descriptive link labels;
  semantic HTML; alt text on images; lazy loading below the fold.
- Structured data (JSON-LD): homepage `CollegeOrUniversity` with founding date,
  postal address, telephone, admissions and support contact points, campuses and
  official sub-domains; additional schema on Academics, Admissions and Contacts.

Discovery:

- Dynamic `sitemap.xml` (68+ URLs, including `/contacts` and `/newsletter`) and
  `robots.txt`, both verified publicly reachable in production.
- Google Search Console verified; indexing requested for key pages.

Local targeting (Karachi / Pakistan):

- Geo metadata (`PK-SD`, Karachi), local address and phone in structured data.
- Keyword coverage for high-intent local queries: *engineering universities in
  Karachi*, *DUET admission*, *DUET fee structure*, *DUET results*, merit lists,
  academic calendar and past papers.

Monitoring & automation:

- **`/admin/seo` dashboard** tracking sitemap discovery, indexing status and
  structured-data errors over time, with "Refresh monitoring" and "Resubmit
  sitemap" actions.
- `scripts/seo/validate-jsonld.mjs` + `tests/seo-jsonld.test.ts` — the build fails
  if structured data ever becomes invalid. 70 pages validate clean.
- Lighthouse SEO and Best Practices: **100**.

## 6. Phase 5 — Security & operations

- **Security headers and CSP** applied site-wide, with
  `scripts/security/verify-headers.mjs` checking every route automatically and a
  no-violation browser report (`reports/security-headers.json`,
  `reports/csp-violations.json`).
- **SOC dashboard** at `/admin/soc`: header compliance, uptime, CSP violations,
  Core Web Vitals and security controls, backed by persistent logging.
- **CMS access restricted to three approved addresses only** —
  `admin@duet.edu.pk`, `info@duet.edu.pk`, `mail.syedjawadhussain@gmail.com`.
  No open sign-ups; enforced server-side, not in the browser.
- **`super_admin` role** provisioned for `admin@duet.edu.pk` with a
  cryptographically random 28-character password shown once and never stored;
  the role bypasses all admin route and dashboard gates.
- Roles stored in a dedicated `user_roles` table with security-definer checks —
  no privilege-escalation surface on profile records.
- **Dependency vulnerability scanning in CI**: `scripts/security/audit-deps.mjs`
  (`npm run security:deps`) fails builds on high/critical advisories and watches
  TanStack, Vite, React and backend packages. `.github/workflows/ci.yml` runs it
  on every push, every pull request, and nightly.
- Framework packages updated to patched versions; text lockfiles regenerated so
  the scanner can verify them. Current audit: **no high/critical vulnerabilities**.
- Security findings reviewed and resolved, including removal of an over-privileged
  database function and tightening of execute grants. Decisions documented in the
  security memory.
- Operational runbook: `SECURITY-OPERATIONS.md`.

## 7. Phase 6 — Performance & user experience

- Route-level code splitting; non-critical UI (dashboard tabs, charts, modals)
  lazy-loaded.
- Homepage below-the-fold sections extracted and memoised; navigation menu and
  shared UI memoised with `useMemo` / `useCallback` to eliminate wasted re-renders.
- Explicit image dimensions, eager loading for the hero slide only, lazy loading
  elsewhere — protects layout stability and mobile data use.
- Loading skeletons on route transitions, and a clean **"Page Under Construction"**
  fallback plus catch-all route so no visitor ever sees a broken page.
- Fixed broken navigation: `/contacts` and `/newsletter` created (previously 404)
  and added to the sitemap.

## 8. Phase 7 — Content integrity

- **Fee Structure page restored.** The page had been displaying an unrelated
  foreign-language article. It now carries the authentic DUET content:
  - Fee and Other Miscellaneous Charges Regulations, 2019 (applicability, definitions)
  - Admission charges — Rs. 16,000 / USD 500
  - Semester charges — Rs. 16,000 / USD 250
  - Local self-finance fees — Rs. 400,000–750,000 by department
  - Foreign self-finance fees — USD 6,000–8,000
  - Refund and HEC conditions, modification notice, related links
- **Full site content audit** across all 64 archived pages, checking for
  foreign-language injections, spam/SEO-poisoning vocabulary, off-topic articles,
  duplicated bodies, suspicious outbound domains and thin content.
  Result: **64/64 clean**, no unauthorised pages remaining.
- **Automated content audit** (`scripts/content/audit-content.mjs`,
  `npm run content:audit`) wired into `build:static` and `ci:verify` — any future
  tampering breaks the build instead of going live silently.
- Pages that were genuinely never captured in the archive now render the proper
  section-navigation layout instead of a bare "Coming Soon" heading.

## 9. Branding

- Global footer on every public and admin page:
  **"Secured and Developed By Quantum Horizons Pvt Ltd"**, linking to
  https://www.quantum-horizons.com. Previous vendor credit removed.
- Full DUET logo favicon suite generated from the official logo
  (`favicon.ico`, 32px, 192px, Apple touch icon, web manifest) so the logo appears
  in browser tabs, bookmarks, mobile home screens and Google search listings.

## 10. Verification evidence

| Check | Result |
| --- | --- |
| Production build | Passing |
| Pages pre-rendered | 76 |
| Content routes | 73 |
| Archived content pages | 64 |
| Restored media/PDF assets | 67 |
| `robots.txt` / `sitemap.xml` in production | HTTP 200 |
| Sitemap URLs | 68+ (incl. `/contacts`, `/newsletter`) |
| Route smoke test | All sitemap routes return 200 |
| Structured-data validation | 70 pages valid |
| Content integrity audit | 64/64 clean |
| Dependency audit | 0 high/critical |
| Lighthouse SEO / Best Practices | 100 / 100 |

## 11. Open items & recommendations

1. **Change the provisioned super-admin password** for `admin@duet.edu.pk` after
   first sign-in; the generated password was displayed once and is not stored.
2. **Sub-domains are separate applications.** `portal.duet.edu.pk`,
   `admission.duet.edu.pk` and `qobe.duet.edu.pk` are not part of this codebase;
   updating their footers/branding requires access to those systems.
3. **Archive gaps.** A small number of original pages were never captured by public
   archives. They render the under-construction layout and should be supplied by
   the relevant departments so we can publish the authentic text.
4. **Ongoing SEO.** Continue requesting indexing for newly published pages and
   review `/admin/seo` monthly; publish fresh news and academic notices regularly,
   as freshness drives local rankings.
5. **Keep CI green.** The nightly dependency audit and content-integrity audit are
   the early-warning system for both new vulnerabilities and unauthorised content
   edits — investigate any failure promptly.
