import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/convocation")({
  head: () => ({
    meta: [
      { title: "Convocation — DUET Karachi" },
      { name: "description", content: "Convocation information for DUET Karachi graduates, including ceremony details, registration steps and degree collection guidance." },
      { property: "og:title", content: "Convocation — DUET Karachi" },
      { property: "og:description", content: "Convocation information for DUET Karachi graduates, including ceremony details, registration steps and degree collection guidance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/convocation" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/convocation" }],
  }),
  component: () => <ArchivedPage path="/convocation" />,
});
