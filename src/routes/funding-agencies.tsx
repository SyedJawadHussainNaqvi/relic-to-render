import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/funding-agencies")({
  head: () => ({
    meta: [
      { title: "Funding Agencies — DUET Karachi" },
      { name: "description", content: "Funding Agencies at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Funding Agencies — DUET Karachi" },
      { property: "og:description", content: "Funding Agencies at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/funding-agencies" },
    ],
    links: [{ rel: "canonical", href: "/funding-agencies" }],
  }),
  component: () => <ArchivedPage path="/funding-agencies" />,
});
