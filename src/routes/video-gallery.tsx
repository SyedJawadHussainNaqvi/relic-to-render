import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/video-gallery")({
  head: () => ({
    meta: [
      { title: "Video Gallery — DUET Karachi" },
      { name: "description", content: "Videos from DUET Karachi covering convocations, campus events, laboratories, seminars and student activities." },
      { property: "og:title", content: "Video Gallery — DUET Karachi" },
      { property: "og:description", content: "Videos from DUET Karachi covering convocations, campus events, laboratories, seminars and student activities." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/video-gallery" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/video-gallery" }],
  }),
  component: () => <ArchivedPage path="/video-gallery" />,
});
