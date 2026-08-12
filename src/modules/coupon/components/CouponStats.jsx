"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* Fonts match the Correspondence Archive letterhead:
   Fraunces for display numerals, IBM Plex Mono for labels / codes. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const INK = "#1C2333";
const RUST = "#B3382C";
const PAPER = "#F7F7F5";
const LINE = "#E4E2DC";
const MUTE = "#6B7280";
const FAINT = "#B7B5AC";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border px-3 py-2" style={{ backgroundColor: "#FFFFFF", borderColor: INK }}>
      <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color: MUTE }}>
        {label}
      </p>
      <p className="font-display text-sm font-semibold" style={{ color: INK }}>
        ₹{payload[0].value}
      </p>
    </div>
  );
}

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

  const topCoupon = stats.length > 0 ? stats[0] : null;

  if (loading) {
    return (
      <div style={{ backgroundColor: PAPER }} className="px-3 py-6 sm:px-4 lg:px-6">
        <FontImports />
        <div
          className="border p-10 text-center"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
            RETRIEVING COUPON LEDGER&hellip;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: PAPER }} className="px-3 py-6 sm:px-4 lg:px-6">
      <FontImports />

      {/* Letterhead */}
      <div
        className="mb-6 pb-5 border-b-2 flex flex-wrap items-end justify-between gap-4"
        style={{ borderColor: INK }}
      >
        <div>
          <div className="font-mono text-[11px] tracking-widest mb-2" style={{ color: RUST }}>
            PROMOTIONAL LEDGER
          </div>
          <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
            Coupon Performance
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Revenue chart */}
        <div
          className="lg:col-span-4 border p-5"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <h2 className="font-mono text-[10px] tracking-widest mb-4" style={{ color: MUTE }}>
            REVENUE BY COUPON
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
              <XAxis
                dataKey="_id"
                stroke={FAINT}
                fontSize={11}
                fontFamily="'IBM Plex Mono', monospace"
                tickLine={false}
              />
              <YAxis
                stroke={FAINT}
                fontSize={11}
                fontFamily="'IBM Plex Mono', monospace"
                tickFormatter={value => `₹${value}`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F7F7F5" }} />
              <Bar dataKey="totalRevenue" fill={INK} radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Side column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top performer — receipt-style stamp */}
          <div className="border" style={{ borderColor: INK, backgroundColor: INK }}>
            <div className="p-5">
              <p
                className="font-mono text-[10px] tracking-widest mb-2"
                style={{ color: "#B7B5AC" }}
              >
                TOP PERFORMING COUPON
              </p>
              <div className="flex items-center gap-2 font-display text-2xl font-semibold text-white">
                <Tag className="w-5 h-5" style={{ color: RUST }} />
                {topCoupon ? topCoupon._id : "N/A"}
              </div>
              <p className="font-mono text-[11px] mt-2" style={{ color: "#B7B5AC" }}>
                {topCoupon ? `${topCoupon.usageCount} REDEMPTIONS` : "NO DATA ON FILE"}
              </p>
            </div>
          </div>

          {/* Usage details — ledger rows */}
          <div>
            <h2 className="font-mono text-[10px] tracking-widest mb-3" style={{ color: MUTE }}>
              USAGE DETAILS
            </h2>
            <div className="border divide-y" style={{ borderColor: LINE }}>
              {stats.slice(0, 5).map(stat => {
                const pct = (stat.totalRevenue / (stats[0]?.totalRevenue || 1)) * 100;
                return (
                  <div key={stat._id} className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs tracking-widest" style={{ color: INK }}>
                        {stat._id}
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: MUTE }}>
                        {stat.usageCount} USES
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between text-[11px] mb-2"
                      style={{ color: FAINT }}
                    >
                      <span>Revenue: ₹{stat.totalRevenue}</span>
                      <span>Discounts: ₹{stat.totalDiscountGiven}</span>
                    </div>
                    <div className="h-1.5 w-full" style={{ backgroundColor: "#F0EFEA" }}>
                      <div className="h-full" style={{ width: `${pct}%`, backgroundColor: RUST }} />
                    </div>
                  </div>
                );
              })}
              {stats.length === 0 && (
                <div className="p-6 text-center" style={{ backgroundColor: "#FFFFFF" }}>
                  <p className="font-mono text-[11px] tracking-widest" style={{ color: FAINT }}>
                    NO COUPON ACTIVITY RECORDED
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponStats;
