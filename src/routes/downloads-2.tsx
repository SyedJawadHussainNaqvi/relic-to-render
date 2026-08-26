import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/downloads-2")({
  head: () => ({
    meta: [
      { title: "Additional Downloads Archive — DUET Karachi" },
      { name: "description", content: "Archive of additional DUET Karachi documents and forms kept alongside the main downloads section for reference." },
      { property: "og:title", content: "Additional Downloads Archive — DUET Karachi" },
      { property: "og:description", content: "Archive of additional DUET Karachi documents and forms kept alongside the main downloads section for reference." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/downloads-2" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/downloads-2" }],
  }),
  component: () => <ArchivedPage path="/downloads-2" />,
});
