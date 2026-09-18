import { GoogleGenAI } from "@google/genai";
import { OpenAI } from "@posthog/ai/openai";
import { PostHog } from "posthog-node";

export const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const ai_model = process.env.AI_MODEL;

export const posthog = new PostHog(process.env.POSTHOG_API_KEY, {
  host: process.env.POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
  enableExceptionAutocapture: true,
});

export const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_AI_KEY,
  posthog,
});

export const groq_model = process.env.GROQ_AL_MODEL;
