import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/academic-calendar")({
  head: () => ({
    meta: [
      { title: "Academic Calendar — DUET Karachi" },
      { name: "description", content: "Download the DUET Karachi academic calendars for BE, BS and MS/PhD programs, with semester start dates, examinations and breaks." },
      { property: "og:title", content: "Academic Calendar — DUET Karachi" },
      { property: "og:description", content: "Download the DUET Karachi academic calendars for BE, BS and MS/PhD programs, with semester start dates, examinations and breaks." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/academic-calendar" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/academic-calendar" }],
  }),
  component: () => <ArchivedPage path="/academic-calendar" />,
});
