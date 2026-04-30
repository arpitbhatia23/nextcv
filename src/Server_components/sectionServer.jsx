"use server";
import Payment from "@/modules/payment/model/payment.model.js";
import { User } from "@/modules/auth";
import dbConnect from "@/shared/utils/dbConnect";
import { redis } from "@/shared/utils/Redis";

const sectionServer = async (params = {}) => {
  const { range = "30d", customStart, customEnd } = params;
  await dbConnect();

  const cacheKey = `admin:summary:${range}:${customStart || ""}:${customEnd || ""}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);
  } catch (err) {
    console.error("Redis error:", err);
  }

  const now = new Date();
  let startDate,
    endDate = now;

  // Range Logic
  if (range === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (range === "7d") {
    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (range === "30d") {
    startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  } else if (range === "90d") {
    startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  } else if (range === "all") {
    startDate = null;
  } else if (range === "custom" && customStart) {
    startDate = new Date(customStart);
    if (customEnd) endDate = new Date(customEnd);
  } else {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1); // fallback to this month
  }

  // Queries
  const timeQuery = startDate ? { createdAt: { $gte: startDate, $lte: endDate } } : {};
  const activeQuery = startDate ? { lastActive: { $gte: startDate, $lte: endDate } } : {};
  const paymentQuery = startDate ? { createdAt: { $gte: startDate, $lte: endDate }, status: "SUCCESS" } : { status: "SUCCESS" };

  // Last Period Queries (only if startDate exists)
  let lastTimeQuery = {}, lastActiveQuery = {}, lastPaymentQuery = { status: "SUCCESS" };
  if (startDate) {
    const startOfLastMonth = new Date(startDate);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    const endOfLastMonth = new Date(startDate);
    lastTimeQuery = { createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth } };
    lastActiveQuery = { lastActive: { $gte: startOfLastMonth, $lt: endOfLastMonth } };
    lastPaymentQuery = { createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }, status: "SUCCESS" };
  }


  const [
    currentNewUsers,
    lastNewUsers,
    todayNewUsers,
    currentActiveUsers,
    lastActiveUsers,
    totalUsers,
    paymentCurrentRangeData,
    paymentLastRangeData,
    paymentTodayData,
    monthlyPaymentsRaw,
    rawGrowth,
    paidUsersCount,
  ] = await Promise.all([
    // New Users
    User.countDocuments(timeQuery),
    User.countDocuments(lastTimeQuery),
    User.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),

    // Active Users
    User.countDocuments(activeQuery),
    User.countDocuments(lastActiveQuery),

    // Total Users
    User.countDocuments({}),

    // Payments This Range
    Payment.aggregate([
      { $match: paymentQuery },
      { $group: { _id: null, totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),

    // Payments Last Range
    Payment.aggregate([
      { $match: lastPaymentQuery },
      { $group: { _id: null, totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),

    // Payments Today
    Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
          status: "SUCCESS",
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),


    // Monthly Payments
    Payment.aggregate([
      { $match: { status: "SUCCESS" } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),

    // User Growth Trend
    User.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          newUsers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),

    // Paid Users
    Payment.distinct("userId", { status: "SUCCESS" }).then(users => users.length),
  ]);

  // Process Results
  const currentPayment = paymentCurrentRangeData[0] || { totalAmount: 0, count: 0 };
  const lastPayment = paymentLastRangeData[0] || { totalAmount: 0, count: 0 };
  const todayPaymentResult = paymentTodayData[0] || { totalAmount: 0, count: 0 };

  const calculateGrowth = (current, last) =>
    last > 0 ? +(((current - last) / last) * 100).toFixed(2) : 0;

  const result = {
    monthlyPayments: monthlyPaymentsRaw.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
      totalAmount: item.totalAmount,
    })),
    newUsers: currentNewUsers,
    newUserGrowth: calculateGrowth(currentNewUsers, lastNewUsers),
    activeUsers: currentActiveUsers,
    activeUserGrowth: calculateGrowth(currentActiveUsers, lastActiveUsers),
    paymentThisMonth: currentPayment.totalAmount,
    paymentGrowth: calculateGrowth(currentPayment.totalAmount, lastPayment.totalAmount),
    userGrowth: rawGrowth
      .map((item, idx, arr) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        growthRate: calculateGrowth(item.newUsers, arr[idx - 1]?.newUsers || 0),
      }))
      .reverse(),
    metrics: {
      mrr: currentPayment.totalAmount,
      arpu:
        currentActiveUsers > 0 ? +(currentPayment.totalAmount / currentActiveUsers).toFixed(2) : 0,
      conversionRate: totalUsers > 0 ? +((paidUsersCount / totalUsers) * 100).toFixed(2) : 0,
      todayRevenue: todayPaymentResult.totalAmount,
      todayNewUsers,
    },
  };

  try {
    await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
  } catch (err) {
    console.error("Redis set error:", err);
  }

  return result;
};

export default sectionServer;
