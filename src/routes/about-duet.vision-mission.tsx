import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-duet/vision-mission")({
  head: () => ({
    meta: [
      { title: "Vision & Mission — DUET Karachi" },
      { name: "description", content: "Dawood University of Engineering & Technology aims to invest in human capital for accelerated advancement in engineering knowledge and practices, new front" },
      { property: "og:title", content: "Vision & Mission — DUET Karachi" },
      { property: "og:description", content: "Dawood University of Engineering & Technology aims to invest in human capital for accelerated advancement in engineering knowledge and practices, new front" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/about-duet/vision-mission" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/about-duet/vision-mission" }],
  }),
  component: () => <ArchivedPage path="/about-duet/vision-mission" />,
});
