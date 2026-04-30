"use client";
import { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
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
  Tag,
  TrendingUp,
  Calendar,
  Download,
  Activity,
  DollarSign,
  Award,
  Target,
  IndianRupee,
  Zap,
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

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#0ea5e9"];

function MetricCard({ title, value, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "text-indigo-600 bg-indigo-50",
    green: "text-emerald-600 bg-emerald-50",
    yellow: "text-amber-600 bg-amber-50",
    purple: "text-violet-600 bg-violet-50",
    red: "text-red-600 bg-red-50",
  };
  const textClasses = {
    blue: "text-indigo-600",
    green: "text-emerald-600",
    yellow: "text-amber-600",
    purple: "text-violet-600",
    red: "text-red-600",
  };

  return (
    <Card className="border border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
        <CardTitle className="text-xs sm:text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className={`text-xl sm:text-2xl font-bold ${textClasses[color]}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
        <Tooltip
          formatter={value => [`₹${value}`, "Revenue"]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ fill: "#6366f1", strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function PieChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={75}
          dataKey="value"
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function SectionHeader({ icon: Icon, title, color, onExport }) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-5">
      <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-2">
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} />
        {title}
      </h2>
      <Button variant="outline" size="sm" onClick={onExport} className="text-xs sm:text-sm">
        <Download className="h-3.5 w-3.5 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Export</span>
      </Button>
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
        const res = await axios.post("/api/analytics/getAnalaticsData", {
          timeRange,
          customStart,
          customEnd,
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-3 text-xs sm:text-sm text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm sm:text-base text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Today's Snapshot ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-600 rounded-xl p-5 text-white shadow-lg overflow-hidden relative group">
          <Zap className="absolute -right-2 -bottom-2 h-20 w-20 text-white/10 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-white/70 uppercase mb-1">Today's Revenue</p>
          <h3 className="text-3xl font-black flex items-center gap-1">
            <IndianRupee className="h-6 w-6" />
            {data?.todayStats?.todayRevenue || 0}
          </h3>
          <p className="text-[10px] mt-2 text-white/50">Updated just now</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg overflow-hidden relative group">
          <Users className="absolute -right-2 -bottom-2 h-20 w-20 text-white/10 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-white/70 uppercase mb-1">Today's New Users</p>
          <h3 className="text-3xl font-black">{data?.todayStats?.todayNewUsers || 0}</h3>
          <p className="text-[10px] mt-2 text-white/50">Tracking acquisition</p>
        </div>
        <div className="bg-emerald-500 rounded-xl p-5 text-white shadow-lg overflow-hidden relative group">
          <Target className="absolute -right-2 -bottom-2 h-20 w-20 text-white/10 group-hover:scale-110 transition-transform" />
          <p className="text-xs font-bold text-white/70 uppercase mb-1">Conversion Rate</p>
          <h3 className="text-3xl font-black">{data?.paymentStats?.conversionRate || 0}%</h3>
          <p className="text-[10px] mt-2 text-white/50">Paid vs Free users</p>
        </div>
      </section>

      {/* ── Users ── */}
      <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5">
        <SectionHeader
          icon={Users}
          title="User Analytics"
          color="text-indigo-600"
          onExport={() => exportAnalyticsCSV({ data, section: "users" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <MetricCard
            title="Total Users"
            value={data?.userStats?.totalUsers?.toLocaleString()}
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Active Users (Recent)"
            value={data?.userStats?.activeUsers?.toLocaleString()}
            icon={Activity}
            color="green"
          />
          <MetricCard
            title="Admin Users"
            value={data?.userStats?.adminCount?.toLocaleString()}
            icon={Award}
            color="purple"
          />
        </div>
      </section>

      {/* ── Payment ── */}
      <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5">
        <SectionHeader
          icon={CreditCard}
          title="Payment & Revenue"
          color="text-amber-600"
          onExport={() => exportAnalyticsCSV({ data, section: "payments" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
          <MetricCard
            title="Total Revenue"
            value={`₹${data?.paymentStats?.totalRevenue?.toLocaleString()}`}
            icon={IndianRupee}
            color="green"
          />
          <MetricCard
            title="This Month (MRR)"
            value={`₹${data?.paymentStats?.mrr?.toLocaleString()}`}
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="ARPU"
            value={`₹${data?.paymentStats?.arpu || 0}`}
            icon={DollarSign}
            color="yellow"
          />
          <MetricCard
            title="Avg Ticket"
            value={`₹${data?.paymentStats?.avgTransactionValue?.toFixed(2)}`}
            icon={Activity}
            color="purple"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border border-slate-100 shadow-sm">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-semibold text-slate-600">
                Monthly Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <RevenueChart data={data?.paymentStats?.monthlyRevenue} />
            </CardContent>
          </Card>
          <Card className="border border-slate-100 shadow-sm">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-semibold text-slate-600">
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <PieChartComponent
                data={data?.paymentStats?.topPaymentModes?.map(mode => ({
                  name: mode.mode,
                  value: mode.revenue,
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Resumes ── */}
      <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-5">
        <SectionHeader
          icon={FileText}
          title="Content Analytics"
          color="text-emerald-600"
          onExport={() => exportAnalyticsCSV({ data, section: "resumes" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
          <MetricCard
            title="Total Resumes"
            value={data?.resumeStats?.totalResumes?.toLocaleString()}
            icon={FileText}
            color="green"
          />
          <MetricCard
            title="Paid Resumes"
            value={data?.resumeStats?.paidResumes?.toLocaleString()}
            icon={DollarSign}
            color="blue"
          />
          <MetricCard
            title="Draft Resumes"
            value={data?.resumeStats?.draftResumes?.toLocaleString()}
            icon={Calendar}
            color="yellow"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="border border-slate-100 shadow-sm">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-semibold text-slate-600">
                Top Job Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <PieChartComponent
                data={data?.resumeStats?.topResumeTypes?.map(item => ({
                  name: item.type,
                  value: item.count,
                }))}
              />
            </CardContent>
          </Card>
          <Card className="border border-slate-100 shadow-sm">
            <CardHeader className="px-4 pt-4 pb-2">
              <CardTitle className="text-xs sm:text-sm font-semibold text-slate-600">
                Top Skills in Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {data?.resumeStats?.topSkills?.slice(0, 10).map((skill, index) => (
                <div key={index} className="flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-medium text-slate-600 truncate">
                    {skill?.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 sm:w-24 bg-slate-100 rounded-full h-1.5">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{
                          width: `${
                            (skill?.count / (data?.resumeStats?.topSkills?.[0]?.count || 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-5">{skill?.count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-3 bg-white p-4 rounded-xl border border-slate-200">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Analytics Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Live platform metrics and business intelligence
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {timeRange === "custom" && (
              <div className="flex gap-2 mr-2 animate-in fade-in slide-in-from-right-4">
                <input
                  type="date"
                  value={customStart}
                  onChange={e => setCustomStart(e.target.value)}
                  className="text-xs border rounded-lg px-2 py-1.5 h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="date"
                  value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)}
                  className="text-xs border rounded-lg px-2 py-1.5 h-9 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )}
            <Select defaultValue={timeRange} onValueChange={value => setTimeRange(value)}>
              <SelectTrigger
                className="w-36 sm:w-44 text-xs sm:text-sm font-bold bg-slate-50 border-slate-200"
                aria-label="Select time range"
              >
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
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
