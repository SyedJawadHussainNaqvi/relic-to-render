import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/funding-agencies")({
  head: () => ({
    meta: [
      { title: "Research Funding Agencies — DUET Karachi" },
      { name: "description", content: "National and international funding agencies that support research projects, grants and collaborations at DUET Karachi." },
      { property: "og:title", content: "Research Funding Agencies — DUET Karachi" },
      { property: "og:description", content: "National and international funding agencies that support research projects, grants and collaborations at DUET Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/funding-agencies" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/funding-agencies" }],
  }),
  component: () => <ArchivedPage path="/funding-agencies" />,
});
