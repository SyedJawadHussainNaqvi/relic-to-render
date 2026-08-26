import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/quality-enhancement-cell")({
  head: () => ({
    meta: [
      { title: "Quality Enhancement cell — DUET Karachi" },
      { name: "description", content: "Quality Assurance (QA) holds an indispensable importance in a world where competition is changing gears every now and then. In an ever-evolving education s" },
      { property: "og:title", content: "Quality Enhancement cell — DUET Karachi" },
      { property: "og:description", content: "Quality Assurance (QA) holds an indispensable importance in a world where competition is changing gears every now and then. In an ever-evolving education s" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/quality-enhancement-cell" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/quality-enhancement-cell" }],
  }),
  component: () => <ArchivedPage path="/quality-enhancement-cell" />,
});
