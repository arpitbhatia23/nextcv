import keywordDatabase from "../data/keywordData.json";
export function calculateATSScore(text, jobDescription = "") {
  const recommendations = [];

  const normalizedText = normalizeResumeText(text);
  const lowerText = normalizedText.toLowerCase();

  // JD keyword-gap analysis runs ONLY when a job description is provided.
  const hasJobDescription = Boolean(typeof jobDescription === "string" && jobDescription.trim());

  const jdKeywordGap = hasJobDescription
    ? analyzeJDKeywordGap(normalizedText, jobDescription)
    : null;

  const isNextCV = lowerText.includes("nextcv");

  const words = normalizedText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

  const linkedinUrlRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+/i;

  const githubUrlRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9-_%]+/i;

  const portfolioUrlRegex =
    /(?:https?:\/\/)?(?:www\.)?(?!gmail\.com)(?!linkedin\.com)(?!github\.com)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/i;

  const hasEmail = emailRegex.test(normalizedText);
  const phone = extractIndianPhone(normalizedText);
  const hasPhone = Boolean(phone);

  const hasLinkedIn = linkedinUrlRegex.test(normalizedText);
  const hasGithub = githubUrlRegex.test(normalizedText);
  const hasPortfolio = portfolioUrlRegex.test(normalizedText);

  const hasLinkedInLabel = /\blinkedin\b/i.test(normalizedText);
  const hasGithubLabel = /\bgithub\b/i.test(normalizedText);
  const hasPortfolioLabel = /\bportfolio\b/i.test(normalizedText);

  const hasProfileSignal =
    hasLinkedIn ||
    hasGithub ||
    hasPortfolio ||
    hasLinkedInLabel ||
    hasGithubLabel ||
    hasPortfolioLabel;

  /* ---------------------------- 1. LENGTH SCORE: 15 ---------------------------- */

  let contentScore = 0;

  if (wordCount >= 350 && wordCount <= 850) {
    contentScore = 15;
  } else if (wordCount >= 280 && wordCount < 350) {
    contentScore = 12;
    recommendations.push({
      type: "info",
      title: "Resume Length",
      message:
        "Your resume is slightly short. Add stronger achievements, project impact, and measurable results.",
    });
  } else if (wordCount >= 220 && wordCount < 280) {
    contentScore = 9;
    recommendations.push({
      type: "warning",
      title: "Resume Length",
      message:
        "Resume is short. Add more project details, internship/training points, and quantified achievements.",
    });
  } else if (wordCount >= 120 && wordCount < 220) {
    contentScore = 5;
    recommendations.push({
      type: "warning",
      title: "Resume Length",
      message:
        "Resume content is too short. ATS systems may not find enough skills, experience, and impact.",
    });
  } else if (wordCount > 0) {
    contentScore = 2;
    recommendations.push({
      type: "warning",
      title: "Resume Length",
      message:
        "Resume is critically short. Add summary, skills, projects, education, and experience/training sections.",
    });
  }

  if (wordCount > 1000) {
    contentScore = 9;
    recommendations.push({
      type: "warning",
      title: "Resume Length",
      message: "Resume is too long. Keep it concise and focus on high-impact achievements.",
    });
  }

  /* ---------------------------- 2. SECTION SCORE: 30 ---------------------------- */

  const sections = {
    summary: ["summary", "objective", "profile", "career objective", "professional summary"],

    education: [
      "education",
      "academic",
      "qualification",
      "qualifications",
      "degree",
      "university",
      "college",
    ],

    skills: ["skills", "technical skills", "technologies", "tools", "core skills"],

    projects: ["projects", "project", "academic project", "personal project"],

    experience: [
      "experience",
      "work experience",
      "professional experience",
      "employment",
      "internship",
      "training",
      "freelance",
      "industrial training",
    ],
  };

  const foundSectionMap = {};

  Object.entries(sections).forEach(([key, variations]) => {
    foundSectionMap[key] = variations.some(v => lowerText.includes(v));
  });

  let foundSectionsCount = Object.values(foundSectionMap).filter(Boolean).length;

  Object.entries(foundSectionMap).forEach(([key, found]) => {
    if (found) return;

    if (key === "experience" && foundSectionMap.projects) {
      recommendations.push({
        type: "warning",
        title: "Experience Section",
        message:
          "Add Internship, Training, Freelance, or Experience section if applicable. Projects help, but experience/training improves ATS strength.",
      });

      return;
    }

    recommendations.push({
      type: "warning",
      title: `Missing Section: ${capitalize(key)}`,
      message: `Add a clear ${key} section heading so ATS systems can parse your resume correctly.`,
    });
  });

  if (hasEmail && hasPhone) {
    foundSectionsCount += 1;
  } else {
    recommendations.push({
      type: "warning",
      title: "Contact Details Missing",
      message: "Add a clearly visible email and Indian mobile number at the top of your resume.",
    });
  }

  const sectionScore = Math.min((foundSectionsCount / 6) * 30, 30);

  /* ---------------------------- 3. CONTACT SCORE: 15 ---------------------------- */

  let contactScore = 0;

  if (hasEmail) contactScore += 7.5;
  if (hasPhone) contactScore += 7.5;

  if (hasProfileSignal) {
    contactScore = Math.min(contactScore + 2, 15);
  }

  if (!hasEmail || !hasPhone) {
    recommendations.push({
      type: "warning",
      title: "Contact Information",
      message: "Email and phone are mandatory for a strong ATS-compatible resume.",
    });
  }

  if (
    hasEmail &&
    hasPhone &&
    (hasLinkedInLabel || hasGithubLabel || hasPortfolioLabel) &&
    !hasLinkedIn &&
    !hasGithub &&
    !hasPortfolio
  ) {
    recommendations.push({
      type: "info",
      title: "Profile Links",
      message:
        "Profile labels were detected. Hidden icon links are okay, but visible URLs improve compatibility with older ATS systems.",
    });
  }

  /* ---------------------------- 4. KEYWORD SCORE: 40 ---------------------------- */

  const actionVerbs = [
    "developed",
    "built",
    "created",
    "implemented",
    "designed",
    "optimized",
    "improved",
    "managed",
    "led",
    "integrated",
    "deployed",
    "automated",
    "engineered",
    "launched",
    "maintained",
    "collaborated",
  ];

  const techKeywords = [
    "javascript",
    "react",
    "node",
    "node.js",
    "express",
    "mongodb",
    "mysql",
    "sql",
    "python",
    "java",
    "typescript",
    "next.js",
    "tailwind",
    "redux",
    "zustand",
    "api",
    "rest api",
    "git",
    "github",
    "docker",
    "aws",
    "authentication",
    "payment",
    "database",
  ];

  let keywordHits = 0;

  [...actionVerbs, ...techKeywords].forEach(kw => {
    if (lowerText.includes(kw)) keywordHits++;
  });

  const keywordScore = Math.min((keywordHits / 18) * 40, 40);

  /* ---------------------------- BASE SCORE ---------------------------- */

  const baseScore = contentScore + sectionScore + contactScore + keywordScore;

  let totalScore = baseScore;

  if (isNextCV) {
    totalScore = baseScore + 5;

    recommendations.unshift({
      type: "success",
      title: "Template Verified",
      message:
        "NextCV template detected. Template structure gives a small ATS-format bonus, but content quality still controls the final score.",
    });
  } else {
    recommendations.push({
      type: "info",
      title: "Template Optimization",
      message: "Use a clean ATS-friendly template to improve parsing consistency.",
    });
  }

  /* ---------------------------- STRICT HARD CAPS ---------------------------- */

  const hasCriticalLengthIssue = wordCount < 120;

  const hasVeryShortResume = wordCount >= 120 && wordCount < 220;

  const hasShortResume = wordCount >= 220 && wordCount < 280;

  const hasMissingContact = !hasEmail || !hasPhone;

  const hasExperienceSection = foundSectionMap.experience;

  const hasProjectsSection = foundSectionMap.projects;

  const hasSkillsSection = foundSectionMap.skills;

  const hasEducationSection = foundSectionMap.education;

  const hasSummarySection = foundSectionMap.summary;

  const hasMissingExperienceAndProjects = !hasExperienceSection && !hasProjectsSection;

  const hasPoorSectionCoverage = foundSectionsCount <= 3;

  const hasWeakCoreSections = !hasSkillsSection || !hasEducationSection || !hasSummarySection;

  // 100-word NextCV resume should never get 90+
  if (hasCriticalLengthIssue) {
    totalScore = Math.min(totalScore, 55);
  }

  if (hasVeryShortResume) {
    totalScore = Math.min(totalScore, 65);
  }

  if (hasShortResume) {
    totalScore = Math.min(totalScore, 76);
  }

  if (hasMissingExperienceAndProjects) {
    totalScore = Math.min(totalScore, 68);
  }

  if (!hasExperienceSection && hasProjectsSection) {
    totalScore = Math.min(totalScore, 82);
  }

  if (hasPoorSectionCoverage) {
    totalScore = Math.min(totalScore, 70);
  }

  if (hasWeakCoreSections) {
    totalScore = Math.min(totalScore, 78);
  }

  if (hasMissingContact) {
    totalScore = Math.min(totalScore, 72);
  }

  const seriousIssueCount = [
    hasCriticalLengthIssue,
    hasVeryShortResume,
    hasMissingExperienceAndProjects,
    hasPoorSectionCoverage,
    hasMissingContact,
    hasWeakCoreSections,
  ].filter(Boolean).length;

  if (seriousIssueCount >= 2) {
    totalScore = Math.min(totalScore, 64);
  }

  if (seriousIssueCount >= 3) {
    totalScore = Math.min(totalScore, 58);
  }

  totalScore = Math.max(0, Math.min(totalScore, 98));

  const score = Math.round(totalScore);

  const checks = {
    wordCount,
    hasEmail,
    hasPhone,
    phone,
    hasLinkedIn,
    hasGithub,
    hasPortfolio,
    hasProfileSignal,
    keywordHits,
    foundSectionsCount,
    hasExperienceSection,
    hasProjectsSection,
    hasCriticalLengthIssue,
    hasVeryShortResume,
    hasShortResume,
    seriousIssueCount,
    isNextCV,
    baseScore: Math.round(baseScore),
  };

  const result = {
    score,
    grade: getGrade(score),
    summary: getScoreSummary(score),
    recommendations: cleanRecommendations(score, recommendations, checks),
    checks,
  };

  // Do not change the existing response shape when no JD is supplied.
  if (hasJobDescription) {
    result.jdMatchScore = jdKeywordGap.score;
    result.keywordGap = jdKeywordGap;
  }

  return result;
}

