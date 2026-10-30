import posthog from "posthog-js";
import { getStoredConsent } from "./consent";

let isInitialized = false;

/**
 * Check PostHog consent.
 */
function hasPostHogConsent() {
  if (typeof window === "undefined") return false;

  const consent = getStoredConsent();

  return Boolean(consent?.hasChosen && consent?.posthog);
}

/**
 * Initialize PostHog only after explicit consent.
 */
export function initPostHogIfConsented() {
  if (typeof window === "undefined") return;

  if (!hasPostHogConsent()) {
    disablePostHogTracking();
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;

  if (!apiKey) return;

  if (isInitialized) {
    posthog.opt_in_capturing();
    return;
  }

  posthog.init(apiKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",

    capture_pageview: true,

    // Disable automatic exceptions for strict consent control.
    // Use safePostHog.captureException() instead.
    capture_exceptions: false,

    // Privacy protection
    mask_all_element_attributes: true,
    mask_all_text: true,

    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
        color: true,
        date: true,
        "datetime-local": true,
        email: true,
        month: true,
        number: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true,
        textarea: true,
        select: true,
      },
    },
  });

  isInitialized = true;
}

/**
 * Disable tracking when consent is withdrawn.
 */
export function disablePostHogTracking() {
  if (typeof window === "undefined") return;
  if (!isInitialized) return;

  try {
    posthog.stopSessionRecording();
    posthog.opt_out_capturing();
    posthog.reset();
  } catch {
    // Safe fallback
  }
}

/**
 * Listen for consent changes.
 */
if (typeof window !== "undefined") {
  initPostHogIfConsented();

  window.addEventListener("nextcv-consent-changed", event => {
    const detail = event?.detail;

    if (detail?.posthog && hasPostHogConsent()) {
      initPostHogIfConsented();
    } else {
      disablePostHogTracking();
    }
  });
}

/**
 * Privacy-safe PostHog wrapper.
 */
const safePostHog = {
  /**
   * Capture custom events.
   */
  capture: (eventName, properties) => {
    if (!hasPostHogConsent() || !isInitialized) return;

    try {
      posthog.capture(eventName, properties);
    } catch {
      // Safe fallback
    }
  },

  /**
   * Capture client-side exceptions.
   */
  captureException: error => {
    if (typeof window === "undefined") return;

    if (!hasPostHogConsent()) {
      console.warn("[PostHog] Exception skipped: no analytics consent");
      return;
    }

    if (!isInitialized) {
      console.warn("[PostHog] Exception skipped: SDK not initialized");
      return;
    }

    if (typeof posthog.captureException !== "function") {
      console.error("[PostHog] captureException is unavailable in the installed SDK");
      return;
    }

    const exception = error instanceof Error ? error : new Error(String(error));

    try {
      const result = posthog.captureException(exception, {
        source: "nextcv-client",
      });

      if (result === undefined) {
        console.warn("[PostHog] No exception event returned. Check SDK Error Tracking support.");
      } else {
        console.info("[PostHog] Exception capture called successfully");
      }

      return result;
    } catch (captureError) {
      console.error("[PostHog] Exception capture failed:", captureError);
    }
  },
  /**
   * Identify logged-in users.
   */
  identify: (distinctId, properties) => {
    if (!hasPostHogConsent() || !isInitialized) return;

    try {
      posthog.identify(distinctId, properties);
    } catch {
      // Safe fallback
    }
  },

  /**
   * Reset user identity.
   */
  reset: () => {
    if (typeof window === "undefined" || !isInitialized) return;

    try {
      posthog.reset();
    } catch {
      // Safe fallback
    }
  },

  /**
   * Opt into tracking.
   */
  opt_in_capturing: () => {
    if (!isInitialized || !hasPostHogConsent()) return;

    try {
      posthog.opt_in_capturing();
    } catch {
      // Safe fallback
    }
  },

  /**
   * Opt out of tracking.
   */
  opt_out_capturing: () => {
    if (!isInitialized) return;

    try {
      posthog.stopSessionRecording();
      posthog.opt_out_capturing();
    } catch {
      // Safe fallback
    }
  },

  /**
   * Stop session recording.
   */
  stopSessionRecording: () => {
    if (!isInitialized) return;

    try {
      posthog.stopSessionRecording();
    } catch {
      // Safe fallback
    }
  },

  // Raw SDK instance
  _raw: posthog,
};

export default safePostHog;
