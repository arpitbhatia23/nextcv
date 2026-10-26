"use client";

/**
 * Privacy & Analytics Consent State Manager
 * Follows DPDP Act, 2023 principles:
 * - Prior consent for optional analytics
 * - Clear, separate categories
 * - Revocable at any time
 * - No tracking before explicit choice
 */

export const CONSENT_STORAGE_KEY = "nextcv-consent-preferences";
export const CONSENT_VERSION = "2026-03-dpdp-v1";

export const DEFAULT_CONSENT = {
  posthog: false,
  ga4: false,
  clarity: false,
  timestamp: null,
  version: CONSENT_VERSION,
  hasChosen: false,
};

/**
 * Reads consent preferences from localStorage
 */
export function getStoredConsent() {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.hasChosen) {
      return {
        posthog: Boolean(parsed.posthog),
        ga4: Boolean(parsed.ga4),
        clarity: Boolean(parsed.clarity),
        timestamp: parsed.timestamp || null,
        version: parsed.version || CONSENT_VERSION,
        hasChosen: true,
      };
    }
  } catch (err) {
    console.error("Failed to read consent preferences:", err);
  }
  return DEFAULT_CONSENT;
}

/**
 * Saves consent preferences to localStorage and broadcasts change event
 */
export function setStoredConsent(preferences) {
  if (typeof window === "undefined") return;
  const payload = {
    posthog: Boolean(preferences.posthog),
    ga4: Boolean(preferences.ga4),
    clarity: Boolean(preferences.clarity),
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
    hasChosen: true,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
    // Also keep legacy flag updated for backward compatibility if any cached code checks it
    localStorage.setItem(
      "cookie-consent",
      payload.posthog || payload.ga4 || payload.clarity ? "accepted" : "rejected"
    );
  } catch (err) {
    console.error("Failed to save consent preferences:", err);
  }

  // Dispatch custom window event so all client components can immediately react
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("nextcv-consent-changed", { detail: payload })
    );
  }

  return payload;
}

/**
 * Dispatches an event to open the Privacy Preferences modal from anywhere (e.g. footer)
 */
export function openPrivacyPreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nextcv-open-consent-modal"));
  }
}