/* ============================================================================
   JD KEYWORD GAP ANALYSIS

   Runs only when calculateATSScore(text, jobDescription)
   receives a JD.

   The existing generic ATS keyword scoring remains unchanged.
============================================================================ */

function normalizeKeyword(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[()[\]{}]/g, " ")
    .replace(/[._/-]/g, " ")
    .replace(/[^a-z0-9+# ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildKeywordDictionary() {
  const dictionary = new Map();

  // canonical_index contains the canonical job keywords from the JSON database.
  Object.entries(keywordDatabase.canonical_index || {}).forEach(([normalizedKeyword, data]) => {
    const canonical = data?.canonical_name || normalizedKeyword;

    dictionary.set(normalizeKeyword(canonical), {
      canonical,
      category: data?.category || "skill",
      jobFamily: data?.job_family || null,
    });
  });

  // Add aliases such as:
  // ReactJS -> React
  // TS -> TypeScript
  // K8s -> Kubernetes
  Object.entries(keywordDatabase.aliases || {}).forEach(([canonical, aliases]) => {
    const canonicalData = keywordDatabase.canonical_index?.[normalizeKeyword(canonical)] || {};

    const canonicalEntry = {
      canonical,
      category: canonicalData.category || "skill",
      jobFamily: canonicalData.job_family || null,
    };

    dictionary.set(normalizeKeyword(canonical), canonicalEntry);

    (Array.isArray(aliases) ? aliases : []).forEach(alias => {
      const normalizedAlias = normalizeKeyword(alias);

      if (normalizedAlias) {
        dictionary.set(normalizedAlias, {
          ...canonicalEntry,
          alias: true,
        });
      }
    });
  });

  return dictionary;
}

const JD_KEYWORD_DICTIONARY = buildKeywordDictionary();

function keywordExistsInText(keyword, text) {
  const normalizedKeyword = normalizeKeyword(keyword);

  const normalizedText = normalizeKeyword(text);

  if (!normalizedKeyword || !normalizedText) {
    return false;
  }

  const pattern = new RegExp(`(^|\\s)${escapeRegex(normalizedKeyword)}(?=$|\\s)`, "i");

  return pattern.test(normalizedText);
}

function getKeywordAliases(canonical) {
  const aliases = keywordDatabase.aliases?.[canonical];

  return [canonical, ...(Array.isArray(aliases) ? aliases : [])];
}

function findResumeKeywordMatch(canonical, resumeText) {
  const possibleMatches = getKeywordAliases(canonical);

  for (const candidate of possibleMatches) {
    if (keywordExistsInText(candidate, resumeText)) {
      return candidate;
    }
  }

  return null;
}

function getRequirementWeight(jdText, keyword) {
  const normalizedJD = String(jdText).toLowerCase();

  const normalizedKeyword = String(keyword).toLowerCase();

  const keywordIndex = normalizedJD.indexOf(normalizedKeyword);

  if (keywordIndex === -1) {
    return 1;
  }

  // Look around the keyword to determine
  // whether the JD explicitly presents it
  // as required, preferred, or optional.
  const contextStart = Math.max(0, keywordIndex - 140);

  const contextEnd = Math.min(normalizedJD.length, keywordIndex + normalizedKeyword.length + 140);

  const context = normalizedJD.slice(contextStart, contextEnd);

  if (
    /\b(required|required skill|required skills|must have|must-have|must|required to|essential|mandatory|minimum requirement|you must|need to have|strong experience in|proficient in|proficiency in)\b/i.test(
      context
    )
  ) {
    return 3;
  }

  if (
    /\b(preferred|preferred skill|preferred skills|preferably|should have|good to have|experience with|experience in|familiar with)\b/i.test(
      context
    )
  ) {
    return 2;
  }

  if (
    /\b(nice to have|nice-to-have|bonus|plus|added advantage|additional advantage|optional)\b/i.test(
      context
    )
  ) {
    return 1;
  }

  return 1;
}

function extractJDKeywords(jdText = "") {
  const rawJD = normalizeResumeText(jdText);

  const normalizedJD = normalizeKeyword(rawJD);

  if (!normalizedJD) {
    return [];
  }

  const found = new Map();

  JD_KEYWORD_DICTIONARY.forEach((data, dictionaryKeyword) => {
    if (!dictionaryKeyword) {
      return;
    }

    const pattern = new RegExp(`(^|\\s)${escapeRegex(dictionaryKeyword)}(?=$|\\s)`, "i");

    if (!pattern.test(normalizedJD)) {
      return;
    }

    const canonical = data.canonical;

    if (!found.has(canonical)) {
      found.set(canonical, {
        keyword: canonical,
        category: data.category,
        jobFamily: data.jobFamily,
        weight: getRequirementWeight(rawJD, canonical),
      });
    } else {
      // If an alias/canonical form occurs
      // in a stronger requirement context,
      // keep the higher weight.
      const existing = found.get(canonical);

      existing.weight = Math.max(existing.weight, getRequirementWeight(rawJD, canonical));
    }
  });

  return [...found.values()];
}

function analyzeJDKeywordGap(resumeText = "", jdText = "") {
  const jdKeywords = extractJDKeywords(jdText);

  if (!jdKeywords.length) {
    return {
      score: 0,
      totalKeywords: 0,
      matchedKeywords: 0,
      partialKeywords: 0,
      missingKeywords: 0,
      matched: [],
      partial: [],
      missing: [],
    };
  }

  const normalizedResume = normalizeKeyword(resumeText);

  const matched = [];
  const partial = [];
  const missing = [];

  for (const item of jdKeywords) {
    const matchedAs = findResumeKeywordMatch(item.keyword, normalizedResume);

    if (matchedAs) {
      matched.push({
        keyword: item.keyword,
        matchedAs,
        category: item.category,
        jobFamily: item.jobFamily,
        weight: item.weight,
      });

      continue;
    }

    // A simple partial match is useful
    // for multi-word skills.
    //
    // Example:
    // "Redux Toolkit" in JD
    // while "Redux" appears in resume.
    const keywordTokens = normalizeKeyword(item.keyword).split(" ").filter(Boolean);

    const matchedToken = keywordTokens.find(token => keywordExistsInText(token, normalizedResume));

    if (keywordTokens.length > 1 && matchedToken) {
      partial.push({
        keyword: item.keyword,
        matchedAs: matchedToken,
        category: item.category,
        jobFamily: item.jobFamily,
        weight: item.weight,
      });

      continue;
    }

    missing.push({
      keyword: item.keyword,
      category: item.category,
      jobFamily: item.jobFamily,
      weight: item.weight,
      importance: item.weight === 3 ? "required" : item.weight === 2 ? "preferred" : "nice_to_have",
    });
  }

  const totalWeight = jdKeywords.reduce((sum, item) => sum + item.weight, 0);

  // Full match = 100% of keyword weight.
  // Partial match = 50% of keyword weight.
  const earnedWeight =
    matched.reduce((sum, item) => sum + item.weight, 0) +
    partial.reduce((sum, item) => sum + item.weight * 0.5, 0);

  const score = totalWeight ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return {
    score,
    totalKeywords: jdKeywords.length,
    matchedKeywords: matched.length,
    partialKeywords: partial.length,
    missingKeywords: missing.length,
    matched,
    partial,
    missing,
  };
}

function normalizeResumeText(text = "") {
  return String(text)
    .replace(/\u0000/g, " ")
    .replace(/\r/g, "\n")
    .replace(/([a-z0-9.)])(?=(Email|Phone|Mobile|LinkedIn|GitHub|Portfolio)\b:?)/gi, "$1 ")
    .replace(/(LinkedIn)(?=GitHub|Portfolio)/gi, "$1 ")
    .replace(/(GitHub)(?=LinkedIn|Portfolio)/gi, "$1 ")
    .replace(/(Portfolio)(?=LinkedIn|GitHub)/gi, "$1 ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractIndianPhone(text = "") {
  const normalizedText = normalizeResumeText(text);

  const phoneRegex = /(?:^|[^\d])((?:\+91[\s-]?)?(?:0[\s-]?)?[6-9](?:[\s-]?\d){9})(?!\d)/;

  const match = normalizedText.match(phoneRegex);

  if (!match) {
    return null;
  }

  let digits = match[1].replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (/^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }

  return null;
}

function getGrade(score) {
  if (score >= 90) {
    return "Outstanding";
  }

  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 60) {
    return "Average";
  }

  return "Needs Work";
}

