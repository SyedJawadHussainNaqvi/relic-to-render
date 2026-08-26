import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/scholarships-2")({
  head: () => ({
    meta: [
      { title: "Scholarship Announcements Archive — DUET Karachi" },
      { name: "description", content: "Archived scholarship announcements and award notices for DUET Karachi students, kept alongside the main scholarships page." },
      { property: "og:title", content: "Scholarship Announcements Archive — DUET Karachi" },
      { property: "og:description", content: "Archived scholarship announcements and award notices for DUET Karachi students, kept alongside the main scholarships page." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/scholarships-2" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/scholarships-2" }],
  }),
  component: () => <ArchivedPage path="/scholarships-2" />,
});
