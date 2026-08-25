# Point www.duet.edu.pk at the Hostinger-hosted site

## What this does

Makes the live DUET site answer on `duet.edu.pk` and `www.duet.edu.pk`, served from your Hostinger Cloud account (the static build), with SSL.

Two systems are involved:

```text
HostPK cPanel (DNS for duet.edu.pk)   -->   Hostinger Cloud (files in public_html)
  A / CNAME records point here              site + SSL certificate issued here
```

DNS lives at HostPK; the files and certificate live at Hostinger. Both sides must be done or the domain shows an error page.

## Honest note on cPanel access

You asked me to log into your cPanel myself. I will try, but expect it to fail: HostPK's cPanel login sits behind bot/CAPTCHA protection, the same thing that blocked me from your Hostinger hPanel earlier. If it blocks me, I fall back to giving you the exact records to paste — that step takes about three minutes.

To attempt the login I need, in chat: cPanel URL (e.g. `https://server.hostpk.com:2083` or `https://duet.edu.pk/cpanel`), username, and password. I will store them as secrets, not in code.

## Steps

1. Confirm what Hostinger expects for this domain: add `duet.edu.pk` and `www.duet.edu.pk` in the Hostinger panel so it issues DNS targets and an SSL certificate for them. Without this the records point at a server that refuses the domain.
2. Read the current DNS zone for `duet.edu.pk` and record what exists today (especially anything mail-related) before changing anything.
3. In HostPK cPanel Zone Editor, set:
   - `A` record, name `@` (duet.edu.pk) -> Hostinger's server IP
   - `A` record, name `www` -> the same IP (or a `CNAME www -> duet.edu.pk`)
   - leave `MX`, `SPF`/`TXT`, and `DKIM` records untouched so email keeps working
   - TTL 300 while switching, so mistakes are cheap to fix
4. Remove or correct only conflicting old `A`/`CNAME` records for `@` and `www` that point at the previous host.
5. Wait for propagation (usually minutes, up to 24-48 hours), then in Hostinger force HTTPS and confirm the certificate is issued for both names.
6. Verify: `duet.edu.pk` and `www.duet.edu.pk` load the homepage over HTTPS, a news page loads, a PDF link opens, and menus load live content.

## What I need from you

- cPanel URL, username, password (for the login attempt).
- The Hostinger server IP for that account — it is in hPanel under the hosting plan's details. If you'd rather I read it myself, the FTP password from the earlier request would let me confirm it.
- Confirmation that `duet.edu.pk` is still under your control at the registrar and that the nameservers currently point at HostPK. If the nameservers point elsewhere, editing HostPK's zone has no effect and we change records at the real DNS provider instead.

## Technical notes

- Staff area: the static build redirects `/auth` and `/admin` to the app origin via `public/.htaccess`. Once the domain is live I will update that redirect target if you want it branded rather than pointing at the current app URL.
- No application code changes are required for the domain switch itself; the site reads content from the backend over HTTPS from any origin.
- One follow-up backend change is needed after go-live: add `https://www.duet.edu.pk` to the allowed auth redirect URLs so staff sign-in returns to the right place.
- If email turns out to be in use on the domain, the MX/SPF/DKIM records stay exactly as they are; only `@` and `www` address records change.
