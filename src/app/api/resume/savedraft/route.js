import Resume from "@/models/resume.model";
import apiError from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/options";
import User from "@/models/user.model";
const handler = async (req) => {
  const data = await req.json();

  const {
    name,
    email,
    phone,
    address,
    linkedin,
    github,
    portfolio,
    jobRole,
    summary,
    experience,
    skills,
    education,
    projects,
    ResumeType,
  } = data;

  if (
    [name, email, phone, address, jobRole, summary].some(
      (fileds) => fileds.trim() == ""
    )
  ) {
    throw new apiError(401, "all field are required");
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new apiError("unauthorize request");
  }
  const userId = session.user._id;
  const draft = await Resume.create({
    status: "draft",
    ResumeType: ResumeType,
    name,
    email,
    phone_no: phone,
    linkedin,
    github,
    skills,
    address,
    jobRole,
    summary,
    experience,
    portfolio,
    skills,
    education,
    projects,
  });
  if (draft) {
    throw new apiError(500, "something went wrong while creating");
  }
  const user = await User.findByIdAndUpdate(userId, {
    $push: {
      resume: draft._id,
    },
  });

  if (!user) {
    throw new apiError(404, "user not found");
  }

  console.log(draft);
  return NextResponse(201, "draft gen sucessfully");
};

export const POST = asyncHandler(handler);
