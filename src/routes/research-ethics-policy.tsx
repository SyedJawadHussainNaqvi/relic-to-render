import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/research-ethics-policy")({
  head: () => ({
    meta: [
      { title: "Research Ethics Policy — DUET Karachi" },
      { name: "description", content: "DUET Karachi's research ethics policy covering responsible conduct of research, approvals, data integrity and researcher obligations." },
      { property: "og:title", content: "Research Ethics Policy — DUET Karachi" },
      { property: "og:description", content: "DUET Karachi's research ethics policy covering responsible conduct of research, approvals, data integrity and researcher obligations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/research-ethics-policy" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/research-ethics-policy" }],
  }),
  component: () => <ArchivedPage path="/research-ethics-policy" />,
});
