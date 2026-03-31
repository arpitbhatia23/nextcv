export const flow = [
  { key: "fullName", q: "What is your full name?" },
  { key: "email", q: "What is your email address?" },
  { key: "phone", q: "What is your phone number?" },
  { key: "address", q: "What is your current address?" },
  { key: "jobRole", q: "What job role are you targeting?" },
  { key: "github", q: "What is your github link (optional)" },
  { key: "portfolio", q: "What is your portfolio link (optional)" },

  {
    key: "experience",
    type: "repeatable",
    q: "Do you have any work experience?",
    fields: [
      { key: "companyName", q: "Company name" },
      { key: "position", q: "Job title / Position" },
      { key: "duration", q: "Employment duration (e.g., Jan 2022 – Mar 2024)" },
      { key: "responsibilities", q: "Key responsibilities and achievements" },
    ],
  },
  {
    key: "projects",
    type: "repeatable",
    q: "Have you worked on any projects?",
    fields: [
      { key: "name", q: "Project name" },
      { key: "description", q: "Project description" },
      { key: "tech", q: "Technologies used" },
      { key: "duration", q: "Project duration" },
      { key: "github", q: "GitHub repository link (optional)" },
      { key: "live", q: "Live project link (optional)" },
    ],
  },
  {
    key: "education",
    type: "repeatable",
    q: "Would you like to add your education details?",
    fields: [
      { key: "degree", q: "Qualification / Degree" },
      { key: "institution", q: "Institution name" },
      { key: "grade", q: "What grades or marks did you achieve?" },

      { key: "year", q: "Duration (e.g., June 2021 – May 2024)" },
    ],
  },
  { key: "skills", q: "List your skills (comma-separated)" },
  {
    key: "certificate",
    type: "repeatable",
    q: "Do you have any certifications?",
    fields: [
      { key: "title", q: "Certificate title" },
      { key: "organization", q: "Issuing organization" },
      { key: "year", q: "Year of completion" },
      { key: "url", q: "Certificate URL (optional)" },
    ],
  },
];
