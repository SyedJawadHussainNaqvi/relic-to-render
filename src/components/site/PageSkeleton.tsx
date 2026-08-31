import { memo } from "react";

/** Global route loading skeleton (mirrors the hub page layout). */
export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <main className="animate-pulse" aria-busy="true" aria-label="Loading page">
      <div className="border-b border-border bg-brand/80">
        <div className="mx-auto max-w-[1200px] px-4 py-12">
          <div className="h-8 w-2/3 rounded bg-white/30 sm:h-10 sm:w-1/2" />
          <div className="mt-4 h-4 w-1/3 rounded bg-white/20" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-11/12 rounded bg-muted" />
          <div className="h-4 w-10/12 rounded bg-muted" />
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded border border-border bg-muted" />
            ))}
          </div>
        </div>
        <div className="hidden h-64 rounded border border-border bg-muted lg:block" />
      </div>
    </main>
  );
});
