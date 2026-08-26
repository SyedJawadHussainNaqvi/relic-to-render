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

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else {
        await router.invalidate();
        navigate({ to: "/admin" });
      }
    } else {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (err) setError(err.message);
      else setMessage("Account created. If email confirmation is required, check your inbox.");
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
    navigate({ to: "/admin" });
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
