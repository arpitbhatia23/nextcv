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
  BriefcaseBusiness,
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
  ChevronLeft,
  ChevronRight,
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

const INK = "#17201C";
const BRAND = "#465B9E";
const TEAL = "#0F6E63";
const PAPER = "#F8F7F3";
const LINE = "#E3E2DC";
const MUTE = "#5B625C";
const FAINT = "#8A908B";

/* Charted lines/wedges cycle through brand indigo and muted supporting
   tones so multi-series charts stay legible without visual noise. */
const COLORS = [BRAND, "#344B93", "#5268B6", "#6573A4", TEAL, "#A8896F"];

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border p-4 sm:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)]" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] tracking-wider uppercase text-[#66706B]">
          {title}
        </p>
        <div className="w-7 h-7 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="font-display text-xl sm:text-2xl font-semibold text-[#17201C]">
        {value}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border px-3 py-2 shadow-lg" style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}>
      {label && (
        <p className="font-mono text-[10px] tracking-wider mb-1 text-[#66706B]">
          {label}
        </p>
      )}
      {payload.map((p, i) => (
        <p key={i} className="font-sans text-sm font-semibold text-[#17201C]">
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
          stroke={BRAND}
          strokeWidth={2.5}
          dot={{ fill: BRAND, strokeWidth: 0, r: 4 }}
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
        className="font-sans text-sm font-semibold tracking-wide flex items-center gap-2 text-[#17201C]"
      >
        <Icon className="h-4 w-4 text-[#465B9E]" />
        {title}
      </h2>
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 border border-[#E3E2DC] rounded-xl px-3 py-1.5 font-sans text-xs font-medium transition hover:bg-[#F1F0EB] text-[#17201C] bg-white shadow-xs"
      >
        <Download className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Export</span>
      </button>
    </div>
  );
}

function DataTableSection({ icon: Icon, title, type, columns, emptyMessage }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchPage = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get("/api/analytics/recentRecords", {
          params: { type, page },
        });
        if (isCurrentRequest) {
          const result = response?.data?.data;
          const pages = result?.totalPages || 0;
          if (page > Math.max(pages, 1)) {
            setPage(Math.max(pages, 1));
            return;
          }
          setRows(result?.rows || []);
          setTotal(result?.total || 0);
          setTotalPages(pages);
        }
      } catch (requestError) {
        console.error(`Failed to load ${type} records:`, requestError);
        if (isCurrentRequest) setError(true);
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    };

    fetchPage();
    return () => {
      isCurrentRequest = false;
    };
  }, [page, type]);

  const firstRecord = total ? (page - 1) * 8 + 1 : 0;
  const lastRecord = Math.min(page * 8, total);

  return (
    <section className="min-w-0 rounded-2xl border shadow-[0_2px_12px_rgba(23,32,28,0.04)] overflow-hidden" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
      <div
        className="flex items-center justify-between gap-3 border-b px-4 sm:px-6 py-3.5 bg-[#F8F7F3]/40"
        style={{ borderColor: LINE }}
      >
        <h3
          className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold text-[#17201C]"
        >
          <Icon className="h-4 w-4 text-[#465B9E]" />
          {title}
        </h3>
        <span className="font-mono text-[10px] text-[#8A908B] px-2 py-0.5 rounded-full bg-white border border-[#E3E2DC]">
          {total.toLocaleString()} RECORDS
        </span>
      </div>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 border-collapse text-left">
            <thead>
              <tr className="border-b bg-[#F8F7F3]/60" style={{ borderColor: LINE }}>
                {columns.map(column => (
                  <th
                    key={column.key}
                    className="px-4 sm:px-5 py-3 font-mono text-[9px] font-medium tracking-wider text-[#66706B]"
                  >
                    {column.label.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E2DC]">
              {rows.map((row, index) => (
                <tr
                  key={row._id || row.slug || index}
                  className="hover:bg-[#F8F7F3]/30 transition-colors"
                >
                  {columns.map(column => (
                    <td key={column.key} className="px-4 sm:px-5 py-3.5 text-xs text-[#17201C]">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : loading ? (
        <p
          className="px-4 py-8 text-center font-mono text-xs tracking-wider animate-pulse text-[#66706B]"
        >
          LOADING RECORDS...
        </p>
      ) : error ? (
        <p
          className="px-4 py-8 text-center font-mono text-xs tracking-wider text-amber-800"
        >
          COULD NOT LOAD RECORDS
        </p>
      ) : (
        <p
          className="px-4 py-8 text-center font-mono text-xs tracking-wider text-[#8A908B]"
        >
          {emptyMessage}
        </p>
      )}
      <div
        className="flex items-center justify-between gap-3 border-t px-4 sm:px-6 py-3 bg-[#F8F7F3]/30"
        style={{ borderColor: LINE }}
      >
        <span className="font-mono text-[10px] tracking-wide text-[#66706B]">
          {firstRecord}–{lastRecord} OF {total.toLocaleString()}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#8A908B]">
            PAGE {totalPages ? page : 0} / {totalPages}
          </span>
          <button
            type="button"
            aria-label={`Previous ${title.toLowerCase()} page`}
            title="Previous page"
            onClick={() => setPage(currentPage => Math.max(1, currentPage - 1))}
            disabled={page <= 1 || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Next ${title.toLowerCase()} page`}
            title="Next page"
            onClick={() => setPage(currentPage => Math.min(totalPages, currentPage + 1))}
            disabled={page >= totalPages || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

function StatusLabel({ children, positive = false }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wide ${
        positive
          ? "border-emerald-200 text-emerald-800 bg-emerald-50"
          : "border-[#E3E2DC] text-[#5B625C] bg-[#F8F7F3]"
      }`}
    >
      {children}
    </span>
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
        className="flex items-center justify-center h-64 rounded-2xl border border-[#E3E2DC] bg-white shadow-xs"
      >
        <p className="font-mono text-xs tracking-wider animate-pulse text-[#66706B]">
          COMPILING ANALYTICS LEDGER&hellip;
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border border-amber-200 bg-amber-50 p-10 text-center"
      >
        <p className="font-mono text-xs tracking-widest text-amber-900">
          {error.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Today's Snapshot ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="p-5 rounded-2xl border border-[#E3E2DC] bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-wider text-[#66706B] uppercase">
              Today&apos;s Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold flex items-center gap-1 text-[#17201C]">
            <IndianRupee className="h-5 w-5 text-[#465B9E]" />
            {data?.todayStats?.todayRevenue || 0}
          </h3>
          <p className="font-mono text-[10px] mt-2 text-[#8A908B]">
            UPDATED REALTIME
          </p>
        </div>

        <div
          className="p-5 rounded-2xl border border-[#E3E2DC] bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-wider text-[#66706B] uppercase">
              Today&apos;s New Users
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#17201C]">
            {data?.todayStats?.todayNewUsers || 0}
          </h3>
          <p className="font-mono text-[10px] mt-2 text-[#8A908B]">
            CANDIDATE SIGNUPS
          </p>
        </div>

        <div
          className="p-5 rounded-2xl border border-[#E3E2DC] bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-wider text-[#66706B] uppercase">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#17201C]">
            {data?.paymentStats?.conversionRate || 0}%
          </h3>
          <p className="font-mono text-[10px] mt-2 text-[#8A908B]">
            PAID VS FREE USERS
          </p>
        </div>
      </section>

      {/* ── Users ── */}
      <section
        className="rounded-2xl border p-4 sm:p-6 shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
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
        className="rounded-2xl border p-4 sm:p-6 shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
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
          <div className="rounded-xl border border-[#E3E2DC] overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#E3E2DC] bg-[#F8F7F3]/40">
              <p className="font-mono text-[10px] tracking-wider uppercase text-[#66706B]">
                MONTHLY REVENUE TREND
              </p>
            </div>
            <div className="p-3">
              <RevenueChart data={data?.paymentStats?.monthlyRevenue} />
            </div>
          </div>
          <div className="rounded-xl border border-[#E3E2DC] overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b border-[#E3E2DC] bg-[#F8F7F3]/40">
              <p className="font-mono text-[10px] tracking-wider uppercase text-[#66706B]">
                PAYMENT METHODS
              </p>
            </div>
            <div className="p-3">
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
        className="rounded-2xl border p-4 sm:p-6 shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
        style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
      >
        <SectionHeader
          icon={FileText}
          title="Content Analytics"
          onExport={() => exportAnalyticsCSV({ data, section: "resumes" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-5">
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
          <MetricCard
            title="Portfolios"
            value={data?.portfolioStats?.totalPortfolios?.toLocaleString() || "0"}
            icon={BriefcaseBusiness}
          />
        </div>
      </section>

      <div className="space-y-4 sm:space-y-6">
        <DataTableSection
          icon={Users}
          title="Latest Users"
          type="users"
          emptyMessage="NO USER RECORDS FOUND"
          columns={[
            {
              key: "name",
              label: "Name",
              render: row => <span className="font-medium">{row.name || "Unnamed"}</span>,
            },
            { key: "email", label: "Email", render: row => row.email || "—" },
            {
              key: "role",
              label: "Role",
              render: row => (
                <StatusLabel positive={row.role === "admin"}>{row.role || "user"}</StatusLabel>
              ),
            },
            { key: "createdAt", label: "Joined", render: row => formatDate(row.createdAt) },
            { key: "lastActive", label: "Last Active", render: row => formatDate(row.lastActive) },
          ]}
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <DataTableSection
            icon={FileText}
            title="Latest Resumes"
            type="resumes"
            emptyMessage="NO RESUME RECORDS FOUND"
            columns={[
              {
                key: "name",
                label: "Candidate",
                render: row => <span className="font-medium">{row.name || "Unnamed"}</span>,
              },
              { key: "jobRole", label: "Role", render: row => row.jobRole || "—" },
              { key: "ResumeType", label: "Template", render: row => row.ResumeType || "—" },
              {
                key: "status",
                label: "Status",
                render: row => (
                  <StatusLabel positive={row.status === "paid"}>
                    {row.status || "draft"}
                  </StatusLabel>
                ),
              },
              { key: "updatedAt", label: "Updated", render: row => formatDate(row.updatedAt) },
            ]}
          />
          <DataTableSection
            icon={BriefcaseBusiness}
            title="Latest Portfolios"
            type="portfolios"
            emptyMessage="NO PORTFOLIOS FOUND"
            columns={[
              {
                key: "slug",
                label: "Portfolio",
                render: row => (
                  <a
                    className="font-medium underline decoration-[#D8D6CE] underline-offset-2"
                    href={`/p/${row.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.slug || "Untitled"}
                  </a>
                ),
              },
              {
                key: "user",
                label: "Owner",
                render: row => row.userId?.name || row.userId?.email || "Unknown",
              },
              { key: "resume", label: "Resume", render: row => row.resumeId?.name || "—" },
              {
                key: "visibility",
                label: "Visibility",
                render: row => (
                  <StatusLabel positive={row.isPublic}>
                    {row.isPublic ? "Public" : "Private"}
                  </StatusLabel>
                ),
              },
              { key: "createdAt", label: "Created", render: row => formatDate(row.createdAt) },
            ]}
          />
        </div>
        <DataTableSection
          icon={FileText}
          title="Latest Shared Resumes"
          type="sharedResumes"
          emptyMessage="NO SHARED RESUME RECORDS FOUND"
          columns={[
            {
              key: "slug",
              label: "Shared Resume",
              render: row => (
                <a
                  className="font-medium underline decoration-[#D8D6CE] underline-offset-2"
                  href={`/r/${row.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {row.slug || "Untitled"}
                </a>
              ),
            },
            {
              key: "user",
              label: "Owner",
              render: row => row.userId?.name || row.userId?.email || "Unknown",
            },
            { key: "resume", label: "Resume", render: row => row.resumeId?.name || "—" },
            {
              key: "visibility",
              label: "Visibility",
              render: row => (
                <StatusLabel positive={row.isPublic}>
                  {row.isPublic ? "Public" : "Private"}
                </StatusLabel>
              ),
            },
            { key: "createdAt", label: "Created", render: row => formatDate(row.createdAt) },
          ]}
        />
      </div>

      {/* ── Cover Letters ── */}
      <section
        className="rounded-2xl border p-4 sm:p-6 shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
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
          className="mb-8 pb-6 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ borderColor: LINE }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase mb-2 font-medium" style={{ color: BRAND }}>
              BUSINESS INTELLIGENCE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight" style={{ color: INK }}>
              Analytics Studio
            </h1>
            <p
              className="mt-1 text-xs font-mono tracking-wide"
              style={{ color: isPending ? BRAND : MUTE }}
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
                  className="font-sans text-xs border rounded-xl px-3 py-2 outline-none transition-colors focus:border-[#465B9E]"
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
                  className="font-sans text-xs border rounded-xl px-3 py-2 outline-none transition-colors focus:border-[#465B9E]"
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
                className="w-40 sm:w-48 font-sans text-xs font-medium rounded-xl border h-10 shadow-none hover:bg-[#F1F0EB] transition-colors"
                style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
                aria-label="Select time range"
              >
                <SelectValue placeholder="TIME RANGE" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border shadow-lg font-sans text-xs" style={{ borderColor: LINE }}>
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
            <div
              className="flex items-center justify-center h-64 border rounded-2xl"
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
