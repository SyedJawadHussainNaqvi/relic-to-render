import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/annual-report")({
  head: () => ({
    meta: [
      { title: "Budget — DUET Karachi" },
      { name: "description", content: "Budget at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Budget — DUET Karachi" },
      { property: "og:description", content: "Budget at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/annual-report" },
    ],
    links: [{ rel: "canonical", href: "/annual-report" }],
  }),
  component: () => <ArchivedPage path="/annual-report" />,
});
