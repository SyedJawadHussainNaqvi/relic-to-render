import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students-societies")({
  head: () => ({
    meta: [
      { title: "Student Societies & Clubs — DUET Karachi" },
      { name: "description", content: "Student societies and clubs at DUET Karachi covering technical, literary, social and departmental activities on campus." },
      { property: "og:title", content: "Student Societies & Clubs — DUET Karachi" },
      { property: "og:description", content: "Student societies and clubs at DUET Karachi covering technical, literary, social and departmental activities on campus." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/students-societies" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/students-societies" }],
  }),
  component: () => <ArchivedPage path="/students-societies" />,
});
