import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/authorities")({
  head: () => ({
    meta: [
      { title: "University Authorities: Senate, Syndicate & Academic Council — DUET" },
      { name: "description", content: "Members of DUET Karachi's statutory bodies: the Senate, Syndicate and Academic Council that govern academic and administrative decisions." },
      { property: "og:title", content: "University Authorities: Senate, Syndicate & Academic Council — DUET" },
      { property: "og:description", content: "Members of DUET Karachi's statutory bodies: the Senate, Syndicate and Academic Council that govern academic and administrative decisions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/authorities" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/authorities" }],
  }),
  component: () => <ArchivedPage path="/authorities" />,
});
