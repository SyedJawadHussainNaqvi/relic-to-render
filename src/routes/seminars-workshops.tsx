import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/seminars-workshops")({
  head: () => ({
    meta: [
      { title: "Seminars & Workshops — DUET Karachi" },
      { name: "description", content: "Seminars, workshops and training sessions hosted at DUET Karachi for students, faculty and industry professionals." },
      { property: "og:title", content: "Seminars & Workshops — DUET Karachi" },
      { property: "og:description", content: "Seminars, workshops and training sessions hosted at DUET Karachi for students, faculty and industry professionals." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/seminars-workshops" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/seminars-workshops" }],
  }),
  component: () => <ArchivedPage path="/seminars-workshops" />,
});
