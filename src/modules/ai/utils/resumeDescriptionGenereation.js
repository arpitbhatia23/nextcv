import crypto from "crypto";
import { extractJobKeywordsPrompt, PromptStrategies } from "./promptStratgies.js";
import { groq, groq_model, posthog } from "./aiConfig.js";
import { redis } from "@/shared/utils/Redis.js";

const FAST_MODEL = "openai/gpt-oss-20b";
const SMART_MODEL = "openai/gpt-oss-120b";

export const hash = value => crypto.createHash("sha256").update(String(value)).digest("hex");

/* ============================================================
   REDIS
   ============================================================ */

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
    if (!key || !String(value ?? "").trim()) return;

    await redis.set(key, String(value), "EX", ttl);
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

/* ============================================================
   AI GENERATOR
   20B → 120B fallback
   ============================================================ */

const generateFromPrompt = async (prompt, options = {}) => {
  const cleanPrompt = prompt?.trim();

  if (!cleanPrompt) {
    throw new Error("Prompt is required");
  }

  const {
    maxCompletionTokens = 500,
    temperature = 0.3,
    reasoningEffort = "low",
    traceId = crypto.randomUUID(),
    model: requestedModel,
  } = options;

  /*
   * Requested model:
   * - explicitly supplied model
   * - otherwise configured groq_model
   * - otherwise FAST_MODEL
   */
  const primaryModel = requestedModel || groq_model || FAST_MODEL;

  /*
   * Never use the same model twice.
   */
  const models = [primaryModel, primaryModel === SMART_MODEL ? FAST_MODEL : SMART_MODEL].filter(
    (model, index, arr) => arr.indexOf(model) === index
  );

  /*
   * Cache must depend on:
   * - prompt
   * - model
   * - token limit
   *
   * Otherwise changing model can return an old response.
   */
  const cacheKey = `gen:${hash(`${primaryModel}:${maxCompletionTokens}:${cleanPrompt}`)}`;

  const cached = await getCached(cacheKey);

  if (cached) {
    console.log(`[AI] Cache HIT`);
    return cached;
  }

  let lastError = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      console.log(`[AI] Trying ${model}${i > 0 ? " (fallback)" : ""}`);

      const response = await groq.chat.completions.create({
        model,

        messages: [
          {
            role: "user",
            content: cleanPrompt,
          },
        ],

        temperature,

        /*
         * Reasoning + visible output share this budget.
         */
        max_completion_tokens: maxCompletionTokens,

        reasoning_effort: reasoningEffort,
        include_reasoning: false,

        posthogTraceId: traceId,

        posthogProperties: {
          $ai_session_id: `process-${process.pid}`,
          $ai_provider: "groq",
          $ai_model: model,
        },
      });

      await posthog.flush();

      const choice = response.choices?.[0];

      const result = choice?.message?.content?.trim() || "";

      console.log("[AI] Usage:", {
        model,
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
        finishReason: choice?.finish_reason,
      });

      /*
       * Empty output is treated as failure so the fallback
       * model gets a chance.
       */
      if (!result) {
        lastError = new Error(`${model} returned empty content`);

        console.warn(`[AI] ${model} returned empty content`);

        continue;
      }

      /*
       * If the model hit its output limit, don't cache the
       * potentially incomplete result.
       */
      if (choice?.finish_reason === "length") {
        lastError = new Error(`${model} reached max completion tokens`);

        console.warn(`[AI] ${model} output truncated`);

        continue;
      }

      /*
       * Successful response.
       */
      await setCached(cacheKey, result);

      return result;
    } catch (error) {
      lastError = error;

      console.error(`[AI] ${model} failed:`, error?.message || error);

      /*
       * Try the fallback model.
       */
      continue;
    }
  }

  console.error("[AI] All models failed:", lastError?.message);

  return "";
};

/* ============================================================
   ATS KEYWORDS
   ============================================================ */

const extractJobKeywords = async (jobDescription, traceId = crypto.randomUUID()) => {
  const text = jobDescription?.trim();

  if (!text) return "";

  const cacheKey = `ats:v2:${hash(`${FAST_MODEL}:${extractJobKeywordsPrompt}:${text}`)}`;

  const cached = await getCached(cacheKey);

  if (cached) {
    console.log("[ATS] Cache HIT");
    return cached;
  }

  const models = [FAST_MODEL, SMART_MODEL];

  let lastError = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      console.log(`[ATS] Trying ${model}${i > 0 ? " (fallback)" : ""}`);

      const response = await groq.chat.completions.create({
        model,

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

        posthogTraceId: traceId,

        posthogProperties: {
          $ai_session_id: `process-${process.pid}`,
          $ai_provider: "groq",
          $ai_model: model,
        },
      });

      await posthog.flush();

      const choice = response.choices?.[0];

      const keywords = choice?.message?.content?.trim() || "";

      console.log("[ATS] Usage:", {
        model,
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
        totalTokens: response.usage?.total_tokens,
        finishReason: choice?.finish_reason,
      });

      if (!keywords) {
        lastError = new Error(`${model} returned empty keyword response`);

        continue;
      }

      if (choice?.finish_reason === "length") {
        lastError = new Error(`${model} keyword response was truncated`);

        continue;
      }

      await setCached(cacheKey, keywords);

      return keywords;
    } catch (error) {
      lastError = error;

      console.error(`[ATS] ${model} failed:`, error?.message || error);
    }
  }

  console.error("[ATS] All models failed:", lastError?.message);

  return "";
};

/* ============================================================
   RESUME GENERATOR
   ============================================================ */

export const ResumeGenerator = {
  education: data =>
    generateFromPrompt(PromptStrategies.education(data), {
      maxCompletionTokens: 400,
    }),

  project: async (data, jobDescription = "") => {
    const traceId = crypto.randomUUID();

    const atsKeywords = await extractJobKeywords(jobDescription, traceId);

    return generateFromPrompt(
      PromptStrategies.project({
        ...data,
        atsKeywords,
      }),
      {
        maxCompletionTokens: 500,
        traceId,
      }
    );
  },

  experience: async (data, jobDescription = "") => {
    const traceId = crypto.randomUUID();

    const atsKeywords = await extractJobKeywords(jobDescription, traceId);

    return generateFromPrompt(
      PromptStrategies.experience({
        ...data,
        atsKeywords,
      }),
      {
        maxCompletionTokens: 500,
        traceId,
      }
    );
  },

  skills: async (data, jobDescription = "") => {
    const traceId = crypto.randomUUID();

    const atsKeywords = await extractJobKeywords(jobDescription, traceId);

    return generateFromPrompt(
      PromptStrategies.skills({
        ...data,
        atsKeywords,
      }),
      {
        maxCompletionTokens: 400,
        traceId,
      }
    );
  },

  summary: async data => {
    const traceId = crypto.randomUUID();

    const atsKeywords = await extractJobKeywords(data?.jobDescription, traceId);

    return generateFromPrompt(
      PromptStrategies.summary({
        role: data?.jobRole,
        skills: data?.skills,
        education: data?.education?.map(item => item?.description).join("\n"),
        experience: data?.experience?.map(item => item?.description).join("\n"),
        projects: data?.projects?.map(item => item?.description).join("\n"),
        summary: data?.summary,
        atsKeywords,
      }),
      {
        model: FAST_MODEL,
        maxCompletionTokens: 600,
        reasoningEffort: "low",
        traceId,
      }
    );
  },
};
