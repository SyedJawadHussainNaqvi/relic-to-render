import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "CAREERS — DUET Karachi" },
      { name: "description", content: "CAREERS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "CAREERS — DUET Karachi" },
      { property: "og:description", content: "CAREERS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/careers" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/careers" }],
  }),
  component: () => <ArchivedPage path="/careers" />,
});
