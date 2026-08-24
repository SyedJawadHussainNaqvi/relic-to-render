import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — DUET Karachi" },
      { name: "description", content: "Downloads at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Downloads — DUET Karachi" },
      { property: "og:description", content: "Downloads at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: () => <ArchivedPage path="/downloads" />,
});
