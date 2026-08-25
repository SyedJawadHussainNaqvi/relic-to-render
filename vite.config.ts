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
//   NITRO_PRESET=static      npm run build  -> prerendered static files in .output/public/
// Unset (Lovable builds) keeps the default Cloudflare target.
const selfHostPreset = process.env["NITRO_PRESET"];
const isStatic = selfHostPreset === "static";

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
  return Array.from(new Set(["/", ...paths]));
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStatic
      ? {
          prerender: { enabled: true, crawlLinks: true },
          pages: publicRoutePaths().map((path) => ({ path, prerender: { enabled: true } })),
        }
      : {}),
  },
  ...(selfHostPreset
    ? {
        nitro: {
          preset: selfHostPreset,
          // The static preset needs nitro's default dirs so the prerender step can
          // boot the build; node-server gets a deterministic .output/ layout.
          ...(isStatic
            ? {}
            : {
                output: {
                  dir: ".output",
                  serverDir: ".output/server",
                  publicDir: ".output/public",
                },
              }),
        },
      }
    : {}),
});
