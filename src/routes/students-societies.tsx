import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students-societies")({
  head: () => ({
    meta: [
      { title: "Students Societies — DUET Karachi" },
      { name: "description", content: "Students Societies at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Students Societies — DUET Karachi" },
      { property: "og:description", content: "Students Societies at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/students-societies" },
    ],
    links: [{ rel: "canonical", href: "/students-societies" }],
  }),
  component: () => <ArchivedPage path="/students-societies" />,
});
