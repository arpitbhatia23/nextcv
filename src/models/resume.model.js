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
    skills: {
      type: [String],
      required: true,
    },
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
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    experience: [
      {
        jobTitle: {
          type: String,
          required: true,
        },
        company: {
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
        description: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
      },
    ],

    certifications: [
      {
        title: {
          type: String,
          required: true,
        },
        issuer: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    profilepic: {
      type: String,
    },
  },
  { timestamps: true }
);

const Resume =
  mongoose.models.resumes || mongoose.model("resumes", resumeSchema);

export default Resume;
