import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/conference-seminars")({
  head: () => ({
    meta: [
      { title: "Conferences & Seminars — DUET Karachi" },
      { name: "description", content: "International conferences and academic seminars hosted by DUET Karachi on energy, engineering and applied research in Pakistan." },
      { property: "og:title", content: "Conferences & Seminars — DUET Karachi" },
      { property: "og:description", content: "International conferences and academic seminars hosted by DUET Karachi on energy, engineering and applied research in Pakistan." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/conference-seminars" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/conference-seminars" }],
  }),
  component: () => <ArchivedPage path="/conference-seminars" />,
});
