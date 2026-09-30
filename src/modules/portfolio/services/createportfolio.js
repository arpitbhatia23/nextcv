import Resume from "@/modules/resume/models/resume.model";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { portfolio } from "../model/portfolio";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const createPortfolio = async ({ req }) => {
  if (!req) {
    throw new apiError(400, "req is required");
  }
  const { resumeId } = await req.json();
  if (!resumeId) {
    throw new apiError(400, "resume id is required");
  }
  const session = await requiredAuth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new apiError(400, "userId is required");
  }

  await dbConnect();
  const resume = await Resume.findById(resumeId).select("_id name ResumeType status");
  if (!resume) {
    throw new apiError(404, "Resume not found");
  }

  const template = getTemplateByName(resume.ResumeType);
  if (!template) {
    throw new apiError(404, "Template not found in catalog");
  }

  const tier = template?.tier?.toLowerCase();
  if (tier !== "elite") {
    throw new apiError(403, "Portfolio page is only available for   Elite resumes");
  }

  let existingPortfolio = await portfolio.findOne({ userId, resumeId });
  if (existingPortfolio) {
    return NextResponse.json(new apiResponse(200, "Portfolio already exists", existingPortfolio), {
      status: 200,
    });
  }

  const baseSlug = (resume.name || "portfolio")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  let slug = `${baseSlug || "portfolio"}-${nanoid(6)}`;
  let isSlugExists = await portfolio.findOne({ slug });

  while (isSlugExists) {
    slug = `${baseSlug || "portfolio"}-${nanoid(6)}`;
    isSlugExists = await portfolio.findOne({ slug });
  }

  const sharedportfolio = await portfolio.create({
    slug,
    userId,
    resumeId,
    isPublic: true,
  });

  if (!sharedportfolio) {
    throw new apiError(500, "Something went wrong while creating portfolio");
  }

  return NextResponse.json(
    new apiResponse(201, "Portfolio created successfully", sharedportfolio),
    { status: 201 }
  );
};

export default createPortfolio;
