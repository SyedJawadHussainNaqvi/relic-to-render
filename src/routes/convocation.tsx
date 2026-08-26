import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/convocation")({
  head: () => ({
    meta: [
      { title: "Convocation — DUET Karachi" },
      { name: "description", content: "Convocation at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Convocation — DUET Karachi" },
      { property: "og:description", content: "Convocation at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/convocation" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/convocation" }],
  }),
  component: () => <ArchivedPage path="/convocation" />,
});
