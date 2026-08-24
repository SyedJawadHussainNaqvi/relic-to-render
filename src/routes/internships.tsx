import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: "Internships — DUET Karachi" },
      { name: "description", content: "Internships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Internships — DUET Karachi" },
      { property: "og:description", content: "Internships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/internships" },
    ],
    links: [{ rel: "canonical", href: "/internships" }],
  }),
  component: () => <ArchivedPage path="/internships" />,
});
