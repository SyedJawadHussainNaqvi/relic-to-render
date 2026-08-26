import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Examination Schedules & Date Sheets — DUET Karachi" },
      { name: "description", content: "Current examination date sheets and schedules for DUET Karachi programs, published by the Controller of Examinations." },
      { property: "og:title", content: "Examination Schedules & Date Sheets — DUET Karachi" },
      { property: "og:description", content: "Current examination date sheets and schedules for DUET Karachi programs, published by the Controller of Examinations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/schedule" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/schedule" }],
  }),
  component: () => <ArchivedPage path="/schedule" />,
});
