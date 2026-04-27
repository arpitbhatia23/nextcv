import { User } from "@/modules/auth";
import Resume from "@/modules/resume/models/resume.model";
import { apiError } from "@/shared";

export const createResume = async ({
  ResumeType,
  phone,
  name,
  email,
  address,
  linkedin,
  github,
  portfolio,
  summary,
  skills,
  education,
  experience,
  projects,
  jobRole,
  certificates,
  userId,
}) => {
  const resume = await Resume.create({
    status: "draft",
    ResumeType: ResumeType,
    phone_no: phone,
    name: name,
    email: email,
    address: address,
    linkedin: linkedin || "",
    github: github || "",
    portfolio: portfolio || "",
    summary: summary,
    skills: skills || "",
    education: education || "",
    experience: experience || "",
    projects: projects || "",
    jobRole: jobRole,
    certificates: certificates,
  });
  if (!resume) {
    throw new apiError(500, "something wrong went while saving resume");
  }
  const addResumeIdToUserModel = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        resume: resume._id,
      },
    },
    { returnDocument: "after" }
  );
  if (!addResumeIdToUserModel) {
    throw new apiError(500, "something went wrong while add resuem id to user model");
  }
  return resume._id;
};
