import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type State = { loading: boolean; isAdmin: boolean; email: string | null };

/**
 * Checks the signed-in user's admin role. If nobody is an admin yet, the first
 * signed-in user claims the role (database-side guard, one time only).
 */
export function useAdmin(): State {
  const [state, setState] = useState<State>({ loading: true, isAdmin: false, email: null });

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        if (active) setState({ loading: false, isAdmin: false, email: null });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      let isAdmin = Boolean(roles?.length);
      if (!isAdmin) {
        const { data: claimed } = await supabase.rpc("claim_first_admin");
        isAdmin = claimed === true;
      }
      if (active) setState({ loading: false, isAdmin, email: user.email ?? null });
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
