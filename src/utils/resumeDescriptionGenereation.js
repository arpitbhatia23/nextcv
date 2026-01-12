import { encode } from "@toon-format/toon";
import { PromptStrategies } from "./promptStratgies.js";
import { ai, ai_model } from "./aiConfig.js";

const generateFromPrompt = async (prompt) => {
  const toonPrompt = encode(prompt); // or skip if small
  const response = await ai.models.generateContent({
    model: ai_model,
    contents: toonPrompt,
  });
  return response.text;
};

export const ResumeGenerator = {
  education: async (data) =>
    generateFromPrompt(PromptStrategies.education(data)),
  project: async (data) => generateFromPrompt(PromptStrategies.project(data)),
  experience: async (data) =>
    generateFromPrompt(PromptStrategies.experience(data)),
  summary: async (data) =>
    generateFromPrompt(
      PromptStrategies.summary({
        role: data.jobRole,
        skills: data.skills,
        education: data.education[0]?.description,
        experience: data.experience[0]?.description,
      })
    ),
};
