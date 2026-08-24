import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — DUET Karachi" },
      { name: "description", content: "Admissions at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Admissions — DUET Karachi" },
      { property: "og:description", content: "Admissions at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: () => <ArchivedPage path="/admissions" />,
});
