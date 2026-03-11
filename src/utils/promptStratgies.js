import { date } from "zod";

const PromptStrategies = {
  education: ({
    degree = "",
    institution = "",
    startYear = "",
    endYear = "",
    grade = "",
    description,
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
- if description is add then enchance and generate built point from this 

Education details:
Degree: ${degree}
Institution: ${institution}
Duration: ${startYear} – ${endYear}
Grade: ${grade}
description:${description}

Example format:
• Completed coursework in ...
• Achieved ...
`,

  project: ({
    title = "",
    technologiesOrTopics = [],
    features = [],
    role = "",
    description = "",
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
- if description is add then enchance and generate built point from this 

Project details:
Title: ${title}
Tech Stack: ${technologiesOrTopics}
Key Features: ${features}
Role: ${role}
description:${description}

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
    description = "",
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
- if description is add then enchance and generate built point from this 

Experience details:
Role: ${position}
Company: ${companyName}
Duration: ${(startDate, "-", endDate)}
Responsibilities: ${work}
Tools & Technologies: ${tools}
description:${description}

Example format:
• Led ...
• Improved ...
`,

  summary: ({
    role = "",
    education = "",
    experience = "",
    project = "",
    summary,
  }) => `
Generate a highly personalized and professionally written resume summary in PLAIN TEXT.

STRICT OUTPUT RULES:
- Output ONLY 2–3 concise lines
- NO bullet symbols
- NO headings or labels
- NO markdown
- NO JSON
- NO quotes
- NO introductory phrases

CONTENT RULES:

1. If the candidate HAS professional experience:
   - Focus primarily on professional achievements, responsibilities, and impact
   - DO NOT mention education unless it is highly relevant
   - Emphasize expertise and real-world contributions

2. If the candidate has LITTLE or NO experience:
   - Focus on education, technical skills, and strong projects
   - Highlight projects that demonstrate real-world problem solving

3. If there are STRONG PROJECTS:
   - Briefly reference the most impressive or impactful project work
   - Emphasize practical skills and technologies used

4. The summary must:
   - Clearly reflect the candidate’s professional identity
   - Align experience, education, and projects with the target role
   - Highlight strengths, impact, and key technologies
   - Use confident, ATS-friendly language
   - Maintain a polished and professional tone

Candidate Information:
Target Role: ${role}
Experience: ${experience}
Education: ${education}
Projects: ${project}
summary:${summary}
`,
};

export { PromptStrategies };
