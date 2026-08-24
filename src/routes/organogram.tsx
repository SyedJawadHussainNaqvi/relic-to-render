import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/organogram")({
  head: () => ({
    meta: [
      { title: "Organogram — DUET Karachi" },
      { name: "description", content: "Organogram at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Organogram — DUET Karachi" },
      { property: "og:description", content: "Organogram at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/organogram" },
    ],
    links: [{ rel: "canonical", href: "/organogram" }],
  }),
  component: () => <ArchivedPage path="/organogram" />,
});
