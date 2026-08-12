"use client";
import { memo, Suspense, useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  Calendar,
  Download,
  Activity,
  DollarSign,
  Award,
  Target,
  IndianRupee,
  Zap,
  Mail,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { exportAnalyticsCSV } from "@/shared/lib/gencsv";

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

/* Charted lines/wedges cycle through ink, rust, and three muted supporting
   tones so multi-series charts stay legible without leaving the palette. */
const COLORS = [INK, RUST, "#7A8471", "#8C7A66", "#5B7A8C", "#A8896F"];

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="border p-4" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
          {title.toUpperCase()}
        </p>
        <Icon className="h-3.5 w-3.5" style={{ color: FAINT }} />
      </div>
      <div className="font-display text-xl sm:text-2xl font-semibold" style={{ color: INK }}>
        {value}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border px-3 py-2" style={{ backgroundColor: "#FFFFFF", borderColor: INK }}>
      {label && (
        <p className="font-mono text-[10px] tracking-widest mb-1" style={{ color: MUTE }}>
          {label}
        </p>
      )}
      {payload.map((p, i) => (
        <p key={i} className="font-display text-sm font-semibold" style={{ color: INK }}>
          {p.name ? `${p.name}: ` : ""}
          {prefix}
          {p.value}
        </p>
      ))}
    </div>
  );
}

const RevenueChart = memo(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={LINE} vertical={false} />
        <XAxis
          dataKey="month"
          stroke={FAINT}
          tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
          tickLine={false}
        />
        <YAxis
          stroke={FAINT}
          tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip prefix="₹" />} cursor={{ stroke: LINE }} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={RUST}
          strokeWidth={2}
          dot={{ fill: RUST, strokeWidth: 0, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});
RevenueChart.displayName = "RevenueChart";

const PieChartComponent = memo(({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={!isMobile}
          label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={isMobile ? 65 : 80}
          innerRadius={isMobile ? 40 : 0}
          paddingAngle={isMobile ? 3 : 0}
          dataKey="value"
          stroke="#FFFFFF"
          strokeWidth={2}
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: 10, paddingTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}
          iconType="square"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});
PieChartComponent.displayName = "PieChartComponent";

function SectionHeader({ icon: Icon, title, onExport }) {
  return (
    <div
      className="flex items-center justify-between mb-5 pb-3 border-b"
      style={{ borderColor: LINE }}
    >
      <h2
        className="font-mono text-[11px] tracking-widest flex items-center gap-2"
        style={{ color: INK }}
      >
        <Icon className="h-4 w-4" style={{ color: RUST }} />
        {title.toUpperCase()}
      </h2>
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] tracking-widest transition hover:bg-[#F7F7F5]"
        style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
      >
        <Download className="h-3 w-3" />
        <span className="hidden sm:inline">EXPORT</span>
      </button>
    </div>
  );
}

