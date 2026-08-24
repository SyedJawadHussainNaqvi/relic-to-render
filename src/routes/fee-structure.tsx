import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/fee-structure")({
  head: () => ({
    meta: [
      { title: "Fee Structures — DUET Karachi" },
      { name: "description", content: "Namun, ketika Ukraina terjerat dalam konflik mematikan dengan Rusia, Pielieshenko merasa panggilan yang lebih tinggi. Ia tidak hanya ingin memperjuangkan p" },
      { property: "og:title", content: "Fee Structures — DUET Karachi" },
      { property: "og:description", content: "Namun, ketika Ukraina terjerat dalam konflik mematikan dengan Rusia, Pielieshenko merasa panggilan yang lebih tinggi. Ia tidak hanya ingin memperjuangkan p" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fee-structure" },
    ],
    links: [{ rel: "canonical", href: "/fee-structure" }],
  }),
  component: () => <ArchivedPage path="/fee-structure" />,
});
