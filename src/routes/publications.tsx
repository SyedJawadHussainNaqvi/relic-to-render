import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Research Publications — DUET Karachi" },
      { name: "description", content: "Peer-reviewed research publications by DUET Karachi faculty in engineering, energy, materials and applied sciences." },
      { property: "og:title", content: "Research Publications — DUET Karachi" },
      { property: "og:description", content: "Peer-reviewed research publications by DUET Karachi faculty in engineering, energy, materials and applied sciences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/publications" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/publications" }],
  }),
  component: () => <ArchivedPage path="/publications" />,
});
