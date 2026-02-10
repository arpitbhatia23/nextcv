"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CouponStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.post("/api/analytics/coupons");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching coupon stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  console.log(stats);
  if (loading) {
    return <div className="p-4 text-center">Loading coupon analytics...</div>;
  }

  // Determine top performer
  const topCoupon = stats.length > 0 ? stats[0] : null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Coupon Performance (Revenue)</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="_id" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Revenue"]}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="totalRevenue"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Top Performing Coupon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-600" />
              {topCoupon ? topCoupon._id : "N/A"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {topCoupon ? `${topCoupon.usageCount} uses` : "No data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Coupon Usage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.slice(0, 5).map((stat) => (
              <div key={stat._id} className="flex items-center">
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stat._id}</span>
                    <span className="text-sm text-slate-500">
                      {stat.usageCount} uses
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Revenue: ₹{stat.totalRevenue}</span>
                    <span>Discounts: ₹{stat.totalDiscountGiven}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{
                        width: `${(stat.totalRevenue / (stats[0]?.totalRevenue || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CouponStats;
