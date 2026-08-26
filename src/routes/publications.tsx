import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — DUET Karachi" },
      { name: "description", content: "Research Publicaitons (2022)" },
      { property: "og:title", content: "Publications — DUET Karachi" },
      { property: "og:description", content: "Research Publicaitons (2022)" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/publications" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/publications" }],
  }),
  component: () => <ArchivedPage path="/publications" />,
});
