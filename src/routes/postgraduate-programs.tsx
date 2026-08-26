import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/postgraduate-programs")({
  head: () => ({
    meta: [
      { title: "MS & PhD Postgraduate Programs — DUET Karachi" },
      { name: "description", content: "Postgraduate MS and PhD programs offered by DUET Karachi across engineering, architecture, computing and applied science disciplines." },
      { property: "og:title", content: "MS & PhD Postgraduate Programs — DUET Karachi" },
      { property: "og:description", content: "Postgraduate MS and PhD programs offered by DUET Karachi across engineering, architecture, computing and applied science disciplines." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/postgraduate-programs" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/postgraduate-programs" }],
  }),
  component: () => <ArchivedPage path="/postgraduate-programs" />,
});
