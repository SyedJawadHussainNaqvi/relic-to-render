import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/plagiarism-policy")({
  head: () => ({
    meta: [
      { title: "Plagiarism Policy — DUET Karachi" },
      { name: "description", content: "Plagiarism Policy of Dawood university of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Plagiarism Policy — DUET Karachi" },
      { property: "og:description", content: "Plagiarism Policy of Dawood university of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/plagiarism-policy" },
    ],
    links: [{ rel: "canonical", href: "/plagiarism-policy" }],
  }),
  component: () => <ArchivedPage path="/plagiarism-policy" />,
});
