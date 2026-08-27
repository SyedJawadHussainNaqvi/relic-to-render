import { createFileRoute, Link } from "@tanstack/react-router";
import { campusBg } from "@/content/assets";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contact Us — DUET Karachi" },
      {
        name: "description",
        content:
          "Contact Dawood University of Engineering & Technology, Karachi. Campus address, phone numbers, email and key university offices.",
      },
      { property: "og:title", content: "Contact Us — DUET Karachi" },
      {
        property: "og:description",
        content:
          "Contact Dawood University of Engineering & Technology, Karachi. Campus address, phone numbers, email and key university offices.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.duet.edu.pk/contacts" },
      { property: "og:image", content: "https://www.duet.edu.pk/media/about.jpg" },
      { name: "twitter:image", content: "https://www.duet.edu.pk/media/about.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://www.duet.edu.pk/contacts" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: "Dawood University of Engineering & Technology",
          alternateName: ["DUET Karachi", "DUET"],
          description:
            "Contact details, campus address, phone numbers and department emails for Dawood University of Engineering & Technology (DUET), New M. A. Jinnah Road, Karachi.",

          url: "https://www.duet.edu.pk/",
          logo: "https://www.duet.edu.pk/media/duet_logo-300x227.png",
          telephone: "+92-21-99213151",
          email: "info@duet.edu.pk",
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
              telephone: "+92-21-99230706",
              email: "admissions@duet.edu.pk",
              areaServed: "PK",
            },
            {
              "@type": "ContactPoint",
              contactType: "registrar",
              telephone: "+92-21-99232645",
              email: "registrar@duet.edu.pk",
              areaServed: "PK",
            },
            {
              "@type": "ContactPoint",
              contactType: "examinations",
              telephone: "+92-21-99230476",
              email: "controller.examination@duet.edu.pk",
              areaServed: "PK",
            },
          ],
        }),
      },
    ],

  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <main>
      <div
        className="border-b border-border bg-brand-dark bg-cover bg-center"
        style={campusBg ? { backgroundImage: `url(${campusBg})` } : undefined}
      >
        <div className="bg-brand/80">
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-14">
            <h1 className="font-display text-2xl font-semibold text-white sm:text-4xl">Contact Us</h1>
            <p className="mt-2 text-[13px] text-white/75">
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
              <span className="px-1.5">/</span>
              <span>Contact Us</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-brand">Main Campus</h2>
            <address className="mt-4 not-italic text-[15px] leading-7 text-foreground/90">
              <p className="font-medium">Dawood University of Engineering &amp; Technology</p>
              <p>M.A. Jinnah Road, Karachi-74800, Sindh, Pakistan.</p>
              <p className="mt-3">
                Phone:{" "}
                <a href="tel:+922199213151" className="text-brand hover:underline">
                  +92-21-99213151-52
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:info@duet.edu.pk" className="text-brand hover:underline">
                  info@duet.edu.pk
                </a>
              </p>
            </address>
          </section>

          <section className="rounded border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-brand">Key Offices</h2>
            <ul className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/90">
              <li>
                <p className="font-medium">Registrar</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+922199232645" className="text-brand hover:underline">
                    +92 21 9923 2645
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:registrar@duet.edu.pk" className="text-brand hover:underline">
                    registrar@duet.edu.pk
                  </a>
                </p>
              </li>
              <li>
                <p className="font-medium">Controller of Examinations</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+922199230476" className="text-brand hover:underline">
                    +92 21 9923 0476
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:controller.examination@duet.edu.pk" className="text-brand hover:underline">
                    controller.examination@duet.edu.pk
                  </a>
                </p>
              </li>
              <li>
                <p className="font-medium">Directorate of Admissions</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+922199230706" className="text-brand hover:underline">
                    +92 21 99230706
                  </a>
                  ,{" "}
                  <a href="tel:+923453656773" className="text-brand hover:underline">
                    +92 345 3656773
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:admissions@duet.edu.pk" className="text-brand hover:underline">
                    admissions@duet.edu.pk
                  </a>
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
