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
      { property: "og:url", content: "/students" },
    ],
    links: [{ rel: "canonical", href: "/students" }],
  }),
  component: () => <ArchivedPage path="/students" />,
});
