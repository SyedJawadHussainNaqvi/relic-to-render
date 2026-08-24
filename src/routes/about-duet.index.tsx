import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-duet/")({
  head: () => ({
    meta: [
      { title: "About DUET — DUET Karachi" },
      { name: "description", content: "About DUET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "About DUET — DUET Karachi" },
      { property: "og:description", content: "About DUET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about-duet" },
    ],
    links: [{ rel: "canonical", href: "/about-duet" }],
  }),
  component: () => <ArchivedPage path="/about-duet" />,
});
