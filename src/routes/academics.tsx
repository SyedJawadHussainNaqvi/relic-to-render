import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — DUET Karachi" },
      { name: "description", content: "Academics at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Academics — DUET Karachi" },
      { property: "og:description", content: "Academics at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/academics" },
    ],
    links: [{ rel: "canonical", href: "/academics" }],
  }),
  component: () => <ArchivedPage path="/academics" />,
});
