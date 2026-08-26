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
      { property: "og:url", content: "https://www.duet.edu.pk/examinations" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/examinations" }],
  }),
  component: () => <ArchivedPage path="/examinations" />,
});
