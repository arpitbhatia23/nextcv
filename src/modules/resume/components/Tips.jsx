export function Tips({ section }) {
  const tips = {
    education: [
      "Include marks or CGPA if good",
      "Add at least 2 entries (10th, 12th, Graduation)in education if you don’t have experience",
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

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm hover:shadow-md transition">
      <h3 className="mb-3 text-xl font-semibold text-gray-800 flex items-center gap-2">💡 Tips</h3>

      <ul className="space-y-2">
        {tips[section]?.map((tip, index) => (
          <li key={index} className="text-xl font-medium text-gray-600 flex items-start gap-2">
            <span>👉</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      {!tips[section] && <p className="text-sm text-gray-400">No tips available</p>}
    </div>
  );
}
