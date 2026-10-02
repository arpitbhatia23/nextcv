import { User } from "@/modules/auth";
import { portfolio } from "@/modules/portfolio/model/portfolio";
import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { apiError, apiResponse, asyncHandler, dbConnect, requiredAuth } from "@/shared";
import { NextResponse } from "next/server";

const PAGE_SIZE = 8;

const handler = async req => {
  const session = await requiredAuth();
  if (session?.user?.role !== "admin") {
    throw new apiError(401, "unauthorized access");
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const requestedPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const skip = (page - 1) * PAGE_SIZE;

  const queries = {
    users: () =>
      Promise.all([
        User.find({})
          .select("name email role createdAt lastActive")
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean(),
        User.countDocuments({}),
      ]),
    resumes: () =>
      Promise.all([
        Resume.find({})
          .select("name email jobRole ResumeType status updatedAt")
          .sort({ updatedAt: -1, _id: -1 })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean(),
        Resume.countDocuments({}),
      ]),
    portfolios: () =>
      Promise.all([
        portfolio
          .find({})
          .select("slug isPublic createdAt userId resumeId")
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(PAGE_SIZE)
          .populate("userId", "name email")
          .populate("resumeId", "name jobRole ResumeType")
          .lean(),
        portfolio.countDocuments({}),
      ]),
    sharedResumes: () =>
      Promise.all([
        SharedResume.find({})
          .select("slug isPublic createdAt userId resumeId")
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(PAGE_SIZE)
          .populate("userId", "name email")
          .populate("resumeId", "name jobRole ResumeType")
          .lean(),
        SharedResume.countDocuments({}),
      ]),
  };

  if (!queries[type]) {
    throw new apiError(400, "invalid record type");
  }

  await dbConnect();
  const [rows, total] = await queries[type]();
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return NextResponse.json(
    new apiResponse(200, "records fetched successfully", {
      rows,
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
    })
  );
};

export const GET = asyncHandler(handler);
