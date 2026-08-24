import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — DUET Karachi" },
      { name: "description", content: "Results at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Results — DUET Karachi" },
      { property: "og:description", content: "Results at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/results" },
    ],
    links: [{ rel: "canonical", href: "/results" }],
  }),
  component: () => <ArchivedPage path="/results" />,
});
