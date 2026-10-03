"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Download,
  Trash2,
  MoreVertical,
  Plus,
  X,
  BadgePercent,
  FileText,
  PenLine,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../../../shared/components/ui/input";
import { toast } from "sonner";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import dynamic from "next/dynamic";
import { usePayment } from "@/modules/cover-letter/Hook/usePayment";
const PDFPreview = dynamic(() => import("@/modules/resume/components/pdfPreview"), {
  ssr: false,
  loading: () => <div className="text-sm text-[#66706B]">Loading preview...</div>,
});

/* Canonical NextCV typography and visual system. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap');
    .nextcv-serif { font-family: 'Source Serif 4', Georgia, serif; }
    .nextcv-sans { font-family: 'Inter', system-ui, sans-serif; }
    .nextcv-mono { font-family: 'Inter', system-ui, sans-serif; }
  `}</style>
);

const PostmarkBadge = ({ status }) => {
  const isPaid = status === "paid";

  return (
    <div
      className={`absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
        isPaid ? "bg-[#EAF1E9] text-[#42634A]" : "bg-[#EEF0F7] text-[#465B9E]"
      }`}
    >
      {isPaid ? "Unlocked" : "Draft"}
    </div>
  );
};

const CoverLetterCard = ({ coverLetter, onPreview, onDownload, onDelete }) => (
  <Card
    className="group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    style={{ backgroundColor: "#FFFFFF", borderColor: "#E3E2DC" }}
  >
    <PostmarkBadge status={coverLetter?.status} />
    <CardContent className="p-0">
      {/* Torn-edge letter strip */}
      <div
        className="h-1.5 w-full bg-[#EEF0F7]"
        style={{
          backgroundColor: "#EEF0F7",
        }}
      />
      <div
        className="relative flex h-44 cursor-pointer items-center justify-center overflow-hidden border-b border-[#E7E5DF] p-6 transition hover:bg-[#F7F7F4]"
        style={{ backgroundColor: "#FBFAF7" }}
        onClick={() => onPreview(coverLetter)}
      >
        <FileText
          className="w-9 h-9 transition-colors"
          style={{ color: "#C9C7BF" }}
          strokeWidth={1.25}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#17201C]/5 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <span
            className="px-4 py-2 text-xs nextcv-mono tracking-wide border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#17201C", color: "#17201C" }}
          >
            OPEN PREVIEW
          </span>
        </div>
      </div>

      <div className="px-5 py-4 border-t" style={{ borderColor: "#E3E2DC" }}>
        <div className="flex items-start justify-between gap-3">
          <h2
            className="text-sm font-semibold truncate flex-1"
            style={{ color: "#17201C" }}
            title={coverLetter?.name}
          >
            {coverLetter?.name || "Untitled Cover Letter"}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 -mr-2 rounded-xl"
                style={{ color: "#66706B" }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem onClick={() => onDownload(coverLetter)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete()}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 nextcv-mono text-[10px] tracking-wide" style={{ color: "#66706B" }}>
          {/* ref line kept for a letterhead feel; date logic left as-is upstream */}
          REF · {(coverLetter?._id || "0000").toString().slice(-6).toUpperCase()}
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({ icon: Icon, title, body, action }) => (
  <div
    className="rounded-2xl border border-dashed px-6 py-20 text-center"
    style={{ borderStyle: "dashed", borderColor: "#D6D5CE", backgroundColor: "#FBFAF7" }}
  >
    <div
      className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
      style={{ backgroundColor: "#F1F0EB", color: "#8A908B" }}
    >
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    <h3 className="nextcv-serif text-lg font-medium mb-2" style={{ color: "#17201C" }}>
      {title}
    </h3>
    <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "#66706B" }}>
      {body}
    </p>
    {action}
  </div>
);

