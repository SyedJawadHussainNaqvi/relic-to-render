import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/tenders")({
  head: () => ({
    meta: [
      { title: "Tenders & Procurement Notices — DUET Karachi" },
      { name: "description", content: "Active tender notices and procurement documents issued by DUET Karachi, including tender books for campus works." },
      { property: "og:title", content: "Tenders & Procurement Notices — DUET Karachi" },
      { property: "og:description", content: "Active tender notices and procurement documents issued by DUET Karachi, including tender books for campus works." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/tenders" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/tenders" }],
  }),
  component: () => <ArchivedPage path="/tenders" />,
});
