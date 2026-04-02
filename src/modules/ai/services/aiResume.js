import { encode } from "@toon-format/toon";
import { ai, ai_model } from "@/modules/ai/utils/aiConfig";
import { apiResponse } from "@/shared/utils/apiResponse";
import { NextResponse } from "next/server";

export const aiResuemGenerator = async ({ resumeData }) => {
  const prompt = `
You are a STRICT ATS resume parser and professional resume enhancer.

Your responsibilities:
1. Extract structured resume data EXACTLY from the provided resume content.
2. Correct spelling, grammar, and formatting errors.
3. Improve clarity and professionalism of existing content ONLY.
4. Enhance job responsibilities and project descriptions using:
   - Strong action verbs
   - Measurable impact ONLY if explicitly present in original content
   - Relevant tools/technologies ONLY if explicitly mentioned
5. Generate a professional summary ONLY if summary field is missing or empty.
6. Add relevant soft skills ONLY if they logically align with explicitly mentioned experience.
7. NEVER invent, assume, infer, or fabricate ANY information.

STRICT NON-NEGOTIABLE RULES:

— DO NOT create new experience entries.
— DO NOT create new projects.
— DO NOT add missing dates.
— DO NOT assume a job is current.
— DO NOT convert year into full ISO date unless full date is provided.
— If a date is missing → return "".
— If endDate is not provided → return "".
— If startDate is not provided → return "".
— If any field is missing → return "" or [].
— DO NOT infer employment duration.
— DO NOT assume technologies.
— DO NOT assume achievements.
— DO NOT change job titles.
— DO NOT change company names.
— DO NOT merge entries.
— DO NOT split entries.

DATE RULES (VERY STRICT):
- Use ISO format ONLY if full valid date exists in input.
- Format: "2024-06-01T00:00:00.000+00:00"
- If only year is provided → return "".
- If month/year but no day → return "".
- If date is unclear → return "".
- NEVER fabricate day/month values.

DESCRIPTION RULES:
- Each experience description MUST contain 3–4 concise bullet points.
- Each project description MUST contain 3–4 concise bullet points.
- Bullet points must be based ONLY on provided content.
- If content is too short → rewrite professionally but do NOT add new facts.

SKILLS RULES:
- Keep original technical skills.
- Correct spelling (e.g., "begnner" → "beginner").
- Add soft skills only if strongly supported by resume content.
- DO NOT add tools that are not explicitly mentioned.

OUTPUT RULES:
- Keep content concise.
- ATS-optimized.
- Professional tone.
- No markdown.
- No explanations.
- No comments.
- Return ONLY valid JSON.
- JSON structure and key order MUST match EXACTLY.

Resume content:
${JSON.stringify(resumeData)}

Return output STRICTLY in this JSON format:

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
      "name": "",
      "level": ""
    }
  ],

  "education": [
    {
      "degree": "",
      "institution": "",
      "startYear": "",
      "endYear": "",
      "grade": "",
      "description": ""
    }
  ],

  "experience": [
    {
      "position": "",
      "companyName": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "roleOrType": "",
      "description": "",
      "link": "",
      "date": "",
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
