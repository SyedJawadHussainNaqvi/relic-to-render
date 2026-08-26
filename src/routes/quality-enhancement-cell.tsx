import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/quality-enhancement-cell")({
  head: () => ({
    meta: [
      { title: "Quality Enhancement Cell (QEC) — DUET Karachi" },
      { name: "description", content: "The Quality Enhancement Cell at DUET Karachi manages HEC quality assurance, self-assessment reports and programme accreditation." },
      { property: "og:title", content: "Quality Enhancement Cell (QEC) — DUET Karachi" },
      { property: "og:description", content: "The Quality Enhancement Cell at DUET Karachi manages HEC quality assurance, self-assessment reports and programme accreditation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/quality-enhancement-cell" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/quality-enhancement-cell" }],
  }),
  component: () => <ArchivedPage path="/quality-enhancement-cell" />,
});
