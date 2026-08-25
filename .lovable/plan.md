# Plan: Get `www.duet.edu.pk` working

## Current issue
The project is published, but `www.duet.edu.pk` is not connected as a custom domain in Lovable yet. DNS can point correctly and still not work until the domain is added in Lovable so SSL and routing can be provisioned.

## What to do next
1. Open Lovable Project Settings.
2. Go to Project section → Domains.
3. Click Connect Domain.
4. Add `www.duet.edu.pk`.
5. Also add `duet.edu.pk` if you want the root domain to work too.
6. Follow the setup flow until the domain status becomes Verifying or Setting up.
7. Wait for SSL provisioning. This can take a few minutes, but DNS propagation can take up to 72 hours.
8. Set the preferred domain as Primary, usually `www.duet.edu.pk`, so the other domain redirects to it.

## DNS records expected
The DNS records should remain:

```text
duet.edu.pk       A    185.158.133.1
www.duet.edu.pk   A    185.158.133.1
```

Do not delete MX, SPF, DKIM, DMARC, or other email records.

## If it still does not work after connecting
- Check whether Lovable shows Action required, Verifying, Setting up, Failed, Offline, or Active.
- If it says Failed, click Retry after DNS has fully propagated.
- If it says Offline, re-check DNS records in cPanel.
- If it says Verifying, wait longer unless it has been more than 72 hours.
