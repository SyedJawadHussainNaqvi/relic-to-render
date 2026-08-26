import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni — DUET Karachi" },
      { name: "description", content: "Alumni at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Alumni — DUET Karachi" },
      { property: "og:description", content: "Alumni at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/alumni" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/alumni" }],
  }),
  component: () => <ArchivedPage path="/alumni" />,
});
