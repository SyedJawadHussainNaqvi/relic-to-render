import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/research-2")({
  head: () => ({
    meta: [
      { title: "Research at DUET Karachi" },
      { name: "description", content: "Research at DUET Karachi: the ORIC office, publications, funded projects, PhD supervision, ethics policies and industry collaborations." },
      { property: "og:title", content: "Research at DUET Karachi" },
      { property: "og:description", content: "Research at DUET Karachi: the ORIC office, publications, funded projects, PhD supervision, ethics policies and industry collaborations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/research-2" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/research-2" }],
  }),
  component: () => <ArchivedPage path="/research-2" />,
});
