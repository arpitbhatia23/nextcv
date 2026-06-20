import crypto from "crypto";
import { encode } from "@toon-format/toon";
import { extractJobKeywordsPrompt, PromptStrategies } from "./promptStratgies.js";
import { groq, groq_model } from "./aiConfig.js";
import { redis } from "@/shared/utils/Redis.js";

export const hash = value => crypto.createHash("sha256").update(String(value)).digest("hex");

export const getCached = async key => {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

export const setCached = async (key, value, ttl = 60 * 60 * 24 * 2) => {
  try {
    if (!key || value == null) return;

    await redis.set(key, String(value), "EX", ttl);
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

const generateFromPrompt = async (prompt, options = {}) => {
  try {
    const toonPrompt = encode(prompt?.trim());

    if (!toonPrompt) {
      throw new Error("Prompt is required");
    }

    const cacheKey = `gen:${hash(`${options.model || groq_model}:${toonPrompt}`)}`;
    const cached = await getCached(cacheKey);
    console.log(cacheKey);
    if (cached) return cached;

    const response = await groq.chat.completions.create({
      model: options.model || groq_model,
      messages: [
        {
          role: "user",
          content: toonPrompt,
        },
      ],
      temperature: options.temperature ?? 0.3,
      max_tokens: options.max_tokens ?? 120,
      ...(options.reasoningEffort && {
        reasoning_effort: options.reasoningEffort,
      }),
    });

    console.log("generation usage:", response.usage);

    const result = response.choices[0]?.message?.content?.trim() || "";

    await setCached(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Groq AI Error:", error);
    return "";
  }
};

const extractJobKeywords = async jobDescription => {
  const text = jobDescription?.trim();

  if (!text) return "";

  const cacheKey = `ats:${hash(text)}`;
  const cached = await getCached(cacheKey);

  if (cached) return cached;

  try {
    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: extractJobKeywordsPrompt,
        },
        {
          role: "user",
          content: text.slice(0, 2500),
        },
      ],
      max_tokens: 100,
      temperature: 0.1,
    });

    console.log("ATS keyword usage:", response.usage);

    const keywords = response.choices[0]?.message?.content?.trim() || "";

    await setCached(cacheKey, keywords);

    return keywords;
  } catch (error) {
    console.error("Keyword extraction error:", error);
    return "";
  }
};

export const ResumeGenerator = {
  education: async data => {
    return generateFromPrompt(PromptStrategies.education(data), {
      max_tokens: 100,
    });
  },

  project: async (data, jobDescription = "") => {
    const atsKeywords = await extractJobKeywords(jobDescription);

    return generateFromPrompt(
      PromptStrategies.project({
        ...data,
        atsKeywords,
      }),
      {
        max_tokens: 120,
      }
    );
  },

  experience: async (data, jobDescription = "") => {
    const atsKeywords = await extractJobKeywords(jobDescription);

    return generateFromPrompt(
      PromptStrategies.experience({
        ...data,
        atsKeywords,
      }),
      {
        max_tokens: 120,
      }
    );
  },

  skills: async (data, jobDescription = "") => {
    const atsKeywords = await extractJobKeywords(jobDescription);
    console.log("ats keyword", atsKeywords);
    return generateFromPrompt(
      PromptStrategies.skills({
        ...data,
        atsKeywords,
      }),
      {
        max_tokens: 80,
      }
    );
  },

  summary: async data => {
    const atsKeywords = await extractJobKeywords(data.jobDescription);

    return generateFromPrompt(
      PromptStrategies.summary({
        role: data.jobRole,
        skills: data.skills,
        education: data.education?.map(e => e.description).join("\n"),
        experience: data.experience?.map(e => e.description).join("\n"),
        projects: data.projects?.map(p => p.description).join("\n"),
        summary: data.summary,
        atsKeywords,
      }),
      {
        model: "qwen/qwen3-32b",
        max_tokens: 140,
        reasoningEffort: "none",
      }
    );
  },
};
