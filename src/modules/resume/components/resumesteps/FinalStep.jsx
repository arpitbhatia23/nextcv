"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  IndianRupee,
  Save,
  Download,
  LayoutTemplate,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { useDebouncedCallback } from "use-debounce";
import useResumeStore from "@/store/useResumeStore";
import FeedbackModal from "@/modules/feedback/components/FeedbackModal";
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/resume/hooks/usedraft";
import { useResumeGen } from "@/modules/resume/hooks/useResumeGen";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import RedirectToPayment from "@/modules/payment/components/redirectToPayment";
import { templatesMetadata } from "@/shared/utils/template-metadata";
import posthog from "@/shared/utils/posthog";
import dynamic from "next/dynamic";
const PDFPreview = dynamic(() => import("../pdfPreview"), {
  ssr: false,
  loading: () => (
    <div className="nextcv-sans text-xs tracking-widest" style={{ color: "#8A908B" }}>
      LOADING PREVIEW...
    </div>
  ),
});
const TIERS = ["Basic", "Standard", "Premium", "Elite"];

// Canonical NextCV review/export UI: warm editorial surface + restrained indigo accent.
// Business logic, API contracts, payment flow, coupon flow, draft flow, and PDF generation are preserved.

/* Fonts: Fraunces for headings, IBM Plex Mono for eyebrows, labels,
   and helper text — matches the rest of the builder steps. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap');
    .nextcv-serif { font-family: 'Source Serif 4', Georgia, serif; }
    .nextcv-sans { font-family: 'Inter', system-ui, sans-serif; }
    .nextcv-mono { font-family: 'Inter', system-ui, sans-serif; }
  `}</style>
);

const NAVY = "#17201C";
const RUST = "#465B9E";
const MUTED = "#5B625C";
const FAINT = "#8A908B";
const BORDER = "#E3E2DC";
const BG = "#F8F7F3";
const WHITE = "#FFFFFF";

const FinalStep = () => {
  const formData = useResumeStore(s => s.formData);
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore(s => s.setSelectedTemplate);

  const [activeTier, setActiveTier] = useState("Premium");
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(49);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [applied, setApplied] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [discount, setDiscount] = useState(null);
  const templates = templatesMetadata;

  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "review",
      step_number: 9,
    });
  }, []);

  const templateWithPricing = useMemo(() => {
    return templates.map(template => {
      const pricing = getTemplateByName(template.key);

      return {
        ...template,
        tier: pricing?.tier || "Basic",
        price: pricing?.priceDiscounted || 49,
        originalPrice: pricing?.priceOriginal || 99,
        style: pricing?.style || "",
      };
    });
  }, []);

  const filteredTemplates = useMemo(() => {
    return templateWithPricing.filter(template => template.tier === activeTier);
  }, [templateWithPricing, activeTier]);

  const { handelPayment, isRedirecting } = usePayment({
    discount,
    originalAmount,
    formData,
    applied,
    selectedTemplate,
    setIsSubmit,
    couponCode,
    draftId,
  });

  const { handleCoupon, removeCoupon } = useCoupon({
    setIsSubmit,
    originalAmount,
    setAmount,
    setCouponCode,
    setApplied,
    setDiscount,
  });

  const { handleSaveDraft } = useDraft({
    setIsSubmit,
    selectedTemplate,
    formData,
    setIsFeedbackOpen,
    setDraftId,
  });

  const { pdfUrl } = useResumeGen({ formData, selectedTemplate });

  const { basePrice } = usePricing({
    selectedTemplate,
    applied,
    originalAmount,
    discount,
    setAmount,
    setOriginalAmount,
  });

  const debouncePayment = useDebouncedCallback(() => {
    posthog.capture("payment_started", {
      step: "review",
      step_number: 9,
    });
    handelPayment();
  }, 1000);

  const debounceDraft = useDebouncedCallback(() => {
    posthog.capture("resume_save_as_draft", {
      step: "review",
      step_number: 9,
    });
    handleSaveDraft();
  }, 1000);

  const debounceCoupon = useDebouncedCallback(coupon => {
    posthog.capture("coupon_applied", {
      step: "review",
      step_number: 9,
    });
    handleCoupon(coupon);
  }, 1000);

  const renderTierLabel = tier => {
    if (tier === "Premium") return "Premium";
    if (tier === "Elite") return "Elite";
    return tier;
  };

  const renderTemplateCard = template => (
    <div
      key={template.key}
      onClick={() => setSelectedTemplate(template.key)}
      className="group relative cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300"
      style={{
        borderColor: selectedTemplate === template.key ? RUST : BORDER,
      }}
    >
      {template.tier === "Premium" && (
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full nextcv-sans text-[9px] tracking-widest text-white"
          style={{ backgroundColor: RUST }}
        >
          MOST POPULAR
        </div>
      )}

      {template.tier === "Elite" && (
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full nextcv-sans text-[9px] tracking-widest text-white"
          style={{ backgroundColor: NAVY }}
        >
          ALL ACCESS
        </div>
      )}

      <div className="aspect-3/4 w-full overflow-hidden" style={{ backgroundColor: BG }}>
        {template.image ? (
          <Image
            src={template.image}
            alt={template.label}
            height={400}
            width={300}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full gap-2 opacity-40"
            style={{ color: FAINT }}
          >
            <LayoutTemplate className="w-8 h-8" />
            <span className="nextcv-sans text-[10px] uppercase tracking-widest">Preview</span>
          </div>
        )}
      </div>

      <div
        className="p-3 text-center border-t"
        style={{
          borderColor: BORDER,
          backgroundColor: selectedTemplate === template.key ? BG : WHITE,
        }}
      >
        <span
          className="nextcv-sans text-[10px] uppercase tracking-widest"
          style={{ color: selectedTemplate === template.key ? RUST : MUTED }}
        >
          {template.label}
        </span>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span
            className="nextcv-sans text-[9px] px-1.5 py-0.5 border uppercase tracking-widest"
            style={{ borderColor: BORDER, color: FAINT, backgroundColor: WHITE }}
          >
            {template.tier}
          </span>

          <span className="nextcv-sans text-[9px] line-through" style={{ color: FAINT }}>
            ₹{template.originalPrice}
          </span>

          <span className="nextcv-sans text-[10px] tracking-widest" style={{ color: RUST }}>
            ₹{template.price}
          </span>
        </div>
      </div>

      {selectedTemplate === template.key && (
        <div
          className="absolute top-3 right-3 text-white p-1.5 z-10 rounded-lg"
          style={{ backgroundColor: RUST }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
  return (
    <div className="min-h-full py-5 md:py-7" style={{ backgroundColor: BG }}>
      <FontImports />

      <div className="mb-6 pb-5 border-b" style={{ borderColor: BORDER }}>
        <div className="nextcv-sans text-[10px] tracking-widest uppercase mb-1 font-medium" style={{ color: RUST }}>
          STEP 09 — REVIEW & DOWNLOAD
        </div>
        <h2
          className="nextcv-serif text-2xl md:text-3xl font-medium tracking-tight"
          style={{ color: NAVY }}
        >
          Choose your template & download
        </h2>
        <p className="nextcv-sans text-sm md:text-[15px] mt-1.5" style={{ color: MUTED }}>
          Pick a template, review your resume, then download your ATS-ready PDF.
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="w-full flex flex-col gap-2 lg:hidden pb-5 pt-4">
        <div className="space-y-3">
          <label
            className="nextcv-sans text-[10px] tracking-widest flex items-center gap-2 uppercase font-medium"
            style={{ color: MUTED }}
          >
            <LayoutTemplate className="w-3.5 h-3.5" style={{ color: RUST }} />
            Choose Resume Pack
          </label>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className="shrink-0 border rounded-xl px-4 py-2 nextcv-sans text-[10px] uppercase tracking-widest transition-all font-medium"
                style={
                  activeTier === tier
                    ? { backgroundColor: RUST, color: WHITE, borderColor: RUST }
                    : { backgroundColor: WHITE, color: MUTED, borderColor: BORDER }
                }
              >
                {renderTierLabel(tier)}
              </button>
            ))}
          </div>

          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x">
            {filteredTemplates.map(template => (
              <div
                key={template.key}
                onClick={() => setSelectedTemplate(template.key)}
                className="flex-none w-36 flex flex-col items-center gap-2 p-3 border-2 rounded-xl overflow-hidden transition-all cursor-pointer snap-start relative"
                style={{
                  backgroundColor: selectedTemplate === template.key ? BG : WHITE,
                  borderColor: selectedTemplate === template.key ? RUST : BORDER,
                }}
              >
                {template.tier === "Premium" && (
                  <span
                    className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full nextcv-sans text-[7px] tracking-widest text-white"
                    style={{ backgroundColor: RUST }}
                  >
                    POPULAR
                  </span>
                )}

                <div
                  className="w-full aspect-3/4 overflow-hidden mb-1"
                  style={{ backgroundColor: BORDER }}
                >
                  {template.image ? (
                    <Image
                      src={template.image}
                      alt={template.label}
                      height={200}
                      width={150}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center h-full"
                      style={{ backgroundColor: BG }}
                    >
                      <LayoutTemplate className="w-6 h-6" style={{ color: FAINT }} />
                    </div>
                  )}
                </div>

                <div className="w-full text-center">
                  <p
                    className="nextcv-sans text-[9px] uppercase tracking-widest truncate"
                    style={{ color: selectedTemplate === template.key ? RUST : MUTED }}
                  >
                    {template.label}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="nextcv-sans text-[8px] line-through" style={{ color: FAINT }}>
                      ₹{template.originalPrice}
                    </span>
                    <span
                      className="nextcv-sans text-[8px] tracking-widest"
                      style={{ color: RUST }}
                    >
                      ₹{template.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card
          className="rounded-2xl border shadow-none overflow-hidden"
          style={{ backgroundColor: WHITE, borderColor: BORDER }}
        >
          <CardHeader className="p-3 border-b" style={{ borderColor: BORDER }}>
            <CardTitle
              className="nextcv-sans text-[10px] tracking-widest flex items-center gap-2"
              style={{ color: MUTED }}
            >
              <FileText className="w-4 h-4" style={{ color: RUST }} />
              RESUME PREVIEW
            </CardTitle>
          </CardHeader>
          <CardContent
            className="p-0 min-h-75 flex items-center justify-center"
            style={{ backgroundColor: BG }}
          >
            <PDFPreview pdfUrl={pdfUrl} variant="mobile" />
          </CardContent>
        </Card>

        <Card
          className="rounded-2xl border shadow-none overflow-hidden"
          style={{ backgroundColor: WHITE, borderColor: BORDER }}
        >
          <CardHeader className="p-4 border-b" style={{ borderColor: BORDER }}>
            <CardTitle
              className="flex items-center gap-2 nextcv-sans text-sm tracking-widest uppercase"
              style={{ color: NAVY }}
            >
              <IndianRupee className="w-4 h-4" style={{ color: RUST }} />
              Checkout
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            <div
              className="flex justify-between items-center p-3 border"
              style={{ backgroundColor: BG, borderColor: BORDER }}
            >
              <span className="nextcv-sans text-xs tracking-widest" style={{ color: MUTED }}>
                TOTAL AMOUNT
              </span>
              <div className="flex items-center gap-2">
                <span className="nextcv-sans text-[10px] line-through" style={{ color: FAINT }}>
                  ₹{basePrice}
                </span>
                <span className="nextcv-serif font-medium text-base" style={{ color: NAVY }}>
                  ₹{amount}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="PROMO CODE"
                className="rounded-2xl border h-10 nextcv-sans text-xs uppercase tracking-widest"
                style={{ backgroundColor: WHITE, borderColor: BORDER, color: NAVY }}
                disabled={applied}
              />
              <Button
                onClick={() => debounceCoupon(couponCode)}
                disabled={!couponCode.trim() || isSubmit || applied}
                className="rounded-none h-10 px-4 nextcv-sans text-xs tracking-widest shadow-none"
                style={{ backgroundColor: applied ? "#3F7A5C" : NAVY, color: WHITE }}
              >
                {applied ? "APPLIED" : "APPLY"}
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                className="w-full rounded-xl shadow-none h-12 nextcv-sans text-sm tracking-widest"
                style={{ backgroundColor: RUST, color: WHITE }}
                onClick={debouncePayment}
                disabled={isSubmit || (couponCode && !applied)}
              >
                <Download className="w-4 h-4 mr-2" />
                DOWNLOAD RESUME
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-none h-10 nextcv-sans text-xs tracking-widest"
                style={{ borderColor: BORDER, color: MUTED }}
                onClick={debounceDraft}
                disabled={isSubmit}
              >
                <Save className="mr-2 h-3.5 w-3.5" />
                SAVE DRAFT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-5 h-[72vh] min-h-155 pt-1">
        {/* Left: Template Selector */}
        <div
          className="w-75 xl:w-80 flex flex-col border rounded-2xl shadow-none overflow-hidden"
          style={{ backgroundColor: WHITE, borderColor: BORDER }}
        >
          <div className="p-4 border-b" style={{ borderColor: BORDER }}>
            <h3
              className="nextcv-sans text-xs tracking-widest flex items-center gap-2 uppercase"
              style={{ color: MUTED }}
            >
              <LayoutTemplate className="w-4 h-4" style={{ color: RUST }} />
              Choose Resume Pack
            </h3>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className="rounded-xl border px-3 py-2.5 nextcv-sans text-[11px] font-semibold uppercase tracking-[0.08em] transition-all"
                  style={
                    activeTier === tier
                      ? { backgroundColor: RUST, color: WHITE, borderColor: RUST }
                      : { backgroundColor: WHITE, color: MUTED, borderColor: BORDER }
                  }
                >
                  {renderTierLabel(tier)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#F8F7F3]">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => renderTemplateCard(template))
            ) : (
              <div
                className="flex h-full items-center justify-center text-center nextcv-sans text-xs tracking-widest"
                style={{ color: FAINT }}
              >
                NO TEMPLATES AVAILABLE IN THIS PACK.
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: BORDER }}>
            <Button
              variant="outline"
              className="w-full rounded-xl nextcv-sans text-xs font-medium tracking-wider hover:bg-[#F1F0EB] transition-colors"
              style={{ borderColor: BORDER, color: MUTED }}
              disabled={isSubmit}
              onClick={debounceDraft}
            >
              <Save className="h-3.5 w-3.5 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Center: Preview */}
        <div
          className="flex-1 flex flex-col border rounded-2xl shadow-none overflow-hidden"
          style={{ backgroundColor: BG, borderColor: BORDER }}
        >
          <div
            className="p-3 border-b flex justify-between items-center px-6"
            style={{ backgroundColor: WHITE, borderColor: BORDER }}
          >
            <span
              className="nextcv-sans text-xs tracking-widest uppercase flex items-center gap-2"
              style={{ color: FAINT }}
            >
              Live resume preview
              <span
                className="px-2 py-0.5 border text-[10px]"
                style={{ color: RUST, borderColor: BORDER, backgroundColor: BG }}
              >
                LIVE
              </span>
            </span>

            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#3F7A5C" }}
              />
              <span
                className="nextcv-sans text-[10px] tracking-widest uppercase"
                style={{ color: "#3F7A5C" }}
              >
                Auto-saved preview
              </span>
            </div>
          </div>

          <PDFPreview pdfUrl={pdfUrl} />
        </div>

        {/* Right: Checkout */}
        <div
          className="w-75 xl:w-80 flex flex-col border rounded-2xl shadow-none overflow-hidden h-fit"
          style={{ backgroundColor: WHITE, borderColor: BORDER }}
        >
          <div className="p-5 border-b" style={{ borderColor: BORDER }}>
            <h3
              className="nextcv-serif text-lg font-medium tracking-tight flex items-center gap-2"
              style={{ color: NAVY }}
            >
              <Sparkles className="w-5 h-5" style={{ color: RUST }} />
              Complete Build
            </h3>
            <p
              className="nextcv-sans text-[10px] uppercase tracking-widest mt-1"
              style={{ color: FAINT }}
            >
              ATS-ready PDF export
            </p>
          </div>

          <div className="p-5 space-y-6">
            <div
              className="p-4 border rounded-xl space-y-3"
              style={{ backgroundColor: BG, borderColor: BORDER }}
            >
              <div
                className="flex justify-between items-center nextcv-sans text-xs"
                style={{ color: MUTED }}
              >
                <span>Selected License</span>
                <span className="font-medium" style={{ color: NAVY }}>₹{basePrice}</span>
              </div>

              {applied && discount && (
                <div
                  className="flex justify-between items-center nextcv-sans text-xs font-medium"
                  style={{ color: "#0F6E63" }}
                >
                  <span>Special Coupon</span>
                  <span>
                    - {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                  </span>
                </div>
              )}

              <div
                className="pt-3 border-t flex justify-between items-center"
                style={{ borderColor: BORDER }}
              >
                <span
                  className="nextcv-sans text-xs font-semibold uppercase tracking-wider"
                  style={{ color: NAVY }}
                >
                  Grand Total
                </span>
                <div className="flex items-center gap-2">
                  <span className="nextcv-sans text-xs line-through" style={{ color: FAINT }}>
                    ₹{basePrice}
                  </span>
                  <span
                    className="nextcv-serif text-2xl font-semibold tracking-tight"
                    style={{ color: NAVY }}
                  >
                    ₹{amount}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="nextcv-sans text-[11px] font-medium uppercase tracking-wider"
                style={{ color: MUTED }}
              >
                Have a coupon?
              </label>

              <div className="flex gap-2 relative">
                <Input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="rounded-xl border h-10 nextcv-sans text-xs uppercase tracking-wider placeholder:normal-case placeholder:font-normal placeholder:tracking-normal focus:border-[#465B9E]"
                  style={{ backgroundColor: WHITE, borderColor: BORDER, color: NAVY }}
                  disabled={applied}
                />

                {!applied ? (
                  <Button
                    onClick={() => debounceCoupon(couponCode)}
                    disabled={!couponCode.trim() || isSubmit}
                    size="sm"
                    className="rounded-xl px-4 h-10 nextcv-sans text-xs font-medium tracking-wide shadow-none hover:bg-[#344B93] transition-colors"
                    style={{ backgroundColor: RUST, color: WHITE }}
                  >
                    Apply
                  </Button>
                ) : (
                  <button
                    onClick={removeCoupon}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:opacity-80"
                    style={{ color: RUST }}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

              {applied && (
                <p
                  className="nextcv-sans text-xs tracking-wide font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1"
                  style={{ color: "#0F6E63" }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Coupon applied successfully
                </p>
              )}
            </div>
          </div>

          <div className="p-5 border-t" style={{ borderColor: BORDER }}>
            <Button
              className="w-full rounded-xl shadow-sm py-6 nextcv-sans text-sm font-medium tracking-wider transition-all hover:bg-[#344B93]"
              style={{ backgroundColor: RUST, color: WHITE }}
              onClick={debouncePayment}
              disabled={isSubmit || (couponCode && !applied)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {isRedirecting && <RedirectToPayment />}
    </div>
  );
};

export default React.memo(FinalStep);
