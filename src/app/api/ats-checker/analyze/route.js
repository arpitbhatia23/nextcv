import { NextResponse } from "next/server";
import { extractTextFromResume } from "@/modules/resume/services/extractTextFromResume";
import { calculateATSScore } from "@/modules/resume/services/CalculateAtsScore";
import { checkRateLimit } from "@/shared/utils/rateLimiter";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_JD_LENGTH = 20000; // 20,000 characters

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/octet-stream", // Fallback for some Windows browsers for DOCX
];

export async function POST(req) {
  try {
    // 1. Rate Limiting Protection
    const headers = Object.fromEntries(req.headers);
    const ip =
      headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      headers["x-real-ip"] ||
      req.ip ||
      "127.0.0.1";

    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests from this network. Please wait a minute before analyzing another resume.",
        },
        { status: 429 }
      );
    }

    // 2. Parse Multipart Form Data safely
    let formData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid multipart form data in request." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const rawJobDescription = formData.get("jobDescription");

    // 3. File Validation
    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Resume file is required. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty (0 bytes). Please upload a valid document." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 5MB limit. Please upload a smaller document." },
        { status: 400 }
      );
    }

    const fileName = (file.name || "").toLowerCase().trim();
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      return NextResponse.json(
        {
          error: "Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).",
        },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          error: "Unsupported file type. Please upload a valid PDF or DOCX document.",
        },
        { status: 400 }
      );
    }

    // 4. Job Description Validation (Optional)
    let jobDescription = "";
    if (rawJobDescription !== null && rawJobDescription !== undefined) {
      if (typeof rawJobDescription !== "string") {
        return NextResponse.json({ error: "Job description must be plain text." }, { status: 400 });
      }

      if (rawJobDescription.length > MAX_JD_LENGTH) {
        return NextResponse.json(
          {
            error: `Job description is too long (maximum ${MAX_JD_LENGTH.toLocaleString()} characters).`,
          },
          { status: 400 }
        );
      }

      jobDescription = rawJobDescription.trim();
    }

    // 5. Document Extraction Pipeline
    let extractionResult;
    try {
      extractionResult = await extractTextFromResume(file);
    } catch (extractError) {
      if (
        extractError.code === "UNREADABLE_PDF" ||
        extractError.code === "EMPTY_PDF_TEXT" ||
        extractError.code === "UNREADABLE_DOCX"
      ) {
        return NextResponse.json(
          {
            error:
              "Could not extract machine-readable text from this document. If this is a scanned or image-based PDF, ATS software will not be able to read it. Please export or convert it as a text-based document.",
          },
          { status: 422 }
        );
      }

      console.error("[ATS Route] Text extraction failed:", extractError.message);
      return NextResponse.json(
        {
          error:
            "The document could not be read. Please ensure it is not password-protected or corrupted.",
        },
        { status: 422 }
      );
    }

    const extractedText = extractionResult?.fullText || extractionResult?.text || "";

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        {
          error:
            "No extractable text was found in this file. Please verify that your resume is not a scanned image or photo.",
        },
        { status: 422 }
      );
    }

    // 6. ATS Scoring Engine
    const analysis = calculateATSScore(extractedText, jobDescription);

    return NextResponse.json({
      ...analysis,
      fileMeta: {
        name: file.name,
        size: file.size,
        type:
          file.type ||
          (fileName.endsWith(".pdf")
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      },
    });
  } catch (error) {
    console.error("[ATS Route] Unexpected error during resume analysis:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while analyzing the resume. Please try again.",
      },
      { status: 500 }
    );
  }
}
