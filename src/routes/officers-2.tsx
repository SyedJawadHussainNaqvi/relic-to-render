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
      { property: "og:url", content: "https://www.duet.edu.pk/officers-2" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/officers-2" }],
  }),
  component: () => <ArchivedPage path="/officers-2" />,
});
