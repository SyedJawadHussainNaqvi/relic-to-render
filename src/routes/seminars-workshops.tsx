import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/seminars-workshops")({
  head: () => ({
    meta: [
      { title: "Seminars & Workshops — DUET Karachi" },
      { name: "description", content: "Seminars & Workshops at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Seminars & Workshops — DUET Karachi" },
      { property: "og:description", content: "Seminars & Workshops at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/seminars-workshops" },
    ],
    links: [{ rel: "canonical", href: "/seminars-workshops" }],
  }),
  component: () => <ArchivedPage path="/seminars-workshops" />,
});
