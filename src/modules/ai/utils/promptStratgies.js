const bulletRules = `
Return ONLY 2-3 resume bullets.
Each line must start with "•".
No intro, headings, labels, markdown, JSON, quotes, or extra text.
Use strong resume language.
Use only provided details.
Improve existing description professionally.
Use ATS keywords only when relevant and truthful.
Do not invent skills, tools, metrics, certifications, or achievements.
`;

const summaryRules = `
Return ONLY 2-3 concise resume summary lines.
No bullets, intro, headings, markdown, JSON, quotes, or extra text.
Make it personalized for the target role.
Use only provided details.
Use ATS keywords only when relevant and truthful.
If experience exists, focus on experience.
If experience is weak, focus on education, skills, and projects.
Do not invent skills, tools, metrics, certifications, or achievements.
`;

const skillRules = `
Return ONLY skill names.
One skill per line.
No bullets, numbering, intro, headings, markdown, JSON, or extra text.
Generate 6-10 relevant skills.
Use ATS keywords only when relevant and truthful.
Avoid duplicates and existing skills.
Do not invent unrelated skills.
`;

const clean = value => String(value ?? "").trim();

const list = value => {
  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean).join(", ");
  }

  return clean(value);
};

const compactFields = fields =>
  Object.entries(fields)
    .filter(([, value]) => clean(value))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

const atsContext = (value = "") => {
  const text = clean(value);

  return text ? `ATS Keywords: ${text.slice(0, 700)}` : "";
};

const PromptStrategies = {
  education: ({
    degree = "",
    institution = "",
    startYear = "",
    endYear = "",
    grade = "",
    description = "",
  }) => `
${bulletRules}

Education:
${compactFields({
  Degree: clean(degree),
  Institution: clean(institution),
  Duration: [clean(startYear), clean(endYear)].filter(Boolean).join(" to "),
  Grade: clean(grade),
  Description: clean(description),
})}
`,

  project: ({
    title = "",
    technologiesOrTopics = [],
    features = [],
    role = "",
    description = "",
    atsKeywords = "",
  }) => `
${bulletRules}
${atsContext(atsKeywords)}

Project:
${compactFields({
  Title: clean(title),
  Role: clean(role),
  Tech: list(technologiesOrTopics),
  Features: list(features),
  Description: clean(description),
})}
`,

  experience: ({
    position = "",
    companyName = "",
    startDate = "",
    endDate = "",
    work = [],
    tools = [],
    description = "",
    atsKeywords = "",
  }) => `
${bulletRules}
Focus on impact, work done, tools used, and results.
${atsContext(atsKeywords)}

Experience:
${compactFields({
  Role: clean(position),
  Company: clean(companyName),
  Duration: [clean(startDate), clean(endDate)].filter(Boolean).join(" to "),
  Work: list(work),
  Tools: list(tools),
  Description: clean(description),
})}
`,

  summary: ({
    role = "",
    education = "",
    experience = "",
    projects = "",
    skills = "",
    summary = "",
    atsKeywords = "",
  }) => `
${summaryRules}
${atsContext(atsKeywords)}

Candidate:
${compactFields({
  TargetRole: clean(role),
  Skills: list(skills),
  Experience: list(experience),
  Education: list(education),
  Projects: list(projects),
  Notes: clean(summary),
})}
`,

  skills: ({ role = "", existingSkills = [], atsKeywords = "" }) => `
${skillRules}

Candidate:
${compactFields({
  TargetRole: clean(role),
  ExistingSkills: list(existingSkills),
  ATSKeywords: clean(atsKeywords).slice(0, 700),
})}
`,
};
const extractJobKeywordsPrompt = `
Return ONLY comma-separated ATS keywords.
No intro. No headings. No JSON.
Extract 15-30 important skills, tools, technologies, role terms, and responsibilities.
Do not invent anything.

Job Description:
`;
export { PromptStrategies, extractJobKeywordsPrompt };
