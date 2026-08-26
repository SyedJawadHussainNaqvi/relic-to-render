import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/business-incubation-center")({
  head: () => ({
    meta: [
      { title: "Business Incubation Center — DUET Karachi" },
      { name: "description", content: "The DUET Business Incubation Center helps students and graduates turn engineering ideas into ventures with workspace, mentoring and grant support." },
      { property: "og:title", content: "Business Incubation Center — DUET Karachi" },
      { property: "og:description", content: "The DUET Business Incubation Center helps students and graduates turn engineering ideas into ventures with workspace, mentoring and grant support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/business-incubation-center" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/business-incubation-center" }],
  }),
  component: () => <ArchivedPage path="/business-incubation-center" />,
});
