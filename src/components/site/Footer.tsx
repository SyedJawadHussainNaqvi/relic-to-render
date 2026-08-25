import { Link } from "@tanstack/react-router";
import { logoSquare } from "@/content/assets";
import { useSiteMenu } from "@/hooks/useSiteMenu";

export function Footer() {
  const { main: mainMenu, utility: utilityLinks } = useSiteMenu();

  return (
    <footer className="mt-10 bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {logoSquare ? <img src={logoSquare} alt="DUET monogram" className="h-14 w-14" /> : null}
            <span className="font-display text-lg font-semibold">DUET Karachi</span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-white/80">
            Dawood University of Engineering &amp; Technology, M.A. Jinnah Road, Karachi-74800, Sindh,
            Pakistan.
          </p>
          <p className="mt-2 text-[13px] text-white/80">
            Phone: +92-21-99213151-52
            <br />
            Email: info@duet.edu.pk
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            Quick Links
          </h2>
          <ul className="mt-3 space-y-1.5 text-[13px] text-white/85">
            {utilityLinks.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to ?? "/"} className="hover:text-accent">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            University
          </h2>
          <ul className="mt-3 space-y-1.5 text-[13px] text-white/85">
            {mainMenu.slice(0, 5).map((g) => (
              <li key={g.label}>
                <Link to={g.to ?? "/"} className="hover:text-accent">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
            Students
          </h2>
          <ul className="mt-3 space-y-1.5 text-[13px] text-white/85">
            <li>
              <Link to="/results" className="hover:text-accent">
                Examination Results
              </Link>
            </li>
            <li>
              <Link to="/academic-calendar" className="hover:text-accent">
                Academic Calendar
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="hover:text-accent">
                Scholarships
              </Link>
            </li>
            <li>
              <Link to="/shuttle-bus-routes" className="hover:text-accent">
                Shuttle Bus Routes
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-accent">
                News &amp; Events
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 py-3 text-center text-[12px] text-white/70">
        Copyright © Dawood University of Engineering &amp; Technology, Karachi. All rights reserved.
      </div>
    </footer>
  );
}
