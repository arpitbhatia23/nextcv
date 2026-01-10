import { date } from "zod";

const PromptStrategies = {
  education: ({
    degree = "",
    institution = "",
    startYear = "",
    endYear = "",
    grade = "",
  }) => `
Generate 2–3 resume bullet points ONLY.

STRICT RULES:
- Output ONLY bullet points
- NO introduction sentence
- NO headings or labels
- NO explanations
- NO markdown
- NO JSON or arrays
- Each line MUST start with "•"
- If anything else is added, the response is INVALID

Education details:
Degree: ${degree}
Institution: ${institution}
Duration: ${startYear} – ${endYear}
Grade: ${grade}

Example format:
• Completed coursework in ...
• Achieved ...
`,

  project: ({
    title = "",
    technologiesOrTopics = [],
    features = [],
    role = "",
  }) => `
Generate 2–3 resume bullet points ONLY.

STRICT RULES:
- Output ONLY bullet points
- NO introduction sentence
- NO headings or labels
- NO explanations
- NO markdown
- NO JSON or arrays
- Each line MUST start with "•"
- If anything else is added, the response is INVALID

Project details:
Title: ${title}
Tech Stack: ${technologiesOrTopics}
Key Features: ${features}
Role: ${role}

Example format:
• Built ...
• Implemented ...
`,

  experience: ({
    position = "",
    companyName = "",
    startDate = "",
    endDate,
    work = [],
    tools = [],
  }) => `
Generate 2–3 resume bullet points ONLY.

STRICT RULES:
- Output ONLY bullet points
- NO introduction sentence
- NO headings or labels
- NO explanations
- NO markdown
- NO JSON or arrays
- Each line MUST start with "•"
- If anything else is added, the response is INVALID

Experience details:
Role: ${position}
Company: ${companyName}
Duration: ${(startDate, "-", endDate)}
Responsibilities: ${work}
Tools & Technologies: ${tools}

Example format:
• Led ...
• Improved ...
`,

  summary: ({ role = "", education = "", experience = "" }) => `
Generate a professional resume summary in PLAIN TEXT.

STRICT RULES:
- Output ONLY 2–3 concise lines
- NO bullet symbols
- NO introduction sentence
- NO headings or labels
- NO markdown
- NO JSON
- NO quotes

Professional Title: ${role}
Experience: ${experience}
education: ${education}
`,
};

export { PromptStrategies };
