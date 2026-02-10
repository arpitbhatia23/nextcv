import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
      trim: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "resumes",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback =
  mongoose.models.Feedbacks || mongoose.model("Feedbacks", feedbackSchema);
export default Feedback;
