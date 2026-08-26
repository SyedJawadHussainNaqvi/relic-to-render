import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/regulations")({
  head: () => ({
    meta: [
      { title: "Academic Regulations — DUET Karachi" },
      { name: "description", content: "Undergraduate and postgraduate academic regulations, semester rules and examination policies applied at DUET Karachi." },
      { property: "og:title", content: "Academic Regulations — DUET Karachi" },
      { property: "og:description", content: "Undergraduate and postgraduate academic regulations, semester rules and examination policies applied at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/regulations" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/regulations" }],
  }),
  component: () => <ArchivedPage path="/regulations" />,
});
