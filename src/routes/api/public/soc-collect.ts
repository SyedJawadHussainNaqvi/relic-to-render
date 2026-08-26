import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { evaluateHeaders } from "@/lib/soc-headers";

/**
 * Scheduled collector: samples the public site for availability, response time
 * and security-header/CSP state, then stores a scan run the dashboard reads.
 * Requires the scheduler's bearer secret — never browsable.
 */
const MONITORED_PATHS = [
  "/",
  "/academics",
  "/admissions",
  "/about-duet/",
  "/news",
  "/results",
  "/downloads",
  "/examinations",
  "/fee-structure",
  "/sitemap.xml",
  "/robots.txt",
];

export const Route = createFileRoute("/api/public/soc-collect")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;

        const target = (process.env["SOC_MONITOR_TARGET"] ?? "https://www.duet.edu.pk").replace(
          /\/$/,
          "",
        );
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const checks: {
          path: string;
          status_code: number | null;
          passed: boolean;
          failures: string[];
          headers: Record<string, string>;
          response_ms: number;
        }[] = [];
        const uptime: {
          target: string;
          path: string;
          status_code: number | null;
          response_ms: number;
          is_up: boolean;
        }[] = [];

        for (const path of MONITORED_PATHS) {
          const started = Date.now();
          try {
            const res = await fetch(`${target}${path}`, { redirect: "follow" });
            const responseMs = Date.now() - started;
            const isHtml = (res.headers.get("content-type") ?? "").includes("text/html");
            const html = isHtml ? await res.text() : null;
            const failures = evaluateHeaders(res.status, res.headers, html);
            checks.push({
              path,
              status_code: res.status,
              passed: failures.length === 0,
              failures,
              headers: Object.fromEntries(res.headers.entries()),
              response_ms: responseMs,
            });
            uptime.push({
              target,
              path,
              status_code: res.status,
              response_ms: responseMs,
              is_up: res.status < 400,
            });
          } catch (error) {
            const responseMs = Date.now() - started;
            checks.push({
              path,
              status_code: null,
              passed: false,
              failures: [`request failed: ${String(error).slice(0, 200)}`],
              headers: {},
              response_ms: responseMs,
            });
            uptime.push({ target, path, status_code: null, response_ms: responseMs, is_up: false });
          }
        }

        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { count: violations } = await supabaseAdmin
          .from("soc_csp_violations")
          .select("id", { count: "exact", head: true })
          .gte("reported_at", since);

        const passed = checks.filter((c) => c.passed).length;
        const { data: run } = await supabaseAdmin
          .from("soc_scan_runs")
          .insert({
            source: "scheduled",
            target,
            finished_at: new Date().toISOString(),
            routes_total: checks.length,
            routes_passed: passed,
            routes_failed: checks.length - passed,
            engines: ["http"],
            csp_violations: violations ?? 0,
            notes: "Automated hourly collector",
          })
          .select("id")
          .single();

        if (run) {
          await supabaseAdmin
            .from("soc_route_checks")
            .insert(checks.map((c) => ({ ...c, run_id: run.id })));
        }
        await supabaseAdmin.from("soc_uptime_samples").insert(uptime);

        return Response.json({
          ok: true,
          target,
          routes_total: checks.length,
          routes_passed: passed,
          routes_failed: checks.length - passed,
        });
      },
    },
  },
});
