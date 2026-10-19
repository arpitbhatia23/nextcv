"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  FileUp,
  UploadCloud,
  X,
  Loader2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import PDFPreview from "@/modules/resume/components/pdfPreview";
import { formatDate } from "@/shared/utils/datefromater";
import { Button } from "@/shared/components/ui/button";
import { useCoupon } from "@/modules/payment/hooks/useCoupon";
import { useDraft } from "@/modules/cover-letter/Hook/useDraft";
import { usePayment } from "@/modules/cover-letter/Hook/usePayment";
import RedirectToPayment from "@/modules/payment/components/redirectToPayment";
const ORIGINAL_AMOUNT = 79;
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap');
    .nextcv-serif { font-family: 'Source Serif 4', Georgia, serif; }
    .nextcv-sans { font-family: 'Inter', system-ui, sans-serif; }
  `}</style>
);
export default function CoverLetterBuilderPage() {
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeSource, setResumeSource] = useState("saved");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [resumesLoading, setResumesLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);
  const [pdfurl, setPdfurl] = useState();
  const [amount, setAmount] = useState(ORIGINAL_AMOUNT);
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const resume = useMemo(
    () => resumes.find(item => item?.resumedata?._id === selectedResume),
    [resumes, selectedResume]
  );
  const activeResume = resumeSource === "saved" ? resume?.resumedata : uploadedResume;
  const isCompanyMissing = !company.trim();
  const isResumeMissing = !activeResume;
  const canGenerate = !isResumeMissing && !isCompanyMissing && !isGenerating;
  const { handleCoupon, removeCoupon } = useCoupon({
    setIsSubmit,
    originalAmount: ORIGINAL_AMOUNT,
    setAmount,
    setCouponCode,
    setApplied,
    setDiscount,
  });
  useEffect(() => {
    let cancelled = false;
    const fetchResumes = async () => {
      setResumesLoading(true);
      try {
        const response = await axios.get("/api/resume/getAllResume");
        const paidResumes = response?.data?.data?.paid;
        if (!cancelled) {
          const list = Array.isArray(paidResumes) ? paidResumes : [];
          setResumes(list);
          // Prefer a resume already saved in NextCV; no upload is required by default.
          setSelectedResume(
            current => current || list.find(item => item?.resumedata?._id)?.resumedata?._id || null
          );
          setResumeSource("saved");
        }
      } catch (error) {
        console.error("Failed to load resumes:", error);
        if (!cancelled) {
          setResumes([]);
          toast.error("Unable to load your resumes. Please try again.");
        }
      } finally {
        if (!cancelled) setResumesLoading(false);
      }
    };
    void fetchResumes();
    return () => {
      cancelled = true;
    };
  }, []);
  const coverletterData = useMemo(
    () => ({
      jobRole: activeResume?.jobRole,
      skills: activeResume?.skills,
      experience: activeResume?.experience,
      jobDescription: jobDescription.trim(),
      tone,
      length,
      company: company.trim(),
      name: activeResume?.name,
      experince: activeResume?.experience,
    }),
    [activeResume, company, jobDescription, length, tone]
  );
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
      const response = await axios.post("/api/cover-letter/gen", {
        data: coverletterData,
      });
      const responseData = response?.data?.data;
      if (!responseData) throw new Error("The API returned no cover-letter data.");
      const generatedData =
        typeof responseData === "string" ? JSON.parse(responseData) : responseData;
      const letterData = {
        ...generatedData,
        productType: "cover-letter",
      };
      setCoverLetter(letterData);
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const generator = new pdfGenerator(generatedData, "classic", {
        type: "cover-letter",
      });
      const generatedPdfUrl = await generator.createPdf();
      setPdfurl(generatedPdfUrl);
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
      toast.error("Could not generate the cover letter. Please try again.");
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
  const uploadResume = async () => {
    if (!uploadedFile) return;
    if (uploadedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the 5 MB limit.");
      setUploadedFile(null);
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      const response = await axios.post("/api/resume/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response?.data);
      const parsedResume = response?.data?.resume?.data ?? response?.data?.resume.data;
      if (!parsedResume) {
        throw new Error("The import API did not return a parsed resume.");
      }
      setUploadedResume(parsedResume);
      setResumeSource("uploaded");
      setSelectedResume(null);
      toast.success("Resume uploaded and parsed.");
    } catch (error) {
      console.error("Failed to upload resume:", error);
      toast.error("Failed to upload or parse the resume. Please try again.");
    } finally {
      setUploading(false);
      setUploadedFile(null);
    }
  };
  const toneOptions = ["Professional", "Confident", "Friendly"];
  const lengthOptions = ["Short", "Medium", "Detailed"];
  return (
    <>
      <div className="nextcv-sans min-h-screen bg-[#F8F7F3] text-[#17201C]">
        <FontImports />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <header className="mb-8">
            <div className="flex flex-col gap-5 border-b border-[#E3E2DC] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
                  <span className="h-1.5 w-1.5 bg-[#465B9E]" /> NextCV AI Tools
                </div>
                <h1 className="nextcv-serif text-4xl font-medium tracking-[-0.025em] sm:text-5xl">
                  Write a cover letter<span className="text-[#465B9E]">.</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66706B] sm:text-[15px]">
                  Create a tailored cover letter from your resume and the job you are applying for.
                </p>
              </div>
              <Link
                href="my-cover-letter"
                className="inline-flex h-11 items-center gap-2  border border-[#E3E2DC] bg-white px-4 text-sm font-medium transition hover:bg-[#FBFAF7]"
              >
                My letters <ArrowRight size={15} />
              </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start">
            <section className="overflow-hidden  border border-[#E3E2DC] bg-white shadow-[0_8px_30px_rgba(23,32,28,0.035)] lg:col-span-3">
              <div className="border-b border-[#E7E5DF] px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                  Step 01
                </p>
                <h2 className="mt-1 text-sm font-semibold">Choose your resume</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setResumeSource("saved")}
                    className={`h-10 flex-1  ${resumeSource === "saved" ? "border-[#465B9E] bg-[#F1F3F9] text-[#344B93]" : "border-[#E3E2DC] bg-white"}`}
                  >
                    My Resumes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setResumeSource("uploaded")}
                    className={`h-10 flex-1  ${resumeSource === "uploaded" ? "border-[#465B9E] bg-[#F1F3F9] text-[#344B93]" : "border-[#E3E2DC] bg-white"}`}
                  >
                    Upload Resume
                  </Button>
                </div>
                {isResumeMissing && !resumesLoading && (
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#9B4D46]">
                    Resume required
                  </p>
                )}
              </div>

              {resumeSource === "saved" ? (
                <div className="max-h-128 space-y-2 overflow-auto p-3">
                  {resumesLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-20 animate-pulse  border border-[#E7E5DF] bg-[#FBFAF7]"
                      />
                    ))
                  ) : resumes.length ? (
                    resumes.map(item => {
                      const id = item?.resumedata?._id;
                      const active = Boolean(id && id === selectedResume);
                      return (
                        <button
                          key={id ?? item?.resumedata?.name}
                          type="button"
                          onClick={() => id && setSelectedResume(id)}
                          className={`group w-full  border p-3.5 text-left transition ${active ? "border-[#465B9E] bg-[#F1F3F9]" : "border-[#E7E5DF] hover:border-[#CFCFC8] hover:bg-[#FBFAF7]"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center  ${active ? "bg-[#465B9E] text-white" : "bg-[#F1F0EB] text-[#5B625C]"}`}
                            >
                              {active ? <Check size={16} /> : <FileText size={17} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="truncate text-sm font-semibold">
                                  {item?.resumedata?.name || "Untitled resume"}
                                </h3>
                                <ChevronRight size={14} className="shrink-0 text-[#A0A49F]" />
                              </div>
                              <p className="mt-1 truncate text-xs text-[#66706B]">
                                {item?.resumedata?.jobRole || "Professional resume"}
                              </p>
                              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#8A908B]">
                                <Clock3 size={11} />
                                {item?.resumedata?.updatedAt
                                  ? formatDate(item.resumedata.updatedAt)
                                  : "Saved resume"}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="border border-dashed border-[#D9D8D1] px-5 py-10 text-center">
                      <FileText size={24} className="mx-auto mb-3 text-[#A4A8A3]" />
                      <p className="text-sm font-medium">No paid resumes found</p>
                      <p className="mt-1 text-xs leading-5 text-[#66706B]">
                        Create and unlock a resume first to use it here.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 p-4">
                  <input
                    id="cover-letter-resume-upload"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    disabled={uploading}
                    onChange={event => setUploadedFile(event.target.files?.[0] ?? null)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="cover-letter-resume-upload"
                    className={`group flex cursor-pointer flex-col items-center  border-2 border-dashed px-5 py-8 text-center transition ${uploading ? "cursor-not-allowed border-[#E3E2DC] bg-[#FBFAF7] opacity-70" : "border-[#C9CEE0] bg-[#F8F9FC] hover:border-[#465B9E] hover:bg-[#F1F3F9]"}`}
                  >
                    <span className="mb-3 flex h-12 w-12 items-center justify-center  bg-white text-[#465B9E] shadow-sm ring-1 ring-[#E3E2DC]">
                      <UploadCloud size={23} />
                    </span>
                    <span className="text-sm font-semibold text-[#17201C]">
                      {uploadedFile ? "Choose a different file" : "Upload your resume"}
                    </span>
                    <span className="mt-1.5 text-xs leading-5 text-[#66706B]">
                      Drag-and-drop is not required — click to browse your device
                    </span>
                    <span className="mt-3  bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5B625C] ring-1 ring-[#E3E2DC]">
                      PDF or DOCX · Up to 5 MB
                    </span>
                  </label>
                  {uploadedFile && (
                    <div className="flex items-center gap-3  border border-[#E3E2DC] bg-white p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                        <FileUp size={18} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{uploadedFile.name}</p>
                        <p className="mt-0.5 text-xs text-[#8A908B]">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB · Ready to import
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove selected file"
                        disabled={uploading}
                        onClick={() => setUploadedFile(null)}
                        className=" p-2 text-[#66706B] transition hover:bg-[#F1F0EB] hover:text-[#17201C]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  {uploadedFile && (
                    <Button
                      disabled={uploading}
                      onClick={uploadResume}
                      className="h-11 w-full  bg-[#465B9E] text-white hover:bg-[#344B93]"
                    >
                      {uploading ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" /> Importing resume…
                        </>
                      ) : (
                        <>
                          <FileUp size={16} className="mr-2" /> Upload and use this resume
                        </>
                      )}
                    </Button>
                  )}
                  {uploadedResume && (
                    <div className=" border border-[#DCE8DC] bg-[#F5F9F4] p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center  bg-white text-[#42634A]">
                          <Check size={17} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">Imported resume ready</p>
                          <p className="mt-1 truncate text-sm text-[#66706B]">
                            {uploadedResume?.name || "Unnamed resume"}
                          </p>
                          <p className="text-xs text-[#66706B]">
                            {uploadedResume?.jobRole ||
                              "Review the extracted details before generating."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-xs leading-5 text-[#8A908B]">
                    Your uploaded file is parsed to extract resume details. Verify the imported
                    information before creating your cover letter.
                  </p>
                  <button
                    type="button"
                    onClick={() => setResumeSource("saved")}
                    className="w-full  border border-[#E3E2DC] px-3 py-2.5 text-xs font-semibold text-[#465B9E] transition hover:bg-[#FBFAF7]"
                  >
                    ← Use a resume already in NextCV
                  </button>
                </div>
              )}
            </section>

            <section className=" border border-[#E3E2DC] bg-white p-5 shadow-[0_8px_30px_rgba(23,32,28,0.035)] sm:p-6 lg:col-span-4">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                    Step 02
                  </p>
                  <h2 className="mt-1 text-sm font-semibold">Add job details</h2>
                </div>
                <div className="flex h-9 w-9 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                  <BriefcaseBusiness size={17} />
                </div>
              </div>
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold">Company name</span>
                  <input
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                    placeholder="e.g. Google, TCS, Deloitte"
                    disabled={isGenerating}
                    className={`h-12 w-full  border bg-white px-3.5 text-sm outline-none focus:border-[#465B9E] focus:ring-2 focus:ring-[#465B9E]/10 ${isCompanyMissing ? "border-[#D8C5C2]" : "border-[#E3E2DC]"}`}
                  />
                </label>
                <label className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold">Job description</span>
                    <span className="text-[10px] text-[#8A908B]">Recommended</span>
                  </div>
                  <textarea
                    value={jobDescription}
                    onChange={event => setJobDescription(event.target.value)}
                    rows={7}
                    placeholder="Paste the job description here. NextCV will tailor your letter around the role…"
                    disabled={isGenerating}
                    className="w-full resize-y  border border-[#E3E2DC] bg-white px-3.5 py-3 text-sm leading-6 outline-none focus:border-[#465B9E] focus:ring-2 focus:ring-[#465B9E]/10"
                  />
                </label>
              </div>
              <div className="mt-6 space-y-5 border-t border-[#E7E5DF] pt-5">
                <div>
                  <h3 className="mb-2.5 text-xs font-semibold">Tone</h3>
                  <div className="flex flex-wrap gap-2">
                    {toneOptions.map(item => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setTone(item)}
                        disabled={isGenerating}
                        className={` border px-3 py-2 text-xs font-medium ${tone === item ? "border-[#465B9E] bg-[#465B9E] text-white" : "border-[#E3E2DC] bg-white text-[#5B625C] hover:border-[#CFCFC8]"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2.5 text-xs font-semibold">Length</h3>
                  <div className="flex flex-wrap gap-2">
                    {lengthOptions.map(item => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setLength(item)}
                        disabled={isGenerating}
                        className={` border px-3 py-2 text-xs font-medium ${length === item ? "border-[#465B9E] bg-[#465B9E] text-white" : "border-[#E3E2DC] bg-white text-[#5B625C] hover:border-[#CFCFC8]"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6  border border-[#E7E5DF] bg-[#FBFAF7] p-3.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                    <WandSparkles size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">AI tailoring</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#66706B]">
                      Your selected resume, company, tone, length and job description help
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
                className="mt-5 h-12 w-full  bg-[#465B9E] text-sm font-semibold text-white hover:bg-[#344B93] disabled:bg-[#D9DCE7]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={17} className="mr-2 animate-spin" />
                    Generating…
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

            <section className="lg:col-span-5">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5B625C]">
                    Step 03
                  </p>
                  <h2 className="mt-1 text-sm font-semibold">Preview & finish</h2>
                </div>
                {pdfurl && (
                  <span className="inline-flex items-center gap-1.5  bg-[#EAF1E9] px-2.5 py-1 text-[10px] font-semibold text-[#42634A]">
                    <Check size={11} />
                    Ready
                  </span>
                )}
              </div>
              {isGenerating ? (
                <div className="flex min-h-152 flex-col items-center justify-center  border border-[#E3E2DC] bg-white p-8 text-center">
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center  bg-[#EEF0F7] text-[#465B9E]">
                    <span className="absolute inset-0 animate-ping bg-[#465B9E]/10" />
                    <Sparkles size={22} className="relative animate-pulse" />
                  </div>
                  <h3 className="nextcv-serif text-2xl font-medium">Crafting your letter</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#66706B]">
                    NextCV is tailoring your application to the role. This usually takes a few
                    seconds.
                  </p>
                  <div className="mt-6 h-1.5 w-40 overflow-hidden bg-[#E7E5DF]">
                    <div className="h-full w-1/2 animate-pulse bg-[#465B9E]" />
                  </div>
                </div>
              ) : pdfurl ? (
                <div className=" border border-[#E3E2DC] bg-white p-3 shadow-[0_8px_30px_rgba(23,32,28,0.035)] sm:p-4">
                  <PDFPreview variant="cover-letter" pdfUrl={pdfurl} />
                  <div className="mt-4 space-y-3">
                    {!applied ? (
                      <div className="flex gap-2">
                        <input
                          value={couponCode}
                          onChange={event => setCouponCode(event.target.value.toUpperCase())}
                          placeholder="Coupon code"
                          className="h-11 min-w-0 flex-1  border border-[#E3E2DC] px-3.5 text-sm uppercase outline-none focus:border-[#465B9E]"
                        />
                        <Button
                          disabled={!couponCode.trim() || isSubmit}
                          onClick={() => handleCoupon(couponCode)}
                          className="h-11  bg-[#17201C] px-4 text-xs font-semibold text-white"
                        >
                          {isSubmit ? "Applying…" : "Apply"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between  border border-[#DCE8DC] bg-[#F1F7F1] px-3.5 py-3 text-xs">
                        <span className="flex items-center gap-2 font-semibold text-[#42634A]">
                          <Check size={14} />
                          Coupon applied{discount != null ? ` · ${discount}% off` : ""}
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
                        disabled={isdraftSubmit}
                        className="h-11  border-[#D9D8D1] bg-white text-sm font-semibold"
                      >
                        {isdraftSubmit ? "Saving…" : "Save draft"}
                      </Button>
                      <Button
                        onClick={handelPayment}
                        disabled={isPaymentSubmit || isRedirecting}
                        className="h-11  bg-[#465B9E] text-sm font-semibold text-white hover:bg-[#344B93]"
                      >
                        {isPaymentSubmit ? "Processing…" : `Pay ₹${amount}`}
                      </Button>
                    </div>
                    <p className="text-center text-[10px] leading-4 text-[#8A908B]">
                      One-time payment · No subscription
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-152 items-center justify-center  border border-dashed border-[#D6D5CE] bg-white px-8 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center  bg-[#F1F0EB] text-[#66706B]">
                      <FileText size={24} strokeWidth={1.6} />
                    </div>
                    <h3 className="nextcv-serif text-2xl font-medium">Your preview starts here</h3>
                    <p className="mt-2 text-sm leading-6 text-[#66706B]">
                      Choose a resume, add the company and generate your cover letter to see the
                      finished document here.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-[#E3E2DC] pt-5 text-[11px] text-[#8A908B] sm:flex-row sm:items-center sm:justify-between">
            <p>NextCV · AI-powered career tools for job seekers.</p>
            <p>Build once. Apply with confidence.</p>
          </div>
        </main>
      </div>
      {isRedirecting && <RedirectToPayment />}
    </>
  );
}
