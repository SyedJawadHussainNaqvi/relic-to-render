import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/financial-assistance-departments")({
  head: () => ({
    meta: [
      { title: "Financial Assistance for Students — DUET Karachi" },
      { name: "description", content: "Need-based financial assistance and fee support for engineering students at DUET Karachi, including departmental welfare and endowment support." },
      { property: "og:title", content: "Financial Assistance for Students — DUET Karachi" },
      { property: "og:description", content: "Need-based financial assistance and fee support for engineering students at DUET Karachi, including departmental welfare and endowment support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/financial-assistance-departments" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/financial-assistance-departments" }],
  }),
  component: () => <ArchivedPage path="/financial-assistance-departments" />,
});
