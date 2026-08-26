import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/vice-chancellors-message-2")({
  head: () => ({
    meta: [
      { title: "Vice Chancellor's Message — DUET Karachi" },
      { name: "description", content: "Message from the Vice Chancellor of Dawood University of Engineering & Technology, Karachi on the university's academic vision and growth." },
      { property: "og:title", content: "Vice Chancellor's Message — DUET Karachi" },
      { property: "og:description", content: "Message from the Vice Chancellor of Dawood University of Engineering & Technology, Karachi on the university's academic vision and growth." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/vice-chancellors-message-2" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/vice-chancellors-message-2" }],
  }),
  component: () => <ArchivedPage path="/vice-chancellors-message-2" />,
});
