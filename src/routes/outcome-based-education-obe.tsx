import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/outcome-based-education-obe")({
  head: () => ({
    meta: [
      { title: "Outcome Based Education (OBE) — DUET Karachi" },
      { name: "description", content: "Outcome Based Education (OBE) at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Outcome Based Education (OBE) — DUET Karachi" },
      { property: "og:description", content: "Outcome Based Education (OBE) at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/outcome-based-education-obe" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/outcome-based-education-obe" }],
  }),
  component: () => <ArchivedPage path="/outcome-based-education-obe" />,
});
