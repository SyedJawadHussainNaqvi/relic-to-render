import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/regulations")({
  head: () => ({
    meta: [
      { title: "Regulations — DUET Karachi" },
      { name: "description", content: "Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Regulations — DUET Karachi" },
      { property: "og:description", content: "Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/regulations" },
    ],
    links: [{ rel: "canonical", href: "/regulations" }],
  }),
  component: () => <ArchivedPage path="/regulations" />,
});
