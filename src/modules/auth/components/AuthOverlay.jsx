"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { X, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export function AuthOverlay({
  open,
  onClose,
  title = "Sign in to continue",
  description = "Create a free account to unlock this feature and keep your work saved.",
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);

    await signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#0B1B17]/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#D8E9E1] bg-linear-to-br from-[#F4FFF9] via-[#F9FBF7] to-[#EEF7F2] p-7 shadow-[0_28px_80px_rgba(11,27,23,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#0F6E63] via-[#2B9C85] to-[#7FD4B0]" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#2A4A43] transition hover:bg-[#DCEFE6]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F6E63] to-[#1C8D78] text-white shadow-[0_12px_24px_rgba(15,110,99,0.25)]">
          <LockKeyhole size={25} />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-[#0F1E1B]">{title}</h2>

        <p className="mt-3 text-sm leading-6 text-[#4E645F]">{description}</p>

        <div className="my-6 space-y-3 rounded-2xl border border-[#D9EFE4] bg-white/60 p-3.5 shadow-inner shadow-[#E5F4EC]">
          <div className="flex items-center gap-3 text-sm text-[#1B4E44]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F7EE] text-[#0F6E63]">
              <ShieldCheck size={16} />
            </span>
            Secure Google authentication
          </div>

          <div className="flex items-center gap-3 text-sm text-[#1B4E44]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F7EE] text-[#0F6E63]">
              <Sparkles size={16} />
            </span>
            Access your saved resumes and tools
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#0F6E63] to-[#198A70] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,110,99,0.28)] transition hover:brightness-105 disabled:opacity-60"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M47 24.5c0-1.6-.2-3.1-.5-4.5H24v9h13c-.6 2.9-2.2 5.4-4.6 7l7.5 5.8C44.3 37.5 47 31.5 47 24.5Z"
              />
              <path
                fill="#FBBC05"
                d="M10.4 28.6A14.4 14.4 0 0 1 9.5 24c0-1.6.3-3.1.9-4.6l-7.8-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.6 2.6 10.7l7.8-6.1Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.2 0 11.5-2 15.3-5.6l-7.5-5.8c-2.1 1.4-4.7 2.2-7.8 2.2-6.3 0-11.7-4-13.6-9.6l-7.8 6.1C6.5 43.4 14.6 48 24 48Z"
              />
            </svg>
          </span>

          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="mt-5 text-center text-xs text-[#59706B]">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
