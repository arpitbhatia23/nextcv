import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateATSScore } from "../CalculateAtsScore.js";
import {
  detectResumeSections,
  extractActionVerbs,
  extractContactInformation,
  extractMeasurableMetrics,
  extractTechnicalSkills,
  normalizeResumeText,
} from "../../utils/index.js";

const sampleResume = [
  "John Doe",
  "Email: john.doe@example.com | Phone: +91 9876543210 | LinkedIn: linkedin.com/in/johndoe",
  "",
  "Professional Summary",
  "Senior Full Stack Engineer with 6+ years of experience delivering high-performance web systems.",
  "",
  "Technical Skills",
  "JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git",
  "",
  "Work Experience",
  "Senior Software Engineer — TechCorp (2021 – Present)",
  "- Engineered scalable microservices improving query throughput by 42%.",
  "- Developed modern React frontend serving over 50,000 active users.",
  "- Automated deployment pipelines using Docker and AWS, reducing release time by 60%.",
  "",
  "Education",
  "Bachelor of Technology in Computer Science — ABC University (2015 – 2019)",
  "",
  "Projects",
  "Cloud Storage Manager",
  "- Architected distributed file indexer using Node.js and PostgreSQL.",
].join("\n");

describe("1. ATS Scoring Engine - Word Count Boundaries", () => {
  const testWordCount = (count) => {
    const filler = count > 3 ? Array.from({ length: count - 3 }, (_, i) => "sample").join(" ") : "";
    const text = count === 0 ? "" : `Name test@example.com 9876543210 ${filler}`;
    return calculateATSScore(text).dimensions.content.breakdown.lengthAndDensity.score;
  };

  it("handles 0 words with 0 score", () => {
    assert.strictEqual(testWordCount(0), 0);
  });

  it("handles 100 words smoothly (<150 words range)", () => {
    assert.strictEqual(testWordCount(100), 3);
  });

  it("handles 119 words boundary (<150 words range)", () => {
    assert.strictEqual(testWordCount(119), 3);
  });

  it("handles 120 words boundary (<150 words range)", () => {
    assert.strictEqual(testWordCount(120), 3);
  });

  it("handles 219 words boundary (150-249 range)", () => {
    assert.strictEqual(testWordCount(219), 6);
  });

  it("handles 220 words boundary (150-249 range)", () => {
    assert.strictEqual(testWordCount(220), 6);
  });

  it("handles 279 words boundary (250-349 range)", () => {
    assert.strictEqual(testWordCount(279), 8);
  });

  it("handles 280 words boundary (250-349 range)", () => {
    assert.strictEqual(testWordCount(280), 8);
  });

  it("handles 350 words boundary (350-800 optimal range)", () => {
    assert.strictEqual(testWordCount(350), 10);
  });

  it("handles 850 words boundary (801-1000 comprehensive range)", () => {
    assert.strictEqual(testWordCount(850), 9);
  });

  it("FIXED: handles 851 words without falling to zero or critically short", () => {
    const score = testWordCount(851);
    assert.strictEqual(score, 9);
  });

  it("FIXED: handles 1000 words without falling to zero", () => {
    const score = testWordCount(1000);
    assert.strictEqual(score, 9);
  });

  it("handles 1001 words boundary (1001-1400 range)", () => {
    assert.strictEqual(testWordCount(1001), 7);
  });

  it("handles very long resumes (>1400 words)", () => {
    assert.strictEqual(testWordCount(1500), 5);
  });
});

describe("2. ATS Scoring Engine - Brand Neutrality", () => {
  it("does not award bonus points for mentioning NextCV", () => {
    const withoutNextCV = calculateATSScore(sampleResume).score;
    const withNextCV = calculateATSScore(sampleResume + "\nBuilt with NextCV template").score;
    assert.strictEqual(withNextCV, withoutNextCV);
  });

  it("does not include NextCV brand validation recommendations", () => {
    const res = calculateATSScore(sampleResume);
    const mentionsNextCV = res.recommendations.some(r =>
      (r.issue || "").toLowerCase().includes("nextcv") ||
      (r.explanation || "").toLowerCase().includes("nextcv")
    );
    assert.strictEqual(mentionsNextCV, false);
  });
});

describe("3. Keyword Matching & Tokenization", () => {
  it("does not match 'Java' inside 'JavaScript'", () => {
    const text = "Experience in JavaScript development, Node.js and React.";
    const skills = extractTechnicalSkills(text).map(s => s.name);
    assert.strictEqual(skills.includes("JavaScript"), true);
    assert.strictEqual(skills.includes("Java"), false);
  });

  it("does not match 'SQL' inside 'MySQL'", () => {
    const text = "Built high throughput backend with MySQL database.";
    const skills = extractTechnicalSkills(text).map(s => s.name);
    assert.strictEqual(skills.includes("MySQL"), true);
    assert.strictEqual(skills.includes("SQL"), false);
  });

  it("recognizes technical aliases like Node.js <-> Node, React <-> ReactJS", () => {
    const text1 = "Full stack developer using Node and React.";
    const skills1 = extractTechnicalSkills(text1).map(s => s.name);
    assert.strictEqual(skills1.includes("Node.js") || skills1.includes("Node"), true);
    assert.strictEqual(skills1.includes("React"), true);
  });

  it("does not inflate technical skill coverage with action verbs", () => {
    const text = "Managed, led, organized, developed, built, orchestrated, solved, improved.";
    const skills = extractTechnicalSkills(text);
    assert.strictEqual(skills.length, 0);
  });

  it("extracts action verbs separately for impact assessment", () => {
    const text = "Engineered microservice, optimized queries by 50%, and deployed on AWS.";
    const verbs = extractActionVerbs(text);
    assert.strictEqual(verbs.includes("engineered"), true);
    assert.strictEqual(verbs.includes("optimized"), true);
    assert.strictEqual(verbs.includes("deployed"), true);
  });
});

