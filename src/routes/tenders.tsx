import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/tenders")({
  head: () => ({
    meta: [
      { title: "Tenders — DUET Karachi" },
      { name: "description", content: "Tenders at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Tenders — DUET Karachi" },
      { property: "og:description", content: "Tenders at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/tenders" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/tenders" }],
  }),
  component: () => <ArchivedPage path="/tenders" />,
});
