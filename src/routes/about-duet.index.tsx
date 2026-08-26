import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-duet/")({
  head: () => ({
    meta: [
      { title: "About DUET — Public Engineering University in Karachi" },
      { name: "description", content: "Overview of Dawood University of Engineering & Technology, Karachi: its history, leadership, authorities, linkages and annual reporting." },
      { property: "og:title", content: "About DUET — Public Engineering University in Karachi" },
      { property: "og:description", content: "Overview of Dawood University of Engineering & Technology, Karachi: its history, leadership, authorities, linkages and annual reporting." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/about-duet" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/about-duet" }],
  }),
  component: () => <ArchivedPage path="/about-duet" />,
});
