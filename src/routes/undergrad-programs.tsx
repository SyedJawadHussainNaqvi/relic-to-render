import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/undergrad-programs")({
  head: () => ({
    meta: [
      { title: "Undergraduate BE & BS Programs — DUET Karachi" },
      { name: "description", content: "Undergraduate BE and BS degree programs at DUET Karachi in engineering, architecture, computer science and applied sciences." },
      { property: "og:title", content: "Undergraduate BE & BS Programs — DUET Karachi" },
      { property: "og:description", content: "Undergraduate BE and BS degree programs at DUET Karachi in engineering, architecture, computer science and applied sciences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/undergrad-programs" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/undergrad-programs" }],
  }),
  component: () => <ArchivedPage path="/undergrad-programs" />,
});
