import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/industrial-liasons-alumni-affairs")({
  head: () => ({
    meta: [
      { title: "Industrial Liaison & Alumni Affairs — DUET Karachi" },
      { name: "description", content: "Industry linkages, internships, job placement and alumni engagement led by the Directorate of Industrial Liaison & Alumni Affairs at DUET Karachi." },
      { property: "og:title", content: "Industrial Liaison & Alumni Affairs — DUET Karachi" },
      { property: "og:description", content: "Industry linkages, internships, job placement and alumni engagement led by the Directorate of Industrial Liaison & Alumni Affairs at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/industrial-liasons-alumni-affairs" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/industrial-liasons-alumni-affairs" }],
  }),
  component: () => <ArchivedPage path="/industrial-liasons-alumni-affairs" />,
});
