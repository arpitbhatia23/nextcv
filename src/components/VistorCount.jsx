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

  // Get stats for week and month
  //   const startOfWeek = getStartOfDay(new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()));
  //   const startOfMonth = getStartOfDay(new Date(today.getFullYear(), today.getMonth(), 1));

  //   const weekStats = await VisitorStats.aggregate([
  //     { $match: { date: { $gte: startOfWeek } } },
  //     { $group: { _id: null, count: { $sum: "$count" } } },
  //   ]);
  //   const monthStats = await VisitorStats.aggregate([
  //     { $match: { date: { $gte: startOfMonth } } },
  //     { $group: { _id: null, count: { $sum: "$count" } } },
  //   ]);

  //   return (
  //     <div className="fixed top-2 right-2 bg-white/80 rounded px-3 py-1 shadow text-xs text-gray-600 z-50">
  //       <div>Today: {todayStats?.count || 1}</div>
  //       <div>This Week: {weekStats[0]?.count || 1}</div>
  //       <div>This Month: {monthStats[0]?.count || 1}</div>
  //     </div>
  //   );
}
