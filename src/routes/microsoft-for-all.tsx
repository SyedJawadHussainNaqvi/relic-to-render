import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/microsoft-for-all")({
  head: () => ({
    meta: [
      { title: "Microsoft for All — DUET Karachi" },
      { name: "description", content: "Microsoft for All at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Microsoft for All — DUET Karachi" },
      { property: "og:description", content: "Microsoft for All at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/microsoft-for-all" },
    ],
    links: [{ rel: "canonical", href: "/microsoft-for-all" }],
  }),
  component: () => <ArchivedPage path="/microsoft-for-all" />,
});
