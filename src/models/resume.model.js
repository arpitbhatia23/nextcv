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
          type: Schema.Types.Mixed,
          required: true,
        },
        endYear: {
          type: Schema.Types.Mixed,
          default: null,
        },
        grade: {
          type: String,
        },
        description: {
          type: [String],
          default: [],
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
          type: Schema.Types.Mixed,
        },
        endDate: {
          type: Schema.Types.Mixed,
        },
        description: {
          type: [String],
          default: [],
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
          type: [String],
          default: [],
        },
        link: {
          type: String,
        },
        date: {
          type: Schema.Types.Mixed,
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
        year: Schema.Types.Mixed,
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
