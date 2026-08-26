import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Content-Security-Policy violation sink. Accepts the browser report formats,
 * validates them strictly and stores a capped-size row. No data is returned.
 */
const legacy = z.object({
  "csp-report": z.object({
    "document-uri": z.string().max(500).optional(),
    "violated-directive": z.string().max(200).optional(),
    "effective-directive": z.string().max(200).optional(),
    "blocked-uri": z.string().max(500).optional(),
    "source-file": z.string().max(500).optional(),
    "line-number": z.number().int().nonnegative().optional(),
  }),
});

const modern = z.array(
  z.object({
    type: z.string().max(50).optional(),
    body: z
      .object({
        documentURL: z.string().max(500).optional(),
        effectiveDirective: z.string().max(200).optional(),
        blockedURL: z.string().max(500).optional(),
        sourceFile: z.string().max(500).optional(),
        lineNumber: z.number().int().nonnegative().optional(),
      })
      .optional(),
  }),
);

type Row = {
  document_uri: string | null;
  violated_directive: string | null;
  effective_directive: string | null;
  blocked_uri: string | null;
  source_file: string | null;
  line_number: number | null;
  user_agent: string | null;
};

function normalise(payload: unknown, userAgent: string | null): Row[] {
  const one = legacy.safeParse(payload);
  if (one.success) {
    const r = one.data["csp-report"];
    return [
      {
        document_uri: r["document-uri"] ?? null,
        violated_directive: r["violated-directive"] ?? null,
        effective_directive: r["effective-directive"] ?? null,
        blocked_uri: r["blocked-uri"] ?? null,
        source_file: r["source-file"] ?? null,
        line_number: r["line-number"] ?? null,
        user_agent: userAgent,
      },
    ];
  }
  const many = modern.safeParse(payload);
  if (!many.success) return [];
  return many.data
    .filter((entry) => entry.body)
    .slice(0, 20)
    .map((entry) => ({
      document_uri: entry.body?.documentURL ?? null,
      violated_directive: entry.body?.effectiveDirective ?? null,
      effective_directive: entry.body?.effectiveDirective ?? null,
      blocked_uri: entry.body?.blockedURL ?? null,
      source_file: entry.body?.sourceFile ?? null,
      line_number: entry.body?.lineNumber ?? null,
      user_agent: userAgent,
    }));
}

export const Route = createFileRoute("/api/public/csp-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        // Cheap flood guard: ignore oversized bodies outright.
        if (raw.length > 20_000) return new Response(null, { status: 413 });

        let payload: unknown;
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response(null, { status: 204 });
        }

        const rows = normalise(payload, request.headers.get("user-agent")?.slice(0, 300) ?? null);
        if (rows.length) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("soc_csp_violations").insert(rows);
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
