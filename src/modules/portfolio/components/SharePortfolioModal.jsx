"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Copy,
  Check,
  ExternalLink,
  X,
  Globe,
  Crown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SharePortfolioModal({ isOpen, onClose, resume }) {
  const [loading, setLoading] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !resume?._id) {
      setPortfolioUrl("");
      setError("");
      setCopied(false);
      return;
    }

    const generateOrFetchPortfolio = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post("/api/p/create", { resumeId: resume._id });
        if (res.data?.success && res.data?.data?.slug) {
          const origin = typeof window !== "undefined" ? window.location.origin : "";
          const url = `${origin}/p/${res.data.data.slug}`;
          setPortfolioUrl(url);

          // Auto-copy for fast UX
          if (navigator.clipboard) {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              toast.success("Portfolio link generated and copied to clipboard!");
              setTimeout(() => setCopied(false), 2500);
            } catch {
              // ignore clipboard permission failure
            }
          }
        } else {
          setError(res.data?.message || "Failed to generate portfolio link");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 403) {
          setError(
            "Portfolio pages are only available for Elite tier resumes. Upgrade to an Elite template to unlock this feature."
          );
          toast.error("Elite tier required for portfolio pages.");
        } else {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Could not create portfolio page for this resume";
          setError(msg);
          toast.error(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    generateOrFetchPortfolio();
  }, [isOpen, resume?._id]);

  if (!isOpen) return null;

  const handleManualCopy = async () => {
    if (!portfolioUrl) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(portfolioUrl);
      }
      setCopied(true);
      toast.success("Portfolio link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2333]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 leading-tight">
                  Share Portfolio Page
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                  <Crown className="w-3 h-3" /> Elite
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {resume?.name || "Professional"} • Live Web Portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
              <p className="text-xs text-slate-500">Building your portfolio page...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-950">Portfolio Unavailable</p>
                <p className="text-amber-800 leading-relaxed">{error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Your Portfolio URL</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={portfolioUrl}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-700 select-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <Button
                    onClick={handleManualCopy}
                    size="sm"
                    className="shrink-0 gap-1.5 text-xs bg-[#1C2333] hover:bg-slate-800 text-white rounded-lg h-9"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* What's included callout */}
              <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-2">
                <div className="flex items-center gap-1.5 font-medium text-xs text-indigo-900">
                  <Crown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Elite Portfolio — What recruiters see</span>
                </div>
                <ul className="text-[11px] text-indigo-800/80 leading-relaxed space-y-1 pl-1">
                  <li>• Full profile with experience, projects & skills</li>
                  <li>• One-click ATS PDF download for recruiters</li>
                  <li>• Verified NextCV badge &amp; direct email contact</li>
                  <li>• Works perfectly on mobile &amp; desktop</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {portfolioUrl && !error ? (
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Preview Portfolio Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-400">NextCV Elite Portfolio</span>
          )}

          <Button onClick={onClose} variant="outline" size="sm" className="text-xs rounded-lg">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
