import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/undergrad-programs")({
  head: () => ({
    meta: [
      { title: "Undergrad Programs — DUET Karachi" },
      { name: "description", content: "Undergrad Programs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Undergrad Programs — DUET Karachi" },
      { property: "og:description", content: "Undergrad Programs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/undergrad-programs" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/undergrad-programs" }],
  }),
  component: () => <ArchivedPage path="/undergrad-programs" />,
});
