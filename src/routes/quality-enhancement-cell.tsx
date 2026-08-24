import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/quality-enhancement-cell")({
  head: () => ({
    meta: [
      { title: "Quality Enhancement cell — DUET Karachi" },
      { name: "description", content: "Quality Assurance (QA) holds an indispensable importance in a world where competition is changing gears every now and then. In an ever-evolving education s" },
      { property: "og:title", content: "Quality Enhancement cell — DUET Karachi" },
      { property: "og:description", content: "Quality Assurance (QA) holds an indispensable importance in a world where competition is changing gears every now and then. In an ever-evolving education s" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quality-enhancement-cell" },
    ],
    links: [{ rel: "canonical", href: "/quality-enhancement-cell" }],
  }),
  component: () => <ArchivedPage path="/quality-enhancement-cell" />,
});
