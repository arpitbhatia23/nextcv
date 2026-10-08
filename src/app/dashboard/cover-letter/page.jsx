"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  Loader2,
  BriefcaseBusiness,
  Clock3,
  ChevronRight,
  WandSparkles,
} from "lucide-react";
import axios from "axios";
import PDFPreview from "@/modules/resume/components/pdfPreview";
import { formatDate } from "@/shared/utils/datefromater";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/cover-letter/Hook/useDraft";
import { usePayment } from "@/modules/cover-letter/Hook/usePayment";
import RedirectToPayment from "@/modules/payment/components/redirectToPayment";
import Link from "next/link";

/**
 * NextCV design system:
 * Background: #F8F7F3
 * Primary:    #17201C
 * Muted:      #5B625C / #66706B
 * Surface:    #FFFFFF
 * Border:     #E3E2DC
 * Accent:     #465B9E / #344B93
 */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap');

    .nextcv-serif {
      font-family: 'Source Serif 4', Georgia, serif;
    }

    .nextcv-sans {
      font-family: 'Inter', system-ui, sans-serif;
    }
  `}</style>
);

const Page = () => {
  // No resume selected by default — the person must explicitly pick one.
  const [selectedResume, setSelectedResume] = useState(null);
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const resume = resumes.find(r => r?.resumedata?._id === selectedResume);

  const [coverLetter, setCoverLetter] = useState(null);
  const [pdfurl, setPdfurl] = useState();
  const [amount, setAmount] = useState(79);
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [draftId, setDraftId] = useState(null);

  const coverletterData = {
    jobRole: resume?.resumedata.jobRole,
    skills: resume?.resumedata.skills,
    experince: resume?.resumedata.experience,
    jobDescription,
    tone,
    length,
    company,
    name: resume?.resumedata.name,
  };

  const { handleCoupon, removeCoupon } = useCoupon({
    setIsSubmit,
    originalAmount: 100,
    setAmount,
    setCouponCode,
    setApplied,
    setDiscount,
  });

  useEffect(() => {
    const fetchResumes = async () => {
      setResumesLoading(true);

      try {
        const data = await axios.get("/api/resume/getAllResume");
        setResumes(data?.data?.data?.paid || []);
      } finally {
        setResumesLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const isCompanyMissing = !company.trim();
  const isResumeMissing = !resume;
  const canGenerate = !isResumeMissing && !isCompanyMissing && !isGenerating;

  const Generate_coverLetter = async () => {
    if (isGenerating) return;

    if (isResumeMissing) {
      toast.error("Select a resume before generating your cover letter.");
      return;
    }

    if (isCompanyMissing) {
      toast.error("Company name is required.");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await axios.post("/api/cover-letter/gen", {
        data: coverletterData,
      });

      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");

      setCoverLetter({
        ...JSON.parse(res.data.data),
        productType: "cover-letter",
      });

      const pdfGen = new pdfGenerator(JSON.parse(res.data.data), "classic", {
        type: "cover-letter",
      });

      const url = await pdfGen.createPdf();
      setPdfurl(url);
    } finally {
      setIsGenerating(false);
    }
  };

  const { handelPayment, isPaymentSubmit, isRedirecting } = usePayment({
    couponCode,
    coverLetter,
    draftId,
  });

  const { handleSaveDraft, isdraftSubmit } = useDraft({
    data: coverLetter,
    setDraftId,
  });

  const toneOptions = ["Professional", "Confident", "Friendly"];
  const lengthOptions = ["Short", "Medium", "Detailed"];

  return (
    <>
      <div className="nextcv-sans min-h-screen bg-[#F8F7F3] text-[#17201C]">
        <FontImports />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col gap-5 border-b border-[#E3E2DC] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
                  <span className="h-1.5 w-1.5  bg-[#465B9E]" />
                  NextCV AI Tools
                </div>

                <h1 className="nextcv-serif text-4xl font-medium tracking-[-0.025em] text-[#17201C] sm:text-5xl">
                  Write a cover letter
                  <span className="text-[#465B9E]">.</span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66706B] sm:text-[15px]">
                  Create a tailored cover letter from your resume and the job you&apos;re applying
                  for.
                </p>
              </div>

              <Link
                href="my-cover-letter"
                className="inline-flex h-11 items-center justify-center gap-2 self-start  border border-[#E3E2DC] bg-white px-4 text-sm font-medium text-[#17201C] transition hover:border-[#C9C9C2] hover:bg-[#FBFAF7] focus:outline-none focus:ring-2 focus:ring-[#465B9E]/20 sm:self-auto"
              >
                My letters
                <ArrowRight size={15} />
              </Link>
            </div>
          </header>

          {/* Main workspace */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start">
            {/* Resume selection */}
            <section className="overflow-hidden  border border-[#E3E2DC] bg-white lg:col-span-3">
              <div className="border-b border-[#E7E5DF] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                      Step 01
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-[#17201C]">
                      Choose your resume
                    </h2>
                  </div>

                  {isResumeMissing && !resumesLoading && (
                    <span className=" bg-[#F3ECEB] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#9B4D46]">
                      Required
                    </span>
                  )}
                </div>
              </div>

              <div className="max-h-130 space-y-2 overflow-auto p-3">
                {resumesLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse  border border-[#E7E5DF] p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10  bg-[#EEEDE8]" />
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="h-3.5 w-3/4 rounded bg-[#EEEDE8]" />
                          <div className="h-3 w-1/2 rounded bg-[#EEEDE8]" />
                          <div className="h-3 w-2/3 rounded bg-[#EEEDE8]" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : resumes.length > 0 ? (
                  resumes.map(r => {
                    const active = selectedResume === r?.resumedata?._id;

                    return (
                      <button
                        type="button"
                        key={r?.resumedata?._id}
                        onClick={() => setSelectedResume(r?.resumedata?._id)}
                        className={`group w-full  border p-3.5 text-left transition focus:outline-none focus:ring-2 focus:ring-[#465B9E]/20 ${
                          active
                            ? "border-[#465B9E] bg-[#F1F3F9]"
                            : "border-[#E7E5DF] bg-white hover:border-[#CFCFC8] hover:bg-[#FBFAF7]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center  ${
                              active ? "bg-[#465B9E] text-white" : "bg-[#F1F0EB] text-[#5B625C]"
                            }`}
                          >
                            {active ? (
                              <Check size={16} strokeWidth={2.4} />
                            ) : (
                              <FileText size={17} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="truncate text-sm font-semibold text-[#17201C]">
                                {r?.resumedata?.name}
                              </h3>
                              <ChevronRight
                                size={14}
                                className={`shrink-0 transition ${
                                  active
                                    ? "text-[#465B9E]"
                                    : "text-[#A0A49F] group-hover:text-[#5B625C]"
                                }`}
                              />
                            </div>

                            <p className="mt-1 truncate text-xs text-[#66706B]">
                              {r?.resumedata?.jobRole || "Professional resume"}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#8A908B]">
                              <Clock3 size={11} />
                              {formatDate(r?.resumedata?.updatedAt)}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className=" border border-dashed border-[#D9D8D1] px-5 py-10 text-center">
                    <FileText size={24} className="mx-auto mb-3 text-[#A4A8A3]" />
                    <p className="text-sm font-medium text-[#17201C]">No paid resumes found</p>
                    <p className="mt-1 text-xs leading-5 text-[#66706B]">
                      Create and unlock a resume first to use it here.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Job details */}
            <section className=" border border-[#E3E2DC] bg-white p-5 sm:p-6 lg:col-span-4">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                    Step 02
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-[#17201C]">Add job details</h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                  <BriefcaseBusiness size={17} />
                </div>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-[#17201C]">
                    Company name
                  </span>
                  <input
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Google, TCS, Deloitte"
                    disabled={isGenerating}
                    className={`h-12 w-full  border bg-white px-3.5 text-sm text-[#17201C] outline-none transition placeholder:text-[#A0A49F] focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F5F4F0] ${
                      isCompanyMissing
                        ? "border-[#D8C5C2] focus:border-[#465B9E] focus:ring-[#465B9E]/10"
                        : "border-[#E3E2DC] focus:border-[#465B9E] focus:ring-[#465B9E]/10"
                    }`}
                  />
                </label>

                <label className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#17201C]">Job description</span>
                    <span className="text-[10px] text-[#8A908B]">Recommended</span>
                  </div>

                  <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    rows={7}
                    placeholder="Paste the job description here. NextCV will tailor your letter around the role..."
                    disabled={isGenerating}
                    className="w-full resize-none  border border-[#E3E2DC] bg-white px-3.5 py-3 text-sm leading-6 text-[#17201C] outline-none transition placeholder:text-[#A0A49F] focus:border-[#465B9E] focus:ring-2 focus:ring-[#465B9E]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F0]"
                  />
                </label>
              </div>

              <div className="mt-6 border-t border-[#E7E5DF] pt-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <h3 className="mb-2.5 text-xs font-semibold text-[#17201C]">Tone</h3>

                    <div className="flex flex-wrap gap-2">
                      {toneOptions.map(item => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setTone(item)}
                          disabled={isGenerating}
                          className={` border px-3 py-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#465B9E]/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                            tone === item
                              ? "border-[#465B9E] bg-[#465B9E] text-white"
                              : "border-[#E3E2DC] bg-white text-[#5B625C] hover:border-[#CFCFC8] hover:text-[#17201C]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2.5 text-xs font-semibold text-[#17201C]">Length</h3>

                    <div className="flex flex-wrap gap-2">
                      {lengthOptions.map(item => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setLength(item)}
                          disabled={isGenerating}
                          className={` border px-3 py-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-[#465B9E]/20 disabled:cursor-not-allowed disabled:opacity-50 ${
                            length === item
                              ? "border-[#465B9E] bg-[#465B9E] text-white"
                              : "border-[#E3E2DC] bg-white text-[#5B625C] hover:border-[#CFCFC8] hover:text-[#17201C]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6  border border-[#E7E5DF] bg-[#FBFAF7] p-3.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                    <WandSparkles size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#17201C]">AI tailoring</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#66706B]">
                      Your selected resume, company, role and job description are used to
                      personalize the letter.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={Generate_coverLetter}
                disabled={!canGenerate}
                title={
                  isResumeMissing
                    ? "Select a resume first"
                    : isCompanyMissing
                      ? "Enter a company name first"
                      : undefined
                }
                className="mt-5 h-12 w-full  border-0 bg-[#465B9E] text-sm font-semibold text-white shadow-none transition hover:bg-[#344B93] focus:ring-2 focus:ring-[#465B9E]/20 disabled:cursor-not-allowed disabled:bg-[#D9DCE7] disabled:text-[#8A908B]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={17} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} className="mr-2" />
                    Generate cover letter
                  </>
                )}
              </Button>

              {(isResumeMissing || isCompanyMissing) && (
                <p className="mt-2.5 text-center text-[10px] font-medium uppercase tracking-wider text-[#9B4D46]">
                  {isResumeMissing && isCompanyMissing
                    ? "Select a resume and enter a company"
                    : isResumeMissing
                      ? "Select a resume to continue"
                      : "Enter a company to continue"}
                </p>
              )}
            </section>

            {/* Preview / payment */}
            <section className="lg:col-span-5">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                    Step 03
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-[#17201C]">Preview & finish</h2>
                </div>

                {pdfurl && (
                  <span className="inline-flex items-center gap-1.5  bg-[#EAF1E9] px-2.5 py-1 text-[10px] font-semibold text-[#42634A]">
                    <Check size={11} />
                    Ready
                  </span>
                )}
              </div>

              {isGenerating ? (
                <div className="flex min-h-155 flex-col items-center justify-center  border border-[#E3E2DC] bg-white p-8 text-center">
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                    <span className="absolute inset-0 animate-ping  bg-[#465B9E]/10" />
                    <Sparkles size={22} className="relative animate-pulse" />
                  </div>

                  <h3 className="nextcv-serif text-2xl font-medium text-[#17201C]">
                    Crafting your letter
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#66706B]">
                    NextCV is tailoring your application to the role. This usually takes a few
                    seconds.
                  </p>

                  <div className="mt-6 h-1.5 w-40 overflow-hidden  bg-[#E7E5DF]">
                    <div className="h-full w-1/2 animate-pulse  bg-[#465B9E]" />
                  </div>
                </div>
              ) : pdfurl ? (
                <div className=" border border-[#E3E2DC] bg-white p-3 sm:p-4">
                  <PDFPreview variant="cover-letter" pdfUrl={pdfurl} />

                  <div className="mt-4 space-y-3">
                    {!applied ? (
                      <div className="flex gap-2">
                        <input
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          placeholder="Coupon code"
                          className="h-11 min-w-0 flex-1  border border-[#E3E2DC] bg-white px-3.5 text-sm uppercase text-[#17201C] outline-none placeholder:normal-case placeholder:text-[#A0A49F] focus:border-[#465B9E] focus:ring-2 focus:ring-[#465B9E]/10"
                        />

                        <Button
                          disabled={!couponCode || isSubmit}
                          onClick={() => handleCoupon(couponCode)}
                          className="h-11  border-0 bg-[#17201C] px-4 text-xs font-semibold text-white hover:bg-[#28322D]"
                        >
                          {isSubmit ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between  border border-[#DCE8DC] bg-[#F1F7F1] px-3.5 py-3 text-xs">
                        <span className="flex items-center gap-2 font-semibold text-[#42634A]">
                          <Check size={14} />
                          Coupon applied
                        </span>

                        <button
                          type="button"
                          className="font-semibold text-[#7D514C] hover:underline"
                          onClick={removeCoupon}
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2.5">
                      <Button
                        variant="outline"
                        onClick={handleSaveDraft}
                        className="h-11  border-[#D9D8D1] bg-white text-sm font-semibold text-[#17201C] hover:bg-[#FBFAF7]"
                      >
                        {isdraftSubmit ? "Saving..." : "Save draft"}
                      </Button>

                      <Button
                        onClick={handelPayment}
                        className="h-11  border-0 bg-[#465B9E] text-sm font-semibold text-white hover:bg-[#344B93]"
                        disabled={isPaymentSubmit || isRedirecting}
                      >
                        {isPaymentSubmit ? "Processing..." : `Pay ₹${amount}`}
                      </Button>
                    </div>

                    <p className="text-center text-[10px] leading-4 text-[#8A908B]">
                      One-time payment · No subscription
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-155 items-center justify-center  border border-dashed border-[#D6D5CE] bg-white px-8 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center  bg-[#F1F0EB] text-[#66706B]">
                      <FileText size={24} strokeWidth={1.6} />
                    </div>

                    <h3 className="nextcv-serif text-2xl font-medium text-[#17201C]">
                      Your preview starts here
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#66706B]">
                      Choose a resume, add the company and generate your cover letter to see the
                      finished document here.
                    </p>

                    <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A908B]">
                      <span
                        className={`h-1.5 w-1.5  ${
                          !isResumeMissing ? "bg-[#465B9E]" : "bg-[#D6D5CE]"
                        }`}
                      />
                      Resume
                      <span className="h-px w-5 bg-[#E3E2DC]" />
                      <span
                        className={`h-1.5 w-1.5  ${
                          !isCompanyMissing ? "bg-[#465B9E]" : "bg-[#D6D5CE]"
                        }`}
                      />
                      Company
                      <span className="h-px w-5 bg-[#E3E2DC]" />
                      <span className="h-1.5 w-1.5  bg-[#D6D5CE]" />
                      Generate
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Footer note */}
          <div className="mt-7 flex flex-col gap-2 border-t border-[#E3E2DC] pt-5 text-[11px] text-[#8A908B] sm:flex-row sm:items-center sm:justify-between">
            <p>NextCV · AI-powered career tools for job seekers.</p>
            <p>Build once. Apply with confidence.</p>
          </div>
        </main>
      </div>

      {isRedirecting && <RedirectToPayment />}
    </>
  );
};

export default Page;
