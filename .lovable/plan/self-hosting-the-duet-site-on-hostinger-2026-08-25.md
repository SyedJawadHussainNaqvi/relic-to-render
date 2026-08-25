# Self-hosting the DUET site on Hostinger

## What I can and cannot do from here

I cannot upload files to your Hostinger account — Lovable has no FTP/SSH access to it. What I can do is prepare the project so it builds into a self-hostable Node bundle, plus give you exact upload/start steps. You run the upload once.

Two of your answers conflict with the platform, so read this before approving:

1. **SSR on Hostinger shared/cloud (hPanel, no root).** Hostinger's shared and Cloud plans do not run persistent Node.js processes; Node app hosting there is VPS-only. A dynamic Node server therefore cannot run on your current plan. Options: upgrade to a Hostinger VPS (keeps SSR), or ship the site as static files on the Cloud plan (no SSR).
2. **Moving the database to Hostinger MySQL.** The whole app — public content reads, staff login, and the admin panel — is built on Postgres with row-level security and Supabase auth. MySQL has neither. Moving to MySQL means rebuilding the data layer, writing a new auth system (sessions, password hashing, Google OAuth), and rewriting every admin screen. That is effectively a rebuild of the backend, not a migration, and Hostinger MySQL on shared plans also blocks remote connections from anything but your own hosting.

## Recommended path (what this plan implements)

Host the site on Hostinger, keep the backend where it is.

- **Frontend/SSR:** runs on your Hostinger VPS (Node + PM2 + Nginx + SSL), or as static files on the Cloud plan if you'd rather not upgrade.
- **Backend:** stays on the managed Postgres/auth backend, reached over HTTPS. Zero migration, admin panel and staff login keep working, external links and PDFs are already CDN-hosted.

### Steps

1. Confirm the target: VPS (dynamic, admin edits appear instantly) or Cloud static (rebuild + re-upload after content edits).
2. Add a self-host build target so `bun run build` emits a plain Node server bundle instead of the Cloudflare Worker bundle (`vite.config.ts`, nitro preset `node-server`). For the static option, add a prerender/static preset instead.
3. Add a `.env.production.example` listing the four values the server needs at runtime (backend URL, publishable key, service key, site URL) and confirm every server function reads them at request time.
4. Verify the built bundle boots locally and the homepage, `/news`, `/auth` and `/admin` all work against the live backend.
5. Write `DEPLOY-HOSTINGER.md`: upload path, `npm ci --omit=dev`, PM2 start command, Nginx reverse-proxy config, Let's Encrypt SSL, and how to point your Hostinger domain/temporary server link at it.
6. Re-check redirect URLs so Google sign-in and email confirmation return to the Hostinger domain, not the Lovable one.

### If you truly want everything on Hostinger

That needs its own project phase, in this order, and requires a VPS: install Postgres (not MySQL) or self-hosted Supabase on the VPS, replay the four existing migrations, copy the content rows and auth users, then repoint the app's connection settings. This keeps all current code working. Choosing MySQL instead means rewriting the data and auth layers from scratch — I'd advise against it, but say the word and I'll scope it separately.

## Technical notes

- Stack: TanStack Start v1 SSR + React 19, Vite 8, Nitro build. Default output targets Cloudflare Workers; the `node-server` preset produces `.output/server/index.mjs` runnable under Node 22.
- Server functions (`src/lib/site-content.functions.ts`) read `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` from `process.env` inside handlers, so they work unchanged on a Node host once the env file is present.
- Static option limitation: `/admin` and staff login need a server; on a fully static export they would be unavailable, and content updates require a rebuild.
