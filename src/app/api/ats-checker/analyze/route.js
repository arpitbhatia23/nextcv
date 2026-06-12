import { NextResponse } from "next/server";
import { extractTextFromResume } from "@/modules/resume/services/extractTextFromResume";
import { calculateATSScore } from "@/modules/resume/services/CalculateAtsScore";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req) {
  try {
    const formData = await req?.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    const text = await extractTextFromResume(file);

    if (!text || text.fullText.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Could not extract text from file. Please ensure it is not an image-based resume.",
        },
        { status: 422 }
      );
    }

    const analysis = calculateATSScore(text.fullText);

    return NextResponse.json(analysis);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.message || "Failed to analyze resume. Please try again.",
      },
      { status: 500 }
    );
  }
}