function AnalyticsDashboard({ timeRange = "all", customStart, customEnd }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/analytics/getAnalaticsData", {
          params: {
            timeRange,
            customStart,
            customEnd,
          },
        });
        setData(res?.data?.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange, customStart, customEnd]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-64 border"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
          COMPILING LEDGER&hellip;
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="border p-10 text-center"
        style={{ borderColor: RUST, backgroundColor: "#FBF3F1" }}
      >
        <p className="font-mono text-xs tracking-widest" style={{ color: RUST }}>
          {error.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Today's Snapshot ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 border" style={{ borderColor: INK }}>
        <div
          className="p-5 relative overflow-hidden border-b md:border-b-0 md:border-r"
          style={{ backgroundColor: INK, borderColor: INK }}
        >
          <Zap className="absolute -right-3 -bottom-3 h-20 w-20 text-white/5" strokeWidth={1} />
          <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: "#B7B5AC" }}>
            TODAY&apos;S REVENUE
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold flex items-center gap-1 text-white">
            <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6" />
            {data?.todayStats?.todayRevenue || 0}
          </h3>
          <p className="font-mono text-[10px] mt-2" style={{ color: "#8B90A0" }}>
            UPDATED JUST NOW
          </p>
        </div>
        <div
          className="p-5 relative overflow-hidden border-b md:border-b-0 md:border-r"
          style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
        >
          <Users
            className="absolute -right-3 -bottom-3 h-20 w-20"
            style={{ color: LINE }}
            strokeWidth={1}
          />
          <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: MUTE }}>
            TODAY&apos;S NEW USERS
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold" style={{ color: INK }}>
            {data?.todayStats?.todayNewUsers || 0}
          </h3>
          <p className="font-mono text-[10px] mt-2" style={{ color: FAINT }}>
            TRACKING ACQUISITION
          </p>
        </div>
        <div className="p-5 relative overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
          <Target
            className="absolute -right-3 -bottom-3 h-20 w-20"
            style={{ color: LINE }}
            strokeWidth={1}
          />
          <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: MUTE }}>
            CONVERSION RATE
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold" style={{ color: RUST }}>
            {data?.paymentStats?.conversionRate || 0}%
          </h3>
          <p className="font-mono text-[10px] mt-2" style={{ color: FAINT }}>
            PAID VS FREE USERS
          </p>
        </div>
      </section>

      {/* ── Users ── */}
      <section
        className="border p-4 sm:p-5"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <SectionHeader
          icon={Users}
          title="User Analytics"
          onExport={() => exportAnalyticsCSV({ data, section: "users" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <MetricCard
            title="Total Users"
            value={data?.userStats?.totalUsers?.toLocaleString()}
            icon={Users}
          />
          <MetricCard
            title="Active Users (Recent)"
            value={data?.userStats?.activeUsers?.toLocaleString()}
            icon={Activity}
          />
          <MetricCard
            title="Admin Users"
            value={data?.userStats?.adminCount?.toLocaleString()}
            icon={Award}
          />
        </div>
      </section>

      {/* ── Payment ── */}
      <section
        className="border p-4 sm:p-5"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <SectionHeader
          icon={CreditCard}
          title="Payment & Revenue"
          onExport={() => exportAnalyticsCSV({ data, section: "payments" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
          <MetricCard
            title="Total Revenue"
            value={`₹${data?.paymentStats?.totalRevenue?.toLocaleString()}`}
            icon={IndianRupee}
          />
          <MetricCard
            title="This Month (MRR)"
            value={`₹${data?.paymentStats?.mrr?.toLocaleString()}`}
            icon={TrendingUp}
          />
          <MetricCard title="ARPU" value={`₹${data?.paymentStats?.arpu || 0}`} icon={DollarSign} />
          <MetricCard
            title="Avg Ticket"
            value={`₹${data?.paymentStats?.avgTransactionValue?.toFixed(2)}`}
            icon={Activity}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="border" style={{ borderColor: LINE }}>
            <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: LINE }}>
              <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
                MONTHLY REVENUE TREND
              </p>
            </div>
            <div className="px-2 pb-2">
              <RevenueChart data={data?.paymentStats?.monthlyRevenue} />
            </div>
          </div>
          <div className="border" style={{ borderColor: LINE }}>
            <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: LINE }}>
              <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
                PAYMENT METHODS
              </p>
            </div>
            <div className="px-2 pb-2">
              <PieChartComponent
                data={data?.paymentStats?.topPaymentModes?.map(mode => ({
                  name: mode.mode,
                  value: mode.revenue,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Resumes ── */}
      <section
        className="border p-4 sm:p-5"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <SectionHeader
          icon={FileText}
          title="Content Analytics"
          onExport={() => exportAnalyticsCSV({ data, section: "resumes" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
          <MetricCard
            title="Total Resumes"
            value={data?.resumeStats?.totalResumes?.toLocaleString()}
            icon={FileText}
          />
          <MetricCard
            title="Paid Resumes"
            value={data?.resumeStats?.paidResumes?.toLocaleString()}
            icon={DollarSign}
          />
          <MetricCard
            title="Draft Resumes"
            value={data?.resumeStats?.draftResumes?.toLocaleString()}
            icon={Calendar}
          />
          <MetricCard
            title="Top Template"
            value={data?.resumeStats?.topTemplate || "N/A"}
            icon={Award}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="border" style={{ borderColor: LINE }}>
            <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: LINE }}>
              <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
                TOP JOB ROLES
              </p>
            </div>
            <div className="px-2 pb-2">
              <PieChartComponent
                data={data?.resumeStats?.topResumeTypes?.map(item => ({
                  name: item.type,
                  value: item.count,
                }))}
              />
            </div>
          </div>

          <div className="border lg:col-span-2" style={{ borderColor: LINE }}>
            <div
              className="px-4 sm:px-6 pt-5 pb-3 border-b flex items-center gap-2"
              style={{ borderColor: LINE }}
            >
              <Target className="w-4 h-4" style={{ color: RUST }} />
              <p className="font-mono text-[11px] tracking-widest" style={{ color: INK }}>
                TOP SKILLS IN DEMAND
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {data?.resumeStats?.topSkills?.length > 0 ? (
                  data.resumeStats.topSkills.slice(0, 10).map((skilldata, index) => {
                    const maxCount = data.resumeStats.topSkills[0]?.count || 1;
                    const percentage = Math.round((skilldata.count / maxCount) * 100);

                    return (
                      <div key={index} className="min-w-0">
                        <div className="flex items-center justify-between mb-1.5 gap-4">
                          <span className="text-sm font-medium truncate" style={{ color: INK }}>
                            {skilldata.skill.name || "Unknown Skill"}
                          </span>
                          <span
                            className="font-mono text-[10px] tracking-widest shrink-0"
                            style={{ color: MUTE }}
                          >
                            {skilldata.count}
                          </span>
                        </div>
                        <div className="h-1.5 w-full" style={{ backgroundColor: "#F0EFEA" }}>
                          <div
                            className="h-full"
                            style={{ width: `${percentage}%`, backgroundColor: RUST }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="font-mono text-[11px] tracking-widest text-center py-8 col-span-2"
                    style={{ color: FAINT }}
                  >
                    NO SKILL DATA AVAILABLE
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Letters ── */}
      <section
        className="border p-4 sm:p-5"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <SectionHeader
          icon={Mail}
          title="Cover Letter Analytics"
          onExport={() => exportAnalyticsCSV({ data, section: "coverLetters" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <MetricCard
            title="Total Cover Letters"
            value={data?.coverLetterStats?.totalCoverLetters?.toLocaleString()}
            icon={Mail}
          />
          <MetricCard
            title="Paid Cover Letters"
            value={data?.coverLetterStats?.paidCoverLetters?.toLocaleString()}
            icon={DollarSign}
          />
          <MetricCard
            title="Draft Cover Letters"
            value={data?.coverLetterStats?.draftCoverLetters?.toLocaleString()}
            icon={Calendar}
          />
        </div>
      </section>
    </div>
  );
}

export default function AnalyticsPage() {
  const [isPending, startTransition] = useTransition();
  const [timeRange, setTimeRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen py-4 sm:py-6">
      <FontImports />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Letterhead */}
        <div
          className="mb-6 pb-5 border-b-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ borderColor: INK }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-widest mb-2" style={{ color: RUST }}>
              BUSINESS INTELLIGENCE
            </div>
            <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
              Analytics Studio
            </h1>
            <p
              className="mt-1 text-xs font-mono tracking-wide"
              style={{ color: isPending ? RUST : MUTE }}
            >
              {isPending ? "UPDATING METRICS…" : "LIVE PLATFORM METRICS & REPORTING"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {timeRange === "custom" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={customStart}
                  onChange={e => {
                    const val = e.target.value;
                    startTransition(() => {
                      setCustomStart(val);
                    });
                  }}
                  className="font-mono text-xs border px-2 py-2 outline-none"
                  style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
                />
                <input
                  type="date"
                  value={customEnd}
                  onChange={e => {
                    const val = e.target.value;
                    startTransition(() => {
                      setCustomEnd(val);
                    });
                  }}
                  className="font-mono text-xs border px-2 py-2 outline-none"
                  style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
                />
              </div>
            )}
            <Select
              defaultValue={timeRange}
              onValueChange={value => {
                startTransition(() => {
                  setTimeRange(value);
                });
              }}
              disabled={isPending}
            >
              <SelectTrigger
                className="w-40 sm:w-48 font-mono text-xs tracking-widest rounded-none border"
                style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
                aria-label="Select time range"
              >
                <SelectValue placeholder="TIME RANGE" />
              </SelectTrigger>
              <SelectContent className="rounded-none font-mono text-xs">
                <SelectItem value="today">TODAY</SelectItem>
                <SelectItem value="7d">LAST 7 DAYS</SelectItem>
                <SelectItem value="30d">LAST 30 DAYS</SelectItem>
                <SelectItem value="90d">LAST 90 DAYS</SelectItem>
                <SelectItem value="all">ALL TIME</SelectItem>
                <SelectItem value="custom">CUSTOM RANGE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center h-64 border"
              style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
            >
              <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
                LOADING&hellip;
              </p>
            </div>
          }
        >
          <AnalyticsDashboard
            timeRange={timeRange}
            customStart={customStart}
            customEnd={customEnd}
          />
        </Suspense>
      </div>
    </div>
  );
}
