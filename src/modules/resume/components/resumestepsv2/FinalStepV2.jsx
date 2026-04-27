"use client";
import React, { useState, useEffect } from "react";
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
import { Document, Page } from "react-pdf";
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const { basePrice } = usePricing({
    selectedTemplate,
    applied,
    originalAmount,
    discount,
    setAmount,
    setOriginalAmount,
  });

  const getPdfWidth = () => {
    if (windowWidth < 640) return windowWidth - 32; // mobile
    if (windowWidth < 1024) return 500; // tablet
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
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
            Final Blueprint
          </h2>
          <p className="text-slate-500 mt-1 text-xs md:text-lg">
            Select a template and finalize your master document.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={previous}
            className="h-9 md:h-12 px-3 md:px-5 rounded-xl font-bold text-slate-500 hover:text-indigo-600 text-xs md:text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
          </Button>
          <Button
            onClick={debounceDraft}
            variant="outline"
            className="h-9 md:h-12 px-3 md:px-5 rounded-xl border-slate-200 font-bold text-slate-700 bg-white shadow-sm text-xs md:text-sm"
          >
            <Save className="w-4 h-4 mr-1.5" /> Archive
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 lg:overflow-hidden">
        {/* Template Selector Section */}
        <div className="lg:col-span-3 flex flex-col gap-4 lg:h-[calc(100vh-200px)] h-[300px] md:h-[400px] overflow-y-auto order-2 lg:order-1 custom-scrollbar pr-2 pb-10">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
            Engine Themes
          </h3>

          <div className="space-y-8">
            {resumeTemplateCatalog.map(tier => (
              <div key={tier.tierName} className="space-y-4">
                <div className="px-1 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {tier.tierName}
                  </h3>
                  <div className="h-px flex-1 bg-slate-100 ml-3"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {tier.templates.map(t => {
                    const template = templates.find(x => x.key === t.templateName);
                    if (!template) return null;
                    return (
                      <motion.div
                        key={template.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTemplate(template.key)}
                        className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all border-2 ${selectedTemplate === template.key ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10" : "bg-white border-slate-100 hover:border-indigo-200 shadow-sm"}`}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={template.image}
                            alt={template.label}
                            height={300}
                            width={300}
                            className={`object-cover transition-transform duration-500 ${selectedTemplate === template.key ? "scale-105" : "group-hover:scale-105"}`}
                          />
                          {selectedTemplate === template.key && (
                            <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1 rounded-lg">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="p-2 flex flex-col items-center gap-1">
                          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate w-full text-center">
                            {template.label}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase">
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
          className="lg:col-span-6 flex flex-col bg-white border border-slate-100 lg:rounded-[2.5rem] rounded-xl shadow-xl lg:overflow-hidden min-h-0 order-1 lg:order-2"
          id="tour-final-preview-v2"
        >
          <div className="h-12 md:h-14 flex items-center justify-between px-6 border-b border-slate-50 bg-slate-50/30">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Professional Render
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-200" />
              <div className="w-2 h-2 rounded-full bg-slate-200" />
              <div className="w-2 h-2 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/30 flex justify-center custom-scrollbar">
            <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white h-fit w-full max-w-[550px]">
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
                <div className="w-full aspect-[1/1.41] bg-white flex flex-col items-center justify-center gap-4 text-slate-300">
                  <Zap className="w-10 h-10 animate-pulse text-indigo-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Assembling Document...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout & Actions Section */}
        <div className="lg:col-span-3 space-y-4 md:space-y-6 order-3">
          <Card className="border-none shadow-xl bg-white rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm md:text-lg font-black text-slate-900 tracking-tight">
                  Checkout Summary
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Standard Access
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Price</span>
                  <span>₹{basePrice}</span>
                </div>
                {applied && (
                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    <span>Discount</span>
                    <span>- ₹{originalAmount - amount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-black text-slate-900">Total</span>
                  <div className="flex items-center gap-2">
                    {applied && <span className="text-[10px] text-slate-400 line-through">₹{basePrice}</span>}
                    <span className="text-base font-black text-slate-900">₹{amount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative group">
                  <Input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="PROMO CODE"
                    disabled={applied}
                    className="h-10 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 rounded-xl transition-all uppercase px-4 font-black text-xs tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-bold"
                  />
                  {applied ? (
                    <button
                      onClick={removeCoupon}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => debounceCoupon(couponCode)}
                      disabled={!couponCode || isSubmit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md hover:bg-indigo-600 transition-all disabled:opacity-50"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {applied && (
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest px-1">
                    <CheckCircle2 className="w-3 h-3" /> Offer Logic Active
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 h-12 md:h-14 rounded-xl md:rounded-2xl font-black text-sm md:text-base transition-all group"
                onClick={debouncePayment}
                disabled={isSubmit || (couponCode && !applied)}
                id="tour-payment-section-v2"
              >
                <Download className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-0.5 transition-transform" />
                {isSubmit ? "Processing..." : "Generate PDF"}
              </Button>

              <div className="flex flex-col items-center gap-3 text-[8px] font-black uppercase tracking-widest text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" /> Secure Payment Gateway
                </div>
                <div className="flex gap-4">
                  <IndianRupee className="w-3 h-3" />
                  <Crown className="w-3 h-3" />
                  <Zap className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Card>

          <div className="p-4 md:p-5 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl hidden lg:block">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-black text-slate-900 text-[10px] md:text-xs">ATS Perfect</h4>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-tighter leading-tight">
                  Formatted for high-performance job applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <AnimatePresence>{isRedirecting && <RedirectToPayment />}</AnimatePresence>
    </div>
  );
};

export default React.memo(FinalStepV2);
