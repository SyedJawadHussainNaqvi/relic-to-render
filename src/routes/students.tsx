import { createFileRoute } from "@tanstack/react-router";
import { ArchivedPage } from "@/components/site/ArchivedPage";
import { PortalCta } from "@/components/site/PortalCta";
import { StudentServices } from "@/components/site/StudentServices";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Student Services & Campus Life — DUET Karachi" },
      { name: "description", content: "Student resources at DUET Karachi: students affairs, societies, sports, career counselling, internships, transport and alumni services." },
      { property: "og:title", content: "Student Services & Campus Life — DUET Karachi" },
      { property: "og:description", content: "Student resources at DUET Karachi: students affairs, societies, sports, career counselling, internships, transport and alumni services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/students" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/students" }],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  return (
    <>
      <ArchivedPage path="/students" />
      <div className="mx-auto max-w-[1200px] space-y-12 px-4 pb-12">
        <PortalCta portals={["student", "library", "admissions"]} heading="Student portals" />
        <StudentServices />
      </div>
    </>
  );
});
