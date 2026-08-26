import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.duet.edu.pk";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-duet", changefreq: "monthly", priority: "0.8" },
  { path: "/about-duet/historic-profile", changefreq: "yearly", priority: "0.6" },
  { path: "/about-duet/vision-mission", changefreq: "yearly", priority: "0.6" },
  { path: "/vice-chancellors-message-2", changefreq: "yearly", priority: "0.6" },
  { path: "/authorities", changefreq: "yearly", priority: "0.5" },
  { path: "/officers-2", changefreq: "yearly", priority: "0.5" },
  { path: "/organogram", changefreq: "yearly", priority: "0.4" },
  { path: "/directorates", changefreq: "yearly", priority: "0.5" },
  { path: "/academics", changefreq: "monthly", priority: "0.9" },
  { path: "/academic-calendar", changefreq: "monthly", priority: "0.7" },
  { path: "/faculty-departments", changefreq: "monthly", priority: "0.8" },
  { path: "/undergrad-programs", changefreq: "monthly", priority: "0.9" },
  { path: "/undergrad-regulations", changefreq: "yearly", priority: "0.5" },
  { path: "/postgraduate-programs", changefreq: "monthly", priority: "0.9" },
  { path: "/postgraduate-regulations", changefreq: "yearly", priority: "0.5" },
  { path: "/postgraduate-studies", changefreq: "monthly", priority: "0.7" },
  { path: "/regulations", changefreq: "yearly", priority: "0.5" },
  { path: "/outcome-based-education-obe", changefreq: "yearly", priority: "0.5" },
  { path: "/admissions", changefreq: "weekly", priority: "1.0" },
  { path: "/fee-structure", changefreq: "monthly", priority: "0.8" },
  { path: "/scholarships", changefreq: "monthly", priority: "0.7" },
  { path: "/scholarships-2", changefreq: "monthly", priority: "0.6" },
  { path: "/financial-assistance-departments", changefreq: "monthly", priority: "0.6" },
  { path: "/examinations", changefreq: "weekly", priority: "0.8" },
  { path: "/results", changefreq: "weekly", priority: "0.9" },
  { path: "/schedule", changefreq: "weekly", priority: "0.7" },
  { path: "/certificates", changefreq: "monthly", priority: "0.6" },
  { path: "/convocation", changefreq: "monthly", priority: "0.6" },
  { path: "/research-2", changefreq: "monthly", priority: "0.8" },
  { path: "/office-of-research-innovation-commercialisation", changefreq: "monthly", priority: "0.7" },
  { path: "/hec-approved-phd-supervisors", changefreq: "monthly", priority: "0.6" },
  { path: "/publications", changefreq: "monthly", priority: "0.6" },
  { path: "/projects", changefreq: "monthly", priority: "0.6" },
  { path: "/journal", changefreq: "monthly", priority: "0.6" },
  { path: "/funding-agencies", changefreq: "yearly", priority: "0.5" },
  { path: "/plagiarism-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/research-ethics-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/conference-seminars", changefreq: "monthly", priority: "0.6" },
  { path: "/seminars-workshops", changefreq: "monthly", priority: "0.6" },
  { path: "/quality-enhancement-cell", changefreq: "monthly", priority: "0.6" },
  { path: "/continues-professional-development", changefreq: "monthly", priority: "0.5" },
  { path: "/university-linkages", changefreq: "monthly", priority: "0.5" },
  { path: "/university-policies", changefreq: "yearly", priority: "0.5" },
  { path: "/business-incubation-center", changefreq: "monthly", priority: "0.6" },
  { path: "/incubation-centre", changefreq: "monthly", priority: "0.5" },
  { path: "/duet-cemet", changefreq: "monthly", priority: "0.5" },
  { path: "/about-cemet", changefreq: "monthly", priority: "0.5" },
  { path: "/microsoft-for-all", changefreq: "yearly", priority: "0.4" },
  { path: "/information-technology", changefreq: "monthly", priority: "0.5" },
  { path: "/students", changefreq: "monthly", priority: "0.7" },
  { path: "/students-affairs", changefreq: "monthly", priority: "0.6" },
  { path: "/students-societies", changefreq: "monthly", priority: "0.5" },
  { path: "/sports", changefreq: "monthly", priority: "0.5" },
  { path: "/career-counselling", changefreq: "monthly", priority: "0.5" },
  { path: "/careers", changefreq: "weekly", priority: "0.7" },
  { path: "/internships", changefreq: "monthly", priority: "0.6" },
  { path: "/industrial-liasons-alumni-affairs", changefreq: "monthly", priority: "0.5" },
  { path: "/alumni", changefreq: "monthly", priority: "0.6" },
  { path: "/shuttle-bus-routes", changefreq: "monthly", priority: "0.4" },
  { path: "/news", changefreq: "daily", priority: "0.9" },
  { path: "/newsletter", changefreq: "monthly", priority: "0.6" },
  { path: "/contacts", changefreq: "monthly", priority: "0.8" },
  { path: "/tenders", changefreq: "weekly", priority: "0.7" },
  { path: "/downloads", changefreq: "weekly", priority: "0.7" },
  { path: "/downloads-2", changefreq: "monthly", priority: "0.5" },
  { path: "/annual-report", changefreq: "yearly", priority: "0.5" },
  { path: "/video-gallery", changefreq: "monthly", priority: "0.4" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
