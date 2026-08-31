import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

/**
 * One-shot provisioning endpoint for the super administrator account.
 *
 * Requires the operator bearer secret (LOVABLE_CRON_SECRET) — it is never
 * browsable and cannot be reached from the site. It creates (or re-keys)
 * admin@duet.edu.pk, grants the super_admin role and returns the generated
 * password exactly once in the response, which is also written to the server
 * console. The password is not persisted by the app.
 */
export const Route = createFileRoute("/api/public/provision-super-admin")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;

        const { provisionSuperAdmin } = await import("@/lib/super-admin.server");
        try {
          const result = await provisionSuperAdmin();
          console.log(
            `[provision] super_admin ${result.created ? "created" : "password reset"}\n` +
              `  email:    ${result.email}\n` +
              `  password: ${result.password}\n` +
              `  (shown once — store it in a password manager now)`,
          );
          return Response.json(
            {
              ok: true,
              email: result.email,
              password: result.password,
              role: "super_admin",
              created: result.created,
              notice: "Password shown once. Store it securely and change it after first sign-in.",
            },
            { headers: { "cache-control": "no-store" } },
          );
        } catch (error) {
          console.error("[provision] failed", error);
          return Response.json({ ok: false, message: "Provisioning failed." }, { status: 500 });
        }
      },
    },
  },
});
