import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";

export const Route = createFileRoute("/about-duet/historic-profile")({
  head: () => ({
    meta: [
      { title: "Historic Profile — DUET Karachi" },
      { name: "description", content: "Dawood College of Engineering and Technology (DCET), Karachi holds a significant status of being the first Professional College imparting Engineering Educa" },
      { property: "og:title", content: "Historic Profile — DUET Karachi" },
      { property: "og:description", content: "Dawood College of Engineering and Technology (DCET), Karachi holds a significant status of being the first Professional College imparting Engineering Educa" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/about-duet/historic-profile" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/about-duet/historic-profile" }],
  }),
  component: () => <ArchivedPage path="/about-duet/historic-profile" />,
});
