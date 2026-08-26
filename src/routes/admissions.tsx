import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

const URL = "https://www.duet.edu.pk/admissions";
const TITLE = "Admissions — DUET Karachi";
const DESCRIPTION =
  "Admissions at Dawood University of Engineering & Technology, Karachi — eligibility, application process, fee structure and admission schedule for undergraduate and postgraduate programs.";

export const Route = createFileRoute("/admissions")({
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
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "admissions",
                  url: "https://admissions.duet.edu.pk/",
                  areaServed: "PK",
                  availableLanguage: ["en", "ur"],
                },
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
                { "@type": "ListItem", position: 2, name: "Admissions", item: URL },
              ],
            },
            {
              "@type": "WebPage",
              "@id": URL,
              url: URL,
              name: TITLE,
              description: DESCRIPTION,
              isPartOf: { "@id": "https://www.duet.edu.pk/#university" },
              significantLink: "https://admissions.duet.edu.pk/",
            },
          ],
        }),
      },
    ],
  }),
  component: () => <ArchivedPage path="/admissions" />,
});
