import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "STUDENTS — DUET Karachi" },
      { name: "description", content: "STUDENTS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "STUDENTS — DUET Karachi" },
      { property: "og:description", content: "STUDENTS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/students" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/students" }],
  }),
  component: () => <ArchivedPage path="/students" />,
});
