import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

export const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const ai_model = process.env.AI_MODEL;

export const groq = new Groq({
  apiKey: process.env.GROQ_AI_KEY,
});

export const groq_model = process.env.GROQ_AL_MODEL;
