import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/shuttle-bus-routes")({
  head: () => ({
    meta: [
      { title: "Shuttle Bus Routes — DUET Karachi" },
      { name: "description", content: "Shuttle Bus Routes at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Shuttle Bus Routes — DUET Karachi" },
      { property: "og:description", content: "Shuttle Bus Routes at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shuttle-bus-routes" },
    ],
    links: [{ rel: "canonical", href: "/shuttle-bus-routes" }],
  }),
  component: () => <ArchivedPage path="/shuttle-bus-routes" />,
});
