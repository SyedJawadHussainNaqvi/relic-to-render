import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-cemet")({
  head: () => ({
    meta: [
      { title: "ABOUT CEMET — DUET Karachi" },
      { name: "description", content: "ABOUT CEMET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "ABOUT CEMET — DUET Karachi" },
      { property: "og:description", content: "ABOUT CEMET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/about-cemet" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/about-cemet" }],
  }),
  component: () => <ArchivedPage path="/about-cemet" />,
});
