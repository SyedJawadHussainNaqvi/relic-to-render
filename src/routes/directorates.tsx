import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/directorates")({
  head: () => ({
    meta: [
      { title: "DIRECTORATES — DUET Karachi" },
      { name: "description", content: "DIRECTORATES at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "DIRECTORATES — DUET Karachi" },
      { property: "og:description", content: "DIRECTORATES at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/directorates" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/directorates" }],
  }),
  component: () => <ArchivedPage path="/directorates" />,
});
