import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — DUET Karachi" },
      { name: "description", content: "Journal at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Journal — DUET Karachi" },
      { property: "og:description", content: "Journal at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/journal" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/journal" }],
  }),
  component: () => <ArchivedPage path="/journal" />,
});
