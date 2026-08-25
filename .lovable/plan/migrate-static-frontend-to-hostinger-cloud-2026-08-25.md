# Migrate static frontend to Hostinger Cloud

## Goal
Deploy the prerendered public website (70 pages + assets) to your Hostinger Cloud plan so it can absorb heavy traffic, while keeping `/admin` and `/auth` on the Lovable-hosted copy.

## What you will provide
1. **Hostinger hPanel access** (preferred) OR FTP credentials:
   - hPanel URL, username/email, and password, OR
   - FTP hostname, username, password, and port.
2. **The temporary Hostinger preview domain** you want the site to answer on (e.g., `yourname.hostingersite.com`).
3. **Confirmation** that `/admin` and `/auth` remain on the Lovable URL (already confirmed).

## What I will do
1. Run `npm run build:static` locally to produce the static site in `dist/client/`.
2. Upload the contents of `dist/client/` to your Hostinger `public_html` folder (including `.htaccess`).
3. Attach the temporary preview domain to the hosting account in hPanel if it is not already attached.
4. Force HTTPS and issue the free SSL certificate in hPanel.
5. Enable Cloudflare/CDN in hPanel for traffic scaling.
6. Smoke-test the live Hostinger URL for homepage, news, inner pages, and live content loading.

## Deliverables
- Public site live on your temporary Hostinger domain.
- `.htaccess` compression and caching rules active.
- CDN enabled for high-traffic handling.
- Short handoff note explaining how to update content via the Lovable `/admin` URL.

## Out of scope for this plan
- Moving `/auth` or `/admin` to Hostinger (requires a VPS/Node server, not the Cloud plan).
- Switching the database to MySQL or rewriting the backend.
- Connecting a custom domain like `duet.edu.pk` (can be added in a follow-up once this preview is verified).
