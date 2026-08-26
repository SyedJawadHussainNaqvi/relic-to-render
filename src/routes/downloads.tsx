import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Forms & Downloads — DUET Karachi" },
      { name: "description", content: "Downloadable DUET Karachi forms and documents, including examination, admission and departmental forms in PDF format." },
      { property: "og:title", content: "Forms & Downloads — DUET Karachi" },
      { property: "og:description", content: "Downloadable DUET Karachi forms and documents, including examination, admission and departmental forms in PDF format." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/downloads" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/downloads" }],
  }),
  component: () => <ArchivedPage path="/downloads" />,
});
