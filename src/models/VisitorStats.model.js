import mongoose from "mongoose";

const VisitorStatsSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true }, // Use start of day
  count: { type: Number, default: 0 },
});

export const VisitorStats =
  mongoose.models.VisitorStats ||
  mongoose.model("VisitorStats", VisitorStatsSchema);
