import { supabaseAdmin } from "@/integrations/supabase/client.server";

export function normalizeEmail(email: unknown): string {
  return String(email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
}

/** True when the address is on the CMS allowlist table (service-role read). */
export async function isEmailAllowed(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  const { data, error } = await supabaseAdmin
    .from("cms_allowed_emails")
    .select("email")
    .eq("email", normalized)
    .maybeSingle();
  if (error) throw new Error("Could not verify CMS access. Please try again.");
  return Boolean(data);
}

/** Grants the admin role to an allowlisted user id (idempotent).
 *  Accounts that already hold super_admin are left untouched. */
export async function grantAdminRole(userId: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .in("role", ["admin", "super_admin"])
    .limit(1);
  if (data?.length) return;
  await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
}


/**
 * Creates a confirmed CMS account for an allowlisted address and grants the
 * admin role. Public sign-ups are disabled in auth config, so this is the only
 * registration path — and it refuses anything off the allowlist.
 */
export async function createCmsUser(email: string, password: string) {
  const normalized = normalizeEmail(email);
  if (!(await isEmailAllowed(normalized))) {
    return { ok: false as const, message: "This email is not authorised for CMS access." };
  }
  if (typeof password !== "string" || password.length < 8) {
    return { ok: false as const, message: "Password must be at least 8 characters." };
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: normalized,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    const message = /already|registered|exists/i.test(error?.message ?? "")
      ? "An account already exists for this email. Sign in instead."
      : "Could not create the account. Please try again.";
    return { ok: false as const, message };
  }

  await grantAdminRole(data.user.id);
  return { ok: true as const, message: "Account created. You can sign in now." };
}
