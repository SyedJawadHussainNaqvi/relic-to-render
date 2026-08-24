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
      { property: "og:url", content: "/directorates" },
    ],
    links: [{ rel: "canonical", href: "/directorates" }],
  }),
  component: () => <ArchivedPage path="/directorates" />,
});
