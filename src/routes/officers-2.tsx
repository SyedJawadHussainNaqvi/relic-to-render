import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/officers-2")({
  head: () => ({
    meta: [
      { title: "Officers — DUET Karachi" },
      { name: "description", content: "Officers at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Officers — DUET Karachi" },
      { property: "og:description", content: "Officers at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/officers-2" },
    ],
    links: [{ rel: "canonical", href: "/officers-2" }],
  }),
  component: () => <ArchivedPage path="/officers-2" />,
});
