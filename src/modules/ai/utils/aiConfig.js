import { GoogleGenAI } from "@google/genai";
export const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const ai_model = process.env.AI_MODEL;
