import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Student Services & Campus Life — DUET Karachi" },
      { name: "description", content: "Student resources at DUET Karachi: students affairs, societies, sports, career counselling, internships, transport and alumni services." },
      { property: "og:title", content: "Student Services & Campus Life — DUET Karachi" },
      { property: "og:description", content: "Student resources at DUET Karachi: students affairs, societies, sports, career counselling, internships, transport and alumni services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/students" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/students" }],
  }),
  component: () => <ArchivedPage path="/students" />,
});
