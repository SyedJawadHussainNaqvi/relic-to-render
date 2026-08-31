import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";
import { ExamScheduleBoard } from "@/components/site/ExamScheduleBoard";
import { PortalCta } from "@/components/site/PortalCta";

export const Route = createFileRoute("/examinations")({
  head: () => ({
    meta: [
      { title: "Examinations, Results & Schedules — DUET Karachi" },
      { name: "description", content: "The Controller of Examinations at DUET Karachi publishes exam schedules, results, certificates and examination regulations for all programs." },
      { property: "og:title", content: "Examinations, Results & Schedules — DUET Karachi" },
      { property: "og:description", content: "The Controller of Examinations at DUET Karachi publishes exam schedules, results, certificates and examination regulations for all programs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/examinations" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/examinations" }],
  }),
  component: ExaminationsPage,
});

function ExaminationsPage() {
  return (
    <>
      <ArchivedPage path="/examinations" />
      <div className="mx-auto max-w-[1200px] space-y-12 px-4 pb-12">
        <ExamScheduleBoard />
        <PortalCta portals={["student"]} heading="Results & transcripts" />
      </div>
    </>
  );
});
