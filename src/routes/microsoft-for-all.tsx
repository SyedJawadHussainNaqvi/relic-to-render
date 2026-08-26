import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/microsoft-for-all")({
  head: () => ({
    meta: [
      { title: "Microsoft for All Program — DUET Karachi" },
      { name: "description", content: "Details of the Microsoft for All initiative at DUET Karachi, giving students and staff access to Microsoft software and learning resources." },
      { property: "og:title", content: "Microsoft for All Program — DUET Karachi" },
      { property: "og:description", content: "Details of the Microsoft for All initiative at DUET Karachi, giving students and staff access to Microsoft software and learning resources." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/microsoft-for-all" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/microsoft-for-all" }],
  }),
  component: () => <ArchivedPage path="/microsoft-for-all" />,
});
