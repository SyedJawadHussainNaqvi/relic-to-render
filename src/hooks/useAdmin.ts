import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type State = {
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  email: string | null;
};

/** Roles that unlock the admin panel. super_admin bypasses every gate. */
const ELEVATED = ["admin", "super_admin"] as const;

/**
 * Checks the signed-in user's admin role. Roles are granted server-side only —
 * users can never grant themselves an elevated role.
 */
export function useAdmin(): State {
  const [state, setState] = useState<State>({
    loading: true,
    isAdmin: false,
    isSuperAdmin: false,
    email: null,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        if (active) setState({ loading: false, isAdmin: false, isSuperAdmin: false, email: null });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", [...ELEVATED]);
      const isSuperAdmin = Boolean(roles?.some((r) => r.role === "super_admin"));
      const isAdmin = isSuperAdmin || Boolean(roles?.length);

      if (active) setState({ loading: false, isAdmin, isSuperAdmin, email: user.email ?? null });
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}

