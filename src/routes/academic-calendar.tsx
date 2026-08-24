import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/academic-calendar")({
  head: () => ({
    meta: [
      { title: "Academic Calendar — DUET Karachi" },
      { name: "description", content: "The foundation stone of the Dawood College was laid by the former President of Pakistan (Late) Field Marshal Muhammad Ayub Khan in 1962. The Government of " },
      { property: "og:title", content: "Academic Calendar — DUET Karachi" },
      { property: "og:description", content: "The foundation stone of the Dawood College was laid by the former President of Pakistan (Late) Field Marshal Muhammad Ayub Khan in 1962. The Government of " },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/academic-calendar" },
    ],
    links: [{ rel: "canonical", href: "/academic-calendar" }],
  }),
  component: () => <ArchivedPage path="/academic-calendar" />,
});
