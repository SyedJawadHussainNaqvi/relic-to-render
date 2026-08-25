# Hosting the DUET site on Hostinger

The site is a server-rendered React app (TanStack Start). It needs a running
Node.js process, so it belongs on a **Hostinger VPS** (or any plan with SSH +
Node). Hostinger's shared/Cloud plans in hPanel do not keep Node processes
alive, so `/admin` and staff login cannot work there.

The database, staff accounts and admin panel stay on the managed backend and are
reached over HTTPS. Nothing needs to be migrated.

---

## 1. Build the Node bundle (on your machine)

```bash
npm ci
cp .env.production.example .env          # fill in the real values first
NITRO_PRESET=node-server npm run build
```

Output (verified working):

- `.output/server/index.mjs` — the Node server entry
- `.output/public/` — static assets, served by the same process

The `VITE_*` values must be correct **before** building; they are baked into the
browser bundle.

## 2. Upload

```bash
rsync -avz --delete .output/ root@YOUR_VPS_IP:/var/www/duet/.output/
rsync -avz .env root@YOUR_VPS_IP:/var/www/duet/
```

Or drag the same files into hPanel's File Manager under `/var/www/duet`.

The bundle is self-contained — no `node_modules` and no `npm install` are needed
on the server.

## 3. Install and start (on the VPS)

```bash
ssh root@YOUR_VPS_IP
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs
npm install -g pm2

cd /var/www/duet
pm2 start .output/server/index.mjs --name duet --update-env
pm2 save && pm2 startup
```

Check it: `curl -I http://127.0.0.1:3000` should return `200`.

## 4. Nginx reverse proxy

`/etc/nginx/sites-available/duet`:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_SERVER_LINK;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
ln -s /etc/nginx/sites-available/duet /etc/nginx/sites-enabled/duet
nginx -t && systemctl reload nginx
```

## 5. HTTPS

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d YOUR_DOMAIN
```

Hostinger's temporary server link (`srvXXXXX.hstgr.cloud`) also works for
Certbot, so you can go live before DNS moves.

## 6. Sign-in redirect URLs

Sign-in already redirects back to whatever origin the page is served from, so
no code change is needed. On the new host you must, once:

- add `https://YOUR_HOSTINGER_DOMAIN` to the backend's allowed redirect URLs and
  set it as the site URL (ask me to do this and I'll apply it), and
- add the same origin as an authorised redirect URI in the Google Cloud OAuth
  client if Google sign-in is used.

Until that is done, email confirmation and Google sign-in bounce back to the old
Lovable domain.

## 7. Updating later

Content changes (slider, news, navigation) are made in `/admin` and appear
instantly — no redeploy. Code changes need steps 1–2 again plus:

```bash
pm2 reload duet
```

---

## External links and files

Recovered PDFs and images are served from the asset CDN and keep working from
any host. Nothing about them is tied to the Lovable domain.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Blank page, 500 in `pm2 logs duet` | `.env` missing on the server, or `SUPABASE_URL` unset |
| Pages load but news/slider empty | `VITE_*` values were wrong at build time — rebuild |
| Redirected to the Lovable domain after login | step 6 not done |
| 502 from Nginx | Node process not running (`pm2 status`) or wrong `PORT` |
