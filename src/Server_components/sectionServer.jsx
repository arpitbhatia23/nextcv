"use server";
import Payment from "@/models/payment.model.js";
import User from "@/models/user.model";
import dbConnect from "@/utils/dbConnect";

const sectionServer = async () => {
  await dbConnect();

  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // day before this month

  // === NEW USERS ===
  const currentNewUsers = await User.countDocuments({
    createdAt: { $gte: startOfCurrentMonth },
  });

  const lastNewUsers = await User.countDocuments({
    createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
  });

  const newUserGrowth =
    lastNewUsers > 0
      ? +(((currentNewUsers - lastNewUsers) / lastNewUsers) * 100).toFixed(2)
      : null;

  // === ACTIVE USERS ===
  const currentActiveUsers = await User.countDocuments({
    lastActive: { $gte: startOfCurrentMonth },
  });

  const lastActiveUsers = await User.countDocuments({
    lastActive: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
  });

  const activeUserGrowth =
    lastActiveUsers > 0
      ? +(
          ((currentActiveUsers - lastActiveUsers) / lastActiveUsers) *
          100
        ).toFixed(2)
      : null;

  // === PAYMENTS ===
  const paymentThisMonth = await Payment.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfCurrentMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const paymentLastMonth = await Payment.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const currentPayment = paymentThisMonth[0] || { totalAmount: 0, count: 0 };
  const lastPayment = paymentLastMonth[0] || { totalAmount: 0, count: 0 };

  const paymentGrowth =
    lastPayment.totalAmount > 0
      ? +(
          ((currentPayment.totalAmount - lastPayment.totalAmount) /
            lastPayment.totalAmount) *
          100
        ).toFixed(2)
      : null;

  // === MONTHLY PAYMENTS (full history for chart) ===
  const monthlyPayments = await Payment.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);

  // === USER GROWTH TREND ===
  const rawGrowth = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        newUsers: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const userGrowth = rawGrowth
    .map((item, index, arr) => {
      const prev = arr[index - 1];
      const growthRate =
        prev && prev.newUsers > 0
          ? ((item.newUsers - prev.newUsers) / prev.newUsers) * 100
          : null;

      return {
        ...item,
        growthRate: growthRate !== null ? +growthRate.toFixed(2) : null,
      };
    })
    .reverse();

  return {
    monthlyPayments,
    newUsers: currentNewUsers,
    newUserGrowth,
    activeUsers: currentActiveUsers,
    activeUserGrowth,
    paymentThisMonth: currentPayment.totalAmount,
    paymentGrowth,
    userGrowth,
  };
};

export default sectionServer;
