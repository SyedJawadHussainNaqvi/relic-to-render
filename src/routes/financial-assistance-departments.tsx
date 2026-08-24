import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/financial-assistance-departments")({
  head: () => ({
    meta: [
      { title: "Financial Assistance Departments — DUET Karachi" },
      { name: "description", content: "Students from humble backgrounds always remain under continuous financial pressure. The effects of the weak economy, due to the Covid-19 pandemic, have fur" },
      { property: "og:title", content: "Financial Assistance Departments — DUET Karachi" },
      { property: "og:description", content: "Students from humble backgrounds always remain under continuous financial pressure. The effects of the weak economy, due to the Covid-19 pandemic, have fur" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/financial-assistance-departments" },
    ],
    links: [{ rel: "canonical", href: "/financial-assistance-departments" }],
  }),
  component: () => <ArchivedPage path="/financial-assistance-departments" />,
});
