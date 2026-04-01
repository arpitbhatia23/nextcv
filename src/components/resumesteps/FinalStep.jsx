"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  Save,
  Download,
  LayoutTemplate,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Image from "next/image";

import { templates } from "@/shared/utils/template";
import { useDebouncedCallback } from "use-debounce";
import useResumeStore from "@/store/useResumeStore";
import FeedbackModal from "@/components/FeedbackModal";
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/resume/hooks/usedraft";
import { useResumeGen } from "@/modules/resume/hooks/useResumeGen";
import { usePricing } from "@/modules/payment/hooks/usePricing";

const WatermarkLayer = () => (
  <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.06] select-none">
    <div className="flex flex-wrap content-center justify-center gap-32 w-[200%] h-[200%] -rotate-45 transform origin-center">
      {Array.from({ length: 80 }).map((_, i) => (
        <span
          key={i}
          className="text-xl md:text-2xl font-black text-gray-950 whitespace-nowrap uppercase"
        >
          NextCV Preview
        </span>
      ))}
    </div>
  </div>
);

const FinalStep = ({ formData, isdraft = false }) => {
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore(s => s.setSelectedTemplate);
  const [numPages, setNumPages] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(100);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const { handelPayment, isRedirecting } = usePayment({
    discount,
    originalAmount,
    formData,
    applied,
    selectedTemplate,
    setIsSubmit,
    couponCode,
  });

  const { applied, discount, handleCoupon, removeCoupon } = useCoupon({
    setIsSubmit,
    originalAmount,
    setAmount,
    setCouponCode,
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
  const debouncePayment = useDebouncedCallback(() => {
    handelPayment();
  }, 1000);

  const debounceDraft = useDebouncedCallback(() => {
    handleSaveDraft();
  }, 1000);

  const debounceCoupon = useDebouncedCallback(coupon => {
    handleCoupon(coupon);
  }, 1000);

  return (
    <div className="py-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Review & Download</h2>
        <p className="text-slate-500">Choose a template, preview, and download your resume.</p>
      </div>

      {/* Mobile Layout */}
      <div className="w-full flex flex-col gap-4 lg:hidden pb-20">
        {!isdraft && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-indigo-500" /> Select Template
            </label>
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x">
              {templates.map(template => (
                <div
                  key={template.key}
                  onClick={() => setSelectedTemplate(template.key)}
                  className={`flex-none w-40 flex flex-col items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer snap-start ${
                    selectedTemplate === template.key
                      ? "bg-indigo-50 border-indigo-500 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${selectedTemplate === template.key ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    <LayoutTemplate className="w-6 h-6" />
                  </div>
                  <div className="w-full text-center">
                    <p
                      className={`text-xs font-medium whitespace-normal text-center leading-tight ${selectedTemplate === template.key ? "text-indigo-900" : "text-slate-700"}`}
                    >
                      {template.label}
                    </p>
                  </div>
                  {selectedTemplate === template.key && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-4 border-b border-slate-100 bg-white">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-slate-100/50 min-h-75 flex items-center justify-center">
            {pdfUrl ? (
              <div
                className="p-4 w-full flex justify-center relative overflow-hidden"
                onContextMenu={e => e.preventDefault()}
              >
                <WatermarkLayer />

                <Document
                  file={pdfUrl}
                  loading={
                    <div className="text-slate-400 text-sm animate-pulse">Loading Preview...</div>
                  }
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="shadow-md"
                >
                  {Array.from({ length: numPages || 0 }).map((_, idx) => (
                    <Page
                      key={idx}
                      pageNumber={idx + 1}
                      width={280}
                      className="mb-2"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  ))}
                </Document>
              </div>
            ) : (
              <div className="text-slate-400 text-sm flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" /> Generating...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Section Mobile */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="p-4 border-b border-slate-100">
            <CardTitle className="flex items-center gap-2 text-base">
              <IndianRupee className="w-4 h-4 text-indigo-600" /> Payment & Download
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-5">
            {/* Total */}
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-600 font-medium text-sm">Total Amount</span>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 line-through">₹{basePrice}</span>

                <span className="text-lg font-bold text-slate-900">₹{amount}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="bg-white border-slate-200 h-10 text-sm"
                  disabled={applied}
                />
                <Button
                  onClick={() => debounceCoupon(couponCode)}
                  disabled={!couponCode.trim() || isSubmit || applied}
                  variant={applied ? "outline" : "default"}
                  className={!applied ? "bg-slate-900 text-white h-10 px-5" : "h-10 px-5"}
                >
                  {applied ? "Applied" : "Apply"}
                </Button>
                {applied && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeCoupon}
                    className="h-10 w-10 shrink-0 text-red-500 hover:bg-red-50"
                  >
                    <AlertCircle className="w-5 h-5" />
                  </Button>
                )}
              </div>
              {applied && discount && (
                <p className="text-xs text-green-600 font-medium flex items-center gap-1 pl-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Saved{" "}
                  {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-12 text-base"
                onClick={debouncePayment}
                disabled={isSubmit || (couponCode && !applied)}
              >
                Unlock Download
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-200 text-slate-600 h-10"
                onClick={debounceDraft}
                disabled={isSubmit}
              >
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 overflow-hidden w-full gap-6 h-full min-h-0">
        {/* Left: Template List - Fixed Sidebar */}
        {!isdraft && (
          <div
            className="w-64 lg:w-80 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full shrink-0"
            id="tour-template-selection"
          >
            <div className="p-4 border-b border-slate-100 bg-white z-10 shrink-0">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-indigo-500" /> Select Template
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 custom-scrollbar">
              <div className="grid grid-cols-1 gap-4">
                {templates.map(template => (
                  <div
                    key={template.key}
                    onClick={() => setSelectedTemplate(template.key)}
                    className={`group relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      selectedTemplate === template.key
                        ? "border-indigo-600 shadow-md ring-2 ring-indigo-100"
                        : "border-slate-200 hover:border-indigo-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Image Preview */}
                    <div className="aspect-3/4 w-full bg-slate-200 relative overflow-hidden">
                      {template.image ? (
                        <Image
                          src={template.image}
                          alt={template.label}
                          fill
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-100 gap-2">
                          <LayoutTemplate className="w-10 h-10 opacity-20" />
                          <span className="text-xs font-medium opacity-50">No Preview</span>
                        </div>
                      )}

                      {/* Overlay for selection */}
                      <div
                        className={`absolute inset-0 bg-indigo-900/10 transition-opacity ${selectedTemplate === template.key ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      />
                    </div>

                    {/* Label */}
                    <div
                      className={`p-3 text-center border-t ${selectedTemplate === template.key ? "bg-indigo-50 border-indigo-100" : "bg-white border-slate-100"}`}
                    >
                      <span
                        className={`font-medium text-sm ${selectedTemplate === template.key ? "text-indigo-700" : "text-slate-700"}`}
                      >
                        {template.label}
                      </span>
                    </div>

                    {selectedTemplate === template.key && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-lg z-10">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-white shrink-0">
              <Button
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                disabled={isSubmit}
                onClick={debounceDraft}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        )}

        {/* Center: Resume Preview */}
        <div
          className="flex-1 flex flex-col bg-slate-50 border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full"
          id="tour-final-preview"
        >
          <div className="p-3 border-b border-slate-200 bg-white flex justify-between items-center px-6">
            <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
              Live Preview{" "}
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs border border-indigo-100">
                A4
              </span>
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-slate-100/50">
            <div
              className="shadow-2xl h-fit relative overflow-hidden"
              onContextMenu={e => e.preventDefault()}
            >
              {pdfUrl && <WatermarkLayer />}

              {pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={
                    <div className="flex flex-col items-center gap-3 p-12 bg-white rounded-xl shadow-sm border border-slate-100">
                      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-medium text-slate-500 animate-pulse">
                        Rendering Resume...
                      </p>
                    </div>
                  }
                  error={
                    <div className="text-red-500 bg-white p-4 rounded-lg shadow-sm">
                      Failed to load preview
                    </div>
                  }
                >
                  {Array.from({ length: numPages || 0 }).map((_, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <Page
                        pageNumber={idx + 1}
                        width={numPages > 0 ? undefined : 600}
                        className="bg-white max-w-full"
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                    </div>
                  ))}
                </Document>
              ) : (
                <div className="h-200 w-150 bg-white animate-pulse rounded-sm shadow-sm border border-slate-200" />
              )}
            </div>
          </div>
        </div>

        {/* Right: Payment (Desktop) - Fixed Sidebar */}
        <div
          className="w-64 lg:w-80 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-fit sticky top-4"
          id="tour-payment-section"
        >
          <div className="p-5 border-b border-slate-100 bg-linear-to-r from-indigo-50 to-white">
            <h3 className="text-lg font-bold text-slate-900">Finalize Resume</h3>
            <p className="text-xs text-slate-500 mt-1">Download specifically in PDF format.</p>
          </div>
          <div className="p-5 space-y-6">
            {/* Price Breakdown */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Resume Base Price</span>
                <span className="font-semibold text-slate-900">₹{basePrice}</span>
              </div>
              {applied && discount && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">
                    - {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-base font-bold text-slate-800">Total Pay</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 line-through">₹{basePrice}</span>

                  <span className="text-lg font-bold text-slate-900">₹{amount}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="space-y-2" id="tour-coupon-section">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Have a coupon?
              </label>
              <div className="flex gap-2 relative">
                <Input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="ENTER CODE"
                  className="bg-white border-slate-200 focus:border-indigo-500 transition-all uppercase placeholder:normal-case"
                  disabled={applied}
                />
                {!applied ? (
                  <Button
                    onClick={() => debounceCoupon(couponCode)}
                    disabled={!couponCode.trim() || isSubmit}
                    size="sm"
                    className="bg-slate-800 text-white hover:bg-slate-700 px-4"
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={removeCoupon}
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 absolute right-1 top-1 h-8 w-8"
                  >
                    <span className="sr-only">Remove</span>
                    &times;
                  </Button>
                )}
              </div>
              {applied && (
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded border border-green-100">
                  <CheckCircle2 className="w-3 h-3" /> Coupon applied successfully!
                </div>
              )}
            </div>
          </div>

          <div className="p-5 border-t border-slate-100 bg-slate-50/50">
            <Button
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/20 py-6 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={debouncePayment}
              disabled={isSubmit || (couponCode && !applied)}
            >
              <Download className="mr-2 h-5 w-5" />
              Unlock Download
            </Button>
            <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" /> Secure 256-bit SSL Payment
            </p>
          </div>
        </div>
      </div>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        // resumeId={savedResumeId}
      />

      {/* Redirection Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-100 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-none shadow-2xl bg-white overflow-hidden">
            <div className="p-8 text-center space-y-6">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                  <IndianRupee className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Redirecting to Paytm</h3>
                <p className="text-slate-500">
                  Securely connecting to payment gateway. Please wait...
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900">Important</p>
                  <p className="text-amber-800 leading-relaxed">
                    Do not refresh or close this window. After successful payment, you will be
                    automatically redirected to your download page.
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Safe & Secure 256-bit SSL Payment
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FinalStep;
