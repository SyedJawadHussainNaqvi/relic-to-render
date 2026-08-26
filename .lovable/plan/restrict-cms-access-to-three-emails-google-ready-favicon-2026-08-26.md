# Restrict CMS access to three emails + Google-ready favicon

## Access control

Only these accounts may sign up or sign in to the CMS/dashboard:

- admin@duet.edu.pk
- info@duet.edu.pk
- mail.syedjawadhussain@gmail.com

Enforcement happens in three layers so a blocked address cannot get in by any route:

1. **Database (authoritative).** A trigger on new auth users rejects any signup whose email is not on the allowlist, so even a direct API signup or a Google OAuth first-time login fails. The allowlist lives in a small `cms_allowed_emails` table (admin-managed, readable only server-side) rather than hardcoded, so the list can be changed later without a code change.
2. **Admin role check.** The existing admin gate stays: only accounts holding the admin role reach the dashboard. The three allowed emails get the admin role granted in the same migration (applied when the account exists; new signups get it via the same trigger).
3. **Sign-in screen.** `/auth` checks the typed email (and the Google account after return) against the allowlist and shows a clear "This email is not authorised for CMS access" message instead of a raw backend error. This is UX only — the database remains the real gate.

Anyone else signing in is signed straight back out and told to contact the administrator.

## Favicon and Google indexing

The Dawood University logo is already the favicon source, but Google's index prefers a square multi-size icon set served from a stable path. Changes:

- Generate square, padded icons from `public/media/duet_logo-300x227.png` (no stretching): `favicon.ico` (16/32/48), `favicon-32.png`, `favicon-192.png`, `favicon-512.png`, and keep `apple-touch-icon.png` (180).
- Reference all of them from the root route head, including `rel="icon" sizes` variants plus a `manifest` entry so Android/Chrome and Google Search results pick up the mark.
- Add `public/site.webmanifest` with name, short name, theme colour (#4B338C) and the icon set.
- The icons are declared in the shared root head, so every page (all 66 prerendered routes) carries them.
- Verify the built output serves `/favicon.ico` and the PNG variants with correct sizes, and that the sitemap/robots remain intact.

Note: Google refreshes the search-result icon on its own recrawl schedule — expect it to appear in results within days after the site is republished.

## Technical notes

- Migration: `cms_allowed_emails` table with GRANTs (service_role only; no anon/authenticated read), an `AFTER INSERT` trigger on `auth.users`-adjacent flow implemented as a `BEFORE INSERT` guard function invoked from a `public` schema trigger wrapper that raises on non-allowlisted email, plus role grants for the three emails.
- `src/routes/auth.tsx`: allowlist check before `signUp`/`signInWithPassword` and after the Google redirect resolves; sign out non-allowed sessions.
- `src/routes/__root.tsx`: icon + manifest links.
- Icon generation with ImageMagick into `public/`, committed as static assets.
