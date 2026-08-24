import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/incubation-centre")({
  head: () => ({
    meta: [
      { title: "INCUBATION CENTRE — DUET Karachi" },
      { name: "description", content: "The proposal filled in all respects and with all required attachments (provided in the template) must reach at the following address on or before 20th Octo" },
      { property: "og:title", content: "INCUBATION CENTRE — DUET Karachi" },
      { property: "og:description", content: "The proposal filled in all respects and with all required attachments (provided in the template) must reach at the following address on or before 20th Octo" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/incubation-centre" },
    ],
    links: [{ rel: "canonical", href: "/incubation-centre" }],
  }),
  component: () => <ArchivedPage path="/incubation-centre" />,
});
