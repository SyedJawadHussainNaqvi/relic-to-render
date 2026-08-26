import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/outcome-based-education-obe")({
  head: () => ({
    meta: [
      { title: "Outcome Based Education (OBE) — DUET Karachi" },
      { name: "description", content: "How DUET Karachi implements Outcome Based Education, with programme learning outcomes, assessment practices and continuous quality improvement." },
      { property: "og:title", content: "Outcome Based Education (OBE) — DUET Karachi" },
      { property: "og:description", content: "How DUET Karachi implements Outcome Based Education, with programme learning outcomes, assessment practices and continuous quality improvement." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/outcome-based-education-obe" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/outcome-based-education-obe" }],
  }),
  component: () => <ArchivedPage path="/outcome-based-education-obe" />,
});
