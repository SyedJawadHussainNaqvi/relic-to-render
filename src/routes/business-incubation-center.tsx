import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/business-incubation-center")({
  head: () => ({
    meta: [
      { title: "Business Incubation Center — DUET Karachi" },
      { name: "description", content: "Business Incubation Center at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Business Incubation Center — DUET Karachi" },
      { property: "og:description", content: "Business Incubation Center at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/business-incubation-center" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/business-incubation-center" }],
  }),
  component: () => <ArchivedPage path="/business-incubation-center" />,
});
