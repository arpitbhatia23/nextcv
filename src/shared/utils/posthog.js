import posthog from "posthog-js";
import { getStoredConsent } from "./consent";

let isInitialized = false;

/**
 * Initializes PostHog client only if user has granted explicit consent.
 */
export function initPostHogIfConsented() {
  if (typeof window === "undefined") return;

  const consent = getStoredConsent();
  if (consent.hasChosen && consent.posthog) {
    if (!isInitialized && process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
        // Mask inputs and avoid recording sensitive resume text by default
        mask_all_element_attributes: true,
        mask_all_text: false,
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
    } else if (isInitialized) {
      posthog.opt_in_capturing();
    }
  } else {
    // If user has not consented or explicitly rejected, opt out
    if (isInitialized) {
      try {
        posthog.opt_out_capturing();
      } catch (e) {
        // Safe fallback
      }
    }
  }
}

/**
 * Stop PostHog tracking and reset identifiers when consent is withdrawn.
 */
export function disablePostHogTracking() {
  if (typeof window === "undefined") return;
  try {
    posthog.opt_out_capturing();
    posthog.reset();
  } catch (err) {
    // Ignore if not initialized
  }
}

// Listen to consent changes if running in browser
if (typeof window !== "undefined") {
  // Check initial state
  initPostHogIfConsented();

  window.addEventListener("nextcv-consent-changed", (event) => {
    const detail = event?.detail;
    if (detail?.posthog) {
      initPostHogIfConsented();
    } else {
      disablePostHogTracking();
    }
  });
}

/**
 * Privacy-safe PostHog proxy object that checks consent before firing captures.
 */
const safePostHog = {
  capture: (eventName, properties) => {
    if (typeof window === "undefined") return;
    const consent = getStoredConsent();
    if (!consent.hasChosen || !consent.posthog) return;
    try {
      posthog.capture(eventName, properties);
    } catch (err) {
      // Safe fallback
    }
  },
  identify: (distinctId, properties) => {
    if (typeof window === "undefined") return;
    const consent = getStoredConsent();
    if (!consent.hasChosen || !consent.posthog) return;
    try {
      posthog.identify(distinctId, properties);
    } catch (err) {
      // Safe fallback
    }
  },
  reset: () => {
    if (typeof window === "undefined") return;
    try {
      posthog.reset();
    } catch (err) {
      // Safe fallback
    }
  },
  opt_in_capturing: () => {
    if (typeof window === "undefined") return;
    try {
      posthog.opt_in_capturing();
    } catch (err) {
      // Safe fallback
    }
  },
  opt_out_capturing: () => {
    if (typeof window === "undefined") return;
    try {
      posthog.opt_out_capturing();
    } catch (err) {
      // Safe fallback
    }
  },
  // Expose underlying instance if strictly needed
  _raw: posthog,
};

export default safePostHog;
