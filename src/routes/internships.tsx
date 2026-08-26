import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/internships")({
  head: () => ({
    meta: [
      { title: "Student Internships — DUET Karachi" },
      { name: "description", content: "Internship opportunities and industry placement guidance for DUET Karachi engineering students through the Industrial Liaison office." },
      { property: "og:title", content: "Student Internships — DUET Karachi" },
      { property: "og:description", content: "Internship opportunities and industry placement guidance for DUET Karachi engineering students through the Industrial Liaison office." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/internships" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/internships" }],
  }),
  component: () => <ArchivedPage path="/internships" />,
});
