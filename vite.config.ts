// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readdirSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Self-hosting:
//   NITRO_PRESET=node-server npm run build  -> plain Node server bundle in .output/
//   npm run build:static                    -> prerendered static HTML in .output/public/
// Unset (Lovable builds) keeps the default Cloudflare target.
const selfHostPreset = process.env["NITRO_PRESET"];
const prerenderAll = process.env["PRERENDER"] === "1";

/** Public route paths derived from src/routes, used as prerender entry points. */
function publicRoutePaths(): string[] {
  const skip = /^(__root|_authenticated|auth|api)/;
  const paths = readdirSync("src/routes")
    .filter((f) => /\.tsx$/.test(f) && !skip.test(f))
    .map((f) =>
      "/" +
      f
        .replace(/\.tsx$/, "")
        .split(".")
        .filter((seg) => seg !== "index")
        .join("/"),
    )
    .map((p) => (p === "/" ? "/" : p.replace(/\/$/, "")));
  // /sitemap.xml is a server route; prerendering it emits a static file for static hosts.
  return Array.from(new Set(["/", "/sitemap.xml", ...paths]));
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    // The prerender/preview server resolves the default entry name, so the
    // custom SSR error wrapper is only wired up for server builds.
    server: { entry: "server" },
    ...(prerenderAll
      ? {
          prerender: { enabled: true, crawlLinks: false },
          pages: publicRoutePaths().map((path) => ({ path, prerender: { enabled: true } })),
        }
      : {}),
  },
  // Static export: no deploy adapter, plain vite build + prerender to dist/client.
  ...(prerenderAll ? { nitro: false as const } : {}),
  ...(selfHostPreset && !prerenderAll
    ? {
        nitro: {
          preset: selfHostPreset,
          output: {
            dir: ".output",
            serverDir: ".output/server",
            publicDir: ".output/public",
          },
        },
      }
    : {}),
});
