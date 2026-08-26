import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/university-linkages")({
  head: () => ({
    meta: [
      { title: "University Linkages — DUET Karachi" },
      { name: "description", content: "Memorandum of Understanding Between DUET and NED" },
      { property: "og:title", content: "University Linkages — DUET Karachi" },
      { property: "og:description", content: "Memorandum of Understanding Between DUET and NED" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/university-linkages" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/university-linkages" }],
  }),
  component: () => <ArchivedPage path="/university-linkages" />,
});
