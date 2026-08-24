import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/undergrad-regulations")({
  head: () => ({
    meta: [
      { title: "Undergraduate Regulations — DUET Karachi" },
      { name: "description", content: "Undergraduate Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Undergraduate Regulations — DUET Karachi" },
      { property: "og:description", content: "Undergraduate Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/undergrad-regulations" },
    ],
    links: [{ rel: "canonical", href: "/undergrad-regulations" }],
  }),
  component: () => <ArchivedPage path="/undergrad-regulations" />,
});
