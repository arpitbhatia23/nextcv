import {
  analyzeJDKeywordGap,
  cleanRecommendations,
  detectResumeSections,
  extractActionVerbs,
  extractContactInformation,
  extractMeasurableMetrics,
  extractTechnicalSkills,
  getGrade,
  getScoreSummary,
  normalizeResumeText,
} from "../utils/index.js";

/**
 * Calculates a comprehensive ATS evaluation across three independent dimensions:
 * 1. Resume Content Score (0 - 100)
 * 2. Document Readability Score (0 - 100)
 * 3. Job Description Match Score (0 - 100, only when JD provided)
 *
 * Brand neutral: no NextCV bonus, no arbitrary hard score caps.
 *
 * @param {string} text - Extracted raw or normalized text from resume
 * @param {string} [jobDescription=""] - Optional job description text
 * @returns {object} Full analysis result
 */
export function calculateATSScore(text, jobDescription = "") {
  const recommendations = [];

  const normalizedText = normalizeResumeText(text || "");
  const words = normalizedText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasJobDescription = Boolean(typeof jobDescription === "string" && jobDescription.trim());

  // 1. Contact Information
  const contact = extractContactInformation(normalizedText);

  // 2. Section Detection (heading-aware)
  const sections = detectResumeSections(normalizedText);

  // 3. Action Verbs & Metrics
  const actionVerbs = extractActionVerbs(normalizedText);
  const metrics = extractMeasurableMetrics(normalizedText);

  // 4. Technical / Domain Skills
  const technicalSkills = extractTechnicalSkills(normalizedText);

  /* -------------------------------------------------------------------------- */
  /* DIMENSION 1: RESUME CONTENT SCORE (0 - 100)                                */
  /* -------------------------------------------------------------------------- */

  // A. Contact Information (20 pts)
  const contactScore =
    (contact.hasEmail ? 8 : 0) + (contact.hasPhone ? 8 : 0) + (contact.hasProfileLink ? 4 : 0);

  // B. Section Structure & Completeness (30 pts)
  // Fresher friendly: projects count as practical work evidence!
  const skillsPts = sections.skills ? 8 : 0;
  const experiencePts = sections.hasPracticalExperience ? 10 : 0;
  const educationPts = sections.education ? 7 : 0;
  const summaryPts = sections.summary ? 5 : 0;
  const bonusPts = sections.certifications || sections.achievements ? 3 : 0;
  const sectionScore = Math.min(
    30,
    skillsPts + experiencePts + educationPts + summaryPts + bonusPts
  );

  // C. Content Impact & Action Verbs (25 pts)
  let verbPts = 0;
  if (actionVerbs.length >= 6) {
    verbPts = 13;
  } else if (actionVerbs.length >= 3) {
    verbPts = 9;
  } else if (actionVerbs.length >= 1) {
    verbPts = 5;
  }

  let metricPts = 0;
  if (metrics.length >= 3) {
    metricPts = 12;
  } else if (metrics.length >= 1) {
    metricPts = 8;
  } else if (wordCount > 150) {
    metricPts = 3;
  }
  const impactScore = Math.min(25, verbPts + metricPts);

  // D. Skills & Competencies Presentation (15 pts)
  let skillsScore = 0;
  if (technicalSkills.length >= 8) {
    skillsScore = 15;
  } else if (technicalSkills.length >= 5) {
    skillsScore = 12;
  } else if (technicalSkills.length >= 3) {
    skillsScore = 8;
  } else if (technicalSkills.length >= 1) {
    skillsScore = 4;
  }

  // E. Length & Conciseness (10 pts)
  // FIXED: Every boundary has an explicit, smooth score. 851–1000 words receives 9/10!
  let lengthScore = 0;
  if (wordCount === 0) {
    lengthScore = 0;
  } else if (wordCount < 150) {
    lengthScore = 3;
  } else if (wordCount < 250) {
    lengthScore = 6;
  } else if (wordCount < 350) {
    lengthScore = 8;
  } else if (wordCount <= 800) {
    lengthScore = 10; // Optimal 1-page / concise 2-page
  } else if (wordCount <= 1000) {
    lengthScore = 9; // Comprehensive 2-page (Fixed bug: previously fell to 2)
  } else if (wordCount <= 1400) {
    lengthScore = 7; // Senior / academic multi-page
  } else {
    lengthScore = 5; // Overly lengthy
  }

  const rawContentScore = contactScore + sectionScore + impactScore + skillsScore + lengthScore;
  const contentScore = Math.min(100, Math.max(0, Math.round(rawContentScore)));

  /* -------------------------------------------------------------------------- */
  /* DIMENSION 2: DOCUMENT READABILITY SCORE (0 - 100)                          */
  /* -------------------------------------------------------------------------- */

  const textLengthPts = wordCount >= 100 ? 20 : wordCount > 0 ? 10 : 0;

  const cleanText = normalizedText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  const cleanRatio = normalizedText.length ? cleanText.length / normalizedText.length : 1;
  const cleanFormatPts = cleanRatio >= 0.98 ? 15 : cleanRatio >= 0.9 ? 10 : 0;

  const avgWordLen = words.length ? normalizedText.replace(/\s+/g, "").length / words.length : 0;
  const hasConcatIssue = avgWordLen > 14 || (words.length > 20 && avgWordLen < 2.5);
  const wordStructurePts = !hasConcatIssue ? 15 : 5;

  const lines = normalizedText.split("\n").filter(Boolean);
  const lineStructurePts = lines.length >= 15 ? 10 : lines.length >= 5 ? 7 : 3;

  const headingPts = sections.detectedCount >= 4 ? 10 : sections.detectedCount >= 2 ? 7 : 3;
  const contactExtractionPts = (contact.hasEmail ? 15 : 0) + (contact.hasPhone ? 15 : 0);

  const rawReadabilityScore =
    textLengthPts +
    cleanFormatPts +
    wordStructurePts +
    lineStructurePts +
    headingPts +
    contactExtractionPts;
  const readabilityScore = Math.min(100, Math.max(0, Math.round(rawReadabilityScore)));

  /* -------------------------------------------------------------------------- */
  /* DIMENSION 3: JOB DESCRIPTION MATCH SCORE (0 - 100, Independent!)          */
  /* -------------------------------------------------------------------------- */

  const jdKeywordGap = hasJobDescription
    ? analyzeJDKeywordGap(normalizedText, jobDescription)
    : null;

  // IMPORTANT: A low JD match does NOT reduce the general content score.
  const score = contentScore;

  /* -------------------------------------------------------------------------- */
  /* EVIDENCE-BASED RECOMMENDATIONS (All 4 types: success, warning, error, info)*/
  /* -------------------------------------------------------------------------- */

  // 1. Contact Info
  if (!contact.hasEmail || !contact.hasPhone) {
    recommendations.push({
      id: "missing_contact_info",
      severity: "error",
      issue: "Missing Essential Contact Information",
      evidence:
        !contact.hasEmail && !contact.hasPhone
          ? "Neither email address nor phone number was detected."
          : !contact.hasEmail
            ? "Email address was not detected."
            : "Phone number was not detected.",
      explanation:
        "ATS parser filters and recruiters require direct contact details to route your application.",
      suggestedFix:
        "Add your email address and Indian mobile number (+91 XXXXX XXXXX) at the top of your resume.",
      category: "contact",
    });
  } else if (contact.hasEmail && contact.hasPhone && contact.hasLinkedIn) {
    recommendations.push({
      id: "complete_contact_info",
      severity: "success",
      issue: "Complete Contact Information",
      evidence: "Email, phone number, and LinkedIn profile link detected cleanly.",
      explanation: "Recruiters have immediate access to your contact channels.",
      suggestedFix: "Keep profile links and contact numbers verified across all job boards.",
      category: "contact",
    });
  } else if (!contact.hasProfileLink) {
    recommendations.push({
      id: "add_profile_links",
      severity: "info",
      issue: "Add Professional Profile Links",
      evidence: "No LinkedIn, GitHub, or portfolio URL detected.",
      explanation:
        "Including a verified LinkedIn or GitHub profile link increases recruiter credibility and engagement.",
      suggestedFix:
        "Add your LinkedIn profile link (e.g. linkedin.com/in/username) in the contact header.",
      category: "contact",
    });
  }

  // 2. Sections
  if (!sections.skills) {
    recommendations.push({
      id: "missing_skills_section",
      severity: "warning",
      issue: "Missing Dedicated Skills Section",
      evidence: "No standard 'Technical Skills' or 'Skills' section heading recognized.",
      explanation:
        "ATS indexing parsers scan dedicated skills sections to match required competencies.",
      suggestedFix:
        "Add a clearly labeled 'Skills' or 'Technical Skills' heading listing your core tools and technologies.",
      category: "sections",
    });
  }

  if (!sections.experience && !sections.projects) {
    recommendations.push({
      id: "missing_practical_work",
      severity: "error",
      issue: "Missing Experience and Projects",
      evidence: "Neither Work Experience nor Projects section was detected in the document.",
      explanation:
        "Recruiters need verifiable evidence of practical execution and technical application.",
      suggestedFix:
        "Add a 'Projects' section (for freshers/students) or 'Work Experience' section with timelines and bullet points.",
      category: "sections",
    });
  } else if (!sections.experience && sections.projects) {
    recommendations.push({
      id: "fresher_project_evidence",
      severity: "success",
      issue: "Practical Project Portfolio Recognized",
      evidence: "Projects section detected with verifiable practical application.",
      explanation:
        "For students and freshers, well-documented projects serve as valid practical evidence.",
      suggestedFix:
        "Highlight your specific role, technical stack, and measurable impact for each project.",
      category: "sections",
    });
  }

  if (!sections.education) {
    recommendations.push({
      id: "missing_education_section",
      severity: "warning",
      issue: "Missing Education Section",
      evidence: "No standard Education heading was recognized.",
      explanation:
        "Academic qualifications are standard baseline screening filters in many hiring workflows.",
      suggestedFix:
        "Add an 'Education' section stating degree, university/college, and completion year.",
      category: "sections",
    });
  }

  if (!sections.summary) {
    recommendations.push({
      id: "add_professional_summary",
      severity: "info",
      issue: "Consider Adding a Professional Summary",
      evidence: "No summary or profile section detected.",
      explanation:
        "A concise 2-3 sentence summary gives recruiters an instant snapshot of your focus area.",
      suggestedFix: "Add a 'Summary' at the top summarizing your primary skills and target role.",
      category: "sections",
    });
  }

  if (sections.detectedCount >= 4) {
    recommendations.push({
      id: "well_structured_sections",
      severity: "success",
      issue: "Standard Section Structure",
      evidence: `${sections.detectedList.join(", ")} headings detected cleanly.`,
      explanation:
        "Standard headings ensure automated parsers and human reviewers navigate your resume smoothly.",
      suggestedFix: "Keep headings consistent when tailoring your resume for different roles.",
      category: "sections",
    });
  }

  // 3. Impact & Metrics
  if (metrics.length === 0) {
    recommendations.push({
      id: "quantify_achievements",
      severity: "warning",
      issue: "Include Quantifiable Achievements",
      evidence:
        "Bullet points describe duties without detectable metrics, percentages, or numbers.",
      explanation:
        "Bullet points with measurable results (e.g. 'improved latency by 32%', 'managed 50+ clients') significantly outperform generic duty descriptions.",
      suggestedFix:
        "Add numbers, percentages, team sizes, or measurable results to at least 2 key bullet points.",
      category: "content",
    });
  } else {
    recommendations.push({
      id: "metrics_detected",
      severity: "success",
      issue: "Measurable Impact Detected",
      evidence: `${metrics.length} measurable metric(s) recognized (e.g. ${metrics.slice(0, 2).join(", ")}).`,
      explanation: "Quantified results make your contributions credible and impressive.",
      suggestedFix: "Ensure every major project or role includes at least one measurable outcome.",
      category: "content",
    });
  }

  if (actionVerbs.length < 3) {
    recommendations.push({
      id: "strengthen_action_verbs",
      severity: "warning",
      issue: "Strengthen Action Verbs",
      evidence: `Only ${actionVerbs.length} standard action verb(s) recognized in the text.`,
      explanation:
        "Starting bullet points with active verbs (e.g. 'Architected', 'Optimized', 'Deployed') highlights ownership.",
      suggestedFix:
        "Begin bullet points with dynamic verbs like 'Developed', 'Engineered', 'Implemented', or 'Launched'.",
      category: "content",
    });
  }

  // 4. Length
  if (wordCount < 200 && wordCount > 0) {
    recommendations.push({
      id: "resume_too_brief",
      severity: "warning",
      issue: "Resume Content is Brief",
      evidence: `Document contains ${wordCount} words.`,
      explanation:
        "A standard one-page resume has 350–700 words. Very short documents may lack sufficient technical keywords.",
      suggestedFix:
        "Elaborate on project methodologies, technical challenges solved, and key responsibilities.",
      category: "formatting",
    });
  } else if (wordCount > 1200) {
    recommendations.push({
      id: "resume_length_advisory",
      severity: "info",
      issue: "Resume Length is Above Average",
      evidence: `Document contains ${wordCount} words.`,
      explanation:
        "Multi-page resumes above 1,000 words risk losing reader attention unless you are a senior professional with 8+ years experience.",
      suggestedFix:
        "Trim older or less relevant details to focus attention on your most impactful achievements.",
      category: "formatting",
    });
  }

  // 5. Job Description Alignment (when provided)
  if (hasJobDescription && jdKeywordGap) {
    if (jdKeywordGap.notDetectedKeywords > 0) {
      const topMissing = jdKeywordGap.notDetected
        .slice(0, 3)
        .map(k => k.keyword)
        .join(", ");
      recommendations.push({
        id: "jd_unmatched_keywords",
        severity: jdKeywordGap.score < 60 ? "warning" : "info",
        issue: "Job Requirements Not Detected in Resume",
        evidence: `Key terms from job post (${topMissing}) were not detected in extracted resume text.`,
        explanation:
          "ATS keyword filters screen candidate resumes against specified role requirements.",
        suggestedFix:
          "Review the job description. If you have authentic experience with these skills, mention them clearly in your experience or skills section.",
        category: "jd",
      });
    }

    if (jdKeywordGap.score >= 80) {
      recommendations.push({
        id: "strong_jd_alignment",
        severity: "success",
        issue: "Strong Job Description Alignment",
        evidence: `${jdKeywordGap.matchedKeywords} requirement(s) matched the provided job description.`,
        explanation: "Your resume shares strong keyword alignment with this role.",
        suggestedFix:
          "Ensure your interview talking points reflect these highlighted competencies.",
        category: "jd",
      });
    }
  }

  const checks = {
    wordCount,
    hasEmail: contact.hasEmail,
    email: contact.email,
    hasPhone: contact.hasPhone,
    phone: contact.phone,
    hasLinkedIn: contact.hasLinkedIn,
    hasGithub: contact.hasGithub,
    hasPortfolio: contact.hasPortfolio,
    hasProfileSignal: contact.hasProfileLink,
    sectionsDetected: sections.detectedList,
    foundSectionsCount: sections.detectedCount,
    hasExperienceSection: sections.experience,
    hasProjectsSection: sections.projects,
    hasSkillsSection: sections.skills,
    hasEducationSection: sections.education,
    hasSummarySection: sections.summary,
    actionVerbsFound: actionVerbs,
    keywordHits: technicalSkills.length,
    metricsDetected: metrics.length,
    isFresherProfile: !sections.experience && sections.projects,
    baseScore: contentScore,
  };

  const finalRecommendations = cleanRecommendations(contentScore, recommendations, checks);

  const result = {
    score,
    grade: getGrade(score),
    summary: getScoreSummary(score),
    dimensions: {
      content: {
        score: contentScore,
        grade: getGrade(contentScore),
        breakdown: {
          contactInfo: { score: contactScore, max: 20 },
          sectionStructure: { score: sectionScore, max: 30 },
          contentImpact: { score: impactScore, max: 25 },
          skillsPresentation: { score: skillsScore, max: 15 },
          lengthAndDensity: { score: lengthScore, max: 10 },
        },
      },
      readability: {
        score: readabilityScore,
        grade:
          readabilityScore >= 85 ? "High" : readabilityScore >= 65 ? "Moderate" : "Needs Attention",
        stats: {
          wordCount,
          characterCount: normalizedText.length,
          linesCount: lines.length,
          textExtractable: wordCount > 0,
          cleanFormatting: !hasConcatIssue && cleanRatio >= 0.95,
        },
        disclaimer:
          "Document readability reflects text extraction quality and structure clarity. It does not guarantee acceptance by every proprietary ATS.",
      },
      ...(hasJobDescription && {
        jdMatch: {
          score: jdKeywordGap.score,
          totalKeywords: jdKeywordGap.totalKeywords,
          matchedCount: jdKeywordGap.matchedKeywords,
          partialCount: jdKeywordGap.partialKeywords,
          notDetectedCount: jdKeywordGap.notDetectedKeywords,
          matched: jdKeywordGap.matched,
          partial: jdKeywordGap.partial,
          notDetected: jdKeywordGap.notDetected,
        },
      }),
    },
    recommendations: finalRecommendations,
    checks,
  };

  // Backwards compatibility for existing components
  if (hasJobDescription) {
    result.jdMatchScore = jdKeywordGap.score;
    result.keywordGap = jdKeywordGap;
  }

  return result;
}
