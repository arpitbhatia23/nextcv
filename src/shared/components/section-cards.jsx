"use client";
import { IconTrendingDown, IconTrendingUp, IconRefresh } from "@tabler/icons-react";
import sectionServer from "@/Server_components/sectionServer";
import { useEffect, useState } from "react";
import { IndianRupee, Users, Target, Zap, FileText } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

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

function GrowthMark({ value }) {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <span
      className="font-mono text-[11px] tracking-widest inline-flex items-center gap-1"
      style={{ color: isUp ? "#0F6E63" : RUST }}
    >
      {isUp ? <IconTrendingUp className="h-3 w-3" /> : <IconTrendingDown className="h-3 w-3" />}
      {isUp ? "+" : ""}
      {value}%
    </span>
  );
}

function SectionCards() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  const fetchData = async (r = range) => {
    setLoading(true);
    try {
      const res = await sectionServer({ range: r });
      setData(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [range]);

  const sendReminders = async () => {
    try {
      const res = await axios.get("/api/admin/set-remider");
      toast.success(res?.data?.message || "Reminders sent");
    } catch (err) {
      toast.error("Failed to send reminders");
    }
  };

  const ranges = ["today", "7d", "30d", "90d", "all"];

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
            LEDGER &amp; ACCOUNT SUMMARY
          </div>
          <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
            Performance Report
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex border font-mono text-[11px] tracking-widest overflow-x-auto"
            style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            {ranges.map((r, i) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="px-3 py-2 whitespace-nowrap transition"
                style={{
                  color: range === r ? "#FFFFFF" : MUTE,
                  backgroundColor: range === r ? INK : "transparent",
                  borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                }}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="border p-2.5 transition disabled:opacity-50"
            style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <IconRefresh
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              style={{ color: INK }}
            />
          </button>
        </div>
      </div>

      {/* Today's quick stats — treated like a stamped receipt strip */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-0 border mb-6"
        style={{ borderColor: INK }}
      >
        <div
          className="p-5 relative overflow-hidden"
          style={{ backgroundColor: INK, borderRight: `1px solid ${INK}` }}
        >
          <Zap className="absolute -right-3 -bottom-3 h-20 w-20 text-white/5" strokeWidth={1} />
          <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: "#B7B5AC" }}>
            TODAY&apos;S REVENUE
          </p>
          <div className="flex items-baseline gap-1 font-display text-2xl font-semibold text-white">
            <IndianRupee className="h-4 w-4" />
            {data?.metrics?.todayRevenue || 0}
          </div>
        </div>

        <div
          className="p-5 relative overflow-hidden border-t sm:border-t-0"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: LINE,
            borderRight: `1px solid ${LINE}`,
          }}
        >
          <Users
            className="absolute -right-3 -bottom-3 h-20 w-20"
            style={{ color: LINE }}
            strokeWidth={1}
          />
          <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: MUTE }}>
            NEW SIGNUPS TODAY
          </p>
          <div className="font-display text-2xl font-semibold" style={{ color: INK }}>
            {data?.metrics?.todayNewUsers || 0}
          </div>
        </div>

        <div
          className="p-5 border-t sm:border-t-0"
          style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
              CONVERSION RATE
            </p>
            <Target className="h-3.5 w-3.5" style={{ color: FAINT }} />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="font-display text-2xl font-semibold" style={{ color: INK }}>
              {data?.metrics?.conversionRate || 0}%
            </div>
            <span className="font-mono text-[10px] tracking-widest" style={{ color: FAINT }}>
              GOAL 5%
            </span>
          </div>
        </div>
      </div>

      {/* Ledger rows — replaces the card grid, reads like archived entries */}
      <div className="mb-4">
        <h2 className="font-mono text-[10px] tracking-widest mb-3" style={{ color: MUTE }}>
          FILED UNDER &middot; {range.toUpperCase()}
        </h2>

        <div className="border divide-y" style={{ borderColor: LINE }}>
          <LedgerRow
            label="Revenue (Range)"
            value={
              <span className="inline-flex items-center gap-1">
                <IndianRupee className="h-4 w-4" style={{ color: RUST }} />
                {data?.paymentThisMonth || 0}
              </span>
            }
            growth={data?.paymentGrowth}
            note="Previous period comparison"
          />
          <LedgerRow
            label="New Users"
            value={data?.newUsers || 0}
            growth={data?.newUserGrowth}
            note={data?.newUserGrowth >= 0 ? "Retention positive" : "Needs acquisition review"}
          />
          <LedgerRow
            label="Active Reach"
            value={data?.activeUsers || 0}
            growth={data?.activeUserGrowth}
            note="Active users in selected range"
          />
          <LedgerRow
            label="Growth Rate"
            value={`${data?.userGrowth?.[0]?.growthRate || 0}%`}
            growth={data?.userGrowth?.[0]?.growthRate}
            note="Overall acquisition momentum"
            last
          />
        </div>
      </div>

      {/* Pro services callout */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border"
        style={{ borderColor: RUST, backgroundColor: "#FBF3F1" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 flex items-center justify-center shrink-0"
            style={{ backgroundColor: RUST }}
          >
            <FileText className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color: RUST }}>
              PRO SERVICES
            </p>
            <p className="text-sm font-medium" style={{ color: INK }}>
              Send personalized follow-ups to inactive users
            </p>
          </div>
        </div>
        <button
          onClick={sendReminders}
          className="rounded-none px-5 py-2.5 font-mono text-xs tracking-widest text-white transition hover:opacity-90 shrink-0"
          style={{ backgroundColor: RUST }}
        >
          SEND BULK REMINDERS
        </button>
      </div>
    </div>
  );
}

function LedgerRow({ label, value, growth, note, last }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex-1">
        <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color: MUTE }}>
          {label.toUpperCase()}
        </p>
        <p className="text-[11px]" style={{ color: FAINT }}>
          {note}
        </p>
      </div>
      <div className="flex items-center gap-4 sm:justify-end sm:min-w-45">
        <div className="font-display text-xl font-semibold tabular-nums" style={{ color: INK }}>
          {value}
        </div>
        <GrowthMark value={growth} />
      </div>
    </div>
  );
}

export default SectionCards;
