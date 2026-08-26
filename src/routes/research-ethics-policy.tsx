import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/research-ethics-policy")({
  head: () => ({
    meta: [
      { title: "Research Ethics Policy — DUET Karachi" },
      { name: "description", content: "Research Ethics Policy at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Research Ethics Policy — DUET Karachi" },
      { property: "og:description", content: "Research Ethics Policy at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/research-ethics-policy" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/research-ethics-policy" }],
  }),
  component: () => <ArchivedPage path="/research-ethics-policy" />,
});
