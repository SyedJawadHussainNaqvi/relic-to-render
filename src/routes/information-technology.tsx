import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/information-technology")({
  head: () => ({
    meta: [
      { title: "Information Technology — DUET Karachi" },
      { name: "description", content: "The Directorate of Information Technology (IT) at DUET has advanced infrastructure with robust Information and Communication System. The directorate provid" },
      { property: "og:title", content: "Information Technology — DUET Karachi" },
      { property: "og:description", content: "The Directorate of Information Technology (IT) at DUET has advanced infrastructure with robust Information and Communication System. The directorate provid" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/information-technology" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/information-technology" }],
  }),
  component: () => <ArchivedPage path="/information-technology" />,
});
