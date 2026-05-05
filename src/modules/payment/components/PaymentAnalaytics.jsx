"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Download,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  List,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

// Status badge config
const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    cls: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
    iconCls: "text-emerald-500",
  },
  success: {
    label: "Success",
    cls: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
    iconCls: "text-emerald-500",
  },
  failed: {
    label: "Failed",
    cls: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    iconCls: "text-red-500",
  },
  pending: {
    label: "Pending",
    cls: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
    iconCls: "text-amber-500",
  },
};

const getStatusConfig = status => {
  const key = status?.toLowerCase();
  return (
    STATUS_CONFIG[key] || {
      label: status || "Unknown",
      cls: "bg-slate-100 text-slate-700 border-slate-200",
      icon: Clock,
      iconCls: "text-slate-400",
    }
  );
};

const getPaymentModeColor = mode => {
  const colors = {
    "Bank Transfer": "bg-blue-100 text-blue-800",
    UPI: "bg-violet-100 text-violet-800",
    "Credit Card": "bg-indigo-100 text-indigo-800",
    Cash: "bg-green-100 text-green-800",
  };
  return colors[mode] || "bg-slate-100 text-slate-700";
};

const formatCurrency = amount =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);

const ITEMS_PER_PAGE = 10;

// Transaction view tabs
const TX_TABS = [
  { id: "all", label: "All", icon: List },
  { id: "success", label: "Success", icon: CheckCircle2 },
  { id: "failed", label: "Failed", icon: XCircle },
  { id: "pending", label: "Pending", icon: Clock },
];

