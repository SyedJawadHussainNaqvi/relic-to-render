import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/university-policies")({
  head: () => ({
    meta: [
      { title: "University Policies — DUET Karachi" },
      { name: "description", content: "Official university policies at DUET Karachi covering conduct, anti-harassment, drugs and tobacco, and academic governance." },
      { property: "og:title", content: "University Policies — DUET Karachi" },
      { property: "og:description", content: "Official university policies at DUET Karachi covering conduct, anti-harassment, drugs and tobacco, and academic governance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/university-policies" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/university-policies" }],
  }),
  component: () => <ArchivedPage path="/university-policies" />,
});
