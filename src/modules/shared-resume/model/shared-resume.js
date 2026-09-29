import mongoose, { Schema } from "mongoose";

const sharedResumeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "resumes",
      required: true,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

sharedResumeSchema.index({ userId: 1, resumeId: 1 }, { unique: true });

export const SharedResume =
  mongoose.models.SharedResume || mongoose.model("SharedResume", sharedResumeSchema);
