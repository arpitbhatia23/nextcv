import { encode } from "@toon-format/toon";
import { PromptStrategies } from "./promptStratgies.js";
import { groq, groq_model } from "./aiConfig.js";

const generateFromPrompt = async prompt => {
  try {
    const toonPrompt = encode(prompt?.trim());

    if (!toonPrompt) {
      throw new Error("Prompt is required");
    }

    const response = await groq.chat.completions.create({
      model: groq_model,
      messages: [
        {
          role: "user",
          content: toonPrompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq AI Error:", error);

    return "• Strong academic foundation in computer applications";
  }
};

export const ResumeGenerator = {
  education: async data => generateFromPrompt(PromptStrategies.education(data)),
  project: async data => generateFromPrompt(PromptStrategies.project(data)),
  experience: async data => generateFromPrompt(PromptStrategies.experience(data)),
  skills: async data => generateFromPrompt(PromptStrategies.skills(data)),
  summary: async data =>
    generateFromPrompt(
      PromptStrategies.summary({
        role: data.jobRole,
        skills: data.skills,
        education: data.education[0]?.description,
        experience: data.experience[0]?.description,
      })
    ),
};
