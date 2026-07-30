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
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import dynamic from "next/dynamic";
const PDFPreview = dynamic(() => import("@/modules/resume/components/pdfPreview"), {
  ssr: false,
  loading: () => <div className="text-sm text-[#6B7280]">Loading preview...</div>,
});

/* Fonts: Fraunces for the letterhead display type, IBM Plex Mono for
   reference codes / dates / counters. Body stays on the default sans. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const PostmarkBadge = ({ status }) => {
  const isPaid = status === "paid";
  const label = isPaid ? "UNLOCKED" : "DRAFT";
  const ring = isPaid ? "#0F6E63" : "#B3382C";
  return (
    <div
      className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center rotate-6 select-none"
      style={{
        border: `1.5px dashed ${ring}`,
        color: ring,
        backgroundColor: "#FFFFFF",
      }}
    >
      <div className="text-center leading-none">
        <div className="font-mono text-[8px] tracking-wider">{label}</div>
        <div className="w-6 h-px mx-auto my-0.5" style={{ backgroundColor: ring }} />
        <div className="font-mono text-[7px] tracking-wider opacity-70">
          {isPaid ? "PAID" : "PENDING"}
        </div>
      </div>
    </div>
  );
};

const CoverLetterCard = ({ coverLetter, onPreview, onDownload, onDelete }) => (
  <Card
    className="group relative border rounded-none shadow-none transition-all duration-300 hover:-translate-y-1"
    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
  >
    <PostmarkBadge status={coverLetter?.status} />
    <CardContent className="p-0">
      {/* Torn-edge letter strip */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E4E2DC 0, #E4E2DC 4px, transparent 4px, transparent 8px)",
        }}
      />
      <div
        className="p-6 flex items-center justify-center h-40 relative overflow-hidden cursor-pointer"
        style={{ backgroundColor: "#F7F7F5" }}
        onClick={() => onPreview(coverLetter)}
      >
        <FileText
          className="w-9 h-9 transition-colors"
          style={{ color: "#C9C7BF" }}
          strokeWidth={1.25}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#1C2333]/5">
          <span
            className="px-4 py-2 text-xs font-mono tracking-wide border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#1C2333", color: "#1C2333" }}
          >
            OPEN PREVIEW
          </span>
        </div>
      </div>

      <div className="px-5 py-4 border-t" style={{ borderColor: "#E4E2DC" }}>
        <div className="flex items-start justify-between gap-3">
          <h2
            className="text-sm font-semibold truncate flex-1"
            style={{ color: "#1C2333" }}
            title={coverLetter?.name}
          >
            {coverLetter?.name || "Untitled Cover Letter"}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 -mr-2 rounded-none"
                style={{ color: "#6B7280" }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-none">
              <DropdownMenuItem onClick={() => onDownload(coverLetter)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={() => onDelete(coverLetter._id)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 font-mono text-[10px] tracking-wide" style={{ color: "#6B7280" }}>
          {/* ref line kept for a letterhead feel; date logic left as-is upstream */}
          REF · {(coverLetter?._id || "0000").toString().slice(-6).toUpperCase()}
        </div>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({ icon: Icon, title, body, action }) => (
  <div
    className="text-center py-24 border"
    style={{ borderStyle: "dashed", borderColor: "#D8D6CE", backgroundColor: "#FBFBF9" }}
  >
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
      style={{ backgroundColor: "#F0EFEA", color: "#B7B5AC" }}
    >
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    <h3 className="font-display text-lg font-medium mb-2" style={{ color: "#1C2333" }}>
      {title}
    </h3>
    <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "#6B7280" }}>
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
  const [amount, setAmount] = useState(100);
  const [originalAmount, setOriginalAmount] = useState(100); // Store original amount
  const [isSubmit, setIsSubmit] = useState(false);
  const [discount, setDiscount] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const fetchCoverLetter = async () => {
      setLoading(true);
      const res = await axios.get("/api/cover-letter/getAllCoverLetter");
      console.log(res.data.data);
      const data = res.data.data;
      console.log(data);
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
  console.log(paidCoverLetters, draftCoverLetters);
  const handleDownload = async coverLetter => {
    if (coverLetter.status === "paid") {
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const pdfGen = new pdfGenerator(coverLetter);
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
      const res = await axios.delete(`/api/coverLetter/deleteById?id=${coverLetterId}`);
      if (res.data.success) {
        setCoverLetters(prev => ({
          ...prev,
          paid: prev.paid?.filter(coverLetter => coverLetter.coverletterdata._id !== coverLetterId),
          draft: prev.draft?.filter(
            coverLetter => coverLetter.coverletterdata._id !== coverLetterId
          ),
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
    console.log(coverLetterData);
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

  const { handelPayment, isRedirecting } = usePayment({
    discount: couponDiscount,
    originalAmount,
    formData: paymentFormData,
    applied,
    selectedTemplate: coverLetterData?.CoverLetterType,
    setIsSubmit,
    draftId: coverLetterData?._id,
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

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F7F7F5" }}>
        <FontImports />
        <div className="max-w-[1600px] mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border animate-pulse" style={{ borderColor: "#E4E2DC" }}>
                <div className="h-40" style={{ backgroundColor: "#EDEBE5" }}></div>
                <div className="p-5">
                  <div
                    className="h-4 rounded-none w-3/4 mb-3"
                    style={{ backgroundColor: "#EDEBE5" }}
                  ></div>
                  <div
                    className="h-3 rounded-none w-1/2"
                    style={{ backgroundColor: "#EDEBE5" }}
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
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F5" }}>
      <FontImports />
      <div className="max-w-[1600px] mx-auto p-6 md:p-10">
        {/* Letterhead */}
        <div
          className="pb-6 mb-10 border-b-2 flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{ borderColor: "#1C2333" }}
          id="tour-my-cover-letters-header"
        >
          <div>
            <div
              className="font-mono text-[11px] tracking-widest mb-2"
              style={{ color: "#B3382C" }}
            >
              CORRESPONDENCE ARCHIVE
            </div>
            <h1 className="font-display text-3xl font-medium" style={{ color: "#1C2333" }}>
              My Cover Letters
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
              Every letter you've drafted or unlocked, kept on file. Preview, download, or start a
              new one.
            </p>
          </div>
          <Button
            onClick={() => route.push("/dashboard/cover-letter")}
            className="rounded-none h-11 px-6 text-white shadow-none"
            style={{ backgroundColor: "#1C2333" }}
            id="tour-create-new-button"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Cover Letter
          </Button>
        </div>

        {/* PDF Modal */}
        {isModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2333]/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-9xl h-[90vh] bg-white rounded-none shadow-2xl overflow-hidden flex flex-col">
              <div
                className="flex items-center justify-between p-4 border-b bg-white z-10"
                style={{ borderColor: "#E4E2DC" }}
              >
                <h3 className="font-display text-base font-medium" style={{ color: "#1C2333" }}>
                  Cover Letter Preview
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setPdfUrl("");
                    setPaid(false);
                    setIsModelOpen(false);
                  }}
                  className="rounded-none"
                >
                  <X className="w-5 h-5" style={{ color: "#6B7280" }} />
                </Button>
              </div>

              <div
                className="flex-1 overflow-auto p-8 flex justify-center"
                style={{ backgroundColor: "#F7F7F5" }}
              >
                <PDFPreview pdfUrl={pdfUrl} paid={paid} variant={isMobile ? "mobile" : "desktop"} />
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {paymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2333]/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-none shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div
                className="p-6 border-b flex justify-between items-center"
                style={{ borderColor: "#E4E2DC" }}
              >
                <h3
                  className="font-display text-lg font-medium flex items-center gap-2"
                  style={{ color: "#1C2333" }}
                >
                  <BadgePercent className="w-5 h-5" style={{ color: "#B3382C" }} /> Unlock Download
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPaymentModal(false);
                    setCoverLetterData(null);
                  }}
                  className="h-8 w-8 p-0 rounded-none"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div
                  className="text-center p-4 border"
                  style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
                >
                  <div
                    className="font-mono text-[11px] tracking-widest mb-1"
                    style={{ color: "#6B7280" }}
                  >
                    TOTAL AMOUNT
                  </div>
                  <div className="font-display text-3xl font-medium" style={{ color: "#1C2333" }}>
                    ₹{basePrice}
                  </div>
                  <div className="text-xs line-through mt-1" style={{ color: "#B7B5AC" }}>
                    ₹{originalAmount}
                  </div>
                  <div className="text-xs mt-1 font-mono" style={{ color: "#0F6E63" }}>
                    YOU SAVED ₹{originalAmount - basePrice}
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    className="text-xs font-mono tracking-widest uppercase"
                    style={{ color: "#6B7280" }}
                  >
                    Have a coupon?
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="ENTER COUPON CODE"
                      className="font-mono uppercase placeholder:normal-case rounded-none"
                      disabled={applied}
                    />
                    {!applied ? (
                      <Button
                        onClick={() => handleCoupon(couponCode)}
                        disabled={!couponCode.trim() || isSubmit || applied}
                        variant="secondary"
                        className="font-mono text-xs rounded-none"
                      >
                        APPLY
                      </Button>
                    ) : (
                      <Button
                        onClick={removeCoupon}
                        variant="destructive"
                        size="icon"
                        className="shrink-0 rounded-none"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {applied && couponDiscount && (
                    <div
                      className="flex items-center gap-2 text-sm font-mono p-2"
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
                  className="w-full text-white font-medium h-12 rounded-none text-base shadow-none"
                  style={{ backgroundColor: "#B3382C" }}
                  onClick={() => handelPayment()}
                  disabled={isSubmit || isRedirecting}
                >
                  Pay ₹{amount} & Download
                </Button>

                <p className="text-xs text-center font-mono" style={{ color: "#B7B5AC" }}>
                  SECURE PAYMENT · PHONEPE / RAZORPAY
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="My-CoverLetter" className="w-full" id="tour-coverletter-tabs">
          <div className="border-b mb-10" style={{ borderColor: "#E4E2DC" }}>
            <TabsList className="bg-transparent h-auto p-0 space-x-10 rounded-none">
              <TabsTrigger
                value="My-CoverLetter"
                className="bg-transparent border-b-2 border-transparent rounded-none px-0 py-3 font-mono text-xs tracking-widest shadow-none transition-all data-[state=active]:shadow-none"
                style={{ color: "#6B7280" }}
              >
                <span className="data-[state=active]:text-[#1C2333]">
                  UNLOCKED ({paidCoverLetters?.length || 0})
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="Draft-CoverLetter"
                className="bg-transparent border-b-2 border-transparent rounded-none px-0 py-3 font-mono text-xs tracking-widest shadow-none transition-all"
                style={{ color: "#6B7280" }}
              >
                DRAFTS ({draftCoverLetters?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>

          <style>{`
            [data-state="active"][value="My-CoverLetter"],
            [data-state="active"][value="Draft-CoverLetter"] {
              border-color: #1C2333 !important;
              color: #1C2333 !important;
            }
          `}</style>

          <TabsContent value="My-CoverLetter" className="outline-none">
            {!paidCoverLetters || paidCoverLetters.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No unlocked cover letters yet"
                body="Once you complete a payment for a draft, it lands here and stays available for unlimited downloads."
              />
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-2"
                id="tour-coverletter-list"
              >
                {paidCoverLetters.map(coverLetter => {
                  console.log(coverLetter);
                  return (
                    <CoverLetterCard
                      key={coverLetter?._id}
                      coverLetter={coverLetter}
                      onPreview={() => handleViewCoverLetter(coverLetter)}
                      onDownload={handleDownload}
                      onDelete={handleDelete}
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
                    className="rounded-none"
                    style={{ backgroundColor: "#1C2333" }}
                  >
                    Create New Cover Letter
                  </Button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-2">
                {draftCoverLetters.map(coverLetter => (
                  <CoverLetterCard
                    key={coverLetter?._id}
                    coverLetter={coverLetter}
                    onPreview={() => handleViewCoverLetter(coverLetter)}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
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
