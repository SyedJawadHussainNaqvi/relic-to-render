import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { researchCentres } from "@/lib/mockData";

const URL = "https://www.duet.edu.pk/research";
const TITLE = "Research, Innovation & Commercialisation — DUET Karachi";
const DESCRIPTION =
  "Research at DUET Karachi — ORIC, CEMET, the Business Incubation Centre, funded projects, publications, HEC approved PhD supervisors and research policies.";

const LINKS = [
  { to: "/office-of-research-innovation-commercialisation", label: "ORIC" },
  { to: "/projects", label: "Funded Projects" },
  { to: "/publications", label: "Publications" },
  { to: "/journal", label: "DUET Research Journal" },
  { to: "/funding-agencies", label: "Funding Agencies" },
  { to: "/hec-approved-phd-supervisors", label: "HEC Approved PhD Supervisors" },
  { to: "/research-ethics-policy", label: "Research Ethics Policy" },
  { to: "/plagiarism-policy", label: "Plagiarism Policy" },
  { to: "/conference-seminars", label: "Conferences & Seminars" },
  { to: "/seminars-workshops", label: "Seminars & Workshops" },
  { to: "/duet-cemet", label: "CEMET" },
  { to: "/business-incubation-center", label: "Business Incubation Centre" },
];

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <PageHero
        title="Research & Innovation"
        subtitle="DUET Karachi supports applied research that serves Sindh's industry — energy, materials, water, environment, manufacturing and digital systems."
      />
      <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-10">
        <section className="space-y-4">
          <SectionHeading>Research centres &amp; offices</SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2">
            {researchCentres.map((c) => (
              <li key={c.id} className="rounded border border-border bg-card p-4">
                <h3 className="font-display text-[16px] font-semibold text-brand">{c.name}</h3>
                <p className="mt-2 text-[14px] leading-6 text-foreground/85">{c.focus}</p>
                <p className="mt-2 text-[13px] text-foreground/70">Lead: {c.lead}</p>
                <p className="text-[13px] text-foreground/70">
                  Active / completed funded projects: {c.fundedProjects}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <SectionHeading>Research resources</SectionHeading>
          <ul className="grid gap-2 sm:grid-cols-3">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block rounded border border-border bg-card px-4 py-3 text-[14.5px] text-brand hover:border-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
