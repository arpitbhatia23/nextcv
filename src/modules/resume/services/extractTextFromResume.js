import "server-only";

import { PDFDocument, PDFName, PDFArray, PDFDict, PDFString, PDFHexString } from "pdf-lib";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function extractTextFromResume(file) {
  if (!file) {
    throw new Error("No resume file was provided.");
  }

  const arrayBuffer = await file.arrayBuffer();

  const fileName = file.name?.toLowerCase() || "";
  const fileType = file.type || "";

  // ------------------------------------------------------------
  // PDF
  // ------------------------------------------------------------

  if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
    const text = await extractTextFromPDF(arrayBuffer);

    const links = await extractLinksFromPDF(arrayBuffer);

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

/* ============================================================
   DOCX TEXT
   ============================================================ */

async function extractTextFromDOCX(arrayBuffer) {
  try {
    const mammothModule = await import("mammoth");

    const mammoth = mammothModule.default || mammothModule;

    const buffer = Buffer.from(arrayBuffer);

    const result = await mammoth.extractRawText({
      buffer,
    });

    return result?.value || "";
  } catch (error) {
    console.error("DOCX text extraction failed:", error);

    const extractionError = new Error(
      "This DOCX file could not be read. Please upload a valid Word document."
    );

    extractionError.code = "UNREADABLE_DOCX";
    extractionError.cause = error;

    throw extractionError;
  }
}

/* ============================================================
   PDF TEXT
   ============================================================ */

async function extractTextFromPDF(arrayBuffer) {
  const buffer = Buffer.from(arrayBuffer);

  try {
    /*
     * IMPORTANT:
     *
     * We intentionally do NOT use pdfjs-dist here.
     *
     * This code runs inside a Next.js server/API route.
     * pdfjs-dist can attempt to load:
     *
     *   pdf.worker.mjs
     *
     * from the Next.js server bundle and cause:
     *
     *   Setting up fake worker failed
     *
     * Therefore PDF text extraction is handled by
     * pdf-parse directly.
     */

    const pdfParseModule = await import("pdf-parse");

    try {
      return await parsePdfText(pdfParseModule, buffer);
    } catch (parseError) {
      try {
        const repairedPdf = await repairPdfForTextExtraction(buffer);

        return await parsePdfText(pdfParseModule, repairedPdf);
      } catch (repairError) {
        repairError.originalError = parseError;

        throw repairError;
      }
    }
  } catch (error) {
    console.error("PDF text extraction failed:", error);

    const extractionError = new Error(
      "This PDF could not be read. Please export it again as a text-based PDF and try again."
    );

    extractionError.code = "UNREADABLE_PDF";
    extractionError.cause = error;

    throw extractionError;
  }
}

async function parsePdfText(pdfParseModule, buffer) {
  let parser = null;

  try {
    if (pdfParseModule.PDFParse) {
      const PDFParse = pdfParseModule.PDFParse;

      parser = new PDFParse({ data: buffer });

      const result = await parser.getText();
      const text = result?.text || "";

      if (!text.trim()) {
        const error = new Error("This PDF contains no extractable text.");

        error.code = "EMPTY_PDF_TEXT";

        throw error;
      }

      return text;
    }

    const pdfParse = pdfParseModule.default || pdfParseModule;

    if (typeof pdfParse === "function") {
      const result = await pdfParse(buffer);
      const text = result?.text || "";

      if (!text.trim()) {
        const error = new Error("This PDF contains no extractable text.");

        error.code = "EMPTY_PDF_TEXT";

        throw error;
      }

      return text;
    }

    throw new Error("Unable to initialize pdf-parse.");
  } finally {
    if (parser && typeof parser.destroy === "function") {
      await parser.destroy();
    }
  }
}

async function repairPdfForTextExtraction(buffer) {
  const pdfDoc = await PDFDocument.load(buffer, {
    ignoreEncryption: true,
    throwOnInvalidObject: false,
  });

  return Buffer.from(await pdfDoc.save());
}

/* ============================================================
   PDF LINKS
   ============================================================ */

async function extractLinksFromPDF(arrayBuffer) {
  let pdfDoc;

  try {
    pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      throwOnInvalidObject: false,
    });
  } catch (error) {
    console.warn("Could not load PDF for link extraction:", error);

    return [];
  }

  const links = [];

  for (const page of pdfDoc.getPages()) {
    let annotsRef;

    try {
      annotsRef = page.node.Annots();
    } catch {
      continue;
    }

    if (!annotsRef) {
      continue;
    }

    let annots;

    try {
      annots = pdfDoc.context.lookup(annotsRef);
    } catch {
      continue;
    }

    if (!(annots instanceof PDFArray)) {
      continue;
    }

    for (let i = 0; i < annots.size(); i++) {
      try {
        const annotRef = annots.get(i);

        const annot = pdfDoc.context.lookup(annotRef);

        if (!(annot instanceof PDFDict)) {
          continue;
        }

        const subtype = annot.get(PDFName.of("Subtype"));

        if (subtype?.toString() !== "/Link") {
          continue;
        }

        const actionRef = annot.get(PDFName.of("A"));

        if (!actionRef) {
          continue;
        }

        const action = pdfDoc.context.lookup(actionRef);

        if (!(action instanceof PDFDict)) {
          continue;
        }

        const uriValue = action.get(PDFName.of("URI"));

        const uri = readPdfString(uriValue);

        if (uri && isUsefulLink(uri)) {
          links.push(cleanUrl(uri));
        }
      } catch {
        /*
         * A malformed annotation should not
         * break the entire resume analysis.
         */
        continue;
      }
    }
  }

  return unique(links);
}

