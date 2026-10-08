export function Tips({ section }) {
  const tips = {
    education: [
      "Include marks or CGPA if good",
      "Add at least 2 entries (10th, 12th, Graduation) if you don’t have experience",
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
    <div className="mt-5 border border-[#E3E3DD] bg-white/60 px-5 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-base">💡</span>

        <h3 className="text-sm font-semibold tracking-tight text-[#17201C]">
          Tips for this section
        </h3>
      </div>

      {sectionTips?.length ? (
        <ul className="space-y-3">
          {sectionTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 text-sm leading-6 text-[#5B625C]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#E3E3DD] bg-[#F8F7F3] text-[10px] font-semibold text-[#465B9E]">
                {index + 1}
              </span>

              <span>{tip}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#8A908A]">No tips available for this section.</p>
      )}
    </div>
  );
}
