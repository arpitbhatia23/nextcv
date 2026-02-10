import { Schema } from "mongoose";
const feedbackSchema = new Schema(
  {
    reason: String,
  },
  { timestamps: true },
);

const Feedback =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
export default Feedback;
