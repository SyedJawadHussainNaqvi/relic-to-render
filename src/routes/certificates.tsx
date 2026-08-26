import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Degree & Transcript Certificates — DUET Karachi" },
      { name: "description", content: "How DUET Karachi students request degrees, transcripts, migration and character certificates through the Controller of Examinations office." },
      { property: "og:title", content: "Degree & Transcript Certificates — DUET Karachi" },
      { property: "og:description", content: "How DUET Karachi students request degrees, transcripts, migration and character certificates through the Controller of Examinations office." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/certificates" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/certificates" }],
  }),
  component: () => <ArchivedPage path="/certificates" />,
});
