"use client";

const tips = {
  education: [
    "Include marks or CGPA if they strengthen your profile.",
    "If you are a fresher, add your 10th, 12th, and graduation details.",
  ],

  experience: [
    "No work experience? Include internships, freelance work, or college projects.",
    "Start bullet points with action words like Built, Developed, or Managed.",
    "Highlight measurable results wherever possible.",
  ],

  skills: [
    "Include 5–6 relevant skills.",
    "Prioritize skills that match your target job.",
    "Avoid unrelated or overly basic skills.",
  ],

  projects: [
    "Projects are highly recommended if you lack work experience.",
    "For tech roles, showcase 2–3 strong projects.",
    "For non-tech roles, consider case studies, research, or relevant work.",
  ],

  certificate: [
    "Include certifications that strengthen your profile.",
    "Mention the course name, platform, and completion date.",
    "Prioritize certifications relevant to your target role.",
  ],

  review: [
    "Imported a resume? Verify your name, email, and phone number.",
    "Check spelling, grammar, dates, and contact details.",
    "Ensure your resume matches the job role and the PDF preview looks correct.",
  ],
};

const sectionTitles = {
  education: "Education tips",
  experience: "Experience tips",
  skills: "Skills tips",
  projects: "Project tips",
  certificate: "Certification tips",
  review: "Final review checklist",
};

export function Tips({ section }) {
  const sectionTips = tips[section];
  const isReview = section === "review";

  return (
    <div className="mt-4 space-y-3">
      {/* Verification notice — review section only */}
      {isReview && (
        <div className="relative overflow-hidden border border-[#C9D8C7] bg-[#F1F5EF] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#DCE8D9] text-[#344B38]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#344B38]">
                One final check before downloading
              </p>

              <p className="mt-1 text-xs leading-5 text-[#596B59]">
                Review your personal details and resume content to make sure everything is accurate
                and ready to share.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips card */}
      <div className="border border-[#E3E2DC] bg-white">
        <div className="flex items-center justify-between border-b border-[#E8E7E1] px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-[#17201C]">{sectionTitles[section]}</h3>

            <p className="mt-0.5 text-[11px] text-[#8A908B]">
              {isReview
                ? "A quick checklist for a polished resume"
                : "Make your resume stronger with these suggestions"}
            </p>
          </div>

          {/* <span className="text-[10px] font-medium tracking-wider text-[#8A908B]">
            {sectionTips?.length} TIPS
          </span> */}
        </div>

        <div className="space-y-0 px-4">
          {sectionTips?.map((tip, index) => (
            <div
              key={`${section}-${index}`}
              className={`flex items-start gap-3 py-3 ${
                index !== sectionTips?.length - 1 ? "border-b border-[#F0EFEA]" : ""
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#DCE4D8] bg-[#F5F7F2] text-[10px] font-semibold text-[#456B4A]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="pt-0.5 text-[13px] leading-[1.65] text-[#5B625C]">{tip}</p>
            </div>
          ))}
        </div>

        {isReview && (
          <div className="border-t border-[#E8E7E1] bg-[#F8F7F3] px-4 py-2.5">
            <p className="text-[10px] tracking-wide text-[#737A72]">
              TAKE A MOMENT TO REVIEW BEFORE YOU DOWNLOAD.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
