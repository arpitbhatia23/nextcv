"use client";
import React, { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  IndianRupee,
  Save,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Crown,
  Check,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { templates } from "@/shared/utils/template";
import resumeTemplateCatalog from "@/shared/utils/resumeTemplateCatlog";
import { useDebouncedCallback } from "use-debounce";
import FeedbackModal from "@/modules/feedback/components/FeedbackModal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useResumeStore from "@/store/useResumeStore";
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/resume/hooks/usedraft";
import { useResumeGen } from "@/modules/resume/hooks/useResumeGen";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import { WatermarkLayer } from "@/modules/payment/components/WatermarkLayer";
import RedirectToPayment from "@/modules/payment/components/redirectToPayment";

const FinalStepV2 = ({ previous, formData }) => {
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore(s => s.setSelectedTemplate);
  const [numPages, setNumPages] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(49);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [applied, setApplied] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const { discount, handleCoupon, removeCoupon } = useCoupon({
    setIsSubmit,
    originalAmount,
    setAmount,
    setCouponCode,
    setApplied,
  });

  const { handelPayment, isRedirecting } = usePayment({
    discount,
    originalAmount,
    formData,
    applied,
    selectedTemplate,
    setIsSubmit,
    couponCode,
  });
  const { handleSaveDraft } = useDraft({
    setIsSubmit,
    selectedTemplate,
    formData,
    setIsFeedbackOpen,
  });

  const { pdfUrl } = useResumeGen({ formData, selectedTemplate });
  // Debounced handlers

  const { basePrice } = usePricing({
    selectedTemplate,
    applied,
    originalAmount,
    discount,
    setAmount,
    setOriginalAmount,
  });
  const getPdfWidth = () => {
    if (windowWidth < 640) return windowWidth - 64; // mobile
    if (windowWidth < 1024) return 600; // tablet
    return 550; // desktop
  };

  const debouncePayment = useDebouncedCallback(() => {
    handelPayment();
  }, 500);

  const debounceDraft = useDebouncedCallback(() => {
    handleSaveDraft();
  }, 500);

  const debounceCoupon = useDebouncedCallback(coupon => {
    handleCoupon(coupon);
  }, 500);

  return (
    <div className="py-2 lg:h-[calc(100vh-120px)] flex flex-col h-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
            Final Blueprint
          </h2>
          <p className="text-slate-500 mt-2 text-sm md:text-lg">
            Select a template and finalize your career document.
          </p>
        </div>

        <div className="flex gap-1  md:gap-3">
          <Button
            variant="ghost"
            onClick={previous}
            className="h-10 md:h-12 rounded-lg md:rounded-xl font-bold text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button
            onClick={debounceDraft}
            variant="outline"
            className="h-10 md:h-12 rounded-lg md:rounded-xl border-slate-200  font-bold text-slate-700 bg-white shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" /> Archive Draft
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 lg:overflow-hidden overflow-visible">
        {/* Template Selector Section */}
        <div className="lg:col-span-3 flex flex-col gap-6 lg:h-[calc(100vh-200px)] h-[50vh] overflow-y-auto order-2 lg:order-1 custom-scrollbar pr-2 pb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Architectural Templates
            </h3>
          </div>

          <div className="space-y-10 pb-24">
            {resumeTemplateCatalog.map(tier => (
              <div key={tier.tierName} className="space-y-4">
                {
                  <div className="px-1 flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {tier.tierName} Tier
                    </h3>
                    <div className="h-px flex-1 bg-slate-100 ml-3"></div>
                  </div>
                }
                <div className="grid grid-cols-1 gap-4">
                  {tier.templates.map(t => {
                    const template = templates.find(x => x.key === t.templateName);
                    if (!template) return null;
                    return (
                      <motion.div
                        key={template.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedTemplate(template.key);
                          if (setSidebarOpen) setSidebarOpen(false);
                        }}
                        className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border-2 ${selectedTemplate === template.key ? "bg-white border-indigo-500 shadow-lg shadow-indigo-100 ring-2 ring-indigo-500/20" : "bg-white border-slate-100 hover:border-indigo-300 shadow-sm"}`}
                      >
                        <div className="relative aspect-3/4 overflow-hidden">
                          <Image
                            src={template.image}
                            alt={template.label}
                            height={500}
                            width={500}
                            className={`object-cover transition-transform duration-700 ${selectedTemplate === template.key ? "scale-110" : "group-hover:scale-105"}`}
                          />
                          <div
                            className={`absolute inset-0 bg-linear-to-t transition-opacity duration-300 ${selectedTemplate === template.key ? "from-indigo-600/40 via-transparent opacity-100" : "from-slate-900/40 via-transparent opacity-0 group-hover:opacity-100"}`}
                          />
                          {selectedTemplate === template.key && (
                            <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1.5 rounded-lg shadow-lg">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center">
                          <p
                            className={`text-[10px] font-black uppercase tracking-widest ${selectedTemplate === template.key ? "text-indigo-900" : "text-slate-500"}`}
                          >
                            {template.label}
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-1.5 ">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                              {tier.tierName}
                            </span>
                            <span className="text-[10px] font-black text-indigo-600">
                              ₹{t.priceDiscounted || 49}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Preview Section */}
        <div
          className="lg:col-span-6 flex flex-col bg-white border border-slate-100 lg:rounded-[3rem] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] lg:overflow-hidden overflow-visible min-h-0 order-1 lg:order-2"
          id="tour-final-preview-v2"
        >
          <div className="h-16 flex items-center justify-between px-8 border-b border-slate-50 bg-slate-50/30">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> High-Resolution Preview
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50 flex justify-center custom-scrollbar">
            <div className="relative shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden bg-white h-fit w-full lg:scale-[0.9] scale-100 origin-top">
              {pdfUrl && <WatermarkLayer />}

              {pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  onContextMenu={e => e.preventDefault()}
                >
                  {Array.from({ length: numPages || 0 }).map((_, idx) => (
                    <Page
                      key={idx}
                      pageNumber={idx + 1}
                      width={getPdfWidth()}
                      className="bg-white"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  ))}
                </Document>
              ) : (
                <div className="w-137.5 aspect-[1/1.41] bg-white flex flex-col items-center justify-center gap-4 text-slate-300">
                  <Zap className="w-12 h-12 animate-pulse text-indigo-200" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">
                    Synthesizing Document
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout & Actions Section */}
        <div className="lg:col-span-3 space-y-6 order-3">
          <Card className="border-none shadow-[20px_40px_80px_rgba(0,0,0,0.05)] bg-white rounded-4xl overflow-hidden">
            <div className="p-2 md:p-8 space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                  Checkout
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Standard License for Single Download
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                  <span>Base Rate</span>
                  <span>₹{basePrice}</span>
                </div>
                {applied && (
                  <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
                    <span>Promo Applied</span>
                    <span>- ₹{originalAmount - amount}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through">₹{basePrice}</span>

                    <span className="text-lg font-bold text-slate-900">₹{amount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="PROMO CODE"
                    disabled={applied}
                    className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 rounded-xl transition-all uppercase px-4 font-bold tracking-widest placeholder:normal-case placeholder:tracking-normal"
                    id="tour-coupon-section-v2"
                  />
                  {applied ? (
                    <button
                      onClick={removeCoupon}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => debounceCoupon(couponCode)}
                      disabled={!couponCode || isSubmit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase px-3 py-2 rounded-lg hover:bg-indigo-600 transition-all disabled:opacity-50"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {applied && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2 group">
                    <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />{" "}
                    Discount Success
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-100 py-4 md:py-8 rounded-xl md:rounded-2xl font-semibold md:font-black text-lg transition-all hover:-translate-y-1 active:scale-95 group"
                onClick={debouncePayment}
                disabled={isSubmit || (couponCode && !applied)}
                id="tour-payment-section-v2"
              >
                <Download className="mr-3 w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
                {isSubmit ? "Authenticating..." : "Unlock PDF"}
              </Button>

              <div className="flex flex-col items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Secure SSL Server
                </div>
                <div className="flex gap-4">
                  <IndianRupee className="w-4 h-4" />
                  <Crown className="w-4 h-4" />
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Card>

          <div className="p-2 md:p-6 bg-linear-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl">
            <div className="flex gap-1 md:gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-900 text-sm">Design Ready</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Your resume will be generated in pixel-perfect A4 format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Redirection Overlay */}
      <AnimatePresence>{isRedirecting && <RedirectToPayment />}</AnimatePresence>
    </div>
  );
};

export default React.memo(FinalStepV2);
