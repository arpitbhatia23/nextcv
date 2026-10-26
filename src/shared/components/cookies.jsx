"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getStoredConsent, setStoredConsent, DEFAULT_CONSENT } from "@/shared/utils/consent";
import { ShieldCheck, Sliders, X, Check } from "lucide-react";

const ClarityComponent = dynamic(() => import("./clearity"), { ssr: false });
const GoogleAnalytics = dynamic(() => import("@/app/anlatyics"), { ssr: false });

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Customizer state
  const [customPostHog, setCustomPostHog] = useState(false);
  const [customGA4, setCustomGA4] = useState(false);
  const [customClarity, setCustomClarity] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);

    // If user has never made a choice, display the banner immediately
    if (!stored.hasChosen) {
      setShowBanner(true);
    }

    // Set initial customizer toggles
    setCustomPostHog(stored.posthog);
    setCustomGA4(stored.ga4);
    setCustomClarity(stored.clarity);

    // Listen for custom open event (e.g. from Footer Privacy Preferences button)
    const handleOpenModal = () => {
      const current = getStoredConsent();
      setCustomPostHog(current.posthog);
      setCustomGA4(current.ga4);
      setCustomClarity(current.clarity);
      setShowModal(true);
    };

    const handleConsentChanged = e => {
      if (e?.detail) {
        setConsent(e.detail);
      }
    };

    window.addEventListener("nextcv-open-consent-modal", handleOpenModal);
    window.addEventListener("nextcv-consent-changed", handleConsentChanged);

    return () => {
      window.removeEventListener("nextcv-open-consent-modal", handleOpenModal);
      window.removeEventListener("nextcv-consent-changed", handleConsentChanged);
    };
  }, []);

  const handleAcceptAll = () => {
    const updated = setStoredConsent({
      posthog: true,
      ga4: true,
      clarity: true,
    });
    setConsent(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectAll = () => {
    const updated = setStoredConsent({
      posthog: false,
      ga4: false,
      clarity: false,
    });
    setConsent(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    const updated = setStoredConsent({
      posthog: customPostHog,
      ga4: customGA4,
      clarity: customClarity,
    });
    setConsent(updated);
    setShowBanner(false);
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Conditionally inject 3rd-party scripts only when explicitly consented */}
      {consent.hasChosen && consent.ga4 && <GoogleAnalytics />}
      {consent.hasChosen && consent.clarity && <ClarityComponent />}

      {/* Main Consent Banner (shown on first visit until choice is made) */}
      {showBanner && !showModal && (
        <aside
          role="region"
          aria-label="Privacy & Analytics Consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-lg z-50 bg-[#17201C] text-white border border-white/15 p-5 shadow-2xl rounded-none animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/10 text-white mt-0.5">
              <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-sm font-semibold text-white tracking-wide">
                Help us improve NextCV
              </h2>
              <p className="text-xs text-[#A0A49F] leading-relaxed">
                We use optional analytics tools to understand website usage and improve your
                experience. These tools may collect information about interactions, visits and
                sessions. Read our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline text-white hover:text-emerald-300 transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                to learn more.
              </p>

              {/* 3 Balanced Actions: Reject All, Customize, Accept All */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="flex-1 min-w-21.25py-2 px-3 text-xs font-medium text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors cursor-pointer text-center"
                >
                  Reject All
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex-1 min-w-21.25py-2 px-3 text-xs font-medium text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors cursor-pointer text-center"
                >
                  Customize
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 min-w-21.25py-2 px-3 text-xs font-semibold text-[#17201C] bg-white hover:bg-slate-100 transition-colors cursor-pointer text-center"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Customize / Privacy Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-preferences-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl bg-white text-[#17201C] border border-[#E3E2DC] shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E3E2DC]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-[#465B9E]" />
                  <h2
                    id="privacy-preferences-title"
                    className="text-lg font-serif font-semibold text-[#17201C]"
                  >
                    Privacy & Analytics Preferences
                  </h2>
                </div>
                <p className="text-xs text-[#5B625C]">
                  Configure which optional analytics services you permit NextCV to use.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-[#8A908B] hover:text-[#17201C] transition-colors cursor-pointer"
                aria-label="Close preferences modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List of categories */}
            <div className="py-5 space-y-4">
              {/* Category 1: Essential (Always active) */}
              <div className="p-4 border border-[#E3E2DC] bg-[#FAF9F6]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-[#17201C] uppercase tracking-wider">
                      Essential Site Operations & Security
                    </h3>
                    <p className="mt-1 text-xs text-[#5B625C] leading-relaxed">
                      Required for user authentication, session security, resume draft storage, and
                      payment processing. Cannot be disabled.
                    </p>
                  </div>
                  <span className="shrink-0 ml-4 px-2.5 py-1 text-[11px] font-semibold bg-[#E8EFE5] text-[#344B38] border border-[#DDE2D9]">
                    Always Active
                  </span>
                </div>
              </div>

              {/* Category 2: PostHog Analytics */}
              <div className="p-4 border border-[#E3E2DC] bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-[#17201C] uppercase tracking-wider">
                      PostHog Product Analytics
                    </h3>
                    <p className="text-xs text-[#5B625C] leading-relaxed">
                      Collects aggregated events (such as template selection, button clicks, and
                      funnel progression) to help improve resume creation workflows. Input fields
                      and sensitive resume text are masked.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={customPostHog}
                      onChange={e => setCustomPostHog(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#E3E2DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-[#CFCFC8] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#465B9E]"></div>
                  </label>
                </div>
              </div>

              {/* Category 3: Google Analytics 4 */}
              <div className="p-4 border border-[#E3E2DC] bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-[#17201C] uppercase tracking-wider">
                      Google Analytics 4 (GA4)
                    </h3>
                    <p className="text-xs text-[#5B625C] leading-relaxed">
                      Provides aggregated traffic metrics, visitor referrers, device types, and
                      geographic usage statistics with IP anonymization enabled.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={customGA4}
                      onChange={e => setCustomGA4(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#E3E2DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-[#CFCFC8] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#465B9E]"></div>
                  </label>
                </div>
              </div>

              {/* Category 4: Microsoft Clarity */}
              <div className="p-4 border border-[#E3E2DC] bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-[#17201C] uppercase tracking-wider">
                      Microsoft Clarity (Heatmaps & Session Replay)
                    </h3>
                    <p className="text-xs text-[#5B625C] leading-relaxed">
                      Generates aggregated heatmaps and optional session recordings to identify
                      confusing UI layouts or broken buttons. Sensitive inputs and personal contact
                      details are masked.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={customClarity}
                      onChange={e => setCustomClarity(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#E3E2DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-[#CFCFC8] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#465B9E]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notice & Statutory Rights */}
            <div className="p-3 bg-[#FAF9F6] border border-[#E3E2DC] text-[11px] text-[#5B625C] leading-relaxed">
              In accordance with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023, you
              can update or withdraw your consent at any time without impacting your account, resume
              editing, or payment downloads.
            </div>

            {/* Modal Actions */}
            <div className="mt-5 pt-4 border-t border-[#E3E2DC] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectAll}
                className="py-2 px-4 text-xs font-medium text-[#17201C] border border-[#E3E2DC] bg-white hover:bg-[#F1F0EB] transition-colors cursor-pointer"
              >
                Reject All Optional
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="py-2 px-4 text-xs font-semibold text-white bg-[#465B9E] hover:bg-[#344B93] transition-colors cursor-pointer"
                >
                  Save Preferences
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="py-2 px-4 text-xs font-semibold text-white bg-[#17201C] hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
