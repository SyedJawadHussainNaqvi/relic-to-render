import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — DUET Karachi" },
      { name: "description", content: "Certificates at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "Certificates — DUET Karachi" },
      { property: "og:description", content: "Certificates at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/certificates" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/certificates" }],
  }),
  component: () => <ArchivedPage path="/certificates" />,
});
