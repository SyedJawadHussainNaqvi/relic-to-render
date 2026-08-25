import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { MenuItem } from "@/content/menu";
import { logo } from "@/content/assets";
import { useSiteMenu } from "@/hooks/useSiteMenu";

function ItemLink({ item, className }: { item: MenuItem; className?: string }) {
  if (item.href) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link to={item.to ?? "/"} className={className}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const { main: mainMenu, utility: utilityLinks, cemet: cemetLinks } = useSiteMenu();

  return (
    <header className="w-full">
      {/* Utility bar */}
      <div className="bg-brand text-brand-foreground text-[12px]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 py-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold tracking-wide">DUET-CEMET</span>
            {cemetLinks.map((l) => (
              <ItemLink key={l.label} item={l} className="hover:text-accent" />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {utilityLinks.map((l) => (
              <ItemLink key={l.label} item={l} className="hover:text-accent" />
            ))}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-3 py-3">
          <Link to="/" className="flex items-center gap-3">
            {logo ? <img src={logo} alt="Dawood University of Engineering & Technology" className="h-16 w-auto" /> : null}
            <span className="font-display text-brand leading-tight">
              <span className="block text-lg font-semibold sm:text-2xl">Dawood University</span>
              <span className="block text-[11px] sm:text-sm">of Engineering &amp; Technology Karachi</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-accent-strong sm:text-xs">
                University of Relevance
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            className="rounded border border-border px-3 py-2 text-sm text-brand lg:hidden"
            aria-expanded={openMobile}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Main menu */}
      <nav className="hidden bg-brand-dark text-brand-foreground lg:block" aria-label="Main menu">
        <ul className="mx-auto flex max-w-[1200px] items-stretch px-3">
          {mainMenu.map((group) => (
            <li key={group.label} className="group relative">
              <Link
                to={group.to ?? "/"}
                className="block px-3 py-3 text-[12.5px] font-semibold tracking-wide hover:bg-accent hover:text-brand-dark"
                activeProps={{ className: "bg-accent text-brand-dark" }}
              >
                {group.label}
              </Link>
              {group.items.length > 0 ? (
                <ul className="invisible absolute left-0 top-full z-30 w-72 border-t-2 border-accent bg-card py-1 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <ItemLink
                        item={item}
                        className="block px-4 py-2 text-[13px] text-foreground hover:bg-muted hover:text-brand"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      {openMobile ? (
        <nav className="bg-brand-dark text-brand-foreground lg:hidden" aria-label="Mobile menu">
          <ul className="mx-auto max-w-[1200px] divide-y divide-white/10 px-3 py-2">
            {mainMenu.map((group) => (
              <li key={group.label} className="py-2">
                <Link
                  to={group.to ?? "/"}
                  onClick={() => setOpenMobile(false)}
                  className="block text-[13px] font-semibold tracking-wide"
                >
                  {group.label}
                </Link>
                {group.items.length > 0 ? (
                  <ul className="mt-1 space-y-1 pl-3">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <ItemLink item={item} className="block py-1 text-[12.5px] text-white/80" />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
