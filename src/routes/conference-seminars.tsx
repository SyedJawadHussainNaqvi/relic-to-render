import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/conference-seminars")({
  head: () => ({
    meta: [
      { title: "Conference & Seminars — DUET Karachi" },
      { name: "description", content: "INTERNATIONAL CONFERENCE On Combating Natural Gas Shortages: Can Alternative Energy Provide an Efficient Solution and Relief to the Industry Gasping for Ga" },
      { property: "og:title", content: "Conference & Seminars — DUET Karachi" },
      { property: "og:description", content: "INTERNATIONAL CONFERENCE On Combating Natural Gas Shortages: Can Alternative Energy Provide an Efficient Solution and Relief to the Industry Gasping for Ga" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/conference-seminars" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/conference-seminars" }],
  }),
  component: () => <ArchivedPage path="/conference-seminars" />,
});
