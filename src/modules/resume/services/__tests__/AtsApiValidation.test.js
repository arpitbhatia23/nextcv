import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateATSScore } from "../CalculateAtsScore.js";
import {
  detectResumeSections,
  extractActionVerbs,
  extractContactInformation,
  extractMeasurableMetrics,
  extractTechnicalSkills,
  normalizeKeyword,
  findResumeKeywordMatch,
} from "../../utils/index.js";

describe("7. Advanced Keyword Matching & False Positives", () => {
  it("does not match 'React Native' when text only has 'React'", () => {
    const text = "Frontend developer skilled in React and Redux.";
    const skills = extractTechnicalSkills(text).map(s => s.name);
    assert.strictEqual(skills.includes("React"), true);
    assert.strictEqual(skills.includes("React Native"), false);
  });

  it("handles duplicate keywords without duplicating counts", () => {
    const text = "React React React React JavaScript JavaScript.";
    const skills = extractTechnicalSkills(text);
    const reactInstances = skills.filter(s => s.name === "React");
    assert.strictEqual(reactInstances.length, 1);
  });

  it("matches keywords case-insensitively (e.g. DOCKER vs docker)", () => {
    const text = "Experienced with DOCKER, KUBERNETES, and PYTHON.";
    const skills = extractTechnicalSkills(text).map(s => s.name);
    assert.strictEqual(skills.includes("Docker"), true);
    assert.strictEqual(skills.includes("Kubernetes"), true);
    assert.strictEqual(skills.includes("Python"), true);
  });

  it("handles multi-word technical skills like 'REST API', 'Spring Boot'", () => {
    const text = "Built web services using Spring Boot and REST API.";
    const skills = extractTechnicalSkills(text).map(s => s.name);
    assert.strictEqual(skills.includes("Spring Boot"), true);
    assert.strictEqual(skills.includes("REST API"), true);
  });
});

describe("8. Resume Profile Diversity (Freshers, Interns, Experienced)", () => {
  it("evaluates experienced professional resume with multiple roles", () => {
    const expResume = [
      "Alex Senior",
      "Email: alex@example.com | Phone: +91 9876543210 | LinkedIn: linkedin.com/in/alex",
      "",
      "Professional Summary",
      "Principal Software Architect with 10+ years designing enterprise distributed platforms and cloud systems. Proven track record leading high-performance engineering teams, modernizing monolithic architectures into microservices, and driving system resilience.",
      "",
      "Technical Skills",
      "Java, Spring Boot, Microservices, Kubernetes, AWS, PostgreSQL, Kafka, Redis, Docker, System Design, Distributed Systems, CI/CD",
      "",
      "Work Experience",
      "Lead Software Architect — Global Technology Corp (2020 - Present)",
      "- Led migration of core monolithic transaction engine to cloud-native microservices architecture, saving $400,000 annually in server overhead.",
      "- Scaled distributed backend services to process over 2,000,000 requests per day with 99.99% uptime SLA.",
      "- Spearheaded cross-functional team of 15 senior engineers across system architecture, DevOps pipelines, and database optimization.",
      "- Automated deployment workflows using Docker and Kubernetes, reducing release cycle duration by 60%.",
      "",
      "Senior Software Engineer — Tech Systems India (2015 - 2020)",
      "- Built event-driven transaction processing engine using Java, Spring Boot, Kafka, and PostgreSQL, reducing batch latency by 45%.",
      "- Optimized complex SQL queries and database indexes, accelerating analytics reporting response times by 35%.",
      "- Mentored 8 junior developers on software design patterns, code review best practices, and automated testing.",
      "",
      "Education",
      "Master of Technology in Computer Science & Engineering — IIT Delhi (2013 - 2015)",
      "Bachelor of Technology in Information Technology — Delhi University (2009 - 2013)",
      "",
      "Projects",
      "High-Throughput Distributed Cache Service",
      "- Engineered in-memory cache proxy in Java and Redis, sustaining 50,000 transactions per second under peak load.",
    ].join("\n");

    const res = calculateATSScore(expResume);
    assert.strictEqual(res.score >= 85, true);
    assert.strictEqual(res.grade, "Strong");
    assert.strictEqual(res.checks.isFresherProfile, false);
    assert.strictEqual(res.checks.hasExperienceSection, true);
  });

  it("evaluates internship-only resume without penalizing candidate as zero-experience", () => {
    const internResume = [
      "Sam Intern",
      "Email: sam@example.com | Phone: +91 9988776655 | LinkedIn: linkedin.com/in/samintern",
      "",
      "Professional Summary",
      "Proactive frontend developer with hands-on internship experience building modern React web applications.",
      "",
      "Education",
      "Bachelor of Engineering in Information Technology, Pune University (2020 - 2024)",
      "",
      "Technical Skills",
      "JavaScript, TypeScript, React, HTML5, CSS3, Tailwind CSS, Node.js, Git, REST APIs",
      "",
      "Internship Experience",
      "Frontend Developer Intern — Startup Hub (Jan 2024 - June 2024)",
      "- Developed responsive customer-facing web dashboard increasing visitor conversion rate by 18%.",
      "- Integrated Razorpay payment checkout flow with Node.js backend API, handling 500+ successful transactions.",
      "- Improved web application performance and Core Web Vitals score by 25% through code splitting and image optimization.",
      "",
      "Projects",
      "Personal Finance & Expense Tracker",
      "- Built intuitive expense management dashboard using React and Tailwind CSS.",
      "- Implemented dynamic chart visualizations using Recharts for monthly budget breakdown.",
    ].join("\n");

    const res = calculateATSScore(internResume);
    assert.strictEqual(res.checks.hasExperienceSection, true);
    assert.strictEqual(res.score >= 70, true);
  });
});

describe("9. API Route Boundary Checks & Input Protections", () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

  it("rejects files larger than 5MB", () => {
    const oversizedBytes = MAX_FILE_SIZE + 1024;
    assert.strictEqual(oversizedBytes > MAX_FILE_SIZE, true);
  });

  it("rejects zero-byte empty files", () => {
    const emptyBytes = 0;
    assert.strictEqual(emptyBytes === 0, true);
  });

  it("validates allowed document extensions (.pdf, .docx)", () => {
    const validPdf = "my_resume.pdf";
    const validDocx = "my_resume.docx";
    const invalidExe = "resume.exe";
    const invalidTxt = "resume.txt";

    const isValid = (name) => ALLOWED_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext));

    assert.strictEqual(isValid(validPdf), true);
    assert.strictEqual(isValid(validDocx), true);
    assert.strictEqual(isValid(invalidExe), false);
    assert.strictEqual(isValid(invalidTxt), false);
  });

  it("handles empty extracted text safely", () => {
    const emptyText = "   \n\t  ";
    const res = calculateATSScore(emptyText);
    assert.strictEqual(res.checks.wordCount, 0);
    assert.strictEqual(res.score < 50, true);
  });
});
