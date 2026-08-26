import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { aboutImg, campusBg } from "@/content/assets";
import HomeSections from "@/components/home/HomeSections";
import { newsQueryOptions, resolveSlides, slidesQueryOptions } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DUET Karachi | Dawood University of Engineering & Technology" },
      {
        name: "description",
        content:
          "Dawood University of Engineering & Technology (DUET), Karachi — public sector engineering university in Pakistan offering BE, BS, MS and PhD programs, admissions, fee structure, results and research.",
      },
      { name: "keywords", content: "DUET Karachi, Dawood University, engineering universities in Karachi, DUET admission, DUET fee structure, DUET results, engineering university Pakistan" },
      { name: "geo.region", content: "PK-SD" },
      { name: "geo.placename", content: "Karachi" },

      { property: "og:title", content: "Dawood University of Engineering & Technology, Karachi" },
      {
        property: "og:description",
        content:
          "DUET Karachi: engineering, architecture and technology programs, admissions, examinations, research and student services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: "Dawood University of Engineering & Technology",
          alternateName: ["DUET Karachi", "DUET", "Dawood University", "DCET Karachi"],
          url: "https://www.duet.edu.pk/",
          logo: "https://www.duet.edu.pk/media/duet_logo-300x227.png",
          image: "https://www.duet.edu.pk/media/about.jpg",
          description:
            "Public sector engineering university in Karachi, Pakistan offering undergraduate, postgraduate and doctoral programs in engineering, architecture, planning and basic sciences.",
          foundingDate: "1962",
          address: {
            "@type": "PostalAddress",
            streetAddress: "New M. A. Jinnah Road",
            addressLocality: "Karachi",
            addressRegion: "Sindh",
            postalCode: "74800",
            addressCountry: "PK",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "admissions",
              url: "https://admissions.duet.edu.pk/",
              areaServed: "PK",
              availableLanguage: ["en", "ur"],
            },
          ],
          numberOfStudents: 3000,
          subOrganization: [
            { "@type": "CollegeOrUniversity", name: "DUET Main Campus, Karachi" },
            { "@type": "CollegeOrUniversity", name: "DUET Second Campus, Karachi" },
          ],
          sameAs: ["https://admissions.duet.edu.pk/"],
        }),
      },
    ],
  }),

  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(slidesQueryOptions),
      context.queryClient.ensureQueryData(newsQueryOptions),
    ]);
  },
  component: Index,
});

const stats = [
  { value: "02", label: "Campuses" },
  { value: "3000+", label: "Students" },
  { value: "13", label: "Departments" },
  { value: "11", label: "Convocations" },
];

const Slider = memo(function Slider() {
  const { data } = useQuery(slidesQueryOptions);
  const slides = useMemo(() => resolveSlides(data ?? []), [data]);
  const [i, setI] = useState(0);
  const count = slides.length;
  useEffect(() => {
    if (count < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);
  const select = useCallback((idx: number) => setI(idx), []);
  const active = count ? i % count : 0;
  const current = slides[active];

  return (
    <section className="relative bg-brand-dark">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[420px] lg:h-[520px]">
        {slides.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "low"}
            width={1600}
            height={700}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-[1200px] px-4 pb-8">
            <p className="font-display text-lg font-semibold text-white drop-shadow sm:text-3xl">
              {current?.caption}
            </p>
            <div className="mt-4 flex gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.src}
                  type="button"
                  aria-label={`Show slide ${idx + 1}`}
                  onClick={() => select(idx)}
                  className={`h-2 w-6 rounded-full transition-colors ${
                    idx === active ? "bg-accent" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

function Index() {

  return (
    <main>
      <Slider />

      {/* Quick links strip */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-2 px-4 py-3">
          {[
            { label: "Apply Online", href: "https://admissions.duet.edu.pk/" },
            { label: "Undergraduate Programs", to: "/undergrad-programs" },
            { label: "Postgraduate Programs", to: "/postgraduate-programs" },
            { label: "Fee Structure", to: "/fee-structure" },
            { label: "Results", to: "/results" },
            { label: "Downloads", to: "/downloads" },
          ].map((l) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded bg-brand px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-brand-dark"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to as string}
                className="rounded bg-brand px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-brand-dark"
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Welcome */}
      <section className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand sm:text-3xl">
            Welcome to Dawood University of Engineering &amp; Technology
          </h1>
          <div className="mt-2 h-1 w-24 bg-accent" />
          <p className="mt-5 text-[15px] leading-7 text-foreground/90">
            Dawood College of Engineering and Technology (DCET), Karachi holds the significant status of
            being the first professional college imparting engineering education established in the
            private sector of Pakistan. The foundation stone of the institution was laid in 1962, and it
            was later upgraded to Dawood University of Engineering &amp; Technology.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-foreground/90">
            The University offers undergraduate, postgraduate and doctoral programs in engineering,
            architecture, planning and basic sciences, and is committed to producing graduates with the
            technical competence and ethical grounding required by industry and society.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/about-duet/historic-profile"
              className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              aria-label="Read more about DUET's historic profile"
            >
              Read more about DUET
            </Link>
            <Link
              to="/vice-chancellors-message-2"
              className="rounded border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-muted"
            >
              Vice Chancellor's Message
            </Link>
          </div>
        </div>
        {aboutImg ? (
          <img
            src={aboutImg}
            alt="Dawood University of Engineering & Technology campus building"
            loading="lazy"
            width={900}
            height={600}
            className="h-full w-full rounded object-cover shadow"
          />
        ) : null}
      </section>

      {/* Stats */}
      <section
        className="border-y border-border bg-brand bg-cover bg-center bg-blend-multiply"
        style={campusBg ? { backgroundImage: `url(${campusBg})` } : undefined}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-[13px] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Below-the-fold sections (memoized, data-driven) */}
      <HomeSections />

    </main>
  );
}
