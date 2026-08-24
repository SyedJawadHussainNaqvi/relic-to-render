import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/postgraduate-regulations")({
  head: () => ({
    meta: [
      { title: "Postgraduate Regulations — DUET Karachi" },
      { name: "description", content: "Postgraduate Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Postgraduate Regulations — DUET Karachi" },
      { property: "og:description", content: "Postgraduate Regulations at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/postgraduate-regulations" },
    ],
    links: [{ rel: "canonical", href: "/postgraduate-regulations" }],
  }),
  component: () => <ArchivedPage path="/postgraduate-regulations" />,
});
