import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Faculty Jobs — DUET Karachi" },
      { name: "description", content: "Current job openings at DUET Karachi, online application links and eligibility criteria for visiting faculty and university staff positions." },
      { property: "og:title", content: "Careers & Faculty Jobs — DUET Karachi" },
      { property: "og:description", content: "Current job openings at DUET Karachi, online application links and eligibility criteria for visiting faculty and university staff positions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/careers" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/careers" }],
  }),
  component: () => <ArchivedPage path="/careers" />,
});
