"use server";
import { VisitorStats } from "@/models/VisitorStats.model";
import dbConnect from "@/utils/dbConnect";
import React from "react";

const ChartServer = async (timePeriod = "90d") => {
  await dbConnect();

  const now = new Date();
  const startDate = {
    "7d": new Date(new Date().setDate(now.getDate() - 7)),
    "30d": new Date(new Date().setDate(now.getDate() - 30)),
    "90d": new Date(new Date().setDate(now.getDate() - 90)),
  };

  const selectedStartDate = startDate[timePeriod] || startDate["90d"];

  const visitorStats = await VisitorStats.aggregate([
    {
      $match: {
        date: { $gte: selectedStartDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$date" },
        },
        count: { $sum: "$count" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const formatted = visitorStats.map((entry) => ({
    date: entry._id,
    totalvisitor: entry.count,
  }));
  return formatted;
};

export default ChartServer;
