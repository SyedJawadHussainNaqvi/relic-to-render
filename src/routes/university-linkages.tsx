import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/university-linkages")({
  head: () => ({
    meta: [
      { title: "University Linkages — DUET Karachi" },
      { name: "description", content: "Memorandum of Understanding Between DUET and NED" },
      { property: "og:title", content: "University Linkages — DUET Karachi" },
      { property: "og:description", content: "Memorandum of Understanding Between DUET and NED" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/university-linkages" },
    ],
    links: [{ rel: "canonical", href: "/university-linkages" }],
  }),
  component: () => <ArchivedPage path="/university-linkages" />,
});
