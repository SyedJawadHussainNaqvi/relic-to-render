import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({
    meta: [
      { title: "Video Gallery — DUET Karachi" },
      { name: "description", content: "Video Gallery at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Video Gallery — DUET Karachi" },
      { property: "og:description", content: "Video Gallery at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/video-gallery" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/video-gallery" }],
  }),
  component: () => <ArchivedPage path="/video-gallery" />,
});
