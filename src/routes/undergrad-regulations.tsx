import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/undergrad-regulations")({
  head: () => ({
    meta: [
      { title: "Undergraduate Semester Regulations — DUET Karachi" },
      { name: "description", content: "Semester system regulations for BE and BS programs at DUET Karachi: credit rules, grading, attendance and promotion criteria." },
      { property: "og:title", content: "Undergraduate Semester Regulations — DUET Karachi" },
      { property: "og:description", content: "Semester system regulations for BE and BS programs at DUET Karachi: credit rules, grading, attendance and promotion criteria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/undergrad-regulations" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/undergrad-regulations" }],
  }),
  component: () => <ArchivedPage path="/undergrad-regulations" />,
});
