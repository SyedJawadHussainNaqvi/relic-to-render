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
      { property: "og:url", content: "/alumni" },
    ],
    links: [{ rel: "canonical", href: "/alumni" }],
  }),
  component: () => <ArchivedPage path="/alumni" />,
});
