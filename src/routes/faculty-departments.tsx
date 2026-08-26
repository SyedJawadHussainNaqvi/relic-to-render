import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/faculty-departments")({
  head: () => ({
    meta: [
      { title: "Faculty & Engineering Departments — DUET Karachi" },
      { name: "description", content: "Engineering, architecture and applied science departments at DUET Karachi — chemical, electronic, industrial, metallurgy, petroleum, energy and environment." },
      { property: "og:title", content: "Faculty & Engineering Departments — DUET Karachi" },
      { property: "og:description", content: "Engineering, architecture and applied science departments at DUET Karachi — chemical, electronic, industrial, metallurgy, petroleum, energy and environment." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/faculty-departments" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/faculty-departments" }],
  }),
  component: () => <ArchivedPage path="/faculty-departments" />,
});
