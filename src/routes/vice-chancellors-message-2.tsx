import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/vice-chancellors-message-2")({
  head: () => ({
    meta: [
      { title: "Vice Chancellor’s Message — DUET Karachi" },
      { name: "description", content: "I am grateful to Allah the Almighty for His countless blessings in me. I am indebted to Honourable Chief Minister Syed Murad Ali Shah for his trust in me a" },
      { property: "og:title", content: "Vice Chancellor’s Message — DUET Karachi" },
      { property: "og:description", content: "I am grateful to Allah the Almighty for His countless blessings in me. I am indebted to Honourable Chief Minister Syed Murad Ali Shah for his trust in me a" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/vice-chancellors-message-2" },
    ],
    links: [{ rel: "canonical", href: "/vice-chancellors-message-2" }],
  }),
  component: () => <ArchivedPage path="/vice-chancellors-message-2" />,
});
