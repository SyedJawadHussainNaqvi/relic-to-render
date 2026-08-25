# Plan: connect `www.duet.edu.pk` to the website

## Goal
Point the public university domain to the published website, while keeping the backend/admin system on the existing Lovable-hosted app.

## What I verified
- `duet.edu.pk` uses HosterPK nameservers, so the DNS changes belong in the provided cPanel.
- `duet.edu.pk` currently has two A records: the Lovable IP `185.158.133.1` and an old HostPK IP `64.31.25.146`.
- `_lovable.duet.edu.pk` already has a Lovable verification TXT record.
- `www.duet.edu.pk` currently points through a CNAME toward the existing published app host.
- `www.duet.edu.pk` is not yet connected as a custom domain on this Lovable project.

## Steps after approval
1. Sign in to the provided cPanel URL using the credentials you sent. I will not print or repeat the password.
2. Open the DNS Zone Editor for `duet.edu.pk`.
3. Clean up the root domain record:
   - Remove the old/conflicting A record pointing to `64.31.25.146`.
   - Keep or add the A record for `duet.edu.pk` pointing to `185.158.133.1`.
4. Configure `www.duet.edu.pk` for the website:
   - Prefer the Lovable-required DNS record shown in the domain setup flow.
   - If the setup flow asks for A records, set `www` to `185.158.133.1`.
   - If it accepts/provides a CNAME flow, keep/update the `www` CNAME exactly as instructed there.
5. Preserve the existing `_lovable` TXT verification record unless Lovable provides a newer value.
6. Add/connect both domains in Lovable if they are not already present:
   - `duet.edu.pk`
   - `www.duet.edu.pk`
7. Set `www.duet.edu.pk` as the primary domain if you want visitors to land on the `www` version.
8. Verify DNS propagation, domain status, HTTPS/SSL, and that the homepage loads correctly on the final URL.

## Important notes
- DNS propagation can take minutes to several hours, and sometimes up to 72 hours.
- I will not change email-related DNS records such as MX, SPF, DKIM, or DMARC.
- I will not move `/admin`; staff login/content editing stays on the existing Lovable-hosted URL as previously requested.
