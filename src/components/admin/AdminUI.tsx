import type { ReactNode } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground";

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60 ${className}`}
    />
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded border border-border px-3 py-1.5 text-[13px] font-semibold text-brand hover:bg-muted disabled:opacity-60 ${className}`}
    />
  );
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded border border-destructive/40 px-3 py-1.5 text-[13px] font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-60 ${className}`}
    />
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded border border-border bg-card p-5">{children}</div>;
}

export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-brand">{title}</h2>
      {hint ? <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
