import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { registerCmsUser, verifyCmsSession } from "@/lib/cms-access.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — DUET Karachi" },
      {
        name: "description",
        content:
          "Sign in to manage the Dawood University of Engineering & Technology website content: homepage slider, news and navigation.",
      },
      { property: "og:title", content: "Staff Sign In — DUET Karachi" },
      { property: "og:description", content: "Content management sign in for DUET Karachi staff." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const NOT_ALLOWED =
  "This email is not authorised for CMS access. Contact the university administrator.";

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const register = useServerFn(registerCmsUser);
  const verifySession = useServerFn(verifyCmsSession);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /** Signs the session out unless the account is on the CMS allowlist. */
  async function gateSession(): Promise<boolean> {
    try {
      const result = await verifySession({ data: undefined });
      if (result.allowed) return true;
    } catch {
      // fall through to sign-out below
    }
    await supabase.auth.signOut();
    setError(NOT_ALLOWED);
    return false;
  }

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session || !active) return;
      if (await gateSession()) navigate({ to: "/admin" });
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else if (await gateSession()) {
        await router.invalidate();
        navigate({ to: "/admin" });
      }
    } else {
      try {
        const result = await register({ data: { email, password } });
        if (result.ok) setMessage(result.message);
        else setError(result.message);
      } catch {
        setError("Could not create the account. Please try again.");
      }
    }
    setBusy(false);
  }

  async function google() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    if (await gateSession()) navigate({ to: "/admin" });
  }


  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-2xl font-semibold text-brand">Staff sign in</h1>
      <div className="mt-1 h-1 w-24 bg-accent" />
      <p className="mt-4 text-[14px] text-muted-foreground">
        Sign in to update the homepage slider, news &amp; events and site navigation.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded border border-border bg-card p-6">
        <div>
          <label htmlFor="email" className="block text-[13px] font-semibold text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[13px] font-semibold text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        {error ? <p className="text-[13px] text-destructive">{error}</p> : null}
        {message ? <p className="text-[13px] text-brand">{message}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          onClick={google}
          className="w-full rounded border border-border px-4 py-2 text-sm font-semibold text-brand hover:bg-muted"
        >
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-[13px] text-muted-foreground hover:text-brand"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );
}
