import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/duet-cemet")({
  head: () => ({
    meta: [
      { title: "DUET-CEMET — DUET Karachi" },
      { name: "description", content: "DUET-CEMET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "DUET-CEMET — DUET Karachi" },
      { property: "og:description", content: "DUET-CEMET at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/duet-cemet" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/duet-cemet" }],
  }),
  component: () => <ArchivedPage path="/duet-cemet" />,
});
