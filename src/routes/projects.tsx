import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Research Projects — DUET Karachi" },
      { name: "description", content: "Funded and completed research projects at DUET Karachi across engineering, energy, environment and materials disciplines in Pakistan." },
      { property: "og:title", content: "Research Projects — DUET Karachi" },
      { property: "og:description", content: "Funded and completed research projects at DUET Karachi across engineering, energy, environment and materials disciplines in Pakistan." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/projects" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/projects" }],
  }),
  component: () => <ArchivedPage path="/projects" />,
});
