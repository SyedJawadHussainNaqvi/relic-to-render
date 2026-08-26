import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/industrial-liasons-alumni-affairs")({
  head: () => ({
    meta: [
      { title: "Industrial Liasons & Alumni Affairs — DUET Karachi" },
      { name: "description", content: "Directorate of Industrial Liaison & Alumni Affairs is been working on its full pace since its inception and have achieved major milestones till now. Direct" },
      { property: "og:title", content: "Industrial Liasons & Alumni Affairs — DUET Karachi" },
      { property: "og:description", content: "Directorate of Industrial Liaison & Alumni Affairs is been working on its full pace since its inception and have achieved major milestones till now. Direct" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/industrial-liasons-alumni-affairs" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/industrial-liasons-alumni-affairs" }],
  }),
  component: () => <ArchivedPage path="/industrial-liasons-alumni-affairs" />,
});
