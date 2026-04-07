import { User } from "@/modules/auth";
import Resume from "../models/resume.model";
import { apiError, apiResponse } from "@/shared";
import { NextResponse } from "next/server";

export const saveResumeAsDraft = async ({ data, userId }) => {
  const requiredFields = [
    data.name,
    data.email,
    data.phone,
    data.address,
    data.jobRole,
    data.summary,
  ];
  if (requiredFields.some(f => !f || f.trim() === "")) {
    throw new apiError(400, "All required fields must be filled");
  }

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

  await User.updateOne({ _id: userId }, { $push: { resume: draft._id } });
  return NextResponse.json(new apiResponse(201, "Draft generated successfully", draft._id));
};
