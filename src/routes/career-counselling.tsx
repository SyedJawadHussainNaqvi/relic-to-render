import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/career-counselling")({
  head: () => ({
    meta: [
      { title: "Career Counselling — DUET Karachi" },
      { name: "description", content: "Career Counselling at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Career Counselling — DUET Karachi" },
      { property: "og:description", content: "Career Counselling at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/career-counselling" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/career-counselling" }],
  }),
  component: () => <ArchivedPage path="/career-counselling" />,
});
