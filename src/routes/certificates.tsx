import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — DUET Karachi" },
      { name: "description", content: "Certificates at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Certificates — DUET Karachi" },
      { property: "og:description", content: "Certificates at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/certificates" },
    ],
    links: [{ rel: "canonical", href: "/certificates" }],
  }),
  component: () => <ArchivedPage path="/certificates" />,
});
