import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";
import { DepartmentExplorer } from "@/components/site/DepartmentExplorer";
import { FacultyDirectory } from "@/components/site/FacultyDirectory";

const URL = "https://www.duet.edu.pk/academics";
const TITLE = "Academics — DUET Karachi";
const DESCRIPTION =
  "Academics at Dawood University of Engineering & Technology, Karachi — faculties, departments, academic calendar, regulations and outcome-based education.";

export const Route = createFileRoute("/academics")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollegeOrUniversity",
              "@id": "https://www.duet.edu.pk/#university",
              name: "Dawood University of Engineering & Technology",
              alternateName: "DUET Karachi",
              description:
                "Dawood University of Engineering & Technology (DUET) is a public engineering university in Karachi, Sindh, offering undergraduate and postgraduate programmes in engineering, technology and applied sciences.",
              url: "https://www.duet.edu.pk/",
              logo: "https://www.duet.edu.pk/media/duet_logo-300x227.png",
              foundingDate: "1962",
              address: {
                "@type": "PostalAddress",
                streetAddress: "New M. A. Jinnah Road",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                postalCode: "74800",
                addressCountry: "PK",
              },
              department: [
                { "@type": "Organization", name: "Faculty & Departments", url: "https://www.duet.edu.pk/faculty-departments" },
                { "@type": "Organization", name: "Postgraduate Studies", url: "https://www.duet.edu.pk/postgraduate-studies" },
              ],
            },
            {
              "@type": "Organization",
              "@id": "https://www.duet.edu.pk/#organization",
              name: "Dawood University of Engineering & Technology",
              url: "https://www.duet.edu.pk/",
              logo: "https://www.duet.edu.pk/media/duet_logo-300x227.png",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.duet.edu.pk/" },
                { "@type": "ListItem", position: 2, name: "Academics", item: URL },
              ],
            },
            {
              "@type": "WebPage",
              "@id": URL,
              url: URL,
              name: TITLE,
              description: DESCRIPTION,
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://www.duet.edu.pk/#website",
                url: "https://www.duet.edu.pk/",
                name: "Dawood University of Engineering & Technology",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AcademicsPage,
});

function AcademicsPage() {
  return (
    <>
      <ArchivedPage path="/academics" />
      <div className="mx-auto max-w-[1200px] space-y-12 px-4 pb-12">
        <DepartmentExplorer />
        <FacultyDirectory />
      </div>
    </>
  );
});
