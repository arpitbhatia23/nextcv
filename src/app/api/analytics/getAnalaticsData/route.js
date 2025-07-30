import Coupons from "@/models/coupon";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/payment.model";
import { VisitorStats } from "@/models/VisitorStats.model";
import User from "@/models/user.model";
import Resume from "@/models/resume.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/options";
const now = new Date();

const timeRangeObject = {
  "7d": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
  "30d": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
  90: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
  all: null,
};

function formatDate(date) {
  return date.toISOString().split("T")[0];
}
// Helper function to get date range based on time filter
function getDateRange(timeRange) {
  const now = new Date();
  let startDate = timeRangeObject[timeRange];

  return { startDate, endDate: now };
}

const handler = async (req) => {
  const { timeRange = "all" } = await req.json();
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session && session?.user.role !== "admin") {
      throw new apiError(401, "unauthorized acess");
    }
    const { startDate } = getDateRange(timeRange);

    // Base query for time filtering
    const timeQuery = startDate ? { createdAt: { $gte: startDate } } : {};
    const activeUserQuery = {
      lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    };

    console.log(timeQuery);
    // User Analytics
    const [totalUsers, activeUsers, adminCount] = await Promise.all([
      User.countDocuments(timeQuery),
      User.countDocuments({ ...activeUserQuery }),
      User.countDocuments({ ...timeQuery, role: "admin" }),
    ]);

    // User growth over time (last 30 days)
    const userGrowthData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const userGrowth = userGrowthData.map((item) => ({
      date: item._id,
      users: item.users,
    }));

    // Resume Analytics
    const [totalResumes, paidResumes, draftResumes] = await Promise.all([
      Resume.countDocuments(timeQuery),
      Resume.countDocuments({ ...timeQuery, status: "paid" }),
      Resume.countDocuments({ ...timeQuery, status: "draft" }),
    ]);

    // Top Resume Types
    const topResumeTypesData = await Resume.aggregate([
      { $match: timeQuery },
      { $group: { _id: "$jobRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const topResumeTypes = topResumeTypesData.map((item) => ({
      type: item._id || "Other",
      count: item.count,
    }));

    // Top Skills
    const topSkillsData = await Resume.aggregate([
      { $match: timeQuery },
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 },
    ]);

    const topSkills = topSkillsData.map((item) => ({
      skill: item._id,
      count: item.count,
    }));

    // Top Job Roles
    const topJobRolesData = await Resume.aggregate([
      { $match: timeQuery },
      { $group: { _id: "$jobRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const topJobRoles = topJobRolesData.map((item) => ({
      role: item._id || "Other",
      count: item.count,
    }));

    // Top Technologies from Projects
    const topTechnologiesData = await Resume.aggregate([
      { $match: timeQuery },
      { $unwind: "$projects" },
      { $unwind: "$projects.technologies" },
      { $group: { _id: "$projects.technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 },
    ]);

    const topTechnologies = topTechnologiesData.map((item) => ({
      tech: item._id,
      count: item.count,
    }));

    // Payment Analytics
    const paymentTimeQuery = startDate
      ? { createdAt: { $gte: startDate } }
      : {};

    const [totalRevenueResult, avgTransactionResult] = await Promise.all([
      Payment.aggregate([
        { $match: paymentTimeQuery },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.aggregate([
        { $match: paymentTimeQuery },
        { $group: { _id: null, avg: { $avg: "$amount" } } },
      ]),
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const avgTransactionValue = avgTransactionResult[0]?.avg || 0;

    // Monthly Revenue Chart (last 12 months)
    const monthlyRevenueData = await Payment.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyRevenue = monthlyRevenueData.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      revenue: item.revenue,
    }));

    // Top Payment Modes
    const topPaymentModesData = await Payment.aggregate([
      { $match: paymentTimeQuery },
      {
        $group: {
          _id: "$paymentMode",
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const topPaymentModes = topPaymentModesData.map((item) => ({
      mode: item._id || "Other",
      count: item.count,
      revenue: item.revenue,
    }));

    // Coupon Analytics
    const now = new Date();
    const [activeCoupons, expiredCoupons] = await Promise.all([
      Coupons.countDocuments({ expiry: { $gt: now } }),
      Coupons.countDocuments({ expiry: { $lte: now } }),
    ]);

    // Coupon types breakdown
    const couponsByTypeData = await Coupons.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    const couponsByType = couponsByTypeData.map((item) => ({
      type: item._id,
      count: item.count,
    }));

    // Total discount given (this would require tracking usage, for now we'll estimate)
    const totalDiscountResult = await Coupons.aggregate([
      {
        $group: {
          _id: null,
          totalDiscount: { $sum: "$discount" },
        },
      },
    ]);

    const totalDiscount = totalDiscountResult[0]?.totalDiscount / 2 || 0;

    // Visitor Analytics
    const visitorTimeQuery = startDate ? { date: { $gte: startDate } } : {};

    const [totalVisitorsResult, dailyVisitorsData] = await Promise.all([
      VisitorStats.aggregate([
        { $match: visitorTimeQuery },
        { $group: { _id: null, total: { $sum: "$count" } } },
      ]),
      VisitorStats.find(visitorTimeQuery).sort({ date: 1 }).limit(90).lean(),
    ]);

    const totalVisitors = totalVisitorsResult[0]?.total || 0;

    const dailyVisitors = dailyVisitorsData.map((item) => ({
      date: formatDate(new Date(item.date)),
      visitors: item.count,
    }));

    // Weekly trends (group daily data into weeks)
    const weeklyTrendsData = await VisitorStats.aggregate([
      {
        $match: {
          date: { $gte: new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $week: "$date" },
          visitors: { $sum: "$count" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 8 },
    ]);

    const weeklyTrends = weeklyTrendsData.map((item, index) => ({
      week: `Week ${item._id}`,
      visitors: item.visitors,
    }));

    return NextResponse.json(
      new apiResponse(200, "data etch sucesfully", {
        userStats: {
          totalUsers,
          activeUsers,
          adminCount,
          userGrowth,
        },
        resumeStats: {
          totalResumes,
          paidResumes,
          draftResumes,
          topResumeTypes,
          topSkills,
          topJobRoles,
          topTechnologies,
        },
        paymentStats: {
          totalRevenue,
          monthlyRevenue,
          avgTransactionValue,
          topPaymentModes,
        },
        couponStats: {
          activeCoupons,
          expiredCoupons,
          couponsByType,
          totalDiscount,
        },
        visitorStats: {
          totalVisitors,
          dailyVisitors,
          weeklyTrends,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw new Error("Failed to fetch analytics data");
  }
};

export const POST = asyncHandler(handler);
