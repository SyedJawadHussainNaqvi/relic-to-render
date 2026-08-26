import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const emailSchema = z.object({ email: z.string().trim().email().max(254) });
const credentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
});

/** Is this address allowed to use the CMS? Used for friendly messaging only. */
export const checkCmsEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const { isEmailAllowed } = await import("./cms-access.server");
    return { allowed: await isEmailAllowed(data.email) };
  });

/** Registers a CMS account — allowlisted addresses only. */
export const registerCmsUser = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => credentialsSchema.parse(data))
  .handler(async ({ data }) => {
    const { createCmsUser } = await import("./cms-access.server");
    return createCmsUser(data.email, data.password);
  });

/**
 * Verifies the signed-in account against the allowlist and keeps its admin role
 * in sync. Returns allowed:false for any account that must be signed out.
 */
export const verifyCmsSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { isEmailAllowed, grantAdminRole } = await import("./cms-access.server");
    const email = String((context.claims as { email?: string }).email ?? "");
    if (!(await isEmailAllowed(email))) {
      return { allowed: false as const };
    }
    await grantAdminRole(context.userId);
    return { allowed: true as const };
  });
