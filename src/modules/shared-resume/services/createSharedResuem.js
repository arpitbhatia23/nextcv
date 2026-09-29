import Resume from "@/modules/resume/models/resume.model";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const createSharedResume = async ({ req }) => {
  if (!req) {
    throw new apiError(400, "request is required");
  }

  const session = await requiredAuth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new apiError(400, "userid required");
  }

  const { resumeId } = await req.json();
  if (!resumeId) {
    throw new apiError(400, "resumeId is required");
  }

  await dbConnect();

  const resume = await Resume.findById(resumeId).select("_id name ResumeType status");
  if (!resume) {
    throw new apiError(404, "resume not found");
  }

  // Check template and tier from template catalog using key stored in resume (ResumeType)
  if (!resume.ResumeType) {
    throw new apiError(400, "Resume template is missing");
  }

  const template = getTemplateByName(resume.ResumeType);
  if (!template) {
    throw new apiError(404, "Template not found in catalog");
  }

  const tier = template?.tier?.toLowerCase();
  if (tier !== "premium" && tier !== "elite") {
    throw new apiError(403, "Public sharing is only available for Premium or Elite resumes");
  }

  let existingSharedResume = await SharedResume.findOne({ userId, resumeId });
  if (existingSharedResume) {
    return NextResponse.json(
      new apiResponse(200, "Shared resume already exists", existingSharedResume),
      { status: 200 }
    );
  }

  // If tier is Premium or Elite, proceed to future step
  const baseSlug = (resume.name || "resume")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  let slug = `${baseSlug || "resume"}-${nanoid(6)}`;
  let isSlugExists = await SharedResume.findOne({ slug });

  while (isSlugExists) {
    slug = `${baseSlug || "resume"}-${nanoid(6)}`;
    isSlugExists = await SharedResume.findOne({ slug });
  }

  const sharedResume = await SharedResume.create({
    slug,
    userId,
    resumeId,
    isPublic: true,
  });

  return NextResponse.json(
    new apiResponse(201, "Shared resume created successfully", sharedResume),
    { status: 201 }
  );
};
