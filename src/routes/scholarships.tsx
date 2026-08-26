import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships for Students — DUET Karachi" },
      { name: "description", content: "Scholarship opportunities at DUET Karachi, including need-based and merit awards for engineering, architecture and computing students." },
      { property: "og:title", content: "Scholarships for Students — DUET Karachi" },
      { property: "og:description", content: "Scholarship opportunities at DUET Karachi, including need-based and merit awards for engineering, architecture and computing students." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/scholarships" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/scholarships" }],
  }),
  component: () => <ArchivedPage path="/scholarships" />,
});
