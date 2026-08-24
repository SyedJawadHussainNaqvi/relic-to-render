import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/office-of-research-innovation-commercialisation")({
  head: () => ({
    meta: [
      { title: "Office of Research Innovation & Commercialisation — DUET Karachi" },
      { name: "description", content: "Dawood College of Engineering & Technology was established in 1964 and in 2013 upgraded to Dawood University of Engineering & Technology (DUET). DUET initi" },
      { property: "og:title", content: "Office of Research Innovation & Commercialisation — DUET Karachi" },
      { property: "og:description", content: "Dawood College of Engineering & Technology was established in 1964 and in 2013 upgraded to Dawood University of Engineering & Technology (DUET). DUET initi" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/office-of-research-innovation-commercialisation" },
    ],
    links: [{ rel: "canonical", href: "/office-of-research-innovation-commercialisation" }],
  }),
  component: () => <ArchivedPage path="/office-of-research-innovation-commercialisation" />,
});
