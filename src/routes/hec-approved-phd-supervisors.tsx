import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/hec-approved-phd-supervisors")({
  head: () => ({
    meta: [
      { title: "HEC Approved PhD Supervisors — DUET Karachi" },
      { name: "description", content: "List of HEC approved PhD supervisors at DUET Karachi and their departments for prospective postgraduate research students." },
      { property: "og:title", content: "HEC Approved PhD Supervisors — DUET Karachi" },
      { property: "og:description", content: "List of HEC approved PhD supervisors at DUET Karachi and their departments for prospective postgraduate research students." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/hec-approved-phd-supervisors" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/hec-approved-phd-supervisors" }],
  }),
  component: () => <ArchivedPage path="/hec-approved-phd-supervisors" />,
});
