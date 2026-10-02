import { extractText, extractLinks, getDocumentProxy } from "unpdf";
import keywordDatabase from "../data/keywordData.json";

import mammoth from "mammoth";
import JSZip from "jszip";
export function unique(items = []) {
  return [...new Set(items.filter(Boolean))];
}

/* ============================================================
   USEFUL LINK
   ============================================================ */

export function isUsefulLink(url = "") {
  const value = String(url).trim();

  return /^(https?:\/\/|www\.|mailto:|tel:|linkedin\.com|github\.com)/i.test(value);
}

/* ============================================================
   XML ENTITIES
   ============================================================ */

export function decodeXmlEntities(str = "") {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/* ============================================================
   CLEAN URL
   ============================================================ */

export function cleanUrl(url = "") {
  return decodeXmlEntities(String(url)).replace(/\s+/g, "").trim();
}

export function normalizeText(text = "") {
  return String(text)
    .replace(/\u0000/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ============================================================
   BUILD RESULT
   ============================================================ */

export function buildExtractionResult(text, links) {
  const safeText = normalizeText(text);

  const safeLinks = unique(links.map(cleanUrl).filter(Boolean));

  /*
   * Include links in fullText so your ATS analyzer
   * can detect:
   *
   * LinkedIn
   * GitHub
   * Portfolio
   * Personal website
   */

  const fullText = normalizeText([safeText, ...safeLinks].join("\n"));

  return {
    text: safeText,

    links: safeLinks,

    fullText,

    stats: {
      textLength: safeText.length,
      linkCount: safeLinks.length,
    },
  };
}

/* ============================================================
   DOCX RELATIONSHIP XML
   ============================================================ */

export function extractLinksFromRelsXml(xml) {
  const links = [];

  const relationshipRegex = /<Relationship\b[^>]*\/?>/gi;

  let relationshipMatch;

  while ((relationshipMatch = relationshipRegex.exec(xml)) !== null) {
    const tag = relationshipMatch[0];

    const type = getXmlAttr(tag, "Type");
    const target = getXmlAttr(tag, "Target");
    const targetMode = getXmlAttr(tag, "TargetMode");

    const isHyperlink = type?.includes("/hyperlink");

    const isExternal = !targetMode || targetMode === "External";

    if (!isHyperlink || !isExternal || !target) {
      continue;
    }

    const cleanTarget = cleanUrl(decodeXmlEntities(target));

    if (isUsefulLink(cleanTarget)) {
      links.push(cleanTarget);
    }
  }

  return links;
}

/* ============================================================
   XML ATTRIBUTE
   ============================================================ */

export function getXmlAttr(tag, attr) {
  const regex = new RegExp(`${attr}=["']([^"']+)["']`, "i");

  const match = tag.match(regex);

  return match?.[1] || "";
}

/* ============================================================
   PDF
   ============================================================ */

/**
 * Extract both text and hyperlinks from PDF using unpdf.
 *
 * This replaces the previous pdf-parse/pdf.worker.mjs setup.
 */
export async function extractPDF(arrayBuffer) {
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const pdf = await getDocumentProxy(buffer);

    const [textResult, linkResult] = await Promise.all([
      extractText(pdf, {
        mergePages: true,
      }),

      extractLinks(pdf),
    ]);

    const text = typeof textResult?.text === "string" ? textResult.text : "";

    const links = Array.isArray(linkResult?.links) ? linkResult.links : [];

    if (!text.trim()) {
      const error = new Error("This PDF contains no extractable text.");

      error.code = "EMPTY_PDF_TEXT";

      throw error;
    }

    return {
      text,
      links,
    };
  } catch (error) {
    console.error("PDF extraction failed:", error);

    const extractionError = new Error(
      "This PDF could not be read. Please export it again as a text-based PDF and try again."
    );

    extractionError.code = "UNREADABLE_PDF";
    extractionError.cause = error;

    throw extractionError;
  }
}

/* ============================================================
   DOCX TEXT
   ============================================================ */

export async function extractTextFromDOCX(arrayBuffer) {
  try {
    const buffer = Buffer.from(arrayBuffer);

    const result = await mammoth.extractRawText({
      buffer,
    });

    return result?.value || "";
  } catch (error) {
    console.error("DOCX text extraction failed:", error);

    const extractionError = new Error(
      "This DOCX file could not be read. Please upload a valid Word document."
    );

    extractionError.code = "UNREADABLE_DOCX";
    extractionError.cause = error;

    throw extractionError;
  }
}

/* ============================================================
   DOCX LINKS
   ============================================================ */

export async function extractLinksFromDOCX(arrayBuffer) {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer);

    const links = [];

    const relFiles = Object.keys(zip.files).filter(
      fileName => fileName.startsWith("word/_rels/") && fileName.endsWith(".xml.rels")
    );

    for (const fileName of relFiles) {
      const file = zip.files[fileName];

      if (!file) {
        continue;
      }

      try {
        const xml = await file.async("text");

        const fileLinks = extractLinksFromRelsXml(xml);

        links.push(...fileLinks);
      } catch {
        continue;
      }
    }

    return unique(links);
  } catch (error) {
    console.warn("Could not extract links from DOCX:", error);

    return [];
  }
}

/* ============================================================================
   JD KEYWORD GAP ANALYSIS

   Runs only when calculateATSScore(text, jobDescription)
   receives a JD.

   The existing generic ATS keyword scoring remains unchanged.
============================================================================ */

export function normalizeKeyword(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[()[\]{}]/g, " ")
    .replace(/[._/-]/g, " ")
    .replace(/[^a-z0-9+# ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildKeywordDictionary() {
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

export const JD_KEYWORD_DICTIONARY = buildKeywordDictionary();

export function keywordExistsInText(keyword, text) {
  const normalizedKeyword = normalizeKeyword(keyword);

  const normalizedText = normalizeKeyword(text);

  if (!normalizedKeyword || !normalizedText) {
    return false;
  }

  const pattern = new RegExp(`(^|\\s)${escapeRegex(normalizedKeyword)}(?=$|\\s)`, "i");

  return pattern.test(normalizedText);
}

export function getKeywordAliases(canonical) {
  const aliases = keywordDatabase.aliases?.[canonical];

  return [canonical, ...(Array.isArray(aliases) ? aliases : [])];
}

export function findResumeKeywordMatch(canonical, resumeText) {
  const possibleMatches = getKeywordAliases(canonical);

  for (const candidate of possibleMatches) {
    if (keywordExistsInText(candidate, resumeText)) {
      return candidate;
    }
  }

  return null;
}

export function getRequirementWeight(jdText, keyword) {
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

export function extractJDKeywords(jdText = "") {
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

export function analyzeJDKeywordGap(resumeText = "", jdText = "") {
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

export function normalizeResumeText(text = "") {
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

export function extractIndianPhone(text = "") {
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

export function getGrade(score) {
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

export function getScoreSummary(score) {
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

export function cleanRecommendations(score, recommendations, checks) {
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

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
