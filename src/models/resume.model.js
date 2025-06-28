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
          required: true,
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
          required: true,
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
          required: true,
        },
        companyName: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        roleOrType: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
        date: {
          type: String,
          required: String,
        },
        technologiesOrTopics: {
          type: String,
          required: true,
        },
        organization: {
          type: String,
          required: true,
        },
      },
    ],

    jobRole: {
      type: String,
    },
  },
  { timestamps: true }
);

const Resume =
  mongoose.models.resumes || mongoose.model("resumes", resumeSchema);

export default Resume;
