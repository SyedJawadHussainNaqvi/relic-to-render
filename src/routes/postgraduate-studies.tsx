import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/postgraduate-studies")({
  head: () => ({
    meta: [
      { title: "Postgraduate Studies — DUET Karachi" },
      { name: "description", content: "DUET started postgraduate program through the Directorate of Postgraduate Studies in 2017 in different fields of engineering. Currently the postgraduate pr" },
      { property: "og:title", content: "Postgraduate Studies — DUET Karachi" },
      { property: "og:description", content: "DUET started postgraduate program through the Directorate of Postgraduate Studies in 2017 in different fields of engineering. Currently the postgraduate pr" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/postgraduate-studies" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/postgraduate-studies" }],
  }),
  component: () => <ArchivedPage path="/postgraduate-studies" />,
});
