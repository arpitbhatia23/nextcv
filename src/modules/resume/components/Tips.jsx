export function Tips({ section }) {
  const tips = {
    education: [
      "Include marks or CGPA if good",
      "Add at least 2 entries (10th, 12th, Graduation) in education if you don’t have experience",
    ],

    experience: [
      "Don’t have work experience? Add college projects, internships, or freelance work to showcase your skills",
      "Use action words like Built, Developed, Managed",
      "Add impact (e.g. improved performance by 20%)",
    ],

    skills: [
      "Add at least 5–6 relevant skills",
      "Focus on skills that match the job you’re applying for",
      "Avoid listing too many unrelated or basic skills",
    ],

    projects: [
      "Projects are optional, but highly recommended if you don’t have work experience",
      "For tech roles, add 2–3 strong projects to showcase your skills",
      "For non-tech roles, you can add case studies, research, or relevant work",
    ],

    certificates: [
      "Add certifications that strengthen your profile",
      "Include course name, platform, and completion date",
      "Focus on certifications relevant to your target role",
    ],
  };

  const sectionTips = tips[section];

  return (
    <div className="mt-5 space-y-3">
      {/* Resume Verification Notice */}
      <div className="border border-[#E6D58A] bg-[#FFFBEA] px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-[#F4D35E] text-sm text-[#5C4B00]">
            ✓
          </span>

          <div>
            <p className="text-sm font-semibold text-[#3D3500]">Please verify your resume</p>

            <p className="mt-1 text-xs leading-5 text-[#6B6250]">
              Review your information carefully and make sure all details are correct before
              downloading or using your resume.
            </p>
          </div>
        </div>
      </div>

      {/* Section Tips */}
      <div className="border border-[#E3E3DD] bg-white px-5 py-4">
        <div className="mb-4 flex items-center gap-2 border-b border-[#E3E3DD] pb-3">
          <span className="text-sm">💡</span>

          <h3 className="text-sm font-semibold tracking-tight text-[#17201C]">Tips</h3>
        </div>

        {sectionTips?.length ? (
          <ul className="space-y-3">
            {sectionTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm leading-5 text-[#5B625C]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#D9D9D2] bg-[#F8F7F3] text-[10px] font-semibold text-[#465B9E]">
                  {index + 1}
                </span>

                <span>{tip}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#8A908A]">No tips available.</p>
        )}
      </div>
    </div>
  );
}
