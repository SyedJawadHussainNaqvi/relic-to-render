import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/authorities")({
  head: () => ({
    meta: [
      { title: "Authorities — DUET Karachi" },
      { name: "description", content: "Authorities at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Authorities — DUET Karachi" },
      { property: "og:description", content: "Authorities at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/authorities" },
    ],
    links: [{ rel: "canonical", href: "/authorities" }],
  }),
  component: () => <ArchivedPage path="/authorities" />,
});
