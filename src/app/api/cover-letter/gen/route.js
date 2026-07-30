import { groq } from "@/modules/ai/utils/aiConfig";
import { getCached, hash, setCached } from "@/modules/ai/utils/resumeDescriptionGenereation";
import { apiResponse, asyncHandler } from "@/shared";
import { encode } from "@toon-format/toon";
import { NextResponse } from "next/server";

const FAST_MODEL = "openai/gpt-oss-20b";
const SMART_MODEL = "openai/gpt-oss-120b";

const handler = async req => {
  const { data, model = FAST_MODEL } = await req.json();

  // Create unique cache key
  const cacheKey = `cover-letter:${hash(
    JSON.stringify({
      data,
      model,
    })
  )}`;

  // Check Redis cache
  const cachedResponse = await getCached(cacheKey);

  if (cachedResponse) {
    console.log("Redis cache hit");

    return NextResponse.json(
      new apiResponse(200, "generated successfully from cache", JSON.parse(cachedResponse))
    );
  }

  console.log("Redis cache miss");

  const { name, company, jobRole, tone, length, skills, experince, jobDescription } = data;

  const skillsList = skills.map(s => s.name).join(", ");

  const experience = experince
    .map(
      exp => `
Position: ${exp.position}
Company: ${exp.companyName}
Duration: ${exp.startDate} - ${exp.endDate || "Present"}
`
    )
    .join("\n\n");

  const prompt = `
You are an expert HR recruiter and professional cover letter writer.

Generate a ${tone.toLowerCase()} ${length.toLowerCase()} cover letter.

Candidate Information

Name: ${name}
Target Company: ${company}
Target Role: ${jobRole}

Skills:
${skillsList}

Experience:
${experience}

Job Description:
${jobDescription}


Instructions

- Personalize the cover letter.
- Match candidate experience with job description.
- Mention only relevant skills.
- Don't invent experience.
- Sound natural and professional.
- Avoid generic AI wording.
- Return ONLY valid JSON.
- It Should we only one pageer  not more that this 

Structure:

{
"name":"Candidate name",
"jobRole":"Target role",
"company":"Target company",
"body":"Complete cover letter without greeting and signature",
"sincerely":"Sincerely, Candidate name"
}

`;

  const encodedPrompt = encode(prompt.trim());

  const completion = await groq.chat.completions.create({
    model,
    temperature: 0.4,
    max_completion_tokens: 1200,
    reasoning_effort: "low",
    messages: [
      {
        role: "system",
        content:
          "Return only valid JSON. Never use markdown or code blocks. your are expert cover letter writer with 40 year of experince",
      },
      {
        role: "user",
        content: encodedPrompt,
      },
    ],
  });

  const result = completion.choices[0].message.content;

  console.log(result);

  // Save AI response in Redis
  await setCached(
    cacheKey,
    JSON.stringify(result),
    60 * 60 * 24 // 24 hours
  );

  return NextResponse.json(new apiResponse(200, "generated successfully", result));
};

export const POST = asyncHandler(handler);
