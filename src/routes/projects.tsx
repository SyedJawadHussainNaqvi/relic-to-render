import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — DUET Karachi" },
      { name: "description", content: "Research Project Completion Report 2022" },
      { property: "og:title", content: "Projects — DUET Karachi" },
      { property: "og:description", content: "Research Project Completion Report 2022" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: () => <ArchivedPage path="/projects" />,
});