/* ============================================================
   PDF STRING
   ============================================================ */

function readPdfString(value) {
  if (value instanceof PDFString || value instanceof PDFHexString) {
    try {
      return value.decodeText();
    } catch {
      return null;
    }
  }

  return null;
}

/* ============================================================
   DOCX LINKS
   ============================================================ */

async function extractLinksFromDOCX(arrayBuffer) {
  try {
    const JSZipModule = await import("jszip");

    const JSZip = JSZipModule.default || JSZipModule;

    const zip = await JSZip.loadAsync(arrayBuffer);

    const links = [];

    const relFiles = Object.keys(zip.files).filter(fileName => {
      return fileName.startsWith("word/_rels/") && fileName.endsWith(".xml.rels");
    });

    for (const fileName of relFiles) {
      const file = zip.files[fileName];

      if (!file) {
        continue;
      }

      try {
        const xml = await file.async("text");

        const fileLinks = extractLinksFromRelsXml(xml);

        links.push(...fileLinks);
      } catch {
        continue;
      }
    }

    return unique(links);
  } catch (error) {
    console.warn("Could not extract links from DOCX:", error);

    return [];
  }
}

/* ============================================================
   DOCX RELATIONSHIP XML
   ============================================================ */

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

    if (!isHyperlink || !isExternal || !target) {
      continue;
    }

    const cleanTarget = cleanUrl(decodeXmlEntities(target));

    if (isUsefulLink(cleanTarget)) {
      links.push(cleanTarget);
    }
  }

  return links;
}

/* ============================================================
   XML ATTRIBUTE
   ============================================================ */

function getXmlAttr(tag, attr) {
  const regex = new RegExp(`${attr}=["']([^"']+)["']`, "i");

  const match = tag.match(regex);

  return match?.[1] || "";
}

/* ============================================================
   BUILD RESULT
   ============================================================ */

function buildExtractionResult(text, links) {
  const safeText = normalizeText(text);

  const safeLinks = unique(links.map(cleanUrl).filter(Boolean));

  /*
   * Include links in fullText because your ATS
   * analyzer can then detect:
   *
   * LinkedIn
   * GitHub
   * Portfolio
   * Personal website
   */
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

/* ============================================================
   NORMALIZE TEXT
   ============================================================ */

function normalizeText(text = "") {
  return String(text)
    .replace(/\u0000/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ============================================================
   CLEAN URL
   ============================================================ */

function cleanUrl(url = "") {
  return decodeXmlEntities(String(url)).replace(/\s+/g, "").trim();
}

/* ============================================================
   XML ENTITIES
   ============================================================ */

function decodeXmlEntities(str = "") {
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/* ============================================================
   USEFUL LINK
   ============================================================ */

function isUsefulLink(url = "") {
  const value = String(url).trim();

  return /^(https?:\/\/|www\.|mailto:|tel:|linkedin\.com|github\.com)/i.test(value);
}

/* ============================================================
   UNIQUE
   ============================================================ */

function unique(items = []) {
  return [...new Set(items.filter(Boolean))];
}
