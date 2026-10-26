"use client";

import { openPrivacyPreferences } from "@/shared/utils/consent";
import { Sliders } from "lucide-react";

/**
 * Interactive button to trigger the Privacy & Analytics Preferences modal.
 * Can be embedded in Footers, Privacy Policy, or Settings.
 */
export default function PrivacyPreferencesButton({
  className = "",
  children,
}) {
  return (
    <button
      type="button"
      onClick={openPrivacyPreferences}
      className={
        className ||
        "inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
      }
    >
      <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{children || "Privacy & Cookie Preferences"}</span>
    </button>
  );
}

