import { Link } from "@tanstack/react-router";
import { memo } from "react";

export const UnderConstruction = memo(function UnderConstruction({
  title = "Page Under Construction",
  path,
}: {
  title?: string;
  path?: string;
}) {
  return (
    <main className="mx-auto flex max-w-[900px] flex-col items-center px-4 py-16 text-center">
      <span className="rounded-full bg-muted px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-accent-strong">
        Coming soon
      </span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-brand sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-foreground/80">
        This section of the Dawood University of Engineering &amp; Technology website is being
        prepared. Nothing is broken — the content is simply not published yet.
        {path ? (
          <>
            {" "}
            Requested address: <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">{path}</code>
          </>
        ) : null}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          to="/"
          className="rounded bg-brand px-4 py-2 text-[14px] font-semibold text-white hover:bg-brand-dark"
        >
          Go to homepage
        </Link>
        <Link
          to="/contacts"
          className="rounded border border-border bg-card px-4 py-2 text-[14px] font-semibold text-brand hover:border-accent"
        >
          Contact the university
        </Link>
      </div>
      <ul className="mt-8 grid w-full gap-2 text-left sm:grid-cols-3">
        {[
          { to: "/academics", label: "Academics" },
          { to: "/admissions", label: "Admissions" },
          { to: "/examinations", label: "Examinations" },
          { to: "/research", label: "Research" },
          { to: "/students", label: "Students" },
          { to: "/about", label: "About DUET" },
        ].map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="block rounded border border-border bg-card px-4 py-3 text-[14px] text-brand hover:border-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
});
