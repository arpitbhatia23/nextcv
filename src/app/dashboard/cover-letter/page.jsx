"use client";
import React, { useState } from "react";
import { FileText, Sparkles, Check, ArrowRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import PDFPreview from "@/modules/resume/components/pdfPreview";
import { formatDate } from "@/shared/utils/datefromater";
import { Button } from "@/shared/components/ui/button";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/cover-letter/Hook/useDraft";
import { usePayment } from "@/modules/cover-letter/Hook/usePayment";
import RedirectToPayment from "@/modules/payment/components/redirectToPayment";

/* Fonts: Fraunces for the letterhead display type, IBM Plex Mono for
   reference codes / labels / prices. Body stays on the default sans. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const Page = () => {
  const [selectedResume, setSelectedResume] = useState(1);
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const resume = resumes.find(r => r?.resumedata?._id === selectedResume) || resumes[0];
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
    jobDescription: jobDescription,
    tone: tone,
    length: length,
    company: company,
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
    const resume = async () => {
      setResumesLoading(true);
      try {
        const data = await axios.get("/api/resume/getAllResume");
        console.log(data?.data?.data?.paid);
        setResumes(data?.data?.data?.paid);
      } finally {
        setResumesLoading(false);
      }
    };
    resume();
  }, []);

  const Generate_coverLetter = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await axios.post("/api/cover-letter/gen", { data: coverletterData });
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");

      setCoverLetter({ ...JSON.parse(res.data.data), productType: "cover-letter" });

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
      <div className="min-h-screen" style={{ backgroundColor: "#F7F7F5" }}>
        <FontImports />
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Letterhead */}
          <div
            className="mb-10 pb-6 border-b-2 flex flex-wrap items-end justify-between gap-4"
            style={{ borderColor: "#1C2333" }}
          >
            <div>
              <div
                className="font-mono text-[11px] tracking-widest mb-2"
                style={{ color: "#B3382C" }}
              >
                CORRESPONDENCE ARCHIVE
              </div>
              <h1 className="font-display text-3xl font-medium" style={{ color: "#1C2333" }}>
                Cover Letter
              </h1>
            </div>
            <button
              className="rounded-none border px-5 py-2.5 font-mono text-xs tracking-widest transition"
              style={{ borderColor: "#1C2333", color: "#1C2333", backgroundColor: "#FFFFFF" }}
            >
              MY LETTERS
            </button>
          </div>

          {/* Main grid: resume select (small) | job details | live preview (big) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Resume selection - narrow */}
            <div
              className="border p-5 lg:col-span-3"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
            >
              <h2
                className="mb-4 font-mono text-[10px] font-medium tracking-widest"
                style={{ color: "#6B7280" }}
              >
                SELECT RESUME
              </h2>

              <div className="space-y-3 overflow-auto">
                {resumesLoading ? (
                  // Skeleton loading animation while resumes are fetched
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse border p-4"
                      style={{ borderColor: "#E4E2DC" }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 shrink-0" style={{ backgroundColor: "#EDEBE5" }} />
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="h-3.5 w-3/4" style={{ backgroundColor: "#EDEBE5" }} />
                          <div className="h-3 w-1/2" style={{ backgroundColor: "#EDEBE5" }} />
                          <div className="h-3 w-2/3" style={{ backgroundColor: "#EDEBE5" }} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : resumes.length > 0 ? (
                  resumes.map(r => {
                    const active = selectedResume === r?.resumedata?._id;

                    return (
                      <div
                        key={r?.resumedata?._id}
                        onClick={() => setSelectedResume(r?.resumedata?._id)}
                        className="cursor-pointer border p-4 transition"
                        style={
                          active
                            ? { borderColor: "#1C2333", backgroundColor: "#F7F7F5" }
                            : { borderColor: "#E4E2DC" }
                        }
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center"
                            style={
                              active
                                ? { backgroundColor: "#1C2333", color: "#FFFFFF" }
                                : { backgroundColor: "#F7F7F5", color: "#1C2333" }
                            }
                          >
                            {active ? <Check size={16} /> : <FileText size={16} />}
                          </div>

                          <div className="min-w-0">
                            <h3
                              className="truncate text-sm font-semibold"
                              style={{ color: "#1C2333" }}
                            >
                              {r?.resumedata?.name}
                            </h3>

                            <p
                              className="mt-0.5 truncate font-mono text-[11px]"
                              style={{ color: "#6B7280" }}
                            >
                              {formatDate(r?.resumedata?.updatedAt)}
                            </p>

                            <p className="text-xs" style={{ color: "#B7B5AC" }}>
                              {r?.resumedata?.jobRole}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm" style={{ color: "#6B7280" }}>
                    No resumes found.
                  </div>
                )}
              </div>
            </div>

            {/* Job details */}
            <div
              className="border p-6 lg:col-span-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
            >
              <h2
                className="mb-4 font-mono text-[10px] font-medium tracking-widest"
                style={{ color: "#6B7280" }}
              >
                JOB DETAILS
              </h2>

              <div className="space-y-4">
                <input
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Company name"
                  disabled={isGenerating}
                  className="w-full rounded-none border px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:text-gray-400"
                  style={{
                    borderColor: "#E4E2DC",
                    backgroundColor: isGenerating ? "#F7F7F5" : "#FFFFFF",
                  }}
                />
                <textarea
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  rows="5"
                  placeholder="Paste job description..."
                  disabled={isGenerating}
                  className="w-full rounded-none border px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:text-gray-400"
                  style={{
                    borderColor: "#E4E2DC",
                    backgroundColor: isGenerating ? "#F7F7F5" : "#FFFFFF",
                  }}
                />
              </div>

              <div className="mt-6">
                <h3
                  className="mb-2 font-mono text-[10px] font-medium tracking-widest"
                  style={{ color: "#B7B5AC" }}
                >
                  TONE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map(item => (
                    <button
                      key={item}
                      onClick={() => setTone(item)}
                      disabled={isGenerating}
                      className="rounded-none border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
                      style={
                        tone === item
                          ? { backgroundColor: "#1C2333", color: "#FFFFFF", borderColor: "#1C2333" }
                          : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E4E2DC" }
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3
                  className="mb-2 font-mono text-[10px] font-medium tracking-widest"
                  style={{ color: "#B7B5AC" }}
                >
                  LENGTH
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lengthOptions.map(item => (
                    <button
                      key={item}
                      onClick={() => setLength(item)}
                      disabled={isGenerating}
                      className="rounded-none border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
                      style={
                        length === item
                          ? { backgroundColor: "#1C2333", color: "#FFFFFF", borderColor: "#1C2333" }
                          : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E4E2DC" }
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={Generate_coverLetter}
                disabled={isGenerating}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-none py-4 font-medium text-white shadow-none transition disabled:cursor-not-allowed"
                style={{ backgroundColor: isGenerating ? "#8a4038" : "#B3382C" }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Cover Letter
                  </>
                )}
              </button>
            </div>

            {/* Live preview - wide */}
            <div className="lg:col-span-5">
              {isGenerating ? (
                // Generation animation while the cover letter PDF is being built
                <div
                  className="flex h-full min-h-150 flex-col items-center justify-center border-2"
                  style={{
                    borderStyle: "dashed",
                    borderColor: "#D8D6CE",
                    backgroundColor: "#FBFBF9",
                  }}
                >
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-30"
                      style={{ backgroundColor: "#B3382C" }}
                    />
                    <span
                      className="relative inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#1C2333" }}
                    >
                      <Sparkles size={20} className="animate-pulse text-white" />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium" style={{ color: "#1C2333" }}>
                    Crafting your cover letter
                  </h3>
                  <p className="mt-2 font-mono text-xs" style={{ color: "#6B7280" }}>
                    This usually takes a few seconds...
                  </p>
                </div>
              ) : pdfurl ? (
                <>
                  <PDFPreview variant="cover-letter" pdfUrl={pdfurl} />
                  <div className="mt-4 space-y-3">
                    {!applied ? (
                      <div className="flex gap-2">
                        <input
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          placeholder="Coupon code"
                          className="flex-1 rounded-none border px-3 py-2 font-mono text-sm uppercase placeholder:normal-case"
                          style={{ borderColor: "#E4E2DC" }}
                        />

                        <Button
                          disabled={!couponCode || isSubmit}
                          onClick={() => handleCoupon(couponCode)}
                          className="rounded-none font-mono text-xs"
                          style={{ backgroundColor: "#1C2333" }}
                        >
                          {isSubmit ? "APPLYING..." : "APPLY"}
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="flex justify-between p-3 text-sm font-mono"
                        style={{ backgroundColor: "#EAF4F2", color: "#0F6E63" }}
                      >
                        <span>COUPON APPLIED</span>

                        <button style={{ color: "#B3382C" }} onClick={removeCoupon}>
                          REMOVE
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-4">
                      <Button
                        variant="outline"
                        onClick={handleSaveDraft}
                        className="flex-1 rounded-none"
                        style={{ borderColor: "#1C2333", color: "#1C2333" }}
                      >
                        {isdraftSubmit ? "Saving as draft" : "Save Draft"}
                      </Button>

                      <Button
                        onClick={handelPayment}
                        className="flex-1 rounded-none text-white"
                        style={{ backgroundColor: "#B3382C" }}
                        disabled={isPaymentSubmit || isRedirecting}
                      >
                        {isPaymentSubmit ? "Proceed to Payment" : `Pay ₹${amount}`}{" "}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="flex h-full min-h-150 items-center justify-center border-2"
                  style={{
                    borderStyle: "dashed",
                    borderColor: "#D8D6CE",
                    backgroundColor: "#FBFBF9",
                  }}
                >
                  <div className="text-center">
                    <FileText
                      className="mx-auto mb-4 h-12 w-12"
                      style={{ color: "#C9C7BF" }}
                      strokeWidth={1.25}
                    />
                    <h3 className="font-display text-lg font-medium" style={{ color: "#1C2333" }}>
                      Preview will appear here
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                      Generate your cover letter to see the live preview.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isRedirecting && <RedirectToPayment />}
    </>
  );
};

export default Page;
