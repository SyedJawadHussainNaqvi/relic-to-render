import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/examinations")({
  head: () => ({
    meta: [
      { title: "EXAMINATIONS — DUET Karachi" },
      { name: "description", content: "EXAMINATIONS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "EXAMINATIONS — DUET Karachi" },
      { property: "og:description", content: "EXAMINATIONS at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/examinations" },
    ],
    links: [{ rel: "canonical", href: "/examinations" }],
  }),
  component: () => <ArchivedPage path="/examinations" />,
});
