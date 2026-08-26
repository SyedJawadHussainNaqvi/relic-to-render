import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/officers-2")({
  head: () => ({
    meta: [
      { title: "University Officers — DUET Karachi" },
      { name: "description", content: "Principal officers of DUET Karachi, including the Vice Chancellor, Registrar, Deans, Controller of Examinations and Director Finance." },
      { property: "og:title", content: "University Officers — DUET Karachi" },
      { property: "og:description", content: "Principal officers of DUET Karachi, including the Vice Chancellor, Registrar, Deans, Controller of Examinations and Director Finance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/officers-2" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/officers-2" }],
  }),
  component: () => <ArchivedPage path="/officers-2" />,
});
