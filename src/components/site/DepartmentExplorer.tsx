import { useCallback, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  departments,
  faculties,
  type DegreeLevel,
  type Department,
} from "@/lib/mockData";

const LEVELS: DegreeLevel[] = ["Undergraduate", "Postgraduate", "PhD"];

const selectClass =
  "w-full rounded border border-border bg-card px-3 py-2 text-[14px] text-foreground focus:border-accent focus:outline-none";

export function DepartmentExplorer() {
  const [query, setQuery] = useState("");
  const [faculty, setFaculty] = useState("all");
  const [level, setLevel] = useState<"all" | DegreeLevel>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return departments.filter((d: Department) => {
      if (faculty !== "all" && d.faculty !== faculty) return false;
      if (level !== "all" && !d.levels.includes(level)) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.programs.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [query, faculty, level]);

  const reset = useCallback(() => {
    setQuery("");
    setFaculty("all");
    setLevel("all");
  }, []);

  return (
    <section aria-labelledby="dept-explorer" className="space-y-5">
      <h2 id="dept-explorer" className="font-display text-xl font-semibold text-brand sm:text-2xl">
        Explore departments &amp; programs
      </h2>

      <div className="grid gap-3 rounded border border-border bg-muted/40 p-4 sm:grid-cols-[1fr_200px_180px]">
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. electrical, machine learning, BE Civil"
            className={selectClass}
            aria-label="Search departments and programs"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Faculty
          </span>
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className={selectClass}
            aria-label="Filter by faculty"
          >
            <option value="all">All faculties</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Degree level
          </span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as "all" | DegreeLevel)}
            className={selectClass}
            aria-label="Filter by degree level"
          >
            <option value="all">All levels</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between text-[13px] text-foreground/70">
        <p>
          Showing <strong>{results.length}</strong> of {departments.length} departments
        </p>
        <button type="button" onClick={reset} className="text-brand underline hover:text-accent-strong">
          Reset filters
        </button>
      </div>

      {results.length === 0 ? (
        <p className="rounded border border-dashed border-border p-6 text-center text-[14px] text-foreground/70">
          No departments match your filters. Try a broader search.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {results.map((d) => (
            <li key={d.id} className="rounded border border-border bg-card p-4">
              <h3 className="font-display text-[16px] font-semibold text-brand">{d.name}</h3>
              <p className="mt-0.5 text-[12.5px] uppercase tracking-wide text-accent-strong">
                {d.faculty}
              </p>
              <p className="mt-2 text-[14px] leading-6 text-foreground/85">{d.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {d.programs.map((p) => (
                  <li
                    key={p}
                    className="rounded bg-muted px-2 py-0.5 text-[12px] text-foreground/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-foreground/70">
                Approx. annual intake: {d.intake} seats
              </p>
              <Link
                to="/faculty-departments"
                className="mt-3 inline-block text-[13.5px] font-semibold text-brand hover:text-accent-strong"
              >
                Department details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
