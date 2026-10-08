"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components/ui/button";
import { Plus, X, BadgePercent, FileText, PenLine, Share2 } from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../../../shared/components/ui/input";
import { toast } from "sonner";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import dynamic from "next/dynamic";
import { FontImports } from "./fontImport";

const PDFPreview = dynamic(() => import("./pdfPreview"), {
  ssr: false,
  loading: () => <div className="text-sm text-[#6B7280]">Loading preview...</div>,
});
const ShareResumeModal = dynamic(
  () => import("@/modules/shared-resume/components/ShareResumeModal")
);
const SharePortfolioModal = dynamic(
  () => import("@/modules/portfolio/components/SharePortfolioModal")
);
const EmptyState = dynamic(() => import("./empty"));
const ResumeCard = dynamic(() => import("./resumeCard"));

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [paid, setPaid] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(100);
  const [originalAmount, setOriginalAmount] = useState(100); // Store original amount
  const [isSubmit, setIsSubmit] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [sharingResume, setSharingResume] = useState(null);
  const [portfolioResume, setPortfolioResume] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);
      const res = await axios.get("/api/resume/getAllResume");
      setResumes(res.data.data);
      setLoading(false);
    };
    fetchResume();
  }, []);

  const paidResumes = resumes.paid;
  const draftResumes = resumes.draft;

  const getTemplateDisplayName = templateKey => {
    const templateNames = {
      modernTemplate: "Modern",
      classicTemplate: "Classic",
      MinimalistTemplate: "Minimalist",
      MordenBluesidebar: "Modern Blue Sidebar",
      ModernFullStack: "Modern Full Stack",
    };
    return templateNames[templateKey] || templateKey;
  };

  const handleDownload = async resume => {
    if (resume.status === "paid") {
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const pdfGen = new pdfGenerator(resume, resume.ResumeType, { type: "resume" });
      await pdfGen.downloadPdf();
    } else {
      setPaymentModal(true);
      setResumeData(resume);
      // Reset payment modal state when opening
      setAmount(originalAmount);
      setApplied(false);
      setCouponCode("");
      // removeCoupon();
    }
  };

  const {
    discount: couponDiscount,
    handleCoupon,
    removeCoupon,
  } = useCoupon({
    setIsSubmit,
    originalAmount,
    setAmount,
    setCouponCode,
    setApplied,
    setDiscount,
  });

  const handleDelete = async resumeId => {
    try {
      const res = await axios.delete(`/api/resume/deleteById?id=${resumeId}`);
      if (res.data.success) {
        setResumes(prev => ({
          ...prev,
          paid: prev.paid?.filter(resume => resume.resumedata._id !== resumeId),
          draft: prev.draft?.filter(resume => resume.resumedata._id !== resumeId),
        }));
      }
    } catch (error) {
      toast.error(error.message || "something went wrong while deleting resume");
    }
  };

  const handleEdit = resumeId => {
    route.push(`/dashboard/resume/${resumeId}`);
  };

  const handleViewResume = async resumeData => {
    const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
    const pdfGen = new pdfGenerator(resumeData, resumeData.ResumeType, { type: "resume" });
    const url = await pdfGen.createPdf();

    setPdfUrl(url);
    if (resumeData.status === "paid") {
      setPaid(true);
    }
    setIsModelOpen(true);
  };

  const isMobile = useIsMobile();

  const paymentFormData = {
    draftId: resumeData?._id,
  };

  const { handelPayment, isRedirecting } = usePayment({
    discount: couponDiscount,
    originalAmount,
    formData: paymentFormData,
    applied,
    selectedTemplate: resumeData?.ResumeType,
    setIsSubmit,
    draftId: resumeData?._id,
    couponCode,
  });

  const { basePrice } = usePricing({
    selectedTemplate: resumeData?.ResumeType,
    applied,
    originalAmount,
    discount: couponDiscount,
    setAmount,
    setOriginalAmount,
  });

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F8F7F3" }}>
        <FontImports />
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {/* Header skeleton */}
          <div
            className="pb-6 mb-10 border-b flex flex-col md:flex-row md:items-end justify-between gap-4"
            style={{ borderColor: "#E3E2DC" }}
          >
            <div>
              <div
                className="h-3 w-32  mb-3 animate-pulse"
                style={{ backgroundColor: "#E3E2DC" }}
              />
              <div
                className="h-8 w-48  mb-2 animate-pulse"
                style={{ backgroundColor: "#E3E2DC" }}
              />
              <div
                className="h-4 w-80 max-w-full  animate-pulse"
                style={{ backgroundColor: "#E3E2DC" }}
              />
            </div>
            <div className="h-10 w-40  animate-pulse" style={{ backgroundColor: "#E3E2DC" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className=" border animate-pulse overflow-hidden"
                style={{ borderColor: "#E3E2DC" }}
              >
                <div className="h-40" style={{ backgroundColor: "#F1F0EB" }} />
                <div className="p-5">
                  <div className="h-4  w-3/4 mb-3" style={{ backgroundColor: "#E3E2DC" }} />
                  <div className="h-3  w-1/2" style={{ backgroundColor: "#E3E2DC" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F3" }}>
      <FontImports />
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Page header */}
        <div
          className="pb-6 mb-10 border-b flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{ borderColor: "#E3E2DC" }}
          id="tour-my-resumes-header"
        >
          <div>
            <div
              className="font-mono text-[11px] tracking-widest mb-2"
              style={{ color: "#465B9E" }}
            >
              YOUR WORKSPACE
            </div>
            <h1 className="font-display text-3xl font-medium" style={{ color: "#17201C" }}>
              My Resumes
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#5B625C" }}>
              Every resume you've drafted or unlocked, kept on file. Preview, edit, or download.
            </p>
          </div>
          <Button
            onClick={() => route.push("/dashboard/builder")}
            className=" h-10 px-5 text-white shadow-none hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#465B9E" }}
            id="tour-create-new-button"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Resume
          </Button>
        </div>

        {/* PDF Modal */}
        {isModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17201C]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-5xl h-[90vh] bg-white  shadow-2xl overflow-hidden flex flex-col border border-[#E3E2DC]">
              <div
                className="flex items-center justify-between p-4 border-b bg-white z-10"
                style={{ borderColor: "#E3E2DC" }}
              >
                <h3 className="font-display text-base font-medium" style={{ color: "#17201C" }}>
                  Resume Preview
                </h3>
                <div className="flex items-center gap-2">
                  {paid && resumeData && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSharingResume(resumeData)}
                      className=" font-sans text-xs flex items-center gap-1.5 border-[#E3E2DC] text-[#465B9E] hover:bg-[#EEF0F7] hover:border-[#C8CDD9]"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Link</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setPdfUrl("");
                      setPaid(false);
                      setIsModelOpen(false);
                    }}
                    className=" hover:bg-[#F1F0EB]"
                  >
                    <X className="w-5 h-5" style={{ color: "#66706B" }} />
                  </Button>
                </div>
              </div>

              <div
                className="flex-1 overflow-auto p-8 flex justify-center"
                style={{ backgroundColor: "#F8F7F3" }}
              >
                <PDFPreview pdfUrl={pdfUrl} paid={paid} variant={isMobile ? "mobile" : "desktop"} />
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {paymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17201C]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md  shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#E3E2DC]">
              <div
                className="p-6 border-b flex justify-between items-center"
                style={{ borderColor: "#E3E2DC" }}
              >
                <h3
                  className="font-display text-lg font-medium flex items-center gap-2"
                  style={{ color: "#17201C" }}
                >
                  <BadgePercent className="w-5 h-5" style={{ color: "#465B9E" }} /> Unlock Download
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPaymentModal(false);
                    setResumeData(null);
                  }}
                  className="h-8 w-8 p-0  hover:bg-[#F1F0EB]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div
                  className="text-center p-4  border"
                  style={{ borderColor: "#E3E2DC", backgroundColor: "#F8F7F3" }}
                >
                  <div
                    className="font-mono text-[11px] tracking-widest mb-1"
                    style={{ color: "#66706B" }}
                  >
                    TOTAL AMOUNT
                  </div>
                  <div className="font-display text-3xl font-medium" style={{ color: "#17201C" }}>
                    ₹{basePrice}
                  </div>
                  <div className="text-xs line-through mt-1" style={{ color: "#8A908B" }}>
                    ₹{originalAmount}
                  </div>
                  <div className="text-xs mt-1 font-mono" style={{ color: "#0F6E63" }}>
                    YOU SAVED ₹{originalAmount - basePrice}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-sans font-medium" style={{ color: "#5B625C" }}>
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="ENTER COUPON CODE"
                      className="font-mono uppercase placeholder:normal-case "
                      disabled={applied}
                    />
                    {!applied ? (
                      <Button
                        onClick={() => handleCoupon(couponCode)}
                        disabled={!couponCode.trim() || isSubmit || applied}
                        variant="secondary"
                        className="font-sans text-xs "
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button
                        onClick={removeCoupon}
                        variant="destructive"
                        size="icon"
                        className="shrink-0 "
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {applied && couponDiscount && (
                    <div
                      className="flex items-center gap-2 text-sm font-mono p-2 "
                      style={{ color: "#0F6E63", backgroundColor: "#EAF4F2" }}
                    >
                      <BadgePercent className="w-4 h-4" />
                      {couponDiscount.type === "percentage"
                        ? `${couponDiscount.value}% OFF APPLIED`
                        : `₹${couponDiscount.value} OFF APPLIED`}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full text-white font-medium h-12  text-base shadow-none"
                  style={{ backgroundColor: "#465B9E" }}
                  onClick={() => handelPayment()}
                  disabled={isSubmit || isRedirecting}
                >
                  Pay ₹{amount} &amp; Download
                </Button>

                <p className="text-xs text-center font-mono" style={{ color: "#8A908B" }}>
                  SECURE PAYMENT · PHONEPE / RAZORPAY
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="My-Resume" className="w-full" id="tour-resume-tabs">
          <div className="border-b mb-10" style={{ borderColor: "#E3E2DC" }}>
            <TabsList className="bg-transparent h-auto p-0 space-x-8 rounded-none">
              <TabsTrigger
                value="My-Resume"
                className="bg-transparent border-b-2 border-transparent rounded-none px-2 py-3 font-sans text-sm font-medium shadow-none transition-all data-[state=active]:border-[#465B9E] data-[state=active]:text-[#465B9E]"
                style={{ color: "#66706B" }}
              >
                Unlocked ({paidResumes?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="Draft-Resume"
                className="bg-transparent border-b-2 border-transparent rounded-none px-2 py-3 font-sans text-sm font-medium shadow-none transition-all data-[state=active]:border-[#465B9E] data-[state=active]:text-[#465B9E]"
                style={{ color: "#66706B" }}
              >
                Drafts ({draftResumes?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>

          <style>{`
            [data-state="active"][value="My-Resume"],
            [data-state="active"][value="Draft-Resume"] {
              border-color: #465B9E !important;
              color: #465B9E !important;
            }
          `}</style>

          <TabsContent value="My-Resume" className="outline-none rounded-none">
            {!paidResumes || paidResumes.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No unlocked resumes"
                body="Once you complete a payment for a resume draft, it will appear here for unlimited downloads."
              />
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2"
                id="tour-resume-list"
              >
                {paidResumes.map(resume => (
                  <ResumeCard
                    key={resume?.resumedata._id}
                    resume={resume?.resumedata}
                    onPreview={handleViewResume}
                    onDownload={handleDownload}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSharePortfolio={resume => setPortfolioResume(resume)}
                    onShare={resumeToShare => setSharingResume(resumeToShare)}
                    getTemplateDisplayName={getTemplateDisplayName}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="Draft-Resume" className="outline-none">
            {!draftResumes || draftResumes.length === 0 ? (
              <EmptyState
                icon={PenLine}
                title="Start your first resume"
                body="Create a new resume to get started. It will be saved here automatically."
                action={
                  <Button
                    onClick={() => route.push("/dashboard/builder")}
                    className=""
                    style={{ backgroundColor: "#465B9E" }}
                  >
                    Create New Resume
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                {draftResumes.map(resume => (
                  <ResumeCard
                    key={resume?.resumedata._id}
                    resume={resume?.resumedata}
                    onPreview={handleViewResume}
                    onDownload={handleDownload}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    getTemplateDisplayName={getTemplateDisplayName}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <ShareResumeModal
        isOpen={Boolean(sharingResume)}
        onClose={() => setSharingResume(null)}
        resume={sharingResume}
      />
      <SharePortfolioModal
        isOpen={Boolean(portfolioResume)}
        onClose={() => setPortfolioResume(false)}
        resume={portfolioResume}
      />
    </div>
  );
};

export default MyResume;
