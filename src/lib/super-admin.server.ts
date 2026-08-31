import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { normalizeEmail } from "./cms-access.server";

export const SUPER_ADMIN_EMAIL = "admin@duet.edu.pk";

/** Cryptographically random, high-entropy password (mixed alphabet, ~150 bits). */
function generatePassword(length = 28): string {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[bytes[i]! % alphabet.length];
  }
  return out;
}

/** Ensures the address can use the CMS sign-in gate. */
async function ensureAllowlisted(email: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from("cms_allowed_emails")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (!data) {
    await supabaseAdmin
      .from("cms_allowed_emails")
      .insert({ email, note: "Super administrator" });
  }
}

async function grantSuperAdmin(userId: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "super_admin")
    .maybeSingle();
  if (!data) {
    await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "super_admin" });
  }
}

async function findUserByEmail(email: string): Promise<{ id: string } | null> {
  // Paginate the admin user list; the project has a tiny staff-only user base.
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error("Could not read the user directory.");
    const match = data.users.find((u) => normalizeEmail(u.email) === email);
    if (match) return { id: match.id };
    if (data.users.length < 200) break;
  }
  return null;
}

/**
 * Provisions (or re-keys) the super administrator account and returns the
 * freshly generated password ONCE. The password is never stored anywhere by the
 * app — the caller must record it immediately.
 */
export async function provisionSuperAdmin(): Promise<{
  email: string;
  password: string;
  created: boolean;
  userId: string;
}> {
  const email = normalizeEmail(SUPER_ADMIN_EMAIL);
  const password = generatePassword();
  await ensureAllowlisted(email);

  const existing = await findUserByEmail(email);
  if (existing) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) throw new Error("Could not reset the super admin password.");
    await grantSuperAdmin(existing.id);
    return { email, password, created: false, userId: existing.id };
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) throw new Error("Could not create the super admin account.");
  await grantSuperAdmin(data.user.id);
  return { email, password, created: true, userId: data.user.id };
}
