/**
 * Minimal real-user Core Web Vitals reporter. Uses PerformanceObserver only —
 * no third-party script, so the strict CSP stays intact.
 */
const endpointOrigin = (import.meta.env["VITE_SOC_REPORT_ORIGIN"] as string | undefined)?.replace(
  /\/$/,
  "",
);

type Metric = "LCP" | "CLS" | "INP" | "TTFB" | "FCP";

const THRESHOLDS: Record<Metric, [number, number]> = {
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  TTFB: [800, 1800],
  FCP: [1800, 3000],
};

function rate(metric: Metric, value: number) {
  const [good, poor] = THRESHOLDS[metric];
  return value <= good ? "good" : value <= poor ? "needs-improvement" : "poor";
}

function device() {
  const width = window.innerWidth;
  return width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
}

function send(metric: Metric, value: number) {
  const body = JSON.stringify({
    metric,
    value: Math.round(value * 1000) / 1000,
    rating: rate(metric, value),
    path: window.location.pathname,
    device: device(),
  });
  const url = `${endpointOrigin ?? ""}/api/public/web-vitals`;
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    /* fall through to fetch */
  }
  void fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(
    () => undefined,
  );
}

/** Starts collection. Safe to call once, from a client effect. */
export function reportWebVitals() {
  if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") return;

  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (nav) send("TTFB", nav.responseStart);

  const observe = (type: string, handler: (entries: PerformanceEntryList) => void) => {
    try {
      const observer = new PerformanceObserver((list) => handler(list.getEntries()));
      observer.observe({ type, buffered: true } as PerformanceObserverInit);
      return observer;
    } catch {
      return null;
    }
  };

  let lcp = 0;
  observe("largest-contentful-paint", (entries) => {
    const last = entries[entries.length - 1] as (PerformanceEntry & { startTime: number }) | undefined;
    if (last) lcp = last.startTime;
  });

  observe("paint", (entries) => {
    for (const entry of entries) if (entry.name === "first-contentful-paint") send("FCP", entry.startTime);
  });

  let cls = 0;
  observe("layout-shift", (entries) => {
    for (const entry of entries as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
      if (!entry.hadRecentInput) cls += entry.value;
    }
  });

  let inp = 0;
  observe("event", (entries) => {
    for (const entry of entries as (PerformanceEntry & { duration: number; interactionId?: number })[]) {
      if (entry.interactionId && entry.duration > inp) inp = entry.duration;
    }
  });

  const flush = () => {
    if (lcp) {
      send("LCP", lcp);
      lcp = 0;
    }
    send("CLS", cls);
    if (inp) {
      send("INP", inp);
      inp = 0;
    }
  };

  addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") flush();
    },
    { once: true },
  );
  addEventListener("pagehide", flush, { once: true });
}
