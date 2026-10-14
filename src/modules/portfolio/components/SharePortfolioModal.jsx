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
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SharePortfolioModal({ isOpen, onClose, resume }) {
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Fetch existing portfolio status when modal opens. Reset state when closed or resume changes.
  useEffect(() => {
    let isMounted = true;

    if (!isOpen || !resume?._id) {
      setPortfolioUrl("");
      setIsPublic(true);
      setError("");
      setCopied(false);
      setConfirmDelete(false);
      setLoading(false);
      setActionLoading(false);
      setInitialLoading(false);
      return;
    }

    const fetchPortfolioStatus = async () => {
      setInitialLoading(true);
      setError("");
      setConfirmDelete(false);

      try {
        const res = await axios.get(`/api/p/status?resumeId=${resume._id}`);
        if (!isMounted) return;

        if (res.data?.success && res.data?.data?.slug) {
          const origin = window.location.origin;
          setPortfolioUrl(`${origin}/p/${res.data.data.slug}`);
          setIsPublic(res.data.data.isPublic !== false);
        } else {
          // No portfolio link exists yet
          setPortfolioUrl("");
          setIsPublic(true);
        }
      } catch (err) {
        if (!isMounted) return;
        const status = axios.isAxiosError(err) ? err.response?.status : undefined;

        if (status === 404) {
          // Record does not exist yet; show Generate Portfolio view
          setPortfolioUrl("");
          setIsPublic(true);
        } else {
          const message =
            err.response?.data?.message ||
            (status === 403
              ? "Portfolio pages are only available for Elite tier resumes."
              : "Could not load portfolio status.");
          setError(message);
        }
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    fetchPortfolioStatus();

    return () => {
      isMounted = false;
    };
  }, [isOpen, resume?._id]);

  // Create or fetch the portfolio only after an explicit click.
  const handleGeneratePortfolio = async () => {
    if (!resume?._id || loading || actionLoading || initialLoading) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/p/create", {
        resumeId: resume._id,
      });

      if (res.data?.success && res.data?.data?.slug) {
        const origin = window.location.origin;
        const url = `${origin}/p/${res.data.data.slug}`;

        setPortfolioUrl(url);
        setIsPublic(res.data.data.isPublic !== false);

        toast.success("Portfolio created successfully!");
      } else {
        const message = res.data?.message || "Failed to generate portfolio link";

        setError(message);
        toast.error(message);
      }
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;

      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        (err instanceof Error ? err.message : "") ||
        "Could not create portfolio page for this resume";

      if (status === 403) {
        const upgradeMessage =
          "Portfolio pages are only available for Elite tier resumes. Upgrade to an Elite template to unlock this feature.";

        setError(upgradeMessage);
        toast.error("Elite tier required for portfolio pages.");
      } else {
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualCopy = async () => {
    if (!portfolioUrl) return;

    try {
      if (!navigator.clipboard) {
        toast.error("Clipboard access is not available in this browser");
        return;
      }

      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      toast.success("Portfolio link copied to clipboard!");

      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleTogglePause = async () => {
    if (!resume?._id || actionLoading || initialLoading) return;

    setActionLoading(true);

    try {
      const nextState = !isPublic;

      const res = await axios.post("/api/p/toggle", {
        resumeId: resume._id,
        isPublic: nextState,
      });

      if (res.data?.success) {
        setIsPublic(nextState);

        toast.success(
          nextState
            ? "Portfolio is now live and public!"
            : "Portfolio paused. The link is now private."
        );
      } else {
        toast.error(res.data?.message || "Failed to update portfolio status");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle portfolio status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePortfolio = async () => {
    if (!resume?._id || actionLoading || initialLoading) return;

    setActionLoading(true);

    try {
      const res = await axios.post("/api/p/delete", {
        resumeId: resume._id,
      });

      if (res.data?.success) {
        toast.success("Portfolio deleted successfully");

        setPortfolioUrl("");
        setIsPublic(true);
        setConfirmDelete(false);
      } else {
        toast.error(res.data?.message || "Failed to delete portfolio");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete portfolio");
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2333]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-none shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <LayoutDashboard className="w-4 h-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 leading-tight">
                  Share Portfolio Page
                </h3>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                  <Crown className="w-3 h-3" />
                  Elite
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {resume?.name || "Professional"} • Live Web Portfolio
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-none text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {initialLoading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
              <p className="text-xs text-slate-500">Checking portfolio status...</p>
            </div>
          ) : loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
              <p className="text-xs text-slate-500">Generating your portfolio page...</p>
            </div>
          ) : error && !portfolioUrl ? (
            <div className="p-4 rounded-none bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-950">Portfolio Unavailable</p>
                <p className="text-amber-800 leading-relaxed">{error}</p>

                <Button
                  type="button"
                  onClick={() => {
                    setError("");
                  }}
                  variant="outline"
                  size="sm"
                  className="mt-2 rounded-none"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ) : !portfolioUrl ? (
            /* Generate Portfolio */
            <div className="py-8 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-14 h-14 rounded-none bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <LayoutDashboard className="w-7 h-7 text-indigo-600" />
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-semibold text-slate-900">
                  Create your portfolio page
                </h4>

                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Turn your resume into a shareable online portfolio. Let recruiters view your
                  experience, projects, and skills through one professional link.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleGeneratePortfolio}
                disabled={!resume?._id || loading}
                className="h-10 px-5 gap-2 rounded-none bg-[#1C2333] hover:bg-slate-800 text-white"
              >
                <Globe className="w-4 h-4" />
                Generate Portfolio
              </Button>

              <p className="text-[11px] text-slate-400">Available for Elite tier resumes</p>
            </div>
          ) : (
            /* Portfolio Management */
            <div className="space-y-4">
              {/* URL and status */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Portfolio URL</span>
                  </label>

                  {isPublic ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
                      Live &amp; Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      <Pause className="w-3 h-3 text-amber-600" />
                      Paused (Private)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={portfolioUrl}
                    aria-label="Your portfolio URL"
                    className="min-w-0 flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-none text-slate-700 select-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />

                  <Button
                    type="button"
                    onClick={handleManualCopy}
                    size="sm"
                    className="shrink-0 gap-1.5 text-xs bg-[#1C2333] hover:bg-slate-800 text-white rounded-none h-9"
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

              {/* Paused notice */}
              {!isPublic && (
                <div className="p-3 rounded-none bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Your portfolio is currently <strong>paused</strong>. Anyone visiting this link
                    will see a private notice until you resume.
                  </span>
                </div>
              )}

              {/* Pause/resume and delete controls */}
              <div className="p-3.5 rounded-none bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                <Button
                  type="button"
                  onClick={handleTogglePause}
                  disabled={actionLoading}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 gap-1.5 rounded-none border-slate-300 hover:bg-white"
                >
                  {actionLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isPublic ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pause Portfolio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Resume Portfolio</span>
                    </>
                  )}
                </Button>

                {!confirmDelete ? (
                  <Button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    disabled={actionLoading}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 gap-1.5 rounded-none text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Portfolio</span>
                  </Button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-rose-600">Delete portfolio?</span>

                    <Button
                      type="button"
                      onClick={handleDeletePortfolio}
                      disabled={actionLoading}
                      size="sm"
                      className="text-xs h-7 px-2.5 rounded-none bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      {actionLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      disabled={actionLoading}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 rounded-none text-slate-600"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* What's included */}
              <div className="p-3.5 rounded-none bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-2">
                <div className="flex items-center gap-1.5 font-medium text-xs text-indigo-900">
                  <Crown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Elite Portfolio — What recruiters see</span>
                </div>

                <ul className="text-[11px] text-indigo-800/80 leading-relaxed space-y-1 pl-1">
                  <li>• Full profile with experience, projects &amp; skills</li>
                  <li>• One-click ATS PDF download for recruiters</li>
                  <li>• Verified NextCV badge &amp; direct email contact</li>
                  <li>• Works seamlessly on mobile &amp; desktop</li>
                </ul>
              </div>

              {error && <p className="text-xs text-rose-600">{error}</p>}
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

          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            size="sm"
            className="text-xs rounded-none"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
