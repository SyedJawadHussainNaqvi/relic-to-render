import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/organogram")({
  head: () => ({
    meta: [
      { title: "University Organogram — DUET Karachi" },
      { name: "description", content: "Organisational chart of DUET Karachi showing reporting lines across academic faculties, directorates and administrative offices." },
      { property: "og:title", content: "University Organogram — DUET Karachi" },
      { property: "og:description", content: "Organisational chart of DUET Karachi showing reporting lines across academic faculties, directorates and administrative offices." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/organogram" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/organogram" }],
  }),
  component: () => <ArchivedPage path="/organogram" />,
});
