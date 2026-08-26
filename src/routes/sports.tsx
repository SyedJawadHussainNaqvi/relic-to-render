import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sports — DUET Karachi" },
      { name: "description", content: "The primary function of any university is, off course, academic, but university recognizes the importance & value for development of physical skills and fo" },
      { property: "og:title", content: "Sports — DUET Karachi" },
      { property: "og:description", content: "The primary function of any university is, off course, academic, but university recognizes the importance & value for development of physical skills and fo" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/sports" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/sports" }],
  }),
  component: () => <ArchivedPage path="/sports" />,
});
