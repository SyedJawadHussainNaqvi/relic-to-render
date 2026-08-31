import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { FacultyDirectory } from "@/components/site/FacultyDirectory";
import { faculties, universityFacts } from "@/lib/mockData";

const URL = "https://www.duet.edu.pk/about";
const TITLE = "About Dawood University of Engineering & Technology, Karachi";
const DESCRIPTION =
  "About DUET Karachi — history since 1962, vision and mission, leadership, faculties, departments and the faculty directory of Dawood University of Engineering & Technology.";

const QUICK_LINKS = [
  { to: "/about-duet/historic-profile", label: "Historic Profile" },
  { to: "/about-duet/vision-mission", label: "Vision & Mission" },
  { to: "/vice-chancellors-message-2", label: "Vice Chancellor's Message" },
  { to: "/authorities", label: "Authorities" },
  { to: "/officers-2", label: "Officers" },
  { to: "/organogram", label: "Organogram" },
  { to: "/university-linkages", label: "University Linkages" },
  { to: "/annual-report", label: "Annual Report" },
  { to: "/university-policies", label: "University Policies" },
];

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        title="About DUET"
        subtitle="Dawood University of Engineering & Technology is a public sector engineering university on New M. A. Jinnah Road, Karachi, serving Sindh since 1962."
      />
      <div className="mx-auto max-w-[1200px] space-y-12 px-4 py-10">
        <section className="space-y-4">
          <SectionHeading>Who we are</SectionHeading>
          <p className="text-[15px] leading-7 text-foreground/90">
            Founded in 1962 as Dawood College of Engineering &amp; Technology and chartered as a
            university in 2013, DUET Karachi delivers Pakistan Engineering Council accredited
            undergraduate and postgraduate degrees across engineering, technology, information
            technology, architecture and management sciences. The campus combines teaching
            laboratories, research centres and industry linkages that keep our graduates directly
            employable across Karachi's industrial base.
          </p>
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {universityFacts.map((f) => (
              <li key={f.label} className="rounded border border-border bg-card p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-accent-strong">
                  {f.label}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-brand">{f.value}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <SectionHeading>Faculties</SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {faculties.map((f) => (
              <li key={f} className="rounded border border-border bg-card px-4 py-3 text-[14.5px] text-brand">
                {f}
              </li>
            ))}
          </ul>
        </section>

        <FacultyDirectory />

        <section className="space-y-4">
          <SectionHeading>Governance &amp; documents</SectionHeading>
          <ul className="grid gap-2 sm:grid-cols-3">
            {QUICK_LINKS.map((l) => (
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
