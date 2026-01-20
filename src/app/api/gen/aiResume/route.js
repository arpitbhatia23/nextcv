import { ai, ai_model } from "@/utils/aiConfig";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { encode } from "@toon-format/toon";
import { NextResponse } from "next/server";

// API Route handler
const handler = async (req, res) => {
  const { resumeData } = await req.json();

  const prompt = `
You are an expert ATS resume parser and resume enhancer.

Your responsibilities:
1. Extract structured resume data from the provided resume content.
2. Correct spelling, grammar, and formatting issues.
3. Enhance job responsibilities and project descriptions using:
   - Strong action verbs
   - Measurable impact (numbers, scale, performance when available)
   - Relevant tools, technologies, and methodologies
4. Generate an ATS-friendly professional summary ONLY if the summary field is missing or empty.
5. DO NOT invent, guess, or assume any information.
   - If a field is missing, return an empty string "" or an empty array [].
6. Each experience and project description MUST contain **3–4 concise bullet points**.
7. Add relevant **soft skills** aligned with the candidate’s profile (communication, teamwork, problem-solving, etc.) along with technical skills.

Strict rules (must follow):
- Use ISO date format ONLY: "2024-06-01T00:00:00.000+00:00"
- Keep content concise, professional, and ATS-optimized.
- Fix ALL spelling and grammatical errors.
- Do NOT add explanations, comments, or markdown.
- Return ONLY valid JSON.
- JSON keys, structure, and order MUST match the schema below EXACTLY.

Resume content:
${JSON.stringify(resumeData)}

Return the output strictly in the following JSON format:

{
  "_id": "",
  "status": "draft",
  "ResumeType": "classicTemplate",

  "name": "",
  "phone": "",
  "email": "",
  "address": "",
  "linkedin": "",
  "github": "",
  "portfolio": "",

  "jobRole": "",

  "summary": "",

  "skills": [
      {
        name:"react"
        level:"begnner"
      },
    ],

  "education": [
    {
      "degree": "",
      "institution": "",
      "startYear": "2024-06-01T00:00:00.000+00:00",
      "endYear": "2024-06-01T00:00:00.000+00:00",
      "grade": "",
      "description": ""
    }
  ],

  "experience": [
    {
      "position": "",
      "companyName": "",
      "startDate": "2024-06-01T00:00:00.000+00:00",
      "endDate": "2024-06-01T00:00:00.000+00:00",
      "description": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "roleOrType": "",
      "description": "",
      "link": "",
      "date": "2024-06-01T00:00:00.000+00:00",
      "technologiesOrTopics": "",
      "organization": ""
    }
  ],

  "certificates": []
}
`;

  // Encode the prompt using Toon
  const encodedPrompt = encode(prompt);

  // Call AI model with encoded content
  const response = await ai.models.generateContent({
    model: ai_model,
    contents: [
      {
        type: "toon", // use toon type for encoded content
        text: encodedPrompt,
      },
    ],
  });

  // Decode AI output if needed (depends on your AI setup)
  let result = response.text
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  result = JSON.parse(result);

  return NextResponse.json(new apiResponse(200, "resposne", result), {
    status: 200,
  });
};

export const POST = asyncHandler(handler);
