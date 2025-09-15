export {};

type Gtag = {
  (command: "js", date: Date): void;
  (command: "config", measurementId: string, config?: Record<string, unknown>): void;
  (command: "event", eventName: string, params?: Record<string, unknown>): void;
  (command: "consent", state: "default" | "update", params: Record<string, "granted" | "denied">): void;
  (command: "set", params: Record<string, unknown>): void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}
