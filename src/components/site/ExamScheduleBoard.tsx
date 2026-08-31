import { useCallback, useMemo, useState } from "react";
import {
  departments,
  examSchedules,
  type DegreeLevel,
  type ExamSession,
} from "@/lib/mockData";

const inputClass =
  "w-full rounded border border-border bg-card px-3 py-2 text-[14px] text-foreground focus:border-accent focus:outline-none";

const LEVELS: DegreeLevel[] = ["Undergraduate", "Postgraduate", "PhD"];
const SESSIONS: ExamSession[] = ["Fall", "Spring"];

const deptName = (id: string) => departments.find((d) => d.id === id)?.name ?? id;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export function ExamScheduleBoard() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [level, setLevel] = useState<"all" | DegreeLevel>("all");
  const [session, setSession] = useState<"all" | ExamSession>("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return examSchedules
      .filter((e) => {
        if (dept !== "all" && e.departmentId !== dept) return false;
        if (level !== "all" && e.level !== level) return false;
        if (session !== "all" && e.session !== session) return false;
        if (!q) return true;
        return (
          e.course.toLowerCase().includes(q) ||
          e.code.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [query, dept, level, session]);

  const reset = useCallback(() => {
    setQuery("");
    setDept("all");
    setLevel("all");
    setSession("all");
  }, []);

  return (
    <section aria-labelledby="exam-board" className="space-y-5">
      <h2 id="exam-board" className="font-display text-xl font-semibold text-brand sm:text-2xl">
        Examination schedule
      </h2>

      <div className="grid gap-3 rounded border border-border bg-muted/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Search course
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Course title, code or venue"
            className={inputClass}
            aria-label="Search examination schedule"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Department
          </span>
          <select value={dept} onChange={(e) => setDept(e.target.value)} className={inputClass} aria-label="Filter schedule by department">
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Level
          </span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as "all" | DegreeLevel)}
            className={inputClass}
            aria-label="Filter schedule by degree level"
          >
            <option value="all">All levels</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
            Session
          </span>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value as "all" | ExamSession)}
            className={inputClass}
            aria-label="Filter schedule by session"
          >
            <option value="all">All sessions</option>
            {SESSIONS.map((s) => (
              <option key={s} value={s}>
                {s} semester
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between text-[13px] text-foreground/70">
        <p>
          <strong>{rows.length}</strong> paper{rows.length === 1 ? "" : "s"} listed
        </p>
        <button type="button" onClick={reset} className="text-brand underline hover:text-accent-strong">
          Reset filters
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="rounded border border-dashed border-border p-6 text-center text-[14px] text-foreground/70">
          No papers match the selected filters.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-border">
          <table className="w-full border-collapse text-left text-[13.5px]">
            <thead className="bg-brand text-white">
              <tr>
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 font-semibold">Course</th>
                <th className="px-3 py-2 font-semibold">Code</th>
                <th className="px-3 py-2 font-semibold">Department</th>
                <th className="px-3 py-2 font-semibold">Sem.</th>
                <th className="px-3 py-2 font-semibold">Timing</th>
                <th className="px-3 py-2 font-semibold">Venue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-t border-border odd:bg-card even:bg-muted/40">
                  <td className="whitespace-nowrap px-3 py-2">{formatDate(e.date)}</td>
                  <td className="px-3 py-2">{e.course}</td>
                  <td className="whitespace-nowrap px-3 py-2">{e.code}</td>
                  <td className="px-3 py-2">{deptName(e.departmentId)}</td>
                  <td className="px-3 py-2">{e.semester}</td>
                  <td className="whitespace-nowrap px-3 py-2">{e.time}</td>
                  <td className="px-3 py-2">{e.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-[12.5px] text-foreground/60">
        Provisional schedule maintained by the Controller of Examinations. Always confirm against the
        notice issued for your session.
      </p>
    </section>
  );
}
