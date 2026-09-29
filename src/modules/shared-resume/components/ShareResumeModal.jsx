"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  X,
  Globe,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function ShareResumeModal({ isOpen, onClose, resume }) {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !resume?._id) {
      setShareUrl("");
      setError("");
      setCopied(false);
      return;
    }

    const generateOrFetchLink = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post("/api/r/create", { resumeId: resume._id });
        if (res.data?.success && res.data?.data?.slug) {
          const origin = typeof window !== "undefined" ? window.location.origin : "";
          const url = `${origin}/r/${res.data.data.slug}`;
          setShareUrl(url);

          // Automatically copy to clipboard for fast user experience
          if (navigator.clipboard) {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              toast.success("Resume link generated and copied to clipboard!");
              setTimeout(() => setCopied(false), 2500);
            } catch {
              // Ignore clipboard failure on auto-copy
            }
          }
        } else {
          console.log(res);
          setError(res.data?.message || "Failed to generate public share link");
        }
      } catch (err) {
        console.log("Axios error:", err);

        if (axios.isAxiosError(err) && err.response?.status === 403) {
          setError("You are not authorized to create a public share link for this resume.");
          toast.error("You are not authorized to create a public share link.");
        } else {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Could not create share link for this resume";

          setError(msg);
          toast.error(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    generateOrFetchLink();
  }, [isOpen, resume?._id]);

  if (!isOpen) return null;

  const handleManualCopy = async () => {
    if (!shareUrl) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopied(true);
      toast.success("Link copied to clipboard!");
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
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 leading-tight">
                Share Resume Publicly
              </h3>
              <p className="text-xs text-slate-500">
                {resume?.name || "Professional"} • Public Web Link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
              <p className="text-xs text-slate-500">Generating secure public link...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-950">Sharing Unavailable</p>
                <p className="text-amber-800 leading-relaxed">{error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public View URL</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
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

              {/* Informational feature badges */}
              <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-1.5">
                <div className="flex items-center gap-1.5 font-medium text-xs text-indigo-900">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>NextCV Verified Public Profile</span>
                </div>
                <p className="text-[11px] text-indigo-800/80 leading-relaxed">
                  Anyone with this link can view your high-resolution resume and download it without
                  requiring an account.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {shareUrl && !error ? (
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Preview Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-400">NextCV Resume Sharing</span>
          )}

          <Button onClick={onClose} variant="outline" size="sm" className="text-xs rounded-lg">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
