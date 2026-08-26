import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/annual-report")({
  head: () => ({
    meta: [
      { title: "Budget & Annual Reports — DUET Karachi" },
      { name: "description", content: "Download DUET Karachi's published annual reports and budget documents covering university finances, academics and institutional performance." },
      { property: "og:title", content: "Budget & Annual Reports — DUET Karachi" },
      { property: "og:description", content: "Download DUET Karachi's published annual reports and budget documents covering university finances, academics and institutional performance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/annual-report" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/annual-report" }],
  }),
  component: () => <ArchivedPage path="/annual-report" />,
});
