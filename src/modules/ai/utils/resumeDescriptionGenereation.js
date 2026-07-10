import crypto from "crypto";
import { encode } from "@toon-format/toon";
import { extractJobKeywordsPrompt, PromptStrategies } from "./promptStratgies.js";
import { groq, groq_model } from "./aiConfig.js";
import { redis } from "@/shared/utils/Redis.js";

const FAST_MODEL = "openai/gpt-oss-20b";
const SMART_MODEL = "openai/gpt-oss-120b";

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
    // Don't cache empty AI responses
    if (!key || !String(value ?? "").trim()) return;

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

    const model = options.model || groq_model || FAST_MODEL;

    const cacheKey = `gen:${hash(`${model}:${options.maxCompletionTokens ?? 500}:${toonPrompt}`)}`;

    const cached = await getCached(cacheKey);

    if (cached) return cached;

    const response = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: "user",
          content: toonPrompt,
        },
      ],
      temperature: options.temperature ?? 0.3,

      // Reasoning and visible output share this limit
      max_completion_tokens: options.maxCompletionTokens ?? 500,

      reasoning_effort: options.reasoningEffort ?? "low",
      include_reasoning: false,
    });

    const choice = response.choices?.[0];
    const result = choice?.message?.content?.trim() || "";

    console.log("Generation usage:", response.usage);

    if (!result) {
      console.error("Groq returned empty content:", {
        model,
        finishReason: choice?.finish_reason,
        message: choice?.message,
        usage: response.usage,
      });

      return "";
    }

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

  // Include model and prompt version to avoid stale results
  const cacheKey = `ats:v2:${hash(`${FAST_MODEL}:${extractJobKeywordsPrompt}:${text}`)}`;

  const cached = await getCached(cacheKey);

  if (cached) return cached;

  try {
    const response = await groq.chat.completions.create({
      model: FAST_MODEL,
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
      temperature: 0.1,
      max_completion_tokens: 500,
      reasoning_effort: "low",
      include_reasoning: false,
    });

    const choice = response.choices?.[0];
    const keywords = choice?.message?.content?.trim() || "";

    console.log("ATS keyword usage:", response.usage);

    if (!keywords) {
      console.error("Empty keyword response:", {
        finishReason: choice?.finish_reason,
        message: choice?.message,
        usage: response.usage,
      });

      return "";
    }

    await setCached(cacheKey, keywords);

    return keywords;
  } catch (error) {
    console.error("Keyword extraction error:", error);
    return "";
  }
};

export const ResumeGenerator = {
  education: data =>
    generateFromPrompt(PromptStrategies.education(data), {
      maxCompletionTokens: 400,
    }),

  project: async (data, jobDescription = "") => {
    const atsKeywords = await extractJobKeywords(jobDescription);

    return generateFromPrompt(
      PromptStrategies.project({
        ...data,
        atsKeywords,
      }),
      {
        maxCompletionTokens: 500,
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
        maxCompletionTokens: 500,
      }
    );
  },

  skills: async (data, jobDescription = "") => {
    const atsKeywords = await extractJobKeywords(jobDescription);

    return generateFromPrompt(
      PromptStrategies.skills({
        ...data,
        atsKeywords,
      }),
      {
        maxCompletionTokens: 400,
      }
    );
  },

  summary: async data => {
    const atsKeywords = await extractJobKeywords(data.jobDescription);

    return generateFromPrompt(
      PromptStrategies.summary({
        role: data.jobRole,
        skills: data.skills,
        education: data.education?.map(item => item.description).join("\n"),
        experience: data.experience?.map(item => item.description).join("\n"),
        projects: data.projects?.map(item => item.description).join("\n"),
        summary: data.summary,
        atsKeywords,
      }),
      {
        // Use FAST_MODEL initially to conserve free-tier tokens
        model: FAST_MODEL,
        maxCompletionTokens: 600,
        reasoningEffort: "low",
      }
    );
  },
};
