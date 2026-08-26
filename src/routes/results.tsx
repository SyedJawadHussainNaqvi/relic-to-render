import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Examination Results — DUET Karachi" },
      { name: "description", content: "Semester and annual examination results published by the Controller of Examinations at DUET Karachi for undergraduate and postgraduate programs." },
      { property: "og:title", content: "Examination Results — DUET Karachi" },
      { property: "og:description", content: "Semester and annual examination results published by the Controller of Examinations at DUET Karachi for undergraduate and postgraduate programs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/results" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/results" }],
  }),
  component: () => <ArchivedPage path="/results" />,
});
