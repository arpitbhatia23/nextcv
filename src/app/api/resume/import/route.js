import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { redis } from "@/shared/utils/Redis";
import { extractTextFromResume } from "@/modules/resume/services/extractTextFromResume";
import { parseResumeTextAI } from "@/modules/resume/services/importResumeParser";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/* ============================================================
   RATE LIMITER
   5 import attempts per IP per 60 seconds.
   Falls back gracefully if Redis is unavailable.
   ============================================================ */

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rl:resume_import",
  points: 5, // max requests
  duration: 60, // per 60 seconds
  blockDuration: 30, // block for 30 s after exhausting points
});

/* ============================================================
   CACHE TTL
   Parsed results are cached for 1 hour by file content hash.
   ============================================================ */

const CACHE_TTL_SECONDS = 60 * 60; // 1 hour
const CACHE_KEY_PREFIX = "cache:resume_import:";

/* ============================================================
   HELPERS
   ============================================================ */

function getClientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * SHA-256 hash of the raw file bytes → stable cache key regardless of filename.
 */
function fileHash(buffer) {
  return createHash("sha256").update(Buffer.from(buffer)).digest("hex");
}

/* ============================================================
   ROUTE HANDLER
   ============================================================ */

export async function POST(req) {
  const ip = getClientIp(req);

  // ── 1. Rate limiting ──────────────────────────────────────
  try {
    await rateLimiter.consume(ip);
  } catch (rlErr) {
    const retrySecs =
      typeof rlErr.msBeforeNext === "number" ? Math.ceil(rlErr.msBeforeNext / 1000) : 30;

    return NextResponse.json(
      {
        message: `Too many import requests. Please wait ${retrySecs} second${retrySecs !== 1 ? "s" : ""} before trying again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retrySecs),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // ── 2. Parse multipart form ───────────────────────────────
  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "No resume file was uploaded." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "File size exceeds 10 MB limit. Please upload a smaller file." },
      { status: 400 }
    );
  }

  const fileName = file.name?.toLowerCase() || "";
  const fileType = file.type || "";

  const isPdf = fileType === "application/pdf" || fileName.endsWith(".pdf");
  const isDocx =
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx");

  if (!isPdf && !isDocx) {
    return NextResponse.json(
      { message: "Please upload a valid PDF or DOCX resume file." },
      { status: 400 }
    );
  }

  // ── 3. Read raw bytes (needed for hashing + extraction) ───
  let arrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    return NextResponse.json({ message: "Could not read the uploaded file." }, { status: 422 });
  }

  // ── 4. Check Redis cache ──────────────────────────────────
  const hash = fileHash(arrayBuffer);
  const cacheKey = `${CACHE_KEY_PREFIX}${hash}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const parsedResume = JSON.parse(cached);
      console.log(`[import] Cache HIT for ${hash.slice(0, 8)}`);
      return NextResponse.json(
        {
          success: true,
          message: "Resume imported successfully",
          resume: parsedResume,
          cached: true,
        },
        {
          headers: {
            "X-Cache": "HIT",
            "X-Cache-Key": hash.slice(0, 8),
          },
        }
      );
    }
  } catch (cacheErr) {
    // Redis read failure is non-fatal — continue without cache
    console.warn("[import] Redis cache read failed:", cacheErr.message);
  }

  // ── 5. Extract text from PDF / DOCX ──────────────────────
  let extractionResult;
  try {
    // Pass pre-read arrayBuffer to avoid reading the stream twice
    const syntheticFile = new File([arrayBuffer], file.name, { type: file.type });
    extractionResult = await extractTextFromResume(syntheticFile);
  } catch (err) {
    console.error("[import] Text extraction failed:", err);
    return NextResponse.json(
      {
        message:
          "Could not read text from this file. Please ensure it is not scanned or password-protected.",
      },
      { status: 422 }
    );
  }

  const fullText = extractionResult?.fullText || "";
  const links = extractionResult?.links || [];

  if (!fullText.trim()) {
    return NextResponse.json(
      { message: "The uploaded file appears to be empty or unreadable." },
      { status: 422 }
    );
  }

  // ── 6. Parse resume text (rule-based, no AI) ─────────────
  let mappedResume;
  try {
    mappedResume = await parseResumeTextAI(fullText, links);
  } catch (parseErr) {
    console.error("[import] Parsing failed:", parseErr);
    return NextResponse.json(
      { message: "Failed to parse resume content. Please try again." },
      { status: 500 }
    );
  }

  // ── 7. Store result in Redis cache ────────────────────────
  try {
    await redis.set(cacheKey, JSON.stringify(mappedResume), "EX", CACHE_TTL_SECONDS);
    console.log(`[import] Cache SET for ${hash.slice(0, 8)} (TTL ${CACHE_TTL_SECONDS}s)`);
  } catch (cacheErr) {
    // Cache write failure is non-fatal
    console.warn("[import] Redis cache write failed:", cacheErr.message);
  }

  return NextResponse.json(
    {
      success: true,
      message: "Resume imported successfully",
      resume: mappedResume,
      cached: false,
    },
    {
      headers: {
        "X-Cache": "MISS",
        "X-Cache-Key": hash.slice(0, 8),
      },
    }
  );
}
