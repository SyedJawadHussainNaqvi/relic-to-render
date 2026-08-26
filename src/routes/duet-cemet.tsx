import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/duet-cemet")({
  head: () => ({
    meta: [
      { title: "DUET-CEMET Startup Grant & Programs — DUET Karachi" },
      { name: "description", content: "DUET-CEMET programs, startup grant eligibility and entrepreneurship activities for students and early-stage founders at DUET Karachi." },
      { property: "og:title", content: "DUET-CEMET Startup Grant & Programs — DUET Karachi" },
      { property: "og:description", content: "DUET-CEMET programs, startup grant eligibility and entrepreneurship activities for students and early-stage founders at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/duet-cemet" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/duet-cemet" }],
  }),
  component: () => <ArchivedPage path="/duet-cemet" />,
});
