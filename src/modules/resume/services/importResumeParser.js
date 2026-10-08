import { z } from "zod";
import { groq } from "@/modules/ai/utils/aiConfig";

/* ============================================================================
   CONFIG
============================================================================ */

const DEFAULT_GROQ_RESUME_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
];

const GROQ_RESUME_MODELS = (
  process.env.GROQ_RESUME_MODELS ||
  process.env.GROQ_RESUME_MODEL ||
  DEFAULT_GROQ_RESUME_MODELS.join(",")
)
  .split(",")
  .map(v => v.trim())
  .filter(Boolean);

/* ============================================================================
   SCHEMA
============================================================================ */

const ExperienceSchema = z.object({
  position: z.string(),
  companyName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
});

const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  grade: z.string(),
  description: z.array(z.string()),
});

const SkillSchema = z.object({
  name: z.string(),
  level: z.string(),
});

const ProjectSchema = z.object({
  title: z.string(),
  roleOrType: z.string(),
  description: z.array(z.string()),
  link: z.string(),
  date: z.string(),
  technologiesOrTopics: z.array(z.string()),
  organization: z.string(),
});

const CertificateSchema = z.object({
  title: z.string(),
  organization: z.string(),
  year: z.string(),
  credentialUrl: z.string().nullable(),
});

export const NextCVResumeSchema = z.object({
  name: z.string(),
  phone_no: z.string(),
  email: z.string(),
  address: z.string(),
  linkedin: z.string(),
  github: z.string(),
  portfolio: z.string(),
  jobRole: z.string(),
  summary: z.string(),

  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  projects: z.array(ProjectSchema),
  certificates: z.array(CertificateSchema),
});

/* ============================================================================
   EMPTY
============================================================================ */

const EMPTY_RESUME = {
  name: "",
  phone_no: "",
  email: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  jobRole: "",
  summary: "",

  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
};

function emptyResume() {
  return structuredClone(EMPTY_RESUME);
}

/* ============================================================================
   AI JSON SCHEMA
============================================================================ */

const RESUME_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,

  properties: {
    name: { type: "string" },
    phone_no: { type: "string" },
    email: { type: "string" },
    address: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    portfolio: { type: "string" },
    jobRole: { type: "string" },
    summary: { type: "string" },

    experience: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          position: { type: "string" },
          companyName: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          description: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["position", "companyName", "startDate", "endDate", "description"],
      },
    },

    education: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          degree: { type: "string" },
          institution: { type: "string" },
          startYear: { type: "string" },
          endYear: { type: "string" },
          grade: { type: "string" },
          description: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["degree", "institution", "startYear", "endYear", "grade", "description"],
      },
    },

    skills: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          level: { type: "string" },
        },
        required: ["name", "level"],
      },
    },

    projects: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          roleOrType: { type: "string" },
          description: {
            type: "array",
            items: { type: "string" },
          },
          link: { type: "string" },
          date: { type: "string" },
          technologiesOrTopics: {
            type: "array",
            items: { type: "string" },
          },
          organization: { type: "string" },
        },
        required: [
          "title",
          "roleOrType",
          "description",
          "link",
          "date",
          "technologiesOrTopics",
          "organization",
        ],
      },
    },

    certificates: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          organization: { type: "string" },
          year: { type: "string" },
          credentialUrl: {
            type: ["string", "null"],
          },
        },
        required: ["title", "organization", "year", "credentialUrl"],
      },
    },
  },

  required: [
    "name",
    "phone_no",
    "email",
    "address",
    "linkedin",
    "github",
    "portfolio",
    "jobRole",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certificates",
  ],
};

