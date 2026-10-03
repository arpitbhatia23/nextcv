"use client";
import { IconTrendingDown, IconTrendingUp, IconRefresh } from "@tabler/icons-react";
import sectionServer from "@/Server_components/sectionServer";
import { useEffect, useState } from "react";
import { IndianRupee, Users, Target, Zap, FileText } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

function GrowthMark({ value }) {
  if (value === null || value === undefined) return null;
  const isUp = value >= 0;
  return (
    <span
      className={`font-mono text-[11px] tracking-wide inline-flex items-center gap-1 font-medium ${
        isUp ? "text-emerald-700" : "text-amber-800"
      }`}
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
    <div className="bg-[#F8F7F3] px-3 py-4 sm:px-6 lg:px-8 space-y-6">
      <FontImports />

      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-[#E3E2DC]">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-[#465B9E] mb-1">
            EXECUTIVE OVERVIEW
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#17201C]">
            Performance Report
          </h2>
          <p className="text-xs sm:text-sm text-[#5B625C] mt-1">
            Real-time business telemetry and user conversion statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range picker */}
          <div className="flex items-center p-1 bg-white border border-[#E3E2DC] rounded-xl shadow-xs">
            {ranges.map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
                  range === r
                    ? "bg-[#465B9E] text-white shadow-xs"
                    : "text-[#5B625C] hover:text-[#17201C] hover:bg-[#F1F0EB]"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="border border-[#E3E2DC] bg-white p-2 rounded-xl text-[#5B625C] hover:text-[#17201C] hover:bg-[#F1F0EB] transition-colors disabled:opacity-50"
            title="Refresh statistics"
          >
            <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Today's quick stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Revenue */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#66706B] uppercase">
              Today&apos;s Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 font-display text-3xl font-semibold text-[#17201C]">
            <IndianRupee className="h-5 w-5 text-[#465B9E]" />
            {data?.metrics?.todayRevenue || 0}
          </div>
          <p className="text-[11px] text-[#8A908B] mt-2">Gross payments received today</p>
        </div>

        {/* New Users */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#66706B] uppercase">
              New Signups Today
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="font-display text-3xl font-semibold text-[#17201C]">
            {data?.metrics?.todayNewUsers || 0}
          </div>
          <p className="text-[11px] text-[#8A908B] mt-2">Candidates registered in last 24h</p>
        </div>

        {/* Conversion Rate */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#66706B] uppercase">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="font-display text-3xl font-semibold text-[#17201C]">
              {data?.metrics?.conversionRate || 0}%
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#8A908B]">GOAL 5%</span>
          </div>
          <p className="text-[11px] text-[#8A908B] mt-2">Visitor to paid download conversion</p>
        </div>
      </div>

      {/* Ledger rows — clean card container */}
      <div className="bg-white rounded-2xl border border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E3E2DC] bg-[#F8F7F3]/50 flex items-center justify-between">
          <h3 className="font-mono text-[11px] tracking-wider text-[#66706B] uppercase">
            Metrics Breakdown &middot; {range.toUpperCase()}
          </h3>
          <span className="text-xs text-[#8A908B]">Audited values</span>
        </div>

        <div className="divide-y divide-[#E3E2DC]">
          <LedgerRow
            label="Revenue (Range)"
            value={
              <span className="inline-flex items-center gap-1">
                <IndianRupee className="h-4 w-4 text-[#465B9E]" />
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

      {/* Pro services banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#C8CDD9] bg-[#EEF0F7]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#465B9E] flex items-center justify-center shrink-0 text-white shadow-xs">
            <FileText className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-widest text-[#465B9E] font-semibold mb-0.5">
              PRO ENGAGEMENT
            </p>
            <p className="text-sm font-medium text-[#17201C]">
              Send automated follow-up reminders to unfinished drafts
            </p>
          </div>
        </div>
        <button
          onClick={sendReminders}
          className="rounded-xl px-5 py-2.5 font-sans text-xs font-medium text-white transition hover:bg-[#344B93] bg-[#465B9E] shadow-xs shrink-0"
        >
          Send Bulk Reminders
        </button>
      </div>
    </div>
  );
}

function LedgerRow({ label, value, growth, note }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 hover:bg-[#F8F7F3]/40 transition-colors">
      <div className="flex-1">
        <p className="font-sans text-xs font-semibold text-[#17201C] mb-0.5">
          {label}
        </p>
        <p className="text-xs text-[#8A908B]">{note}</p>
      </div>
      <div className="flex items-center gap-4 sm:justify-end sm:min-w-45">
        <div className="font-display text-xl font-semibold text-[#17201C] tabular-nums">
          {value}
        </div>
        <GrowthMark value={growth} />
      </div>
    </div>
  );
}

export default SectionCards;
