import { User } from "@/modules/auth";
import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { apiResponse, requiredAuth } from "@/shared";
import Coupons from "@/modules/coupon/models/coupon";
import { NextResponse } from "next/server";
import { redis } from "@/shared/utils/Redis";

export const getAllAnalytics = async ({ timeRange = "all", customStart, customEnd }) => {
  const session = await requiredAuth();
  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized access");
  }

  const { startDate, endDate } = getDateRange(timeRange, customStart, customEnd);

  // Base query for time filtering
  const timeQuery = startDate ? { createdAt: { $gte: startDate, $lte: endDate } } : {};
  const cacheKey = `analytics:${timeRange}:${startDate?.getTime() || "all"}:${endDate?.getTime() || "now"}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(new apiResponse(200, "data fetch successfully", JSON.parse(cached)), {
        status: 200,
      });
    }
  } catch (err) {
    console.error("Redis error:", err);
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Parallel execution for massive performance gain
  const [
    userStats,
    resumeStats,
    paymentStatsRaw,
    couponStats,
    todayStats
  ] = await Promise.all([
    // 1. User Stats
    (async () => {
      const [totalUsers, activeUsers, adminCount, userGrowthData] = await Promise.all([
        User.countDocuments(timeQuery),
        User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
        User.countDocuments({ ...timeQuery, role: "admin" }),
        User.aggregate([
          { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
          { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, users: { $sum: 1 } } },
          { $sort: { _id: 1 } }
        ])
      ]);
      return { totalUsers, activeUsers, adminCount, userGrowth: userGrowthData.map(i => ({ date: i._id, users: i.users })) };
    })(),

    // 2. Resume Stats
    (async () => {
      const [totalResumes, paidResumes, draftResumes, topResumeTypesData, topSkillsData, topJobRolesData, topTechnologiesData] = await Promise.all([
        Resume.countDocuments(timeQuery),
        Resume.countDocuments({ ...timeQuery, status: "paid" }),
        Resume.countDocuments({ ...timeQuery, status: "draft" }),
        Resume.aggregate([{ $match: timeQuery }, { $group: { _id: "$jobRole", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
        Resume.aggregate([{ $match: timeQuery }, { $unwind: "$skills" }, { $group: { _id: "$skills", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 15 }]),
        Resume.aggregate([{ $match: timeQuery }, { $group: { _id: "$jobRole", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
        Resume.aggregate([{ $match: timeQuery }, { $unwind: "$projects" }, { $unwind: "$projects.technologies" }, { $group: { _id: "$projects.technologies", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 15 }])
      ]);
      return {
        totalResumes, paidResumes, draftResumes,
        topResumeTypes: topResumeTypesData.map(i => ({ type: i._id || "Other", count: i.count })),
        topSkills: topSkillsData.map(i => ({ skill: i._id, count: i.count })),
        topJobRoles: topJobRolesData.map(i => ({ role: i._id || "Other", count: i.count })),
        topTechnologies: topTechnologiesData.map(i => ({ tech: i._id, count: i.count }))
      };
    })(),

    // 3. Payment Stats
    (async () => {
      const pQuery = { ...timeQuery, status: "SUCCESS" };
      const [revResult, avgResult, monthlyData, modesData, paidUsersCount] = await Promise.all([
        Payment.aggregate([{ $match: pQuery }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
        Payment.aggregate([{ $match: pQuery }, { $group: { _id: null, avg: { $avg: "$amount" } } }]),
        Payment.aggregate([
          { $match: { createdAt: { $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) }, status: "SUCCESS" } },
          { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, revenue: { $sum: "$amount" } } },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]),
        Payment.aggregate([{ $match: pQuery }, { $group: { _id: "$paymentMode", count: { $sum: 1 }, revenue: { $sum: "$amount" } } }, { $sort: { count: -1 } }]),
        Payment.distinct("userId", { status: "SUCCESS" }).then(u => u.length)
      ]);

      const totalRevenue = revResult[0]?.total || 0;
      const mrr = monthlyData.find(m => m._id.year === now.getFullYear() && m._id.month === (now.getMonth() + 1))?.revenue || 0;

      return {
        totalRevenue,
        avgTransactionValue: avgResult[0]?.avg || 0,
        monthlyRevenue: monthlyData.map(i => ({ month: `${i._id.year}-${String(i._id.month).padStart(2, "0")}`, revenue: i.revenue })),
        topPaymentModes: modesData.map(i => ({ mode: i._id || "Other", count: i.count, revenue: i.revenue })),
        mrr,
        paidUsersCount
      };
    })(),

    // 4. Coupon Stats
    (async () => {
      const [active, expired, byType, totalDisc] = await Promise.all([
        Coupons.countDocuments({ expiry: { $gt: now } }),
        Coupons.countDocuments({ expiry: { $lte: now } }),
        Coupons.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),
        Coupons.aggregate([{ $group: { _id: null, total: { $sum: "$discount" } } }])
      ]);
      return { activeCoupons: active, expiredCoupons: expired, couponsByType: byType.map(i => ({ type: i._id, count: i.count })), totalDiscount: (totalDisc[0]?.total || 0) / 2 };
    })(),

    // 5. Today's Stats
    (async () => {
      const [todayUsers, todayResumes, todayRev] = await Promise.all([
        User.countDocuments({ createdAt: { $gte: startOfToday } }),
        Resume.countDocuments({ createdAt: { $gte: startOfToday } }),
        Payment.aggregate([{ $match: { createdAt: { $gte: startOfToday }, status: "SUCCESS" } }, { $group: { _id: null, total: { $sum: "$amount" } } }])
      ]);
      return { todayNewUsers: todayUsers, todayResumes: todayResumes, todayRevenue: todayRev[0]?.total || 0 };
    })()
  ]);

  // Now calculate dependent metrics safely
  const paymentStats = {
    ...paymentStatsRaw,
    mrr: paymentStatsRaw.mrr,
    arpu: userStats.totalUsers > 0 ? +(paymentStatsRaw.totalRevenue / userStats.totalUsers).toFixed(2) : 0,
    conversionRate: userStats.totalUsers > 0 ? +((paymentStatsRaw.paidUsersCount / userStats.totalUsers) * 100).toFixed(2) : 0
  };

  const responseData = {
    userStats,
    resumeStats,
    paymentStats,
    todayStats,
    couponStats
  };

  await redis.set(cacheKey, JSON.stringify(responseData), "EX", 320);

  return NextResponse.json(new apiResponse(200, "data fetch successfully", responseData), { status: 200 });
};


const timeRangeObject = {
  today: () => new Date(new Date().setHours(0, 0, 0, 0)),
  "7d": () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  "30d": () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  "90d": () => new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  all: () => null,
};

function getDateRange(timeRange, customStart, customEnd) {
  const now = new Date();
  if (timeRange === "custom" && customStart) {
    return {
      startDate: new Date(customStart),
      endDate: customEnd ? new Date(customEnd) : now,
    };
  }
  const startDate = timeRangeObject[timeRange] ? timeRangeObject[timeRange]() : null;
  return { startDate, endDate: now };
}


