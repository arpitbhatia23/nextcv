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
      Extract the following structured data from this resume content:
      name, phone_no, email, address, linkedin, github, portfolio, summary, skills, education, experience, projects, jobRole.
      generate summarry your self by use this make it ats friendly
      
      Resume content:
      ${JSON.stringify(resumeData)}

      Return the output in JSON format exactly like this example:
      {
        "name": "Aurpit Bhatia",
        "phone_no": "08894898036",
        "email": "aurpitaurpit@gmail.com",
        "address": "vpo jalag",
        "linkedin": "https://linkedin.com/in/aurpit-bhatia",
        "github": "https://github.com/arpitbhatia23",
        "portfolio": "",
        "summary": "Motivated and detail-oriented mern stack dev with experience at IBM Sk…",
        "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Communication", "Problem Solving"],
        "education": [{"degree": "BCA", "institution": "XYZ University", "startYear": 2020, "endYear": 2023, "grade": "A","description": "...."}],
        "experience": [{"role": "Mern Stack dev", "company": "IBM", "startDate": "2023-01", "endDate": "2023-12", "description": "Worked on projects…"}],
        "projects": [{"name": "NextCV", "description": "AI resume builder", "link": "https://nextcv.ai"},"description": "Worked on projects…"],
        "jobRole": "Mern Stack dev"
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
  const aiOutputEncoded = response[0]?.content?.[0]?.text;
  let aiOutput;
  try {
    // Decode if AI returns encoded text
    aiOutput = aiOutputEncoded ? JSON.parse(aiOutputEncoded) : null;
  } catch (err) {
    aiOutput = { error: "Failed to parse AI output", raw: aiOutputEncoded };
  }

  return NextResponse.json(new apiResponse(200, "resposne", aiOutput), {
    status: 200,
  });
};

export const POST = asyncHandler(handler);
