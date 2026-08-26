import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/hec-approved-phd-supervisors")({
  head: () => ({
    meta: [
      { title: "HEC Approved PhD Supervisors — DUET Karachi" },
      { name: "description", content: "HEC Approved PhD Supervisors at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:title", content: "HEC Approved PhD Supervisors — DUET Karachi" },
      { property: "og:description", content: "HEC Approved PhD Supervisors at Dawood University of Engineering & Technology, Karachi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/hec-approved-phd-supervisors" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/hec-approved-phd-supervisors" }],
  }),
  component: () => <ArchivedPage path="/hec-approved-phd-supervisors" />,
});