const SYSTEM_PROMPT = `
You extract structured resume data from raw PDF text.

SOURCE OF TRUTH:
Only the supplied resume text.

RULES:
- Extract only explicitly supported information.
- Never invent, infer, guess, or complete missing values.
- Missing values must be "".
- Missing arrays must be [].
- Preserve resume wording where possible.
- Remove PDF extraction duplication.
- Do not create duplicate records from repeated PDF text.
- Merge repeated mentions of the same real-world record.
- Keep genuinely different records separate.
- Do not use dates to identify experience records.
- If conflicting dates cannot be resolved from the text, use "".
- Extract skills explicitly listed or clearly stated as technologies used.
- Normalize only obvious technology aliases such as ReactJS → React and NodeJS → Node.js.
- Do not assign skill levels unless the resume explicitly states one.
- credentialUrl must be null when no credential URL exists.
- Return only JSON matching the supplied schema.
`;

function cleanText(value) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function cleanUrl(value) {
  const text = cleanText(value);

  if (!text) return "";

  if (/^www\./i.test(text)) {
    return `https://${text}`;
  }

  return text;
}

function normalizeSkill(value) {
  const text = cleanText(value);

  const key = text.toLowerCase().replace(/\s+/g, " ").trim();

  const aliases = {
    reactjs: "React",
    "react js": "React",
    "react.js": "React",

    nodejs: "Node.js",
    "node js": "Node.js",
    "node.js": "Node.js",

    nextjs: "Next.js",
    "next js": "Next.js",
    "next.js": "Next.js",

    expressjs: "Express.js",
    "express js": "Express.js",

    javascript: "JavaScript",
    typescript: "TypeScript",

    mongodb: "MongoDB",
    postgresql: "PostgreSQL",

    "tailwind css": "Tailwind CSS",
  };

  return aliases[key] || text;
}

function uniqueStrings(values) {
  const seen = new Set();
  const result = [];

  for (const value of values || []) {
    const text = cleanText(value);

    if (!text) continue;

    const key = text.toLowerCase();

    if (seen.has(key)) continue;

    seen.add(key);
    result.push(text);
  }

  return result;
}

/* ============================================================================
   MINIMAL NORMALIZATION
============================================================================ */

function normalizeResume(data) {
  const parsed = NextCVResumeSchema.parse(data);

  return {
    name: cleanText(parsed.name),
    phone_no: cleanText(parsed.phone_no),
    email: cleanText(parsed.email),
    address: cleanText(parsed.address),

    linkedin: cleanUrl(parsed.linkedin),
    github: cleanUrl(parsed.github),
    portfolio: cleanUrl(parsed.portfolio),

    jobRole: cleanText(parsed.jobRole),
    summary: cleanText(parsed.summary),

    experience: parsed.experience.map(item => ({
      position: cleanText(item.position),
      companyName: cleanText(item.companyName),
      startDate: cleanText(item.startDate),
      endDate: cleanText(item.endDate),
      description: uniqueStrings(item.description),
    })),

    education: parsed.education.map(item => ({
      degree: cleanText(item.degree),
      institution: cleanText(item.institution),
      startYear: cleanText(item.startYear),
      endYear: cleanText(item.endYear),
      grade: cleanText(item.grade),
      description: uniqueStrings(item.description),
    })),

    skills: parsed.skills.map(item => ({
      name: normalizeSkill(item.name),
      level: cleanText(item.level),
    })),

    projects: parsed.projects.map(item => ({
      title: cleanText(item.title),
      roleOrType: cleanText(item.roleOrType),
      description: uniqueStrings(item.description),
      link: cleanUrl(item.link),
      date: cleanText(item.date),
      technologiesOrTopics: uniqueStrings(item.technologiesOrTopics.map(normalizeSkill)),
      organization: cleanText(item.organization),
    })),

    certificates: parsed.certificates.map(item => ({
      title: cleanText(item.title),
      organization: cleanText(item.organization),
      year: cleanText(item.year),
      credentialUrl: item.credentialUrl ? cleanUrl(item.credentialUrl) : null,
    })),
  };
}

/* ============================================================================
   EXACT DUPLICATE REMOVAL
============================================================================ */

function stableStringify(value) {
  return JSON.stringify(value);
}

