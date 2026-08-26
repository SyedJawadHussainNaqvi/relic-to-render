import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "University Research Journal — DUET Karachi" },
      { name: "description", content: "DUET Karachi's research journal: scope, issues and author guidance for publishing engineering and applied science research." },
      { property: "og:title", content: "University Research Journal — DUET Karachi" },
      { property: "og:description", content: "DUET Karachi's research journal: scope, issues and author guidance for publishing engineering and applied science research." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/journal" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/journal" }],
  }),
  component: () => <ArchivedPage path="/journal" />,
});
