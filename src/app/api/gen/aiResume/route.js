import { ai, ai_model } from "@/utils/aiConfig";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { encode } from "@toon-format/toon";
import { NextResponse } from "next/server";

// API Route handler
const handler = async (req, res) => {
  const { resumeData } = await req.json();

  console.log(resumeData);
  // Build prompt for AI to return structured JSON
  const prompt = `
You are an expert ATS resume parser and resume enhancer.

Your task:
1. Extract structured resume data from the provided resume content.
2. Improve clarity, grammar, and ATS compatibility.
3. Enhance job responsibilities and project descriptions using strong action verbs, measurable impact, and relevant technologies.
4. Generate an ATS-friendly professional summary ONLY if the summary is missing or empty.
5. DO NOT invent or assume any information. If data is missing, return empty strings "" or empty arrays [].
6. Add minimum 3 to 4 bullets points in descriptions
7. Add some soft skills according to the profile
Strict rules:
- Use ISO date format ONLY: "2024-06-01T00:00:00.000+00:00"
- Fix all spelling and grammatical mistakes.
- Keep content concise, professional, and ATS-optimized.
- Return ONLY valid JSON (no explanations, no markdown).
- JSON keys and structure MUST match the schema below exactly.

Resume content:
${JSON.stringify(resumeData)}

Return the output in the following JSON format exactly:

{
  "_id": "",
  "status": "draft",
  "ResumeType": "classicTemplate",

  "name": "",
  "phone_no": "",
  "email": "",
  "address": "",
  "linkedin": "",
  "github": "",
  "portfolio": "",

  "jobRole": "",

  "summary": "",

  "skills": [],

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
      "name": "",
      "description": "",
      "link": "",
      "date": "2024-06-01T00:00:00.000+00:00"
    }
  ],

  "certificates": [],

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

  console.log(response.text);

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
