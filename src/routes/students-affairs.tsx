import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students-affairs")({
  head: () => ({
    meta: [
      { title: "Students Affairs — DUET Karachi" },
      { name: "description", content: "The Students Affairs office at DUET Karachi supports student welfare, discipline, societies, sports and campus life activities." },
      { property: "og:title", content: "Students Affairs — DUET Karachi" },
      { property: "og:description", content: "The Students Affairs office at DUET Karachi supports student welfare, discipline, societies, sports and campus life activities." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/students-affairs" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/students-affairs" }],
  }),
  component: () => <ArchivedPage path="/students-affairs" />,
});
