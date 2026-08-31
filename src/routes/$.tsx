import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { UnderConstruction } from "@/components/site/UnderConstruction";

const TITLE = "Page Under Construction — DUET Karachi";
const DESCRIPTION =
  "This section of the Dawood University of Engineering & Technology website is not published yet. Browse academics, admissions, examinations, research and student services instead.";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CatchAllPage,
});

function CatchAllPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return <UnderConstruction path={pathname} />;
}
