import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sports & Physical Activities — DUET Karachi" },
      { name: "description", content: "Sports facilities, teams, tournaments and physical activities for students at DUET Karachi." },
      { property: "og:title", content: "Sports & Physical Activities — DUET Karachi" },
      { property: "og:description", content: "Sports facilities, teams, tournaments and physical activities for students at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/sports" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/sports" }],
  }),
  component: () => <ArchivedPage path="/sports" />,
});