const TransactionTable = React.memo(({ payments }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = payments.slice(start, start + ITEMS_PER_PAGE);

  // Reset page when payments change
  useEffect(() => {
    setPage(1);
  }, [payments]);

  if (payments.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <Search className="mx-auto mb-3 h-10 w-10 text-slate-300" />
        <p className="text-sm sm:text-base text-slate-500 font-medium">No transactions found</p>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Try adjusting your filters or date range
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Table info bar */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
        <p className="text-xs sm:text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {start + 1}–{Math.min(start + ITEMS_PER_PAGE, payments.length)}
          </span>{" "}
          of <span className="font-semibold text-slate-800">{payments.length}</span> results
        </p>
        <p className="text-xs text-slate-400">
          Page {page}/{totalPages}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3">
                Transaction ID
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3">
                Date
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3 hidden sm:table-cell">
                Time
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3">
                Amount
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3 hidden md:table-cell">
                Mode
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-semibold text-slate-600 py-3">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.map((payment, idx) => {
              const cfg = getStatusConfig(payment?.status);
              const StatusIcon = cfg.icon;
              const isLast = idx === current.length - 1;
              return (
                <React.Fragment key={payment._id}>
                  <TableRow className="hover:bg-slate-50/80 transition-colors group">
                    <TableCell className="py-3 sm:py-4">
                      <span className="text-xs sm:text-sm font-mono text-slate-700 truncate block max-w-[100px] sm:max-w-[160px]">
                        {payment?.transcationId || payment?.transactionId || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">
                        {new Date(payment?.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 hidden sm:table-cell">
                      <span className="text-xs text-slate-500">
                        {new Date(payment?.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          payment?.status?.toLowerCase() === "failed"
                            ? "text-red-600"
                            : "text-emerald-700"
                        }`}
                      >
                        {formatCurrency(payment?.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getPaymentModeColor(
                          payment?.paymentMode
                        )}`}
                      >
                        {payment?.paymentMode || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${cfg.cls}`}
                      >
                        <StatusIcon className={`h-3 w-3 ${cfg.iconCls}`} />
                        <span className="hidden sm:inline">{cfg.label}</span>
                      </span>
                    </TableCell>
                  </TableRow>
                  {/* Visual separator between groups of 5 rows */}
                  {(idx + 1) % 5 === 0 && !isLast && (
                    <TableRow key={`sep-${idx}`} className="h-0 p-0">
                      <TableCell
                        colSpan={6}
                        className="p-0 border-t-2 border-dashed border-slate-200"
                      />
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between border-t border-slate-100 bg-white">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (page <= 3) pageNum = i + 1;
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = page - 2 + i;

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                    page === pageNum
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 border border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
});

const AdminPaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "", period: "all" });
  const [activeTxTab, setActiveTxTab] = useState("all");

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/payment/getTransctionData");
      setPayments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter by search + date
  const filteredPayments = useMemo(() => {
    let filtered = [...payments];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          (p.transcationId || p.transactionId || "").toLowerCase().includes(q) ||
          (p.paymentMode || "").toLowerCase().includes(q) ||
          (p.status || "").toLowerCase().includes(q)
      );
    }
    if (dateFilter.period !== "all") {
      const now = new Date();
      let startDate;
      switch (dateFilter.period) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          filtered = filtered.filter(p => new Date(p.createdAt) >= startDate);
          break;
        case "thisWeek":
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          filtered = filtered.filter(p => new Date(p.createdAt) >= startDate);
          break;
        case "thisMonth":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          filtered = filtered.filter(p => new Date(p.createdAt) >= startDate);
          break;
        case "thisYear":
          startDate = new Date(now.getFullYear(), 0, 1);
          filtered = filtered.filter(p => new Date(p.createdAt) >= startDate);
          break;
        case "custom":
          if (dateFilter.startDate && dateFilter.endDate) {
            filtered = filtered.filter(p => {
              const d = new Date(p.createdAt);
              return d >= new Date(dateFilter.startDate) && d <= new Date(dateFilter.endDate);
            });
          }
          break;
      }
    }
    return filtered;
  }, [payments, searchTerm, dateFilter]);

  // Split by status
  const successPayments = useMemo(
    () =>
      filteredPayments.filter(p => {
        const s = p.status?.toLowerCase();
        return s === "completed" || s === "success";
      }),
    [filteredPayments]
  );
  const failedPayments = useMemo(
    () => filteredPayments.filter(p => p.status?.toLowerCase() === "failed"),
    [filteredPayments]
  );
  const pendingPayments = useMemo(
    () => filteredPayments.filter(p => p.status?.toLowerCase() === "pending"),
    [filteredPayments]
  );

  const totals = useMemo(() => {
    // Only successful / completed payments count toward revenue
    return successPayments.reduce((acc, p) => {
      const amount = p.amount || 0;
      acc.total += amount;
      acc.successCount += 1;
      acc.byPaymentMode[p.paymentMode] = (acc.byPaymentMode[p.paymentMode] || 0) + amount;
      acc.count = filteredPayments.length;
      acc.average = acc.total / (acc.successCount || 1);
      return acc;
    }, { total: 0, count: 0, successCount: 0, average: 0, byPaymentMode: {} });
  }, [filteredPayments, successPayments]);

  const exportToCSV = () => {
    const headers = ["Transaction ID", "Date", "Time", "Amount (₹)", "Payment Mode", "Status"];
    const csvData = filteredPayments.map(p => [
      p.transcationId || p.transactionId,
      new Date(p.createdAt).toLocaleDateString("en-IN"),
      new Date(p.createdAt).toLocaleTimeString("en-IN"),
      p.amount,
      p.paymentMode,
      p.status,
    ]);
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payment_report_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const tabPayments = {
    all: filteredPayments,
    success: successPayments,
    failed: failedPayments,
    pending: pendingPayments,
  };

  const tabCounts = {
    all: filteredPayments.length,
    success: successPayments.length,
    failed: failedPayments.length,
    pending: pendingPayments.length,
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-4 text-sm text-slate-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
        {/* ── Header ───────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                Payment Transactions
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                View, filter, and export all payment records
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchPayments}
                disabled={loading}
                className="flex items-center gap-1.5 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-medium"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="inline sm:hidden">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Summary Cards ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Total Revenue",
              sub: "Success payments only",
              value: formatCurrency(totals.total),
              icon: DollarSign,
              accent: "emerald",
            },
            {
              label: "Avg. per Success",
              sub: `${totals.successCount} paid txns`,
              value: formatCurrency(totals.average),
              icon: Calculator,
              accent: "indigo",
            },
            {
              label: "All Transactions",
              sub: "Any status",
              value: totals.count,
              icon: FileText,
              accent: "violet",
            },
            {
              label: "Success Rate",
              sub: `${totals.successCount} succeeded`,
              value: `${Math.round((totals.successCount / (totals.count || 1)) * 100)}%`,
              icon: TrendingUp,
              accent: "sky",
            },
          ].map(card => {
            const Icon = card.icon;
            const accentMap = {
              indigo: "border-indigo-400 text-indigo-600 bg-indigo-50",
              emerald: "border-emerald-400 text-emerald-700 bg-emerald-50",
              violet: "border-violet-400 text-violet-600 bg-violet-50",
              sky: "border-sky-400 text-sky-600 bg-sky-50",
            };
            const colorMap = {
              indigo: "text-indigo-600",
              emerald: "text-emerald-700",
              violet: "text-violet-600",
              sky: "text-sky-600",
            };
            return (
              <div
                key={card.label}
                className={`bg-white rounded-xl shadow-sm border-l-4 p-3 sm:p-4 lg:p-5 ${accentMap[card.accent]}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500 truncate">
                      {card.label}
                    </p>
                    <p
                      className={`text-base sm:text-lg lg:text-2xl font-bold mt-0.5 truncate ${colorMap[card.accent]}`}
                    >
                      {card.value}
                    </p>
                    {card.sub && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{card.sub}</p>
                    )}
                  </div>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${colorMap[card.accent]}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Filters ───────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              Filters &amp; Search
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by ID, mode, status…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />
            </div>
            <select
              value={dateFilter.period}
              onChange={e => setDateFilter(f => ({ ...f, period: e.target.value }))}
              aria-label="time range"
              className="border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            {dateFilter.period === "custom" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFilter.startDate}
                  onChange={e => setDateFilter(f => ({ ...f, startDate: e.target.value }))}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={e => setDateFilter(f => ({ ...f, endDate: e.target.value }))}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Transaction Tabs (All / Success / Failed / Pending) ── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide">
            {TX_TABS.map(tab => {
              const Icon = tab.icon;
              const count = tabCounts[tab.id];
              const isActive = activeTxTab === tab.id;
              const colorMap = {
                all: "border-indigo-600 text-indigo-600 bg-indigo-50/60",
                success: "border-emerald-600 text-emerald-700 bg-emerald-50/60",
                failed: "border-red-600 text-red-700 bg-red-50/60",
                pending: "border-amber-500 text-amber-700 bg-amber-50/60",
              };
              const badgeMap = {
                all: "bg-indigo-100 text-indigo-700",
                success: "bg-emerald-100 text-emerald-700",
                failed: "bg-red-100 text-red-700",
                pending: "bg-amber-100 text-amber-700",
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTxTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? colorMap[tab.id]
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                  <span
                    className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                      isActive ? badgeMap[tab.id] : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section header inside panel */}
          <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-white">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              {(() => {
                const tab = TX_TABS.find(t => t.id === activeTxTab);
                const Icon = tab?.icon;
                return (
                  <>
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {tab?.label} Transactions
                  </>
                );
              })()}
            </h3>
          </div>

          {/* Table */}
          <TransactionTable payments={tabPayments[activeTxTab]} />
        </div>

        {/* ── Analytics Cards ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Payment Mode Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-indigo-500" />
              Payment Mode Breakdown
            </h4>
            <div className="space-y-2">
              {Object.entries(totals.byPaymentMode).length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No data</p>
              ) : (
                Object.entries(totals.byPaymentMode).map(([mode, amount]) => (
                  <div
                    key={mode}
                    className="flex justify-between items-center p-2.5 sm:p-3 bg-slate-50 rounded-lg"
                  >
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getPaymentModeColor(
                        mode
                      )}`}
                    >
                      {mode}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-indigo-600">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-emerald-600" />
              Transaction Status Overview
            </h4>
            <div className="space-y-2">
              {[
                { key: "success", label: "Successful", count: successPayments.length },
                { key: "failed", label: "Failed", count: failedPayments.length },
                { key: "pending", label: "Pending", count: pendingPayments.length },
              ].map(({ key, label, count }) => {
                const cfg = getStatusConfig(key);
                const StatusIcon = cfg.icon;
                const pct = filteredPayments.length
                  ? Math.round((count / filteredPayments.length) * 100)
                  : 0;
                return (
                  <div key={key} className="p-2.5 sm:p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${cfg.cls}`}
                      >
                        <StatusIcon className={`h-3 w-3 ${cfg.iconCls}`} />
                        {label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-700">
                        {count}{" "}
                        <span className="text-xs text-slate-400 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          key === "success"
                            ? "bg-emerald-500"
                            : key === "failed"
                            ? "bg-red-500"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Monthly Breakdown ─────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-violet-600" />
            Monthly Revenue
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {Object.entries(
              filteredPayments.reduce((acc, p) => {
                const month = new Date(p.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                });
                acc[month] = (acc[month] || 0) + p.amount;
                return acc;
              }, {})
            )
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([month, amount]) => (
                <div
                  key={month}
                  className="p-3 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg border border-violet-100"
                >
                  <p className="text-xs text-slate-500 font-medium truncate">{month}</p>
                  <p className="text-sm sm:text-base font-bold text-violet-700 mt-0.5 truncate">
                    {formatCurrency(amount)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* ── Summary Footer ───────────────────────────── */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-4 sm:p-5 text-white shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            {[
              { label: "TOTAL REVENUE", value: formatCurrency(totals.total) },
              { label: "TRANSACTIONS", value: totals.count },
              { label: "AVG AMOUNT", value: formatCurrency(totals.average) },
              { label: "SUCCESS RATE", value: `${Math.round((successPayments.length / (filteredPayments.length || 1)) * 100)}%` },
            ].map(item => (
              <div key={item.label}>
                <p className="text-indigo-200 text-xs font-medium tracking-wide">{item.label}</p>
                <p className="text-base sm:text-xl font-bold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentDashboard;
