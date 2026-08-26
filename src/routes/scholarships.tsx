import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — DUET Karachi" },
      { name: "description", content: "Scholarships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Scholarships — DUET Karachi" },
      { property: "og:description", content: "Scholarships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/scholarships" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/scholarships" }],
  }),
  component: () => <ArchivedPage path="/scholarships" />,
});
