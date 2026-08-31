import { memo } from "react";
import { PORTALS } from "@/lib/mockData";

export type PortalKey = keyof typeof PORTALS;

const META: Record<PortalKey, { title: string; description: string; cta: string }> = {
  admissions: {
    title: "Online Admissions Portal",
    description: "Create an account, submit your application and track your merit status.",
    cta: "Apply online",
  },
  student: {
    title: "DUET Student Portal",
    description: "Enrolment, attendance, semester results, transcripts and fee challans.",
    cta: "Open student portal",
  },
  library: {
    title: "Central Library",
    description: "Catalogue search, HEC digital library, journals and e-books.",
    cta: "Visit library",
  },
};

export const PortalCta = memo(function PortalCta({
  portals,
  heading = "Quick access portals",
}: {
  portals: PortalKey[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="portal-cta" className="space-y-4">
      <h2 id="portal-cta" className="font-display text-xl font-semibold text-brand sm:text-2xl">
        {heading}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {portals.map((key) => {
          const meta = META[key];
          const url = PORTALS[key];
          return (
            <li key={key} className="flex flex-col rounded border border-border bg-card p-4">
              <h3 className="font-display text-[15.5px] font-semibold text-brand">{meta.title}</h3>
              <p className="mt-1 flex-1 text-[13.5px] leading-6 text-foreground/80">
                {meta.description}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded bg-brand px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {meta.cta}
              </a>
              <span className="mt-1.5 break-all text-[11.5px] text-foreground/55">{url}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
});
