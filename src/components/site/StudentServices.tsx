import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { studentServices } from "@/lib/mockData";

export function StudentServices() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return studentServices;
    return studentServices.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section aria-labelledby="student-services" className="space-y-5">
      <h2
        id="student-services"
        className="font-display text-xl font-semibold text-brand sm:text-2xl"
      >
        Student services
      </h2>

      <label className="block max-w-md">
        <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
          Find a service
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. hostel, transport, scholarship"
          className="w-full rounded border border-border bg-card px-3 py-2 text-[14px] text-foreground focus:border-accent focus:outline-none"
          aria-label="Search student services"
        />
      </label>

      {results.length === 0 ? (
        <p className="rounded border border-dashed border-border p-6 text-center text-[14px] text-foreground/70">
          No service matches that search.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((s) => (
            <li key={s.title} className="flex flex-col rounded border border-border bg-card p-4">
              <h3 className="font-display text-[15px] font-semibold text-brand">{s.title}</h3>
              <p className="mt-1 flex-1 text-[13.5px] leading-6 text-foreground/80">
                {s.description}
              </p>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[13.5px] font-semibold text-brand hover:text-accent-strong"
                >
                  Open →
                </a>
              ) : s.to ? (
                <Link
                  to={s.to}
                  className="mt-3 text-[13.5px] font-semibold text-brand hover:text-accent-strong"
                >
                  View →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
