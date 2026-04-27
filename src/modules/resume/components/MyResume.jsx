"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Edit,
  Download,
  Trash2,
  Calendar,
  MoreVertical,
  Plus,
  X,
  BadgePercent,
  Edit2,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../../../shared/components/ui/input";
import { pdfGenerator } from "@/shared/lib/pdfGenerator";
import { toast } from "sonner";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { usePayment } from "@/modules/payment/hooks/usePayment";
import { usePricing } from "@/modules/payment/hooks/usePricing";
import PDFPreview from "./pdfPreview";
import { useIsMobile } from "@/shared/hooks/use-mobile";

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

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffTime = Math.abs(now - date);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 1) return "Edited 1 day ago";
  //   if (diffDays < 30) return `Edited ${diffDays} days ago`;
  //   if (diffDays < 365) return `Edited ${Math.ceil(diffDays / 30)} months ago`;
  //   return `Edited ${Math.ceil(diffDays / 365)} years ago`;
  // };

  const handleDownload = async resume => {
    if (resume.status === "paid") {
      const pdfGen = new pdfGenerator(resume);
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
    console.log(resumeData);
    const pdfGen = new pdfGenerator(resumeData);
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

  const ResumeCard = ({ resume }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-400 bg-white rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div
          className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center h-48 relative overflow-hidden group-hover:bg-indigo-50/30 transition-colors cursor-pointer"
          onClick={() => handleViewResume(resume)}
        >
          <FileText
            className="w-16 h-16 text-slate-300 group-hover:text-indigo-400 transition-colors"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="bg-white/90 text-indigo-700 px-4 py-2 rounded-full font-medium text-sm shadow-sm backdrop-blur-sm">
              Quick Preview
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-3">
              <h2 className="font-bold text-lg text-slate-900 truncate" title={resume.name}>
                {resume.name || "Untitled Resume"}
              </h2>
              <p className="text-xs text-slate-500 truncate">
                {getTemplateDisplayName(resume.ResumeType)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-slate-100 -mr-2 text-slate-400"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleDownload(resume)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(resume?._id)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Resume
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(resume._id)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-xs text-slate-400">
              <Calendar className="h-3 w-3 mr-1.5" />
              {new Date(resume.updatedAt || resume.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>

            <Badge
              variant={resume.status === "paid" ? "default" : "secondary"}
              className={`uppercase px-2.5 py-0.5 text-[10px] font-bold tracking-wide rounded-md border-0 ${
                resume.status === "paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {resume.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6 md:p-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse border-slate-100 shadow-none">
              <div className="aspect-4/3 bg-slate-100 rounded-t-xl"></div>
              <CardContent className="p-5">
                <div className="h-5 bg-slate-100 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-6"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                  <div className="h-5 bg-slate-100 rounded w-1/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 md:p-10 max-w-7xl min-h-screen bg-slate-50">
      <div
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        id="tour-my-resumes-header"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My Resumes</h1>
          <p className="text-slate-500">Manage your resume collection. View, edit, or download.</p>
        </div>
        <Button
          onClick={() => route.push("/dashboard/builder")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl px-6 h-11"
          id="tour-create-new-button"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Resume
        </Button>
      </div>

      {/* PDF Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white z-10">
              <h3 className="font-bold text-slate-900">Resume Preview</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setPdfUrl("");
                  setPaid(false);
                  setIsModelOpen(false);
                }}
                className="rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-500" />
              </Button>
            </div>

            <div className="flex-1 bg-slate-100 overflow-auto p-8 flex justify-center">
              <PDFPreview pdfUrl={pdfUrl} paid={paid} variant={isMobile ? "mobile" : "desktop"} />
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <BadgePercent className="text-indigo-600 w-5 h-5" /> Unlock Download
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPaymentModal(false);
                  setResumeData(null);
                }}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-indigo-50 rounded-xl p-4 text-center">
                <div className="text-sm text-indigo-600 font-medium mb-1">Total Amount</div>

                {/* Discounted price (what user pays) */}
                <div className="text-3xl font-bold text-indigo-700">₹{basePrice}</div>

                {/* Original higher price */}
                <div className="text-xs text-indigo-400 line-through mt-1">₹{originalAmount}</div>

                {/* Optional: show savings */}
                <div className="text-xs text-green-600 mt-1 font-medium">
                  You saved ₹{originalAmount - basePrice}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Have a coupon?
                </label>
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="ENTER COUPON CODE"
                    className="font-mono uppercase placeholder:normal-case"
                    disabled={applied}
                  />
                  {!applied ? (
                    <Button
                      onClick={() => handleCoupon(couponCode)}
                      disabled={!couponCode.trim() || isSubmit || applied}
                      variant="secondary"
                      className="font-bold text-slate-700"
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button
                      onClick={removeCoupon}
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {applied && couponDiscount && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 p-2 rounded-lg">
                    <BadgePercent className="w-4 h-4" />
                    {couponDiscount.type === "percentage"
                      ? `${couponDiscount.value}% OFF applied`
                      : `₹${couponDiscount.value} OFF applied`}
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-indigo-500/20"
                onClick={() => handelPayment()}
                disabled={isSubmit || isRedirecting}
              >
                Pay ₹{amount} & Download
              </Button>

              <p className="text-xs text-center text-slate-400">
                Secure payment powered by PhonePe/Razorpay
              </p>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="My-Resume" className="w-full" id="tour-resume-tabs">
        <div className="border-b border-slate-200 mb-8">
          <TabsList className="bg-transparent h-auto p-0 space-x-8">
            <TabsTrigger
              value="My-Resume"
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-slate-500 rounded-none px-1 py-4 font-semibold text-base shadow-none transition-all"
            >
              Unlocked Resumes ({paidResumes?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="Draft-Resume"
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-slate-500 rounded-none px-1 py-4 font-semibold text-base shadow-none transition-all"
            >
              Drafts ({draftResumes?.length || 0})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="My-Resume" className="outline-none">
          {!paidResumes || paidResumes.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No unlocked resumes</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-6">
                Once you complete a payment for a resume draft, it will appear here for unlimited
                downloads.
              </p>
              {/* <Button
                onClick={() =>
                  document.querySelector('[value="Draft-Resume"]').click()
                }
                variant="outline"
              >
                View Drafts
              </Button> */}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              id="tour-resume-list"
            >
              {paidResumes.map(resume => (
                <ResumeCard key={resume?.resumedata._id} resume={resume?.resumedata} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="Draft-Resume" className="outline-none">
          {!draftResumes || draftResumes.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Edit className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Start your first resume</h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-6">
                Create a new resume to get started. It will be saved here automatically.
              </p>
              <Button onClick={() => route.push("/dashboard/builder")}>Create New Resume</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {draftResumes.map(resume => (
                <ResumeCard key={resume?.resumedata._id} resume={resume?.resumedata} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      {/* <Tour
        steps={[
          {
            target: "#tour-my-resumes-header",
            content: "Manage all your created resumes here.",
            disableBeacon: true,
          },
          {
            target: "#tour-create-new-button",
            content: "Ready to start a new one? Click here!",
          },
          {
            target: "#tour-resume-tabs",
            content: "Switch between your unlocked resumes and drafts.",
          },
          {
            target: "#tour-resume-list",
            content:
              "All your resumes will appear here. You can download, edit, or delete them.",
          },
        ]}
        tourId="my-resumes"
      /> */}
    </div>
  );
};

export default MyResume;
