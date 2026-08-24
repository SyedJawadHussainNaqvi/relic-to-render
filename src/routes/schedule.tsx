import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — DUET Karachi" },
      { name: "description", content: "Schedule at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Schedule — DUET Karachi" },
      { property: "og:description", content: "Schedule at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/schedule" },
    ],
    links: [{ rel: "canonical", href: "/schedule" }],
  }),
  component: () => <ArchivedPage path="/schedule" />,
});
