# Deploy the frontend to Hostinger Cloud (static, high traffic)

This builds the whole public website as plain HTML/CSS/JS files. No Node.js, no
database on Hostinger — just files in `public_html`, which is what a Hostinger
Cloud/shared plan serves best and what handles very large traffic spikes.

## What you get

- All 70 public pages prerendered to real HTML (fast first paint, fully indexable).
- Every recovered image and PDF bundled inside the site (`/media/...`), so nothing
  depends on an external CDN.
- News, slider and menus stay live: the browser reads them straight from the
  Lovable Cloud Data API after load, so `/admin` edits still show up without a
  rebuild.
- `.htaccess` shipped with the build: gzip/brotli compression, 1-year immutable
  caching for assets, clean URLs.

## 1. Build (on your computer)

```bash
npm install
npm run build:static
```

Output: `dist/client/` — that folder's **contents** are the website.

## 2. Upload

hPanel > Files > File Manager (or FTP), open `public_html`, delete anything
already there, then upload everything **inside** `dist/client/` (including the
hidden `.htaccess`).

Zip/upload/extract is much faster than uploading thousands of files one by one.

## 3. Point the domain

hPanel > Domains: attach your domain (or use the free `*.hostingersite.com`
preview link) to this hosting account, then hPanel > SSL: issue the free
certificate and force HTTPS.

## 4. Absorbing huge traffic

Static files already scale, and these two settings do the rest:

1. hPanel > Advanced > **Cloudflare / CDN**: turn it on. Cached HTML and assets
   are then served from edge locations, not your server.
2. hPanel > **Object Cache / LiteSpeed cache**: not needed here (no PHP), leave off.

Rough capacity: with compression + the 1-year asset cache in `.htaccess`, a page
view costs ~30 KB of HTML on repeat visits, so a Cloud plan comfortably serves
hundreds of thousands of views a day, and effectively unlimited with the CDN on.

## 5. Updating the site

- **Content** (slider, news, navigation): edit in `/admin` on the Lovable-hosted
  copy — the Hostinger site picks changes up immediately, because content is
  fetched live in the browser.
- **New page or design change**: run `npm run build:static` again and re-upload.
- To also bake the newest content into the HTML, just rebuild.

## What is intentionally not on Hostinger

`/auth` and `/admin` are not prerendered. Keep using the Lovable-hosted copy for
staff sign-in and content editing — that URL already has the sign-in redirect
configured, and edits made there appear on the Hostinger site straight away.

For a full server-side deployment (SSR + admin on your own machine) see
`DEPLOY-HOSTINGER.md`, which requires a VPS.
