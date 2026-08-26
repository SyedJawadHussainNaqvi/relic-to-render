import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Association (DUAA) — DUET Karachi" },
      { name: "description", content: "Register with the Dawood University Alumni Association (DUAA) to stay connected with DUET Karachi graduates, events and networking opportunities." },
      { property: "og:title", content: "Alumni Association (DUAA) — DUET Karachi" },
      { property: "og:description", content: "Register with the Dawood University Alumni Association (DUAA) to stay connected with DUET Karachi graduates, events and networking opportunities." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/alumni" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/alumni" }],
  }),
  component: () => <ArchivedPage path="/alumni" />,
});
