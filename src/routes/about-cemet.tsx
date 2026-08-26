import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-cemet")({
  head: () => ({
    meta: [
      { title: "About CEMET — DUET Karachi" },
      { name: "description", content: "Learn about CEMET, the Centre for Entrepreneurship and Modern Emerging Technologies at DUET Karachi, and the support it offers student startups." },
      { property: "og:title", content: "About CEMET — DUET Karachi" },
      { property: "og:description", content: "Learn about CEMET, the Centre for Entrepreneurship and Modern Emerging Technologies at DUET Karachi, and the support it offers student startups." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/about-cemet" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/about-cemet" }],
  }),
  component: () => <ArchivedPage path="/about-cemet" />,
});