function getScoreSummary(score) {
  if (score >= 90) {
    return "Excellent ATS compatibility. Resume structure and content are strong.";
  }

  if (score >= 80) {
    return "Strong ATS compatibility. A few improvements can push it above 90.";
  }

  if (score >= 70) {
    return "Good ATS compatibility, but important content or sections can be improved.";
  }

  if (score >= 60) {
    return "Average ATS compatibility. Improve resume length, sections, and keywords before applying.";
  }

  return "Low ATS compatibility. Significant content and structure improvements are needed.";
}

function cleanRecommendations(score, recommendations, checks) {
  let finalRecommendations = recommendations;

  if (checks.hasEmail && checks.hasPhone) {
    finalRecommendations = finalRecommendations.filter(rec => {
      const title = rec.title?.toLowerCase() || "";

      return !title.includes("contact information");
    });
  }

  // Do not hide warnings when score is low/average.
  // If score is genuinely high, warnings can become info.
  if (score >= 90) {
    finalRecommendations = finalRecommendations.map(rec => {
      if (rec.type === "warning" || rec.type === "error") {
        return {
          ...rec,
          type: "info",
        };
      }

      return rec;
    });
  }

  const priority = {
    success: 1,
    warning: 2,
    error: 3,
    info: 4,
  };

  return finalRecommendations.sort((a, b) => priority[a.type] - priority[b.type]).slice(0, 6);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
