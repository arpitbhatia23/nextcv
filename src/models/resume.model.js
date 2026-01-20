import mongoose, { Schema } from "mongoose";
const resumeSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["paid", "draft"],
    },
    ResumeType: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    github: { type: String },
    portfolio: { type: String },
    summary: {
      type: String,
      required: true,
    },
    skills: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
        },
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        startYear: {
          type: Date,
          required: true,
        },
        endYear: {
          type: Date,
          default: null,
        },
        grade: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    experience: [
      {
        position: {
          type: String,
        },
        companyName: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
        },
        roleOrType: {
          type: String,
        },
        description: {
          type: String,
        },
        link: {
          type: String,
        },
        date: {
          type: String,
          required: true,
        },
        technologiesOrTopics: {
          type: String,
        },
        organization: {
          type: String,
        },
      },
    ],
    certificates: [
      {
        title: String,
        organization: String,
        year: Date,
        credentialUrl: { type: String, default: null },
      },
    ],
    jobRole: {
      type: String,
    },
  },
  { timestamps: true },
);

const Resume =
  mongoose.models.resumes || mongoose.model("resumes", resumeSchema);

export default Resume;
