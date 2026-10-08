import { parseResumeText } from "../src/modules/resume/services/importResumeParser.js";

const sampleInput2 = `
AURPIT BHATIA
Full Stack Developer — Next CV May 2025 – Present
aurpitaurpit@gmail.com | 8628047655 | React, Node | https://github.com/arpitbhatia23 | https://www.linkedin.com/in/aurpit-bhatia/

SUMMARY
Full Stack MERN Developer with 1+ year of hands-on experience building production-ready web applications, AI-powered Saa S products, and open-source developer tools. Creator of Next CV (1000+ users, 40+ paid customers) and Exon-CLI (4,700+ npm downloads). Experienced in Next.js, React, Node.js, Type Script, Mongo DB, Redis, REST APIs, Authentication, AI Integrations, and Payment Systems.

EDUCATION
BCA (GPA: 7.12)
• Maintained a 7.12 GPA while completing a Bachelor of Computer Applications degree
• Gained practical experience through various BCA coursework projects.

CERTIFICATES & COURSES
5 Day AI Agents Intensive Course with Google
Kaggle (Dec 2025)
Frontend Developer (React)
Hacker Rank (Nov 2025)
Java Script (Intermediate)
Hacker Rank (Nov 2025)
Problem Solving (Intermediate)
Hacker Rank (Jan 2024)
Introduction to Generative AI
Google Cloud (Sep 2025)
Responsible AI: Applying AI Principles with Google Cloud
Google Cloud (Sep 2025)
IBM Skills Build Summer Internship Program
IBM (Aug 2024)

Next CV Resume Optimized
https://www.linkedin.com/in/aurpit-bhatia/
https://github.com/arpitbhatia23
https://aurpitportfolio.vercel.app/
`;

const result = parseResumeText(sampleInput2);

console.log("=== PARSED RESULT 2 ===");
console.log("Name:", result.name);
console.log("Job Role:", result.jobRole);
console.log("Address:", result.address);
console.log("Email:", result.email);
console.log("Phone:", result.phone_no);
console.log("LinkedIn:", result.linkedin);
console.log("GitHub:", result.github);
console.log("Portfolio:", result.portfolio);
console.log("\nEducation Count:", result.education.length);
console.log("Education Items:", JSON.stringify(result.education, null, 2));
console.log("\nCertificates Count:", result.certificates.length);
console.log("Certificates Items:", JSON.stringify(result.certificates, null, 2));

