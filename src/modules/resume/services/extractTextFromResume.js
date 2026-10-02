import { apiError } from "@/shared";
import "server-only";
import {
  buildExtractionResult,
  extractLinksFromDOCX,
  extractPDF,
  extractTextFromDOCX,
} from "../utils";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/* ============================================================
   MAIN EXTRACTION
   ============================================================ */

export async function extractTextFromResume(file) {
  if (!file) {
    throw new apiError(400, "No resume file was provided.");
  }

  const arrayBuffer = await file.arrayBuffer();

  const fileName = file.name?.toLowerCase() || "";
  const fileType = file.type || "";

  // ------------------------------------------------------------
  // PDF
  // ------------------------------------------------------------

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    const { text, links } = await extractPDF(arrayBuffer);

    return buildExtractionResult(text, links);
  }

  // ------------------------------------------------------------
  // DOCX
  // ------------------------------------------------------------

  if (fileType === DOCX_MIME || fileName.endsWith(".docx")) {
    const text = await extractTextFromDOCX(arrayBuffer);

    const links = await extractLinksFromDOCX(arrayBuffer);

    return buildExtractionResult(text, links);
  }

  throw new Error("Only PDF and DOCX files are supported.");
}
