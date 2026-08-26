import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="font-display text-xl font-semibold text-brand">Admin panel error</h1>
      <p className="mt-2 text-[14px] text-muted-foreground">{error.message}</p>
    </main>
  ),
});

const tabs = [
  { to: "/admin", label: "Slider", exact: true },
  { to: "/admin/news", label: "News & Events" },
  { to: "/admin/navigation", label: "Navigation" },
  { to: "/admin/soc", label: "Security & SOC" },
] as const;

function AdminLayout() {
  const { loading, isAdmin, email } = useAdmin();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand">Content manager</h1>
          <div className="mt-1 h-1 w-24 bg-accent" />
          <p className="mt-3 text-[13px] text-muted-foreground">
            Signed in as {email ?? "…"} — changes go live on the website immediately.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/"
            className="rounded border border-border px-3 py-1.5 text-[13px] font-semibold text-brand hover:bg-muted"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded border border-border px-3 py-1.5 text-[13px] font-semibold text-brand hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-[14px] text-muted-foreground">Checking your permissions…</p>
      ) : !isAdmin ? (
        <div className="mt-10 rounded border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold text-brand">No admin access</h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Your account is signed in but does not have the admin role. Ask an existing
            administrator to grant it.
          </p>
        </div>
      ) : (
        <>
          <nav className="mt-8 flex flex-wrap gap-2 border-b border-border pb-2">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: Boolean("exact" in t && t.exact) }}
                className="rounded px-3 py-1.5 text-[13px] font-semibold text-brand hover:bg-muted"
                activeProps={{ className: "bg-brand text-white hover:bg-brand-dark" }}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <Outlet />
          </div>
        </>
      )}
    </main>
  );
}
