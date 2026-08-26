/**
 * Static file server that replays the headers from `public/.htaccess`, so the
 * verification suite checks the exact configuration that ships to Apache.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { createHash } from "node:crypto";
import { parseHtaccessHeaders } from "./headers-config.mjs";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

async function resolveFile(root, pathname) {
  const clean = decodeURIComponent(pathname.split("?")[0]).replace(/\/+$/, "") || "/index.html";
  const candidates = [
    join(root, clean),
    join(root, clean, "index.html"),
    join(root, `${clean}.html`),
    join(root, "index.html"),
  ];
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return { file: candidate, info };
    } catch {
      /* next candidate */
    }
  }
  return null;
}

/** Starts the server and resolves with `{ origin, close }`. */
export async function serveStatic({ root = "dist/client", port = 4399 } = {}) {
  const { global, byPattern } = await parseHtaccessHeaders();

  const server = createServer(async (req, res) => {
    const hit = await resolveFile(root, req.url ?? "/");
    if (!hit) {
      res.writeHead(404).end("Not found");
      return;
    }
    const ext = extname(hit.file);
    const headers = {
      "content-type": MIME[ext] ?? "application/octet-stream",
      "content-length": String(hit.info.size),
      etag: `"${createHash("sha1").update(`${hit.info.mtimeMs}-${hit.info.size}`).digest("hex")}"`,
    };
    for (const [name, value] of Object.entries(global)) headers[name.toLowerCase()] = value;
    for (const rule of byPattern) {
      if (rule.pattern.test(hit.file)) headers[rule.name.toLowerCase()] = rule.value;
    }
    res.writeHead(200, headers);
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(hit.file).pipe(res);
  });

  await new Promise((resolve) => server.listen(port, resolve));
  return {
    origin: `http://localhost:${port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

/** Every path advertised in the built sitemap, plus robots/sitemap themselves. */
export async function sitemapPaths(root = "dist/client") {
  const xml = await readFile(join(root, "sitemap.xml"), "utf8");
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const url = new URL(m[1]);
    return url.pathname;
  });
  return [...new Set(paths)];
}

// CLI: `node scripts/security/serve-static.mjs --port 4401` for manual checks.
if (import.meta.url === `file://${process.argv[1]}`) {
  const portArg = process.argv.indexOf("--port");
  const port = portArg > -1 ? Number(process.argv[portArg + 1]) : 4400;
  const server = await startStaticServer({ port });
  console.log(`[serve-static] ${server.origin}`);
}
