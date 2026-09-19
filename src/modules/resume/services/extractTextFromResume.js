import "server-only";

import { PDFDocument, PDFName, PDFArray, PDFDict, PDFString, PDFHexString } from "pdf-lib";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function extractTextFromResume(file) {
  const arrayBuffer = await file.arrayBuffer();
  const fileName = file.name?.toLowerCase() || "";
  const fileType = file.type || "";

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    const text = await extractTextFromPDF(arrayBuffer);
    const links = await extractLinksFromPDF(arrayBuffer);

    return buildExtractionResult(text, links);
  }

  if (fileType === DOCX_MIME || fileName.endsWith(".docx")) {
    const text = await extractTextFromDOCX(arrayBuffer);
    const links = await extractLinksFromDOCX(arrayBuffer);

    return buildExtractionResult(text, links);
  }

  throw new Error("Only PDF and DOCX files are supported.");
}

/* ----------------------------- DOCX TEXT ----------------------------- */

async function extractTextFromDOCX(arrayBuffer) {
  const mammothModule = await import("mammoth");
  const mammoth = mammothModule.default || mammothModule;

  const buffer = Buffer.from(arrayBuffer);
  const result = await mammoth.extractRawText({ buffer });

  return result.value || "";
}

/* ----------------------------- PDF TEXT ------------------------------ */

async function extractTextFromPDF(arrayBuffer) {
  const buffer = Buffer.from(arrayBuffer);

  try {
    const pdfParseModule = await import("pdf-parse/lib/pdf-parse.js");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    const result = await pdfParse(buffer);

    return result.text || "";
  } catch (primaryError) {
    try {
      return await extractTextFromPDFWithPdfJs(arrayBuffer);
    } catch (fallbackError) {
      console.log(fallbackError, "");
      const error = new Error(
        "This PDF could not be read. Please export it again as a text-based PDF and try again."
      );
      error.cause = fallbackError;
      error.code = "UNREADABLE_PDF";
      error.primaryCause = primaryError;
      throw error;
    }
  }
}

async function extractTextFromPDFWithPdfJs(arrayBuffer) {
  const pdfjsModule = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdfjs = pdfjsModule.default || pdfjsModule;
  const document = await pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
    stopAtErrors: false,
    useWorkerFetch: false,
    isEvalSupported: false,
  }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str || "").join(" "));
  }

  return pages.join("\n");
}

/* ----------------------------- PDF LINKS ----------------------------- */

async function extractLinksFromPDF(arrayBuffer) {
  let pdfDoc;

  try {
    pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      throwOnInvalidObject: false,
    });
  } catch {
    return [];
  }

  const links = [];

  for (const page of pdfDoc.getPages()) {
    const annotsRef = page.node.Annots();

    if (!annotsRef) continue;

    const annots = pdfDoc.context.lookup(annotsRef);

    if (!(annots instanceof PDFArray)) continue;

    for (let i = 0; i < annots.size(); i++) {
      const annotRef = annots.get(i);
      const annot = pdfDoc.context.lookup(annotRef);

      if (!(annot instanceof PDFDict)) continue;

      const subtype = annot.get(PDFName.of("Subtype"));

      if (subtype?.toString() !== "/Link") continue;

      const actionRef = annot.get(PDFName.of("A"));
      const action = pdfDoc.context.lookup(actionRef);

      if (!(action instanceof PDFDict)) continue;

      const uriValue = action.get(PDFName.of("URI"));
      const uri = readPdfString(uriValue);

      if (uri && isUsefulLink(uri)) {
        links.push(cleanUrl(uri));
      }
    }
  }

  return unique(links);
}

function readPdfString(value) {
  if (value instanceof PDFString || value instanceof PDFHexString) {
    return value.decodeText();
  }

  return null;
}

/* ---------------------------- DOCX LINKS ----------------------------- */

async function extractLinksFromDOCX(arrayBuffer) {
  const JSZipModule = await import("jszip");
  const JSZip = JSZipModule.default || JSZipModule;

  const zip = await JSZip.loadAsync(arrayBuffer);
  const links = [];

  const relFiles = Object.keys(zip.files).filter(fileName => {
    return fileName.startsWith("word/_rels/") && fileName.endsWith(".xml.rels");
  });

  for (const fileName of relFiles) {
    const file = zip.files[fileName];

    if (!file) continue;

    const xml = await file.async("text");
    const fileLinks = extractLinksFromRelsXml(xml);

    links.push(...fileLinks);
  }

  return unique(links);
}

function extractLinksFromRelsXml(xml) {
  const links = [];
  const relationshipRegex = /<Relationship\b[^>]*\/?>/gi;

  let relationshipMatch;

  while ((relationshipMatch = relationshipRegex.exec(xml)) !== null) {
    const tag = relationshipMatch[0];

    const type = getXmlAttr(tag, "Type");
    const target = getXmlAttr(tag, "Target");
    const targetMode = getXmlAttr(tag, "TargetMode");

    const isHyperlink = type?.includes("/hyperlink");
    const isExternal = !targetMode || targetMode === "External";

    if (!isHyperlink || !isExternal || !target) continue;

    const cleanTarget = cleanUrl(decodeXmlEntities(target));

    if (isUsefulLink(cleanTarget)) {
      links.push(cleanTarget);
    }
  }

  return links;
}

function getXmlAttr(tag, attr) {
  const regex = new RegExp(`${attr}=["']([^"']+)["']`, "i");
  const match = tag.match(regex);

  return match?.[1] || "";
}

/* ---------------------------- BUILD RESULT ---------------------------- */

function buildExtractionResult(text, links) {
  const safeText = normalizeText(text);
  const safeLinks = unique(links.map(cleanUrl).filter(Boolean));

  // This is the text you should send to calculateATSScore()
  const fullText = normalizeText([safeText, ...safeLinks].join("\n"));

  return {
    text: safeText,
    links: safeLinks,
    fullText,
    stats: {
      textLength: safeText.length,
      linkCount: safeLinks.length,
    },
  };
}

/* ---------------------------- GENERIC HELPERS ---------------------------- */

function normalizeText(text = "") {
  return String(text)
    .replace(/\u0000/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanUrl(url = "") {
  return decodeXmlEntities(String(url)).replace(/\s+/g, "").trim();
}
function decodeXmlEntities(str = "") {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isUsefulLink(url = "") {
  const value = String(url).trim();

  return /^(https?:\/\/|www\.|mailto:|tel:|linkedin\.com|github\.com)/i.test(value);
}

function unique(items = []) {
  return [...new Set(items.filter(Boolean))];
}
