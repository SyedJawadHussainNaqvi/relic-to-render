import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/scholarships-2")({
  head: () => ({
    meta: [
      { title: "Scholarships — DUET Karachi" },
      { name: "description", content: "Scholarships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Scholarships — DUET Karachi" },
      { property: "og:description", content: "Scholarships at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/scholarships-2" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/scholarships-2" }],
  }),
  component: () => <ArchivedPage path="/scholarships-2" />,
});
