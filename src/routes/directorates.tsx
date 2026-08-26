import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/directorates")({
  head: () => ({
    meta: [
      { title: "University Directorates — DUET Karachi" },
      { name: "description", content: "Directorates at DUET Karachi covering admissions, examinations, research, IT, postgraduate studies, students affairs and industrial liaison." },
      { property: "og:title", content: "University Directorates — DUET Karachi" },
      { property: "og:description", content: "Directorates at DUET Karachi covering admissions, examinations, research, IT, postgraduate studies, students affairs and industrial liaison." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/directorates" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/directorates" }],
  }),
  component: () => <ArchivedPage path="/directorates" />,
});
