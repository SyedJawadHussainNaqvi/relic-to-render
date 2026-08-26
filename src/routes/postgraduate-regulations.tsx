import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/postgraduate-regulations")({
  head: () => ({
    meta: [
      { title: "Postgraduate Regulations — DUET Karachi" },
      { name: "description", content: "Academic regulations for MS and PhD studies at DUET Karachi: credit requirements, supervision, thesis rules and evaluation criteria." },
      { property: "og:title", content: "Postgraduate Regulations — DUET Karachi" },
      { property: "og:description", content: "Academic regulations for MS and PhD studies at DUET Karachi: credit requirements, supervision, thesis rules and evaluation criteria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/postgraduate-regulations" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/postgraduate-regulations" }],
  }),
  component: () => <ArchivedPage path="/postgraduate-regulations" />,
});