function removeExactDuplicates(items) {
  const seen = new Set();

  return items.filter(item => {
    const key = stableStringify(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

/* ============================================================================
   FINAL CLEANUP
============================================================================ */

function finalizeResume(data) {
  const normalized = normalizeResume(data);

  normalized.experience = removeExactDuplicates(normalized.experience);

  normalized.education = removeExactDuplicates(normalized.education);

  normalized.projects = removeExactDuplicates(normalized.projects);

  normalized.certificates = removeExactDuplicates(normalized.certificates);

  /*
   * Skills are slightly different because the model
   * may return React and ReactJS even after extraction.
   */

  const skills = [];
  const skillMap = new Map();

  for (const skill of normalized.skills) {
    const name = normalizeSkill(skill.name);

    if (!name) continue;

    const key = name.toLowerCase();

    if (!skillMap.has(key)) {
      skillMap.set(key, {
        name,
        level: skill.level,
      });
    }
  }

  skills.push(...skillMap.values());

  normalized.skills = skills;

  return NextCVResumeSchema.parse(normalized);
}

/* ============================================================================
   MODEL RESPONSE
============================================================================ */

function parseModelResponse(content) {
  const text = String(content || "")
    .replace(/^```json\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return NextCVResumeSchema.parse(JSON.parse(text));
}

/* ============================================================================
   GROQ
============================================================================ */

async function requestGroqResume(model, resumeText, signal) {
  const completion = await groq.chat.completions.create(
    {
      model,

      temperature: 0,

      /*
       * Increase/decrease based on your real resume dataset.
       * 2200 is generally enough for structured resume extraction.
       */
      max_tokens: 3000,

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: resumeText,
        },
      ],

      response_format: {
        type: "json_schema",

        json_schema: {
          name: "nextcv_resume",
          strict: true,
          schema: RESUME_JSON_SCHEMA,
        },
      },
    },
    {
      signal,
    }
  );

  const content = completion?.choices?.[0]?.message?.content;
  console.log("total token", completion.usage.total_tokens);
  console.log("input token", completion.usage.prompt_tokens);
  console.log("output token", completion.usage.completion_tokens);
  if (!content) {
    throw new Error(`Groq ${model} returned empty content`);
  }

  return parseModelResponse(content);
}

/* ============================================================================
   FALLBACK
============================================================================ */

function shouldTryNextModel(status, message = "") {
  const text = String(message).toLowerCase();

  if ([408, 409, 429].includes(status)) {
    return true;
  }

  if ([400, 404, 422].includes(status)) {
    return (
      text.includes("model") ||
      text.includes("schema") ||
      text.includes("json") ||
      text.includes("unsupported")
    );
  }

  return status >= 500;
}

/* ============================================================================
   MAIN
============================================================================ */

async function parseResumeTextWithAI(rawText = "", links = [], options = {}) {
  const resumeText = cleanText(rawText);

  if (!resumeText) {
    return {
      data: emptyResume(),
      source: "empty",
      model: null,
      fallbackUsed: false,
      errors: [],
    };
  }

  if (!process.env.GROQ_AI_KEY) {
    return {
      data: emptyResume(),
      source: "error",
      model: null,
      fallbackUsed: false,
      errors: ["GROQ_AI_KEY is not configured."],
    };
  }

  const models =
    Array.isArray(options.models) && options.models.length ? options.models : GROQ_RESUME_MODELS;

  const controller = options.signal ? null : new AbortController();

  const signal = options.signal || controller?.signal;

  const errors = [];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      const result = await requestGroqResume(model, resumeText, signal);

      const data = finalizeResume(result);

      return {
        data,

        source: "ai",

        model,

        fallbackUsed: i > 0,

        errors,
      };
    } catch (error) {
      const status = error?.status || 0;
      const message = error?.message || String(error);

      errors.push({
        model,
        status,
        message,
      });

      if (i === models.length - 1 || !shouldTryNextModel(status, message)) {
        break;
      }
    }
  }

  return {
    data: emptyResume(),
    source: "error",
    model: null,
    fallbackUsed: false,
    errors,
  };
}

/* ============================================================================
   ALIAS
============================================================================ */

export async function parseResumeTextAI(rawText = "", links = [], options = {}) {
  return parseResumeTextWithAI(rawText, links, options);
}
