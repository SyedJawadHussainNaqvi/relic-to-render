import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/incubation-centre")({
  head: () => ({
    meta: [
      { title: "Incubation Centre for Startups — DUET Karachi" },
      { name: "description", content: "Startup incubation support, proposal requirements and mentoring for student and alumni ventures at DUET Karachi." },
      { property: "og:title", content: "Incubation Centre for Startups — DUET Karachi" },
      { property: "og:description", content: "Startup incubation support, proposal requirements and mentoring for student and alumni ventures at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/incubation-centre" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/incubation-centre" }],
  }),
  component: () => <ArchivedPage path="/incubation-centre" />,
});
