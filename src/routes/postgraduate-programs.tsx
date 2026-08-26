import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/postgraduate-programs")({
  head: () => ({
    meta: [
      { title: "Postgraduate Programs — DUET Karachi" },
      { name: "description", content: "Postgraduate Programs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Postgraduate Programs — DUET Karachi" },
      { property: "og:description", content: "Postgraduate Programs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/postgraduate-programs" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/postgraduate-programs" }],
  }),
  component: () => <ArchivedPage path="/postgraduate-programs" />,
});
