"use client";

import { useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";

export default function ResumeImport({ onBack, onImportComplete }) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = event => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setSuccess(false);

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please choose a PDF or DOCX resume.");
      return;
    }

    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("Your resume must be smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please choose your resume first.");
      return;
    }

    setIsParsing(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/resume/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "We couldn't read your resume. Please try again.");
      }

      setSuccess(true);
      console.log(data.resume);
      onImportComplete(data.resume);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong while reading your resume."
      );
    } finally {
      setIsParsing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setSuccess(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="mb-10 inline-flex items-center text-sm font-medium text-[#5B625C] transition hover:text-[#17201C]"
        >
          <ArrowLeft size={15} className="mr-1.5" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5268B6]">
            Import Resume
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#17201C]">
            Bring your resume to NextCV
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#5B625C]">
            Upload your existing resume and we&apos;ll organize your information into the NextCV
            builder automatically.
          </p>
        </div>

        {/* Upload box */}
        <div className="border border-[#E3E3DD] bg-white">
          {!file ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex min-h-56 w-full flex-col items-center justify-center border border-dashed border-[#CFCFC8] bg-[#F8F7F3] px-6 text-center transition hover:border-[#5268B6]"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-[#E3E3DD] bg-white">
                <Upload size={22} strokeWidth={1.7} className="text-[#344B93]" />
              </div>

              <h2 className="mt-5 text-base font-semibold text-[#17201C]">Upload your resume</h2>

              <p className="mt-1.5 text-sm text-[#646A64]">PDF or DOCX · Max 10 MB</p>

              <span className="mt-6 inline-flex items-center bg-[#344B93] px-5 py-2.5 text-sm font-semibold text-white">
                Choose file
              </span>
            </button>
          ) : (
            <div className="p-6">
              {/* Selected file */}
              <div className="border border-[#E3E3DD] bg-[#F8F7F3] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E3E3DD] bg-white">
                      <FileText size={18} className="text-[#344B93]" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#17201C]">{file.name}</p>
                      <p className="mt-0.5 text-xs text-[#646A64]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  {!isParsing && (
                    <button
                      type="button"
                      onClick={removeFile}
                      className="shrink-0 text-[#646A64] transition hover:text-[#17201C]"
                      aria-label="Remove resume"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              </div>

              {/* Ready state */}
              {!isParsing && !success && (
                <div className="mt-4 border border-[#E3E3DD] bg-[#F8F7F3] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#344B93]" />
                    <div>
                      <p className="text-sm font-semibold text-[#17201C]">Ready to import</p>
                      <p className="mt-1 text-sm leading-6 text-[#646A64]">
                        NextCV will read your resume and organize your details into the right
                        sections. You can review and edit everything afterward.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Parsing */}
              {isParsing && (
                <div className="mt-4 border border-[#E3E3DD] bg-[#F8F7F3] p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 size={17} className="shrink-0 animate-spin text-[#344B93]" />
                    <div>
                      <p className="text-sm font-semibold text-[#17201C]">Reading your resume...</p>
                      <p className="mt-0.5 text-xs text-[#646A64]">
                        Organizing your information for the NextCV builder.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mt-4 border border-[#D8E5DC] bg-[#F3F8F4] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-700" />
                    <div>
                      <p className="text-sm font-semibold text-[#17201C]">Import successful</p>
                      <p className="mt-1 text-sm leading-6 text-[#646A64]">
                        Your information has been added to the NextCV builder. Review and edit it
                        before finishing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue button */}
              {!success && (
                <button
                  type="button"
                  disabled={isParsing}
                  onClick={handleImport}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center bg-[#344B93] px-6 text-sm font-semibold text-white transition hover:bg-[#2D4181] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isParsing ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Reading resume...
                    </>
                  ) : (
                    <>
                      Continue with this resume
                      <span className="ml-2">→</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error */}
        {error && (
          <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-[#8A8F89]">
          Your original file won&apos;t be changed. You&apos;ll be able to edit all imported
          information before downloading your final resume.
        </p>
      </div>
    </div>
  );
}
