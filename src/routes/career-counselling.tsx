import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/career-counselling")({
  head: () => ({
    meta: [
      { title: "Career Counselling for Students — DUET Karachi" },
      { name: "description", content: "Career counselling services at DUET Karachi: guidance on job search, higher studies, CV preparation and employer connections for engineering students." },
      { property: "og:title", content: "Career Counselling for Students — DUET Karachi" },
      { property: "og:description", content: "Career counselling services at DUET Karachi: guidance on job search, higher studies, CV preparation and employer connections for engineering students." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/career-counselling" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/career-counselling" }],
  }),
  component: () => <ArchivedPage path="/career-counselling" />,
});
