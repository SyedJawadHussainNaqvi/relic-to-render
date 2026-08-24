# Rebuild duet.edu.pk from the Web Archive

Goal: recreate the public-facing Dawood University (DUET) website as it looked before it was lost — same layout, same colors, same wording, same menu structure. No modernizing.

## What I confirmed in the archive

- The old site is heavily archived: hundreds of captured URLs, with homepage snapshots as recent as April 2026.
- It was a WordPress site titled "Dawood University of Engineering & Technology Karachi – Together We Grow".
- The full navigation tree is recoverable, including: About (Historic Profile, Vision & Mission, Authorities, Officers, University Linkages, Organogram, Annual Report), Admissions (Online Admission Portal, Undergraduate, Postgraduate, Fee Structures, Migration Policy, Admission Guidelines, Academic Calendar), Academics (Faculties & Departments, UG/PG Programs and Regulations, HEC Approved PhD Supervisors, OBE), Examinations (Regulations, Schedule, Results, Certificates, Convocation, Downloads), Directorates, Research (Projects, Journal, Publications, Conferences, Funding Agencies, Ethics/Plagiarism policy), Students (Scholarships, Results, Internships, Career Counselling, Shuttle Bus Routes, Societies, Handbook), plus top-bar links (DUET Portal, QOBE portals, Library, Webmail, Newsletter, Alumni, Downloads, SDGs Reports, Contacts).
- The most recent snapshots contain injected spam links (the live site had been compromised), so I will pull content from a clean earlier snapshot and drop anything that isn't genuine university content.

## Approach

### Phase 1 — Recover the source material
- Query the archive index for every captured HTML page under duet.edu.pk and pick the best clean snapshot per URL.
- Download those pages, strip the archive's injected toolbar/scripts and rewritten links, and save clean text + structure per page into a local content folder.
- Download the original theme CSS, logo, banner/slider images, department photos, and PDFs referenced by those pages into project assets.
- Capture full-page screenshots of the homepage and a few key inner pages from the archive to use as the visual reference while building.

### Phase 2 — Rebuild the shell faithfully
- Recreate the exact header: university crest and title block, the utility top bar, and the multi-level dropdown mega-menu with the real menu tree above.
- Recreate the homepage: image slider, welcome/Vice Chancellor message, news & announcements list, quick links, stats/highlight strip, and the footer with contact details and links.
- Match the legacy palette and typography extracted from the archived CSS, wired through the project's design tokens (no invented modern styling).

### Phase 3 — Rebuild the pages
- One route per archived page, mirroring the original URL paths so old links and search results still resolve.
- Build in order: About, Admissions, Academics/Departments, Examinations, Directorates, Research, Students, Contacts.
- News/announcement posts become a listing page plus individual post pages using the recovered post text and dates.
- PDFs and downloadable forms are served as static files from the recovered assets.

### Phase 4 — Verify
- Side-by-side screenshot comparison of the rebuilt pages against the archived captures, fixing layout and spacing until they match.
- Link check across all routes so no menu item dead-ends.

## Out of scope for now

Student portal, QOBE portals, webmail, admission-form submission and any login-protected functionality are backend systems that cannot be recovered from the archive. Those menu items will point to their existing external URLs where one exists, or to a clearly marked placeholder page. A replacement database/auth design is a separate follow-up task.

## Technical notes

- TanStack Start with file-based routes under `src/routes`, mirroring the original URL paths; recovered page copy stored as structured content modules so text is editable without touching layout.
- Recovered assets go into `src/assets` (images) and `public/` (PDFs and other downloads).
- Legacy colors, fonts and radii declared as design tokens in `src/styles.css`, so the "do not modernize" look is enforced centrally.
- Each route gets its own `head()` with the original page title and description for SEO continuity.
- Recovery scripts run in the sandbox only; no archive-injected script or spam markup is carried into the project.
