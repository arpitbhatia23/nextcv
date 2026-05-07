import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

console.log("Loaded key:", !!process.env.GOOGLE_GEN_AI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDShYD1AQ0nfkqIuWEZGisedMvz2fJg8rQ",
});

async function test() {
  try {
    const models = await ai.models.list();
    console.log(models);
  } catch (err) {
    console.error(err);
  }
}

test();
