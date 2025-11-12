"use server";
import { VisitorStats } from "@/models/VisitorStats.model.js";
import dbConnect from "@/utils/dbConnect";

function getStartOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default async function VisitorStatsCounter() {
  await dbConnect();
  const today = getStartOfDay();
  // Increment today's count
  const todayStats = await VisitorStats.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
}
