(function bootstrapAnalytics() {
  "use strict";

  const DEFAULT_UMAMI_SCRIPT_URL = "/stats/script.js";
  const CLOUD_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
  const MAX_TEXT_LENGTH = 120;

  const state = {
    currentView: "home",
    queuedEvents: [],
    umamiEnabled: false,
  };

  function getMetaContent(name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta?.content?.trim() || "";
  }

  function sanitizeText(value, maxLength = MAX_TEXT_LENGTH) {
    if (value === undefined || value === null) {
      return "";
    }
    return String(value).trim().replace(/\s+/g, " ").slice(0, maxLength);
  }

  function sanitizePayload(payload) {
    if (!payload || typeof payload !== "object") {
      return {};
    }

    const result = {};
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (typeof value === "string") {
        const cleaned = sanitizeText(value);
        if (cleaned) {
          result[key] = cleaned;
        }
        return;
      }

      if (typeof value === "number" && Number.isFinite(value)) {
        result[key] = value;
        return;
      }

      if (typeof value === "boolean") {
        result[key] = value;
      }
    });

    return result;
  }

  function sanitizeHref(rawHref) {
    if (!rawHref) return "";
    if (rawHref.startsWith("mailto:")) return "mailto:";

    try {
      const url = new URL(rawHref, window.location.href);
      return `${url.origin}${url.pathname}`;
    } catch (_error) {
      return sanitizeText(rawHref, 180);
    }
  }

  function classifyHref(rawHref) {
    if (!rawHref) return "unknown";
    if (rawHref.startsWith("mailto:")) return "email";

    try {
      const url = new URL(rawHref, window.location.href);
      return url.origin === window.location.origin ? "internal" : "outbound";
    } catch (_error) {
      return "unknown";
    }
  }

  function getHashView() {
    const hash = window.location.hash.replace("#", "").trim();
    if (!hash) return "";
    return document.querySelector(`[data-view="${hash}"]`) ? hash : "";
  }

  function getVisibleView() {
    const visible = document.querySelector("[data-view]:not(.view-hidden)");
    return visible?.dataset?.view || getHashView() || "home";
  }

  function getCurrentView() {
    return state.currentView || getVisibleView();
  }

  function setCurrentView(viewName) {
    if (!viewName || typeof viewName !== "string") return;
    state.currentView = viewName;
  }

  function flushQueuedEvents() {
    if (!window.umami || typeof window.umami.track !== "function") {
      return;
    }

    while (state.queuedEvents.length > 0) {
      const [eventName, payload] = state.queuedEvents.shift();
      window.umami.track(eventName, payload);
    }
  }

  function emit(eventName, payload = {}) {
    if (!state.umamiEnabled || !eventName) {
      return;
    }

    const safePayload = sanitizePayload(payload);

    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(eventName, safePayload);
      return;
    }

    state.queuedEvents.push([eventName, safePayload]);
  }

  function resolveLabel(element) {
    if (!(element instanceof Element)) return "";

    const explicitLabel =
      element.getAttribute("data-track-name") ||
      element.getAttribute("aria-label") ||
      element.getAttribute("title");

    if (explicitLabel) {
      return sanitizeText(explicitLabel);
    }

    return sanitizeText(element.textContent || "");
  }

  function registerClickTracking() {
    document.addEventListener(
      "click",
      (event) => {
        if (!(event.target instanceof Element)) return;

        const interactive = event.target.closest("a, button");
        if (!(interactive instanceof Element)) return;

        const view = getCurrentView();
        const label = resolveLabel(interactive);

        if (interactive.tagName.toLowerCase() === "a") {
          const rawHref = interactive.getAttribute("href") || interactive.href || "";
          emit("link_click", {
            view,
            label,
            href: sanitizeHref(rawHref),
            link_kind: classifyHref(rawHref),
          });
          return;
        }

        emit("button_click", {
          view,
          label,
        });
      },
      true,
    );
  }

  function loadUmamiScript() {
    const websiteId = getMetaContent("umami-website-id");
    if (!websiteId) {
      console.warn("Umami disabled: set meta[name='umami-website-id'] first.");
      return;
    }

    state.umamiEnabled = true;

    const scriptUrl = getMetaContent("umami-script-url") || DEFAULT_UMAMI_SCRIPT_URL;
    const domains = getMetaContent("umami-domains");
    const hostUrl = getMetaContent("umami-host-url");
    const mountScript = (url, allowFallback) => {
      const script = document.createElement("script");
      script.defer = true;
      script.src = url;
      script.setAttribute("data-website-id", websiteId);

      if (domains) {
        script.setAttribute("data-domains", domains);
      }

      if (hostUrl) {
        script.setAttribute("data-host-url", hostUrl);
      }

      script.addEventListener("load", () => {
        flushQueuedEvents();
        emit("analytics_ready", {
          view: getCurrentView(),
        });
      });

      script.addEventListener("error", () => {
        if (allowFallback && url !== CLOUD_UMAMI_SCRIPT_URL) {
          console.warn(`Failed to load Umami script at ${url}; falling back to Umami Cloud.`);
          mountScript(CLOUD_UMAMI_SCRIPT_URL, false);
          return;
        }

        console.warn(`Failed to load Umami script: ${url}`);
      });

      document.head.appendChild(script);
    };

    mountScript(scriptUrl, true);
  }

  window.analytics = {
    track: emit,
    getCurrentView,
    setCurrentView,
    trackViewChange(viewName, source = "app") {
      const fromView = getCurrentView();
      setCurrentView(viewName);
      emit("view_change", {
        from_view: fromView,
        to_view: viewName,
        source,
      });
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    const initialView = getVisibleView();
    setCurrentView(initialView);

    loadUmamiScript();
    registerClickTracking();

    emit("page_load", {
      view: initialView,
      path: window.location.pathname || "/",
    });
  });
})();
