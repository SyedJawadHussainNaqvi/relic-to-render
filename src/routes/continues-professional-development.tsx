import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/continues-professional-development")({
  head: () => ({
    meta: [
      { title: "Continues Professional Development — DUET Karachi" },
      { name: "description", content: "Add Your Heading Text HereDirectorate of Continuing Professional Development, Dawood University of engineering and Technology was established in 2008. The " },
      { property: "og:title", content: "Continues Professional Development — DUET Karachi" },
      { property: "og:description", content: "Add Your Heading Text HereDirectorate of Continuing Professional Development, Dawood University of engineering and Technology was established in 2008. The " },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/continues-professional-development" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/continues-professional-development" }],
  }),
  component: () => <ArchivedPage path="/continues-professional-development" />,
});
