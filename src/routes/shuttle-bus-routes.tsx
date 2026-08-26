import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/shuttle-bus-routes")({
  head: () => ({
    meta: [
      { title: "Student Shuttle Bus Routes — DUET Karachi" },
      { name: "description", content: "Shuttle bus routes and stops serving DUET Karachi students travelling to and from the university campus." },
      { property: "og:title", content: "Student Shuttle Bus Routes — DUET Karachi" },
      { property: "og:description", content: "Shuttle bus routes and stops serving DUET Karachi students travelling to and from the university campus." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/shuttle-bus-routes" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/shuttle-bus-routes" }],
  }),
  component: () => <ArchivedPage path="/shuttle-bus-routes" />,
});
