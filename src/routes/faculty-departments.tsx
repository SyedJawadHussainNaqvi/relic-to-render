import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/faculty-departments")({
  head: () => ({
    meta: [
      { title: "Faculty & Departments — DUET Karachi" },
      { name: "description", content: "The foundation stone of the Dawood College was laid by the former President of Pakistan (Late) Field Marshal Muhammad Ayub Khan in 1962. The Government of " },
      { property: "og:title", content: "Faculty & Departments — DUET Karachi" },
      { property: "og:description", content: "The foundation stone of the Dawood College was laid by the former President of Pakistan (Late) Field Marshal Muhammad Ayub Khan in 1962. The Government of " },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/faculty-departments" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/faculty-departments" }],
  }),
  component: () => <ArchivedPage path="/faculty-departments" />,
});
