import mongoose, { Schema } from "mongoose";
const CoverLetterSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["paid", "draft"],
      default: "draft",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    sincerely: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CoverLetter =
  mongoose.models.coverletters || mongoose.model("coverletters", CoverLetterSchema);

export default CoverLetter;
