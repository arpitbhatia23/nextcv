import { parseResumeText } from "../src/modules/resume/services/importResumeParser.js";

const sampleInput = `
ADD PROJECT
e.g. Portfolio Site
e.g. Lead

--------- ----
e.g. React, Tailwind
https://github.com/...
Brief records...

Save Project
Portfolio Showcase

PROJECTS

School Management System (Team project with Aurpit)
Full Stack Developer(mern) @ freelancing | Dec 2024
Tech Mern ,Shadcn ,Tailwind ,Twillo
Developed School Management System (Team project with Aurpit) using Mern ,Shadcn ,Tailwind ,Twillo
Key features include: register student, student dashboard ,teacher dash-board, register teacher, manage fees, manage salary ,generate id card for student or teacher

Mysterious Messenger (Team Project with Aurpit)
Full Stack Developer(mern) @ Personal Project | Sep 2024
Tech: Mern ,Shadcn ,TailwindDeveloped Mysterious Messenger (Team Project with Aurpit) using Mern ,Shadcn ,Tailwind
Key features include: anonymous message sending ,no login required forsender , register and login for receiver, unique shareable message link,-real-time message delivery , message inbox for registered users ,delete-message, smooth UI/UX ,responsive design for all devices

Logistics Company Website (freelance with Aurpit)
Full Stack Developer(mern) @ Personal Project | Apr 2025
Tech: Mern ,Shadcn ,Tailwind ,SanityDeveloped Logistics Company Website (freelance with Aurpit) using Mern ,Shadcn ,Tailwind ,Sanity
`;

const result = parseResumeText(sampleInput);

console.log("=== PARSED RESULT ===");
console.log("Job Role:", result.jobRole);
console.log("Skills:", result.skills.map(s => s.name));
console.log("Projects Count:", result.projects.length);
console.log("\nPROJECT DETAILS:");
result.projects.forEach((p, idx) => {
  console.log(`\n--- Project ${idx + 1} ---`);
  console.log("Title:", p.title);
  console.log("Role/Type:", p.roleOrType);
  console.log("Date:", p.date);
  console.log("Tech:", p.technologiesOrTopics);
  console.log("Description bullets count:", p.description.length);
  console.log("Bullets:", p.description);
});