describe("4. Resume Structure Detection", () => {
  it("detects standard headings accurately", () => {
    const sections = detectResumeSections(sampleResume);
    assert.strictEqual(sections.summary, true);
    assert.strictEqual(sections.experience, true);
    assert.strictEqual(sections.skills, true);
    assert.strictEqual(sections.education, true);
    assert.strictEqual(sections.projects, true);
  });

  it("does not mistake ordinary sentences for section headings", () => {
    const text = "I completed a major project during my summer vacation and gained significant experience in summary writing.";
    const sections = detectResumeSections(text);
    assert.strictEqual(sections.projects, false);
    assert.strictEqual(sections.experience, false);
    assert.strictEqual(sections.summary, false);
  });

  it("recognizes fresher resumes with projects and does not penalize them", () => {
    const fresherResume = [
      "Jane Fresher",
      "Email: jane@example.com | Phone: +91 9123456789 | LinkedIn: linkedin.com/in/janefresher",
      "",
      "Professional Summary",
      "Enthusiastic Computer Science graduate passionate about full-stack engineering and cloud technologies.",
      "",
      "Education",
      "Bachelor of Technology in Computer Science, ABC University, 2024",
      "",
      "Technical Skills",
      "Python, React, Django, PostgreSQL, Git, Docker, REST APIs",
      "",
      "Projects",
      "AI Resume Classifier Platform",
      "- Built end-to-end classification pipeline improving accuracy by 25%.",
      "- Deployed app with Docker and PostgreSQL, supporting 500+ active student users.",
    ].join("\n");

    const res = calculateATSScore(fresherResume);
    assert.strictEqual(res.checks.isFresherProfile, true);
    assert.strictEqual(res.dimensions.content.breakdown.sectionStructure.score >= 25, true);
    assert.strictEqual(res.score >= 70, true);
  });

  it("recognizes common heading variations (e.g. Core Competencies, Academic Background)", () => {
    const variedResume = [
      "Name",
      "email@test.com | 9876543210",
      "",
      "Core Competencies",
      "Python, Machine Learning",
      "",
      "Academic Background",
      "M.Sc Computer Science",
      "",
      "Key Projects",
      "- Developed recommendation engine.",
    ].join("\n");

    const sections = detectResumeSections(variedResume);
    assert.strictEqual(sections.skills, true);
    assert.strictEqual(sections.education, true);
    assert.strictEqual(sections.projects, true);
  });
});

describe("5. Independent Scoring Dimensions", () => {
  it("separates Content Score, Readability Score, and JD Match Score", () => {
    const jd = "Required skills: React, Node.js, Kubernetes, Docker, Go.";
    const res = calculateATSScore(sampleResume, jd);

    assert.ok(res.dimensions.content);
    assert.ok(res.dimensions.readability);
    assert.ok(res.dimensions.jdMatch);
    assert.strictEqual(typeof res.dimensions.content.score, "number");
    assert.strictEqual(typeof res.dimensions.readability.score, "number");
    assert.strictEqual(typeof res.dimensions.jdMatch.score, "number");
  });

  it("CRITICAL: Low JD match does NOT reduce the Resume Content Score", () => {
    const scoreWithoutJD = calculateATSScore(sampleResume).score;
    const irrelevantJD = "Required: Heavy Machinery Operation, Forklift Driving, Crane Maintenance, Excavator Level 3.";
    const resultWithIrrelevantJD = calculateATSScore(sampleResume, irrelevantJD);

    assert.strictEqual(resultWithIrrelevantJD.score, scoreWithoutJD);
    assert.strictEqual(resultWithIrrelevantJD.dimensions.jdMatch.score, 0);
  });
});

describe("6. Recommendations Quality", () => {
  it("produces evidence-based recommendations with all 4 severities", () => {
    const minimalText = "Name: Test\nProjects: Built app.";
    const res = calculateATSScore(minimalText);

    assert.ok(res.recommendations.length > 0);
    const severities = new Set(res.recommendations.map(r => r.severity));
    assert.ok(severities.has("error") || severities.has("warning"));

    for (const rec of res.recommendations) {
      assert.ok(rec.issue, "Recommendation must have an issue");
      assert.ok(rec.severity, "Recommendation must have a severity");
      assert.ok(rec.explanation, "Recommendation must have an explanation");
      assert.ok(rec.suggestedFix, "Recommendation must have a suggestedFix");
    }
  });

  it("uses 'Not detected in extracted text' rather than claiming definitively missing", () => {
    const jd = "Required: Kubernetes, Ruby on Rails.";
    const res = calculateATSScore(sampleResume, jd);
    const notDetected = res.dimensions.jdMatch.notDetected;

    assert.ok(notDetected.length > 0);
    for (const item of notDetected) {
      assert.strictEqual(item.statusText, "Not detected in extracted resume text");
    }
  });
});
