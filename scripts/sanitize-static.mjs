/**
 * Post-build pass for the static export (dist/client).
 *
 * The prerendered bundles carry a handful of build-platform identifiers
 * (globals, storage keys, preview host checks). None are needed on the
 * self-hosted static site, so they are renamed to neutral app-specific names
 * and the staff-only chunks are dropped. Dev/preview builds are untouched.
 */
import { readdir, readFile, writeFile, stat, rm } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ROOT = "dist/client";
const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".json", ".txt", ".map", ".xml", ".webmanifest"]);
const BRAND = /lovable/gi;
const REPLACEMENT = (match) => (match[0] === "L" ? "Duetapp" : "duetapp");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

const files = await walk(ROOT);

// 1. Drop staff-only chunks: /auth and /admin are served from the app host.
let removed = 0;
for (const file of files) {
  const name = basename(file);
  if (/^(auth|admin)[.-][A-Za-z0-9_-]+\.(js|css)$/.test(name)) {
    await rm(file);
    removed += 1;
  }
}

// 2. Rename platform identifiers inside text assets.
let rewritten = 0;
for (const file of files) {
  if (!TEXT_EXT.has(extname(file))) continue;
  try {
    await stat(file);
  } catch {
    continue; // removed above
  }
  const source = await readFile(file, "utf8");
  if (!BRAND.test(source)) continue;
  BRAND.lastIndex = 0;
  await writeFile(file, source.replace(BRAND, REPLACEMENT));
  rewritten += 1;
}

console.log(`[sanitize-static] rewrote ${rewritten} file(s), removed ${removed} staff chunk(s)`);
