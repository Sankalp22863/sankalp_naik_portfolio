"use client";

import { useEffect } from "react";
import { ANALYTICS_ENABLED, trackEvent } from "@/lib/gtag";

export default function Analytics() {
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        trackEvent("section_navigation", { section_id: href.slice(1) });
        return;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        trackEvent("contact_click", { contact_method: href.startsWith("mailto:") ? "email" : "phone" });
        return;
      }

      const url = new URL(link.href);
      if (url.origin === window.location.origin && /\/(AcademicCV|SankalpNaikResume)\.pdf$/.test(url.pathname)) {
        trackEvent("cv_download", { document_name: url.pathname.endsWith("/AcademicCV.pdf") ? "Academic CV" : "Resume" });
        return;
      }

      const section = link.closest("section[id]");
      const article = link.closest("article");
      const contentEvents: Record<string, string> = {
        projects: "project_click",
        publications: "publication_click",
        articles: "article_click",
      };
      const eventName = section ? contentEvents[section.id] : undefined;
      if (eventName && article) {
        trackEvent(eventName, { content_title: article.querySelector("h3")?.textContent || "", link_domain: url.hostname });
      } else if (url.hostname === "github.com" || url.hostname === "www.linkedin.com") {
        trackEvent("social_click", { platform: url.hostname === "github.com" ? "GitHub" : "LinkedIn" });
      }
    }

    function handleSubmit(event: SubmitEvent) {
      if (event.target instanceof HTMLFormElement && event.target.closest("#contact")) {
        trackEvent("contact_form_open", { contact_method: "email" });
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
