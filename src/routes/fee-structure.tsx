import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/fee-structure")({
  head: () => ({
    meta: [
      { title: "Fee Structure for BE, BS, MS & PhD Programs — DUET Karachi" },
      { name: "description", content: "Tuition and semester fee structure for BE, BS, MS and PhD programs at Dawood University of Engineering & Technology (DUET), Karachi, Pakistan." },
      { property: "og:title", content: "Fee Structure for BE, BS, MS & PhD Programs — DUET Karachi" },
      { property: "og:description", content: "Tuition and semester fee structure for BE, BS, MS and PhD programs at Dawood University of Engineering & Technology (DUET), Karachi, Pakistan." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/fee-structure" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/fee-structure" }],
  }),
  component: () => <ArchivedPage path="/fee-structure" />,
});