const MyCoverLetter = () => {
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [paid, setPaid] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(79);
  const [originalAmount, setOriginalAmount] = useState(79); // Store original amount
  const [isSubmit, setIsSubmit] = useState(false);
  const [discount, setDiscount] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      setLoading(true);
      const res = await axios.get("/api/cover-letter/getAllCoverLetter");
      const data = res.data.data;
      setCoverLetters({
        paid: data.paid || [],
        draft: data.draft || [],
      });

      setLoading(false);
    };
    fetchCoverLetter();
  }, []);

  const paidCoverLetters = coverLetters.paid;
  const draftCoverLetters = coverLetters.draft;
  const handleDownload = async coverLetter => {
    if (coverLetter.status === "paid") {
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const pdfGen = new pdfGenerator(coverLetter, "classic", { type: "cover-letter" });
      await pdfGen.downloadPdf();
    } else {
      setPaymentModal(true);
      setCoverLetterData(coverLetter);
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

  const handleDelete = async coverLetterId => {
    try {
      const res = await axios.delete(`/api/cover-letter/deleteById/${coverLetterId}`);
      if (res.data.success) {
        setCoverLetters(prev => ({
          ...prev,
          paid: prev.paid?.filter(coverLetter => coverLetter._id !== coverLetterId),
          draft: prev.draft?.filter(coverLetter => coverLetter._id !== coverLetterId),
        }));
      }
    } catch (error) {
      toast.error(error.message || "something went wrong while deleting cover letter");
    }
  };

  const handleViewCoverLetter = async coverLetterData => {
    const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
    const pdfGen = new pdfGenerator(coverLetterData, "classic", { type: "cover-letter" });
    const url = await pdfGen.createPdf();
    setPdfUrl(url);
    if (coverLetterData.status === "paid") {
      setPaid(true);
    }
    setIsModelOpen(true);
  };

  const isMobile = useIsMobile();

  const paymentFormData = {
    draftId: coverLetterData?._id,
  };

  const { handelPayment, isPaymentSubmit, isRedirecting } = usePayment({
    coverLetter: coverLetterData,
    couponCode,
  });

  const { basePrice } = usePricing({
    selectedTemplate: coverLetterData?.CoverLetterType,
    applied,
    originalAmount,
    discount: couponDiscount,
    setAmount,
    setOriginalAmount,
  });
  console.log(basePrice);
  if (loading) {
    return (
      <div className="nextcv-sans min-h-screen" style={{ backgroundColor: "#F8F7F3" }}>
        <FontImports />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border animate-pulse"
                style={{ borderColor: "#E3E2DC" }}
              >
                <div className="h-44" style={{ backgroundColor: "#EEEDE8" }}></div>
                <div className="p-5">
                  <div
                    className="h-4 rounded-xl w-3/4 mb-3"
                    style={{ backgroundColor: "#EEEDE8" }}
                  ></div>
                  <div
                    className="h-3 rounded-xl w-1/2"
                    style={{ backgroundColor: "#EEEDE8" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nextcv-sans min-h-screen" style={{ backgroundColor: "#F8F7F3" }}>
      <FontImports />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Letterhead */}
        <div
          className="pb-6 mb-10 border-b flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{ borderColor: "#17201C" }}
          id="tour-my-cover-letters-header"
        >
          <div>
            <div
              className="nextcv-mono text-[11px] tracking-[0.16em] mb-2"
              style={{ color: "#465B9E" }}
            >
              NEXTCV AI TOOLS
            </div>
            <h1
              className="nextcv-serif text-4xl font-medium tracking-[-0.025em] sm:text-5xl"
              style={{ color: "#17201C" }}
            >
              My cover letters
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66706B] sm:text-[15px]">
              Your saved cover letters, drafts, and unlocked documents — all in one place.
            </p>
          </div>
          <Button
            onClick={() => route.push("/dashboard/cover-letter")}
            className="h-11 rounded-xl bg-[#465B9E] px-5 text-sm font-semibold text-white shadow-none hover:bg-[#344B93]"
            style={{ backgroundColor: "#17201C" }}
            id="tour-create-new-button"
          >
            <Plus className="mr-2 h-4 w-4" /> Create cover letter
          </Button>
        </div>

        {/* PDF Modal */}
        {isModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17201C]/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-6xl h-[90vh]  rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col">
              <div
                className="z-10 flex items-center justify-between border-b bg-white p-4"
                style={{ borderColor: "#E3E2DC" }}
              >
                <h3 className="nextcv-serif text-base font-medium" style={{ color: "#17201C" }}>
                  Cover letter preview
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setPdfUrl("");
                    setPaid(false);
                    setIsModelOpen(false);
                  }}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" style={{ color: "#66706B" }} />
                </Button>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17201C]/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md  rounded-2xl bg-white shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div
                className="p-6 border-b flex justify-between items-center"
                style={{ borderColor: "#E3E2DC" }}
              >
                <h3
                  className="nextcv-serif text-lg font-medium flex items-center gap-2"
                  style={{ color: "#17201C" }}
                >
                  <BadgePercent className="w-5 h-5" style={{ color: "#465B9E" }} /> Unlock your
                  download
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPaymentModal(false);
                    setCoverLetterData(null);
                  }}
                  className="h-8 w-8 p-0 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div
                  className="rounded-xl border p-4 text-center"
                  style={{ borderColor: "#E3E2DC", backgroundColor: "#F8F7F3" }}
                >
                  <div
                    className="nextcv-mono text-[11px] tracking-[0.16em] mb-1"
                    style={{ color: "#66706B" }}
                  >
                    TOTAL AMOUNT
                  </div>
                  <div className="nextcv-serif text-3xl font-medium" style={{ color: "#17201C" }}>
                    ₹{basePrice}
                  </div>
                  <div className="text-xs line-through mt-1" style={{ color: "#8A908B" }}>
                    ₹{originalAmount}
                  </div>
                  <div className="text-xs mt-1 nextcv-mono" style={{ color: "#42634A" }}>
                    YOU SAVED ₹{basePrice - amount}
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    className="text-xs nextcv-mono tracking-[0.16em] uppercase"
                    style={{ color: "#66706B" }}
                  >
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="ENTER COUPON CODE"
                      className="nextcv-mono uppercase placeholder:normal-case rounded-xl"
                      disabled={applied}
                    />
                    {!applied ? (
                      <Button
                        onClick={() => handleCoupon(couponCode)}
                        disabled={!couponCode.trim() || isSubmit || applied}
                        variant="secondary"
                        className="nextcv-mono text-xs rounded-xl"
                      >
                        APPLY
                      </Button>
                    ) : (
                      <Button
                        onClick={removeCoupon}
                        variant="destructive"
                        size="icon"
                        className="shrink-0 rounded-xl"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {applied && couponDiscount && (
                    <div
                      className="flex items-center gap-2 text-sm nextcv-mono p-2"
                      style={{ color: "#42634A", backgroundColor: "#F1F7F1" }}
                    >
                      <BadgePercent className="w-4 h-4" />
                      {couponDiscount.type === "percentage"
                        ? `${couponDiscount.value}% OFF APPLIED`
                        : `₹${couponDiscount.value} OFF APPLIED`}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full text-white font-medium h-12 rounded-xl text-base shadow-sm"
                  style={{ backgroundColor: "#465B9E" }}
                  onClick={() => handelPayment()}
                  disabled={isPaymentSubmit || isRedirecting}
                >
                  Pay ₹{amount} & download
                </Button>

                <p className="text-xs text-center nextcv-mono" style={{ color: "#8A908B" }}>
                  SECURE PAYMENT · PHONEPE / RAZORPAY
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="My-CoverLetter" className="w-full" id="tour-coverletter-tabs">
          <div className="border-b mb-10" style={{ borderColor: "#E3E2DC" }}>
            <TabsList className="bg-transparent h-auto p-0 space-x-10 rounded-xl">
              <TabsTrigger
                value="My-CoverLetter"
                className="bg-transparent border-b border-transparent rounded-xl px-0 py-3 nextcv-mono text-xs tracking-[0.16em] shadow-sm transition-all data-[state=active]:shadow-sm"
                style={{ color: "#66706B" }}
              >
                <span className="data-[state=active]:text-[#17201C]">
                  UNLOCKED ({paidCoverLetters?.length || 0})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="Draft-CoverLetter"
                className="bg-transparent border-b border-transparent rounded-xl px-0 py-3 nextcv-mono text-xs tracking-[0.16em] shadow-sm transition-all"
                style={{ color: "#66706B" }}
              >
                DRAFTS ({draftCoverLetters?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="My-CoverLetter" className="outline-none">
            {!paidCoverLetters || paidCoverLetters.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No unlocked cover letters yet"
                body="Once you complete a payment for a draft, it lands here and stays available for unlimited downloads."
              />
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2"
                id="tour-coverletter-list"
              >
                {paidCoverLetters.map(coverLetter => {
                  return (
                    <CoverLetterCard
                      key={coverLetter?._id}
                      coverLetter={coverLetter}
                      onPreview={() => handleViewCoverLetter(coverLetter)}
                      onDownload={handleDownload}
                      onDelete={() => handleDelete(coverLetter._id)}
                    />
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="Draft-CoverLetter" className="outline-none">
            {!draftCoverLetters || draftCoverLetters.length === 0 ? (
              <EmptyState
                icon={PenLine}
                title="Start your first cover letter"
                body="Create one to get going — it's saved here automatically as a draft."
                action={
                  <Button
                    onClick={() => route.push("/dashboard/builder")}
                    className="rounded-xl"
                    style={{ backgroundColor: "#17201C" }}
                  >
                    Create cover letter
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
                {draftCoverLetters.map(coverLetter => (
                  <CoverLetterCard
                    key={coverLetter?._id}
                    coverLetter={coverLetter}
                    onPreview={() => handleViewCoverLetter(coverLetter)}
                    onDownload={handleDownload}
                    onDelete={() => handleDelete(coverLetter._id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCoverLetter;
