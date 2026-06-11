"use client";

import React, { useMemo, useState } from "react";
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
import dynamic from "next/dynamic";
const PDFPreview = dynamic(() => import("../pdfPreview"), {
  ssr: false,
  loading: () => <div className="text-xs text-slate-400">Loading preview...</div>,
});
const TIERS = ["Basic", "Standard", "Premium", "Elite"];

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
    handelPayment();
  }, 1000);

  const debounceDraft = useDebouncedCallback(() => {
    handleSaveDraft();
  }, 1000);

  const debounceCoupon = useDebouncedCallback(coupon => {
    handleCoupon(coupon);
  }, 1000);

  const renderTierLabel = tier => {
    if (tier === "Premium") return "🔥 Premium";
    if (tier === "Elite") return "👑 Elite";
    return tier;
  };

  const renderTemplateCard = template => (
    <div
      key={template.key}
      onClick={() => setSelectedTemplate(template.key)}
      className={`group relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
        selectedTemplate === template.key
          ? "border-indigo-600 shadow-md ring-2 ring-indigo-50"
          : "border-slate-100 hover:border-indigo-200"
      }`}
    >
      {template.tier === "Premium" && (
        <div className="absolute top-2 left-2 z-10 rounded-full bg-indigo-600 px-2 py-1 text-[9px] font-black text-white shadow">
          MOST POPULAR
        </div>
      )}

      {template.tier === "Elite" && (
        <div className="absolute top-2 left-2 z-10 rounded-full bg-yellow-500 px-2 py-1 text-[9px] font-black text-white shadow">
          ALL ACCESS
        </div>
      )}

      <div className="aspect-3/4 w-full bg-slate-100 overflow-hidden">
        {template.image ? (
          <Image
            src={template.image}
            alt={template.label}
            height={400}
            width={300}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2 opacity-30">
            <LayoutTemplate className="w-8 h-8" />
            <span className="text-[10px] uppercase font-bold">Preview</span>
          </div>
        )}
      </div>

      <div
        className={`p-3 text-center border-t border-slate-50 ${
          selectedTemplate === template.key ? "bg-indigo-50/50" : "bg-white"
        }`}
      >
        <span
          className={`font-black text-[10px] uppercase tracking-widest ${
            selectedTemplate === template.key ? "text-indigo-800" : "text-slate-600"
          }`}
        >
          {template.label}
        </span>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white border border-slate-100 text-slate-400 font-bold uppercase">
            {template.tier}
          </span>

          <span className="text-[9px] text-slate-300 line-through">₹{template.originalPrice}</span>

          <span className="text-[10px] font-black text-indigo-600">₹{template.price}</span>
        </div>
      </div>

      {selectedTemplate === template.key && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-lg z-10">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
  return (
    <div className="py-4">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Review & Download</h2>
        <p className="text-[10px] md:text-sm text-slate-500">
          Perfect your resume and choose your signature style
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="w-full flex flex-col gap-2 lg:hidden pb-5">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
            <LayoutTemplate className="w-3.5 h-3.5 text-indigo-500" />
            Choose Resume Pack
          </label>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {TIERS.map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`shrink-0 rounded-xl border px-4 py-2 text-[10px] font-black uppercase transition-all ${
                  activeTier === tier
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-slate-500 border-slate-200"
                }`}
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
                className={`flex-none w-36 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer snap-start relative ${
                  selectedTemplate === template.key
                    ? "bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-100"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                {template.tier === "Premium" && (
                  <span className="absolute top-2 left-2 z-10 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[7px] font-black text-white">
                    POPULAR
                  </span>
                )}

                <div className="w-full aspect-3/4 bg-slate-200 rounded-lg overflow-hidden mb-1">
                  {template.image ? (
                    <Image
                      src={template.image}
                      alt={template.label}
                      height={200}
                      width={150}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-50">
                      <LayoutTemplate className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                </div>

                <div className="w-full text-center">
                  <p
                    className={`text-[9px] font-black uppercase tracking-widest truncate ${
                      selectedTemplate === template.key ? "text-indigo-900" : "text-slate-500"
                    }`}
                  >
                    {template.label}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-[8px] text-slate-400 line-through">
                      ₹{template.originalPrice}
                    </span>
                    <span className="text-[8px] font-black text-indigo-600">₹{template.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-3 border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Professional Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-slate-100/50 min-h-75 flex items-center justify-center">
            <PDFPreview pdfUrl={pdfUrl} variant="mobile" />
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-lg rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-4 border-b border-slate-50 bg-indigo-50/30">
            <CardTitle className="flex items-center gap-2 text-sm font-black text-indigo-900 uppercase tracking-tight">
              <IndianRupee className="w-4 h-4 text-indigo-600" />
              Checkout
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-600 font-bold text-xs">Total Amount</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 line-through">₹{basePrice}</span>
                <span className="text-base font-black text-slate-900">₹{amount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="PROMO CODE"
                className="bg-white border-slate-200 h-10 text-xs font-bold uppercase"
                disabled={applied}
              />
              <Button
                onClick={() => debounceCoupon(couponCode)}
                disabled={!couponCode.trim() || isSubmit || applied}
                className={`h-10 px-4 text-xs font-black ${
                  applied ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-900"
                }`}
              >
                {applied ? "APPLIED" : "APPLY"}
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 h-12 text-sm font-bold"
                onClick={debouncePayment}
                disabled={isSubmit || (couponCode && !applied)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Premium PDF
              </Button>

              <Button
                variant="outline"
                className="w-full border-slate-200 text-slate-500 h-10 text-xs font-bold"
                onClick={debounceDraft}
                disabled={isSubmit}
              >
                <Save className="mr-2 h-3.5 w-3.5" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-6 h-[70vh] min-h-150">
        {/* Left: Template Selector */}
        <div className="w-80 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/30">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <LayoutTemplate className="w-4 h-4 text-indigo-500" />
              Choose Resume Pack
            </h3>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {TIERS.map(tier => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`rounded-lg border px-2 py-2 text-[10px] font-black uppercase transition-all ${
                    activeTier === tier
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                  }`}
                >
                  {renderTierLabel(tier)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => renderTemplateCard(template))
            ) : (
              <div className="flex h-full items-center justify-center text-center text-xs font-bold text-slate-400">
                No templates available in this pack.
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100">
            <Button
              variant="outline"
              className="w-full border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs"
              disabled={isSubmit}
              onClick={debounceDraft}
            >
              <Save className="h-3.5 w-3.5 mr-2" />
              Save Progress
            </Button>
          </div>
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex flex-col bg-slate-50 border border-slate-200 rounded-xl shadow-inner overflow-hidden">
          <div className="p-3 bg-white border-b border-slate-200 flex justify-between items-center px-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              A4 Studio Preview
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] border border-indigo-100">
                LIVE
              </span>
            </span>

            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Synchronized</span>
            </div>
          </div>

          <PDFPreview pdfUrl={pdfUrl} />
        </div>

        {/* Right: Checkout */}
        <div className="w-80 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="p-5 border-b border-slate-50 bg-linear-to-br from-indigo-50/50 to-white">
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Complete Build
            </h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
              Premium ATS-Friendly Export
            </p>
          </div>

          <div className="p-5 space-y-6">
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Selected License</span>
                <span className="font-bold text-slate-800">₹{basePrice}</span>
              </div>

              {applied && discount && (
                <div className="flex justify-between items-center text-xs text-emerald-600 font-bold">
                  <span>Special Coupon</span>
                  <span>
                    - {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-800 uppercase">Grand Total</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 line-through">₹{basePrice}</span>
                  <span className="text-xl font-semibold text-slate-900 tracking-tighter">
                    ₹{amount}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Discount Rewards
              </label>

              <div className="flex gap-2 relative">
                <Input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="ENTER CODE"
                  className="bg-white border-slate-200 focus:border-indigo-500 h-10 text-xs font-black uppercase tracking-widest placeholder:normal-case placeholder:font-medium placeholder:tracking-normal"
                  disabled={applied}
                />

                {!applied ? (
                  <Button
                    onClick={() => debounceCoupon(couponCode)}
                    disabled={!couponCode.trim() || isSubmit}
                    size="sm"
                    className="bg-slate-900 text-white hover:bg-slate-800 px-4 font-semibold h-10"
                  >
                    Apply
                  </Button>
                ) : (
                  <button
                    onClick={removeCoupon}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {applied && (
                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Promotion code applied!
                </p>
              )}
            </div>
          </div>

          <div className="p-5 border-t border-slate-50 bg-slate-50/30">
            <Button
              className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-xl shadow-indigo-200 py-6 text-sm font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0"
              onClick={debouncePayment}
              disabled={isSubmit || (couponCode && !applied)}
            >
              <Download className="mr-2 h-5 w-5" />
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
