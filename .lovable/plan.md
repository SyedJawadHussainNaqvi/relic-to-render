# Host DUET on Hostinger Cloud with full functionality

## What the Cloud plan can and cannot do

Your Hostinger Cloud plan (hPanel, Apache/LiteSpeed shared stack) serves files — it cannot keep a Node process alive, so server-side rendering and server functions cannot run there. That does not mean losing functionality: the backend (database, auth, storage, APIs) already lives on Lovable Cloud and is reachable over HTTPS from any host.

So the working shape is:

```text
Hostinger Cloud (public_html)        Lovable Cloud backend
  static prerendered pages     -->     database + auth + REST API
  media (images, PDFs)         -->     news, slider, navigation (live)
  external links, forms, API calls
```

Everything a visitor sees stays dynamic: news, slider and menus are fetched live from the backend API in the browser, so admin edits appear without re-uploading anything. External links, PDFs and third-party embeds work normally.

The one piece that cannot run on the Cloud plan is the staff-only area (`/auth`, `/admin`) — it needs the server runtime. It keeps working on the current Lovable URL, and I will link to it from the site footer as "Staff Login". If you want `/admin` on Hostinger too, that requires a Hostinger VPS instead of Cloud; the guide for that is already prepared and I can switch to it on your word.

## Steps

1. Build the static export (70+ prerendered routes, all 67 media files bundled).
2. Confirm the backend allows the Hostinger domain (CORS/redirect URLs) so live data and API calls work from there.
3. Point the client data layer at the public backend API for every visitor-facing read.
4. Upload `dist/client/` to `public_html`, including `.htaccess` for clean URLs, HTTPS redirect and long-lived asset caching.
5. Attach the temporary `mediumspringgreen-mandrill-334720.hostingersite.com` domain, force SSL.
6. Verify live: homepage, a news post, a PDF link, menus, and one admin edit showing up on Hostinger.

## What I still need from you

FTP upload is blocked on one missing item: the real FTP password. In hPanel go to **Files -> FTP Accounts**, click **Change FTP password** for `u395709693`, and paste the new password here. (hPanel login itself is behind a Cloudflare human-verification challenge I cannot pass, so hPanel credentials alone don't help.)

If you'd rather not share it, I'll hand you a ready-to-upload zip and you extract it in File Manager — same result, about two minutes of your time.

## Technical notes

- Build: `NITRO_PRESET=static` prerender pipeline in `vite.config.ts`, output `dist/client/`.
- Data: `src/lib/site-content.ts` already falls back from server functions to a browser Supabase client, so reads work on a static host.
- `.htaccess`: SPA-style fallback for unmatched routes, `Cache-Control: immutable` for `/assets`, no-cache for HTML.
- Backend auth redirect URLs updated to include the Hostinger origin.
- Full VPS path (SSR + `/admin` on Hostinger) is documented in `DEPLOY-HOSTINGER.md` if you upgrade.
