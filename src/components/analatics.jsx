"use client";
import { Suspense, use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  FileText,
  CreditCard,
  Tag,
  Eye,
  TrendingUp,
  Calendar,
  Download,
  Activity,
  DollarSign,
  Award,
  Target,
  IndianRupee,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { exportAnalyticsCSV } from "@/lib/gencsv";

// Color schemes for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

// Metric Card Component
function MetricCard({ title, value, icon: Icon, change, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    yellow: "text-yellow-600 bg-yellow-50",
    purple: "text-purple-600 bg-purple-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );
}

// Chart Components
function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          formatter={(value) => [`$${value}`, "Revenue"]}
          labelStyle={{ color: "#666" }}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0088FE"
          strokeWidth={2}
          dot={{ fill: "#0088FE", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function VisitorsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.slice(-30)}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          formatter={(value) => [value, "Visitors"]}
          labelStyle={{ color: "#666" }}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
          }}
        />
        <Bar dataKey="visitors" fill="#00C49F" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function PieChartComponent({ data, title }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Main Dashboard Component
function AnalyticsDashboard({ timeRange = "all" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/analytics/getAnalaticsData", {
        timeRange,
      });
      console.log(res);
      setData(res?.data?.data); // Store fetched data
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError("Failed to fetch analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 font-medium">{error}</div>;
  }
  return (
    <div className="space-y-8">
      {/* Users Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            User Analytics
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportAnalyticsCSV({ data: data, section: "users" })}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Users"
            value={data?.userStats?.totalUsers.toLocaleString()}
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Active Users (7 days)"
            value={data?.userStats?.activeUsers.toLocaleString()}
            icon={Activity}
            color="green"
          />
          <MetricCard
            title="Admin Users"
            value={data.userStats.adminCount.toLocaleString()}
            icon={Award}
            color="purple"
          />
        </div>
      </section>

      {/* Resume Analytics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-green-600" />
            Resume Analytics
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportAnalyticsCSV({ data: data, section: "resumes" })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Resumes"
            value={data?.resumeStats?.totalResumes.toLocaleString()}
            icon={FileText}
            color="green"
          />
          <MetricCard
            title="Paid Resumes"
            value={data?.resumeStats?.paidResumes.toLocaleString()}
            icon={DollarSign}
            color="blue"
          />
          <MetricCard
            title="Draft Resumes"
            value={data?.resumeStats?.draftResumes.toLocaleString()}
            icon={Calendar}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Resume Types</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChartComponent
                data={data?.resumeStats?.topResumeTypes?.map((item) => ({
                  name: item.type,
                  value: item.count,
                }))}
                title="Resume Types"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.resumeStats?.topSkills
                  .slice(0, 10)
                  .map((skill, index) => (
                    <div
                      key={skill?.skill._id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium">
                        {skill?.skill?.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (skill?.count /
                                  data?.resumeStats?.topSkills[0].count) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {skill?.count}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Analytics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-yellow-600" />
            Payment Analytics
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportAnalyticsCSV({ data: data, section: "payments" })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${data?.paymentStats?.totalRevenue.toLocaleString()}`}
            icon={IndianRupee}
            color="green"
          />
          <MetricCard
            title="Avg Transaction"
            value={`$${data?.paymentStats?.avgTransactionValue.toFixed(2)}`}
            icon={TrendingUp}
            color="blue"
          />
          <MetricCard
            title="Total Transactions"
            value={data?.paymentStats?.topPaymentModes
              .reduce((acc, mode) => acc + mode.count, 0)
              .toLocaleString()}
            icon={CreditCard}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={data?.paymentStats?.monthlyRevenue} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChartComponent
                data={data?.paymentStats?.topPaymentModes.map((mode) => ({
                  name: mode.mode,
                  value: mode.count,
                }))}
                title="Payment Methods"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coupon Analytics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Tag className="h-6 w-6 text-purple-600" />
            Coupon Analytics
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportAnalyticsCSV({ data: data, section: "coupons" })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Coupons"
            value={data?.couponStats?.activeCoupons.toLocaleString()}
            icon={Tag}
            color="green"
          />
          <MetricCard
            title="Expired Coupons"
            value={data?.couponStats?.expiredCoupons.toLocaleString()}
            icon={Calendar}
            color="red"
          />
          <MetricCard
            title="Average Discount Given"
            value={`${data?.couponStats?.totalDiscount.toLocaleString()}%`}
            icon={Target}
            color="yellow"
          />
          <MetricCard
            title="Total Coupons"
            value={(
              data?.couponStats?.activeCoupons +
              data?.couponStats?.expiredCoupons
            ).toLocaleString()}
            icon={Award}
            color="purple"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coupon Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent
              data={data?.couponStats?.couponsByType.map((type) => ({
                name: type.type,
                value: type.count,
              }))}
              title="Coupon Types"
            />
          </CardContent>
        </Card>
      </section>

      {/* Visitor Analytics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="h-6 w-6 text-red-600" />
            Visitor Analytics
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportAnalyticsCSV({ data: data, section: "visitors" })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            title="Total Visitors"
            value={data.visitorStats.totalVisitors.toLocaleString()}
            icon={Eye}
            color="red"
          />
          <MetricCard
            title="Daily Average"
            value={Math.round(
              data?.visitorStats?.totalVisitors / 30,
            ).toLocaleString()}
            icon={TrendingUp}
            color="blue"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Visitors (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorsChart data={data?.visitorStats?.dailyVisitors} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Main Page Component with Filters
export default function AnalyticsPage() {
  const [timeRange, SettimeRage] = useState("all");
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into your platform performance
            </p>
          </div>

          {/* Time Range Filter */}
          <div className="mt-4 sm:mt-0">
            <Select
              defaultValue={timeRange}
              onValueChange={(value) => SettimeRage(value)}
            >
              <SelectTrigger className="w-45" aria-label="Select time range">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dashboard Content */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <AnalyticsDashboard timeRange={timeRange} />
        </Suspense>
      </div>
    </div>
  );
}
