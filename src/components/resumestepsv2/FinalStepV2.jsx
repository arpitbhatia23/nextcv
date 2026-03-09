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
  ShieldCheck,
  Zap,
  ArrowLeft,
  Crown,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import axios from "axios";
import { toast } from "sonner";
import { templates } from "@/utils/template";
import { pdfGenerator } from "@/lib/pdfGenerator";
import { useDebouncedCallback } from "use-debounce";
import useResumeStore from "@/store/useResumeStore";
import FeedbackModal from "@/components/FeedbackModal";
import { motion, AnimatePresence } from "framer-motion";

const WatermarkLayer = () => (
  <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden select-none opacity-[0.07]">
    <svg className="w-full h-full">
      <defs>
        <pattern
          id="watermark-pattern"
          width="250"
          height="150"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <text
            x="0"
            y="50"
            className="text-[14px] font-black fill-slate-900 uppercase tracking-[0.2em]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            NextCV Premium
          </text>
          <text
            x="125"
            y="125"
            className="text-[14px] font-black fill-slate-900 uppercase tracking-[0.2em]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            NextCV Premium
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark-pattern)" />
    </svg>
  </div>
);

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FinalStepV2 = ({ next, previous, formData, isdraft = false }) => {
  const selectedTemplate = useResumeStore(
    (s) => s.selectedTemplate || "InfographicLite",
  );
  const setSelectedTemplate = useResumeStore((s) => s.setSelectedTemplate);
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(100);
  const [originalAmount] = useState(100);
  const [discount, setDiscount] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [savedResumeId, setSavedResumeId] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log(formData);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPdfWidth = () => {
    if (windowWidth < 640) return windowWidth - 64; // mobile
    if (windowWidth < 1024) return 600; // tablet
    return 550; // desktop
  };

  const clearDraft = useResumeStore((s) => s.clearStorage);

  const debouncePayment = useDebouncedCallback(() => {
    handlePayment();
  }, 500);

  const debounceDraft = useDebouncedCallback(() => {
    handleSaveDraft();
  }, 500);

  const debounceCoupon = useDebouncedCallback((coupon) => {
    handleCoupon(coupon);
  }, 500);

  const handleSaveDraft = async () => {
    try {
      setIsSubmit(true);
      const res = await axios.post("/api/resume/savedraft", {
        ResumeType: selectedTemplate,
        ...formData,
      });

      if (res.data.success) {
        toast.success("Design Archive Saved!");
        clearDraft();
        setSavedResumeId(res.data.data?._id);
        setIsFeedbackOpen(true);
      } else {
        toast.error(res.data.message || "Failed to save draft");
      }
    } catch (error) {
      toast.error("Cloud synchronization failed");
    } finally {
      setIsSubmit(false);
    }
  };

  const removeCoupon = () => {
    setAmount(originalAmount);
    setDiscount(null);
    setApplied(false);
    setCouponCode("");
    setAppliedCoupon(null);
    toast.info("Coupon detached");
  };

  useEffect(() => {
    const pdfGen = new pdfGenerator(formData, selectedTemplate);
    let isMounted = true;
    pdfGen.createPdf().then((url) => {
      if (isMounted) setPdfUrl(url);
    });

    return () => {
      isMounted = false;
      pdfGen.cleanUp();
    };
  }, [formData, selectedTemplate]);

  const handlePayment = async () => {
    if (couponCode && !applied) {
      toast.error("Authenticate your coupon first");
      return;
    }

    try {
      setIsSubmit(true);
      const payAmount =
        discount?.type === "percentage"
          ? Math.floor(originalAmount * (1 - discount.value / 100))
          : discount?.type === "amount"
            ? Math.max(originalAmount - discount.value, 0)
            : originalAmount;

      const discountAmount =
        discount?.type === "percentage"
          ? Math.round(originalAmount * (discount.value / 100))
          : discount?.type === "amount"
            ? discount.value
            : 0;

      const res = await axios.post("/api/payment/order", {
        amount: payAmount * 100,
        ResumeType: selectedTemplate,
        couponCode: applied ? couponCode : null,
        discountAmount,
        ...formData,
      });

      if (res.data.success) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = res.data.data.redirectUrl;
        }, 2000);
        clearDraft();
      }
    } catch (error) {
      toast.error("Payment secure layer failed");
    } finally {
      setIsSubmit(false);
    }
  };

  const handleCoupon = async (coupon) => {
    if (appliedCoupon === coupon) {
      toast.info("Coupon active");
      return;
    }

    setIsSubmit(true);
    try {
      const res = await axios.post("/api/coupons/getByCouponCode", {
        couponCode: coupon,
      });

      const couponData = res.data.data;
      const discountInfo = {
        type: couponData.type,
        value: couponData.discount,
      };

      setDiscount(discountInfo);
      setApplied(true);
      setAppliedCoupon(coupon);
      setIsCouponValid(true);

      let finalAmount = originalAmount;
      if (discountInfo.type === "percentage") {
        finalAmount = originalAmount * (1 - discountInfo.value / 100);
      } else if (discountInfo.type === "amount") {
        finalAmount = originalAmount - discountInfo.value;
      }
      setAmount(Math.max(Math.round(finalAmount), 0));
      toast.success("Price discounted!");
    } catch (error) {
      setIsCouponValid(false);
      toast.error("Invalid Promo Code");
    } finally {
      setIsSubmit(false);
    }
  };

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
        <div className="lg:col-span-3 flex flex-col gap-6 lg:overflow-hidden overflow-visible order-2 lg:order-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Architectural Templates
            </h3>
          </div>

          <div
            className="flex-1 overflow-x-auto lg:overflow-y-auto pr-2 custom-scrollbar flex lg:flex-col gap-4 pb-4 lg:pb-0"
            id="tour-template-selection-v2"
          >
            {templates.map((template) => (
              <motion.div
                key={template.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTemplate(template.key)}
                className={`group relative cursor-pointer rounded-2xl border-2 transition-all duration-300 p-1 min-w-35 lg:min-w-0 ${
                  selectedTemplate === template.key
                    ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100 ring-4 ring-indigo-50"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <div className="aspect-3/4 rounded-xl bg-slate-100 overflow-hidden relative shadow-inner">
                  {template.image ? (
                    <img
                      src={template.image}
                      alt={template.label}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <LayoutTemplate className="w-12 h-12 opacity-20" />
                    </div>
                  )}

                  {selectedTemplate === template.key && (
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-10 border border-white/20">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="p-3 text-center">
                  <p
                    className={`text-xs font-black uppercase tracking-widest ${selectedTemplate === template.key ? "text-indigo-900" : "text-slate-500"}`}
                  >
                    {template.label}
                  </p>
                </div>
              </motion.div>
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
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />{" "}
              High-Resolution Preview
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
                  onContextMenu={(e) => e.preventDefault()}
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
                  <span>₹{originalAmount}</span>
                </div>
                {applied && (
                  <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
                    <span>Promo Applied</span>
                    <span>- ₹{originalAmount - amount}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through">
                      ₹199
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      ₹{amount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
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
                <h4 className="font-black text-slate-900 text-sm">
                  Design Ready
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Your resume will be generated in pixel-perfect A4 format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* Redirection Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-100"
            >
              <div className="p-10 text-center space-y-8">
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
                  ></motion.div>
                  <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <IndianRupee className="w-10 h-10" />
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    Redirecting
                  </h3>
                  <p className="text-slate-500 font-medium">
                    Initialising secure transaction with Paytm...
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex gap-4 text-left"
                >
                  <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-black text-indigo-900 text-sm uppercase tracking-wider">
                      Payment Protocol
                    </p>
                    <p className="text-indigo-700 text-xs font-semibold leading-relaxed">
                      Please do not close this window. You will be redirected to
                      the download page automatically after payment.
                    </p>
                  </div>
                </motion.div>

                <div className="flex items-center justify-center gap-6 opacity-30">
                  <div className="flex items-center gap-1.5 grayscale">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      256-bit
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 grayscale">
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Instant
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(FinalStepV2);
