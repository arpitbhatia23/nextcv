import Resume from "@/models/resume.model";
import User from "@/models/user.model";
import apiError from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/options";
import { apiResponse } from "@/utils/apiResponse";
import dbConnect from "@/utils/dbConnect";

const handler = async (req) => {
  // ✅ Connect DB once
  await dbConnect();

  const data = await req.json();

  const requiredFields = [
    data.name,
    data.email,
    data.phone,
    data.address,
    data.jobRole,
    data.summary,
  ];

  if (requiredFields.some((f) => !f || f.trim() === "")) {
    throw new apiError(400, "All required fields must be filled");
  }

  // ✅ Session check
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    throw new apiError(401, "Unauthorized request");
  }

  const userId = session.user._id;

  // ✅ Create resume
  const draft = await Resume.create({
    status: "draft",
    ResumeType: data.ResumeType,
    name: data.name,
    email: data.email,
    phone_no: data.phone,
    address: data.address,
    linkedin: data.linkedin,
    github: data.github,
    portfolio: data.portfolio,
    jobRole: data.jobRole,
    summary: data.summary,
    experience: data.experience,
    skills: data.skills,
    education: data.education,
    projects: data.projects,
    certificates: data.certificates,
  });

  // ✅ Atomic update (fast)
  await User.updateOne({ _id: userId }, { $push: { resume: draft._id } });

  return NextResponse.json(
    new apiResponse(201, "Draft generated successfully"),
  );
};

export const POST = asyncHandler(handler);
