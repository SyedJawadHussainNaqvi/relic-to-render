import { useCallback, useMemo, useState } from "react";
import { departments, facultyProfiles } from "@/lib/mockData";

const inputClass =
  "w-full rounded border border-border bg-card px-3 py-2 text-[14px] text-foreground focus:border-accent focus:outline-none";

const deptName = (id: string) => departments.find((d) => d.id === id)?.name ?? id;

export function FacultyDirectory() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facultyProfiles.filter((m) => {
      if (dept !== "all" && m.departmentId !== dept) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.qualification.toLowerCase().includes(q) ||
        m.interests.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [query, dept]);

  const reset = useCallback(() => {
    setQuery("");
    setDept("all");
  }, []);

  return (
    <section aria-labelledby="faculty-directory" className="space-y-5">
      <h2
        id="faculty-directory"
        className="font-display text-xl font-semibold text-brand sm:text-2xl"
      >
        Faculty directory
      </h2>

      <div className="grid gap-3 rounded border border-border bg-muted/40 p-4 sm:grid-cols-[1fr_260px]">
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Search faculty
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, designation or research interest"
            className={inputClass}
            aria-label="Search faculty members"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Department
          </span>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className={inputClass}
            aria-label="Filter faculty by department"
          >
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between text-[13px] text-foreground/70">
        <p>
          Showing <strong>{results.length}</strong> of {facultyProfiles.length} profiles
        </p>
        <button type="button" onClick={reset} className="text-brand underline hover:text-accent-strong">
          Reset
        </button>
      </div>

      {results.length === 0 ? (
        <p className="rounded border border-dashed border-border p-6 text-center text-[14px] text-foreground/70">
          No faculty profiles match your search.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {results.map((m) => (
            <li key={m.id} className="rounded border border-border bg-card p-4">
              <h3 className="font-display text-[15.5px] font-semibold text-brand">{m.name}</h3>
              <p className="text-[13px] text-accent-strong">{m.designation}</p>
              <p className="mt-1 text-[13.5px] text-foreground/80">{deptName(m.departmentId)}</p>
              <p className="mt-2 text-[13.5px] text-foreground/75">{m.qualification}</p>
              <p className="mt-2 text-[13px] text-foreground/70">
                Interests: {m.interests.join(", ")}
              </p>
              <a
                href={`mailto:${m.email}`}
                className="mt-2 inline-block text-[13px] font-semibold text-brand hover:text-accent-strong"
              >
                {m.email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
