import mongoose, { Schema } from "mongoose";

const portfolioSchema = new Schema(
  {
    slug: { type: String, unique: true, lowercase: true, trim: true, required: true },
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
portfolioSchema.index({ userId: 1, resumeId: 1 }, { unique: true });

export const portfolio =
  mongoose.models.portfolios || mongoose.model("portfolios", portfolioSchema);
