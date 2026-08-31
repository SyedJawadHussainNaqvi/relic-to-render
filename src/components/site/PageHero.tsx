import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { campusBg } from "@/content/assets";

export const PageHero = memo(function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="relative border-b border-border bg-brand-dark bg-cover bg-center"
      style={campusBg ? { backgroundImage: `url(${campusBg})` } : undefined}
    >
      <div className="bg-brand/80">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-14">
          <h1 className="font-display text-2xl font-semibold text-white sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 max-w-3xl text-[14.5px] leading-7 text-white/85">{subtitle}</p>
          ) : null}
          <p className="mt-2 text-[13px] text-white/75">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <span className="px-1.5">/</span>
            <span>{title}</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export const SectionHeading = memo(function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="border-b border-border pb-2 font-display text-xl font-semibold text-brand sm:text-2xl"
    >
      {children}
    </h2>
  );
});
