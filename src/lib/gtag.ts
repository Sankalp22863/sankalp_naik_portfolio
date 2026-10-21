const configuredId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const GA_ID = /^G-[A-Z0-9]+$/.test(configuredId.trim()) ? configuredId.trim() : "";
export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export function trackEvent(name: string, parameters: Record<string, string | number> = {}) {
  if (ANALYTICS_ENABLED && typeof window !== "undefined") {
    window.gtag?.("event", name, parameters);
  }
}
