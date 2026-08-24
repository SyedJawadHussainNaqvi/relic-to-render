import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students-affairs")({
  head: () => ({
    meta: [
      { title: "Students Affairs — DUET Karachi" },
      { name: "description", content: "Students Affairs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Students Affairs — DUET Karachi" },
      { property: "og:description", content: "Students Affairs at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/students-affairs" },
    ],
    links: [{ rel: "canonical", href: "/students-affairs" }],
  }),
  component: () => <ArchivedPage path="/students-affairs" />,
});
