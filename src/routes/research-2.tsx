import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/research-2")({
  head: () => ({
    meta: [
      { title: "RESEARCH — DUET Karachi" },
      { name: "description", content: "RESEARCH at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "RESEARCH — DUET Karachi" },
      { property: "og:description", content: "RESEARCH at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/research-2" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/research-2" }],
  }),
  component: () => <ArchivedPage path="/research-2" />,
});
