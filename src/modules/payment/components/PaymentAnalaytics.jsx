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

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const INK = "#17201C";
const BRAND = "#465B9E";
const BRAND_DARK = "#344B93";
const BRAND_LIGHT = "#EEF0F7";
const PAPER = "#F8F7F3";
const LINE = "#E3E2DC";
const MUTE = "#5B625C";
const FAINT = "#8A908B";
const GOOD = "#0F6E63";
const GOOD_BG = "#EAF4F2";
const RUST = "#B3382C";

// Status badge config
const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    color: GOOD,
    bg: GOOD_BG,
    border: "#BFE0DA",
    icon: CheckCircle2,
  },
  success: {
    label: "Success",
    color: GOOD,
    bg: GOOD_BG,
    border: "#BFE0DA",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    color: RUST,
    bg: "#FBF3F1",
    border: "#E9C7C0",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    color: "#8A6B1E",
    bg: "#FBF5E6",
    border: "#E9DAB0",
    icon: Clock,
  },
};

const getStatusConfig = status => {
  const key = status?.toLowerCase();
  return (
    STATUS_CONFIG[key] || {
      label: status || "Unknown",
      color: MUTE,
      bg: "#F0EFEA",
      border: LINE,
      icon: Clock,
    }
  );
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

function StatusPill({ status }) {
  const cfg = getStatusConfig(status);
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-sans font-medium rounded-full border"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      <Icon className="h-3 w-3" />
      <span>{cfg.label}</span>
    </span>
  );
}

const TransactionTable = React.memo(({ payments }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = payments.slice(start, start + ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [payments]);

  if (payments.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-12 h-12 rounded-2xl bg-[#F8F7F3] border border-[#E3E2DC] flex items-center justify-center mx-auto mb-3 text-[#8A908B]">
          <Search className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <p className="font-display text-base font-medium text-[#17201C]">
          No transactions found
        </p>
        <p className="font-mono text-xs tracking-wider mt-1 text-[#8A908B]">
          TRY ADJUSTING YOUR FILTERS OR DATE RANGE
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Table info bar */}
      <div
        className="px-4 sm:px-6 py-3 flex items-center justify-between border-b"
        style={{ borderColor: LINE, backgroundColor: "#FAF9F5" }}
      >
        <p className="font-mono text-xs tracking-wider" style={{ color: MUTE }}>
          SHOWING {start + 1}–{Math.min(start + ITEMS_PER_PAGE, payments.length)} OF {payments.length}
        </p>
        <p className="font-mono text-xs tracking-wider" style={{ color: FAINT }}>
          PAGE {page} OF {totalPages}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#FAF9F5" }} className="hover:bg-transparent border-b" border-b-color={LINE}>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 text-[#5B625C]">
                TRANSACTION ID
              </TableHead>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 text-[#5B625C]">
                DATE
              </TableHead>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 hidden sm:table-cell text-[#5B625C]">
                TIME
              </TableHead>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 text-[#5B625C]">
                AMOUNT
              </TableHead>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 hidden md:table-cell text-[#5B625C]">
                MODE
              </TableHead>
              <TableHead className="font-mono text-[11px] tracking-wider py-3.5 text-[#5B625C]">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.map((payment, idx) => {
              return (
                <TableRow
                  key={payment._id || idx}
                  className="transition-colors hover:bg-[#F8F7F3]/70 border-b"
                  style={{ borderColor: LINE }}
                >
                  <TableCell className="py-3.5 sm:py-4">
                    <span className="font-mono text-xs truncate block max-w-28 sm:max-w-44 text-[#17201C] font-medium">
                      {payment?.transcationId || payment?.transactionId || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 sm:py-4">
                    <span className="font-sans text-xs text-[#5B625C] whitespace-nowrap">
                      {new Date(payment?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 sm:py-4 hidden sm:table-cell">
                    <span className="font-mono text-[11px] text-[#8A908B]">
                      {new Date(payment?.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 sm:py-4">
                    <span
                      className="font-sans text-sm font-semibold"
                      style={{
                        color: payment?.status?.toLowerCase() === "failed" ? RUST : GOOD,
                      }}
                    >
                      {formatCurrency(payment?.amount)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 sm:py-4 hidden md:table-cell">
                    <span className="font-mono text-xs tracking-wider text-[#5B625C]">
                      {(payment?.paymentMode || "—").toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 sm:py-4">
                    <StatusPill status={payment?.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-t"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-medium rounded-xl border transition-colors hover:bg-[#F1F0EB] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: INK, borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (page <= 3) pageNum = i + 1;
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = page - 2 + i;

              const active = page === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-sans text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#465B9E] text-white shadow-sm"
                      : "text-[#5B625C] border border-[#E3E2DC] hover:bg-[#F1F0EB]"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-medium rounded-xl border transition-colors hover:bg-[#F1F0EB] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: INK, borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
});
TransactionTable.displayName = "TransactionTable";

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
    return successPayments.reduce(
      (acc, p) => {
        const amount = p.amount || 0;
        acc.total += amount;
        acc.successCount += 1;
        acc.byPaymentMode[p.paymentMode] = (acc.byPaymentMode[p.paymentMode] || 0) + amount;
        acc.count = filteredPayments.length;
        acc.average = acc.total / (acc.successCount || 1);
        return acc;
      },
      { total: 0, count: 0, successCount: 0, average: 0, byPaymentMode: {} }
    );
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
      <div
        style={{ backgroundColor: PAPER }}
        className="min-h-100 flex items-center justify-center"
      >
        <FontImports />
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-[#465B9E]" />
          <p className="font-mono text-xs tracking-wider text-[#5B625C]">
            RETRIEVING TRANSACTION LEDGER&hellip;
          </p>
        </div>
      </div>
    );
  }

  const summaryCards = [
    {
      label: "Total Revenue",
      sub: "Success payments only",
      value: formatCurrency(totals.total),
      icon: DollarSign,
    },
    {
      label: "Avg. per Success",
      sub: `${totals.successCount} paid transactions`,
      value: formatCurrency(totals.average),
      icon: Calculator,
    },
    {
      label: "All Transactions",
      sub: "Any payment status",
      value: totals.count,
      icon: FileText,
    },
    {
      label: "Success Rate",
      sub: `${totals.successCount} succeeded`,
      value: `${Math.round((totals.successCount / (totals.count || 1)) * 100)}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen p-4 sm:p-6 lg:p-8">
      <FontImports />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ── Header ───────────────────────────────────── */}
        <div
          className="pb-6 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ borderColor: LINE }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase mb-2 font-medium" style={{ color: BRAND }}>
              TRANSACTION LEDGER
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight" style={{ color: INK }}>
              Payment Transactions
            </h1>
            <p className="text-xs font-mono tracking-wide mt-1 text-[#5B625C]">
              VIEW, FILTER, AND EXPORT ALL PAYMENT RECORDS
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="flex items-center gap-2 border rounded-xl px-4 py-2 font-sans text-xs font-medium transition-colors hover:bg-[#F1F0EB] disabled:opacity-50"
              style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#5B625C] ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs font-medium text-white transition-all shadow-sm hover:opacity-95"
              style={{ backgroundColor: BRAND }}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ── Summary Cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-5 rounded-2xl border bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
                style={{ borderColor: LINE }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-xs font-medium text-[#5B625C]">
                    {card.label}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="font-display text-2xl font-semibold text-[#17201C] tracking-tight">
                  {card.value}
                </div>
                {card.sub && (
                  <p className="font-sans text-xs text-[#8A908B] mt-1.5">
                    {card.sub}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Filters ───────────────────────────────────── */}
        <div
          className="border rounded-2xl p-5 bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
          style={{ borderColor: LINE }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <Filter className="h-4 w-4 text-[#465B9E]" />
            <span className="font-mono text-xs tracking-wider font-medium text-[#17201C]">
              FILTERS &amp; SEARCH
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A908B] pointer-events-none" />
              <input
                type="text"
                placeholder="Search by ID, mode, status…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-sans rounded-xl border outline-none transition-colors focus:border-[#465B9E]"
                style={{ borderColor: LINE }}
              />
            </div>
            <select
              value={dateFilter.period}
              onChange={e => setDateFilter(f => ({ ...f, period: e.target.value }))}
              aria-label="time range"
              className="border rounded-xl px-3.5 py-2 font-sans text-xs font-medium outline-none transition-colors cursor-pointer focus:border-[#465B9E]"
              style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
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
                  className="border rounded-xl px-3 py-2 font-sans text-xs outline-none focus:border-[#465B9E]"
                  style={{ borderColor: LINE, color: INK }}
                />
                <input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={e => setDateFilter(f => ({ ...f, endDate: e.target.value }))}
                  className="border rounded-xl px-3 py-2 font-sans text-xs outline-none focus:border-[#465B9E]"
                  style={{ borderColor: LINE, color: INK }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Transaction Tabs (All / Success / Failed / Pending) ── */}
        <div
          className="border rounded-2xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
          style={{ borderColor: LINE }}
        >
          {/* Tab bar */}
          <div
            className="flex items-center gap-1 p-3 border-b overflow-x-auto scrollbar-hide bg-[#FAF9F5]"
            style={{ borderColor: LINE }}
          >
            {TX_TABS.map(tab => {
              const Icon = tab.icon;
              const count = tabCounts[tab.id];
              const isActive = activeTxTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTxTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-sans text-xs font-medium rounded-xl transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-[#EEF0F7] text-[#465B9E] shadow-xs"
                      : "text-[#5B625C] hover:bg-[#F1F0EB]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 text-[10px] font-mono rounded-full ${
                      isActive
                        ? "bg-[#465B9E] text-white"
                        : "bg-[#E3E2DC] text-[#5B625C]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section header inside panel */}
          <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: LINE }}>
            <h3 className="font-mono text-xs tracking-wider flex items-center gap-2 text-[#17201C] font-medium">
              {(() => {
                const tab = TX_TABS.find(t => t.id === activeTxTab);
                const Icon = tab?.icon;
                return (
                  <>
                    {Icon && <Icon className="h-4 w-4 text-[#465B9E]" />}
                    <span>{tab?.label.toUpperCase()} TRANSACTIONS</span>
                  </>
                );
              })()}
            </h3>
            <span className="font-mono text-xs text-[#8A908B]">
              Total: {tabCounts[activeTxTab]}
            </span>
          </div>

          {/* Table */}
          <TransactionTable payments={tabPayments[activeTxTab]} />
        </div>

        {/* ── Analytics Cards ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Mode Breakdown */}
          <div
            className="border rounded-2xl p-5 sm:p-6 bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
            style={{ borderColor: LINE }}
          >
            <h4
              className="font-mono text-xs tracking-wider mb-4 flex items-center gap-2 pb-3 border-b font-medium text-[#17201C]"
              style={{ borderColor: LINE }}
            >
              <DollarSign className="h-4 w-4 text-[#465B9E]" />
              PAYMENT MODE BREAKDOWN
            </h4>
            <div className="divide-y" style={{ borderColor: LINE }}>
              {Object.entries(totals.byPaymentMode).length === 0 ? (
                <p className="font-mono text-xs tracking-wider text-center py-8 text-[#8A908B]">
                  NO DATA AVAILABLE
                </p>
              ) : (
                Object.entries(totals.byPaymentMode).map(([mode, amount]) => (
                  <div key={mode} className="flex justify-between items-center py-3">
                    <span className="font-sans text-xs font-medium text-[#17201C]">
                      {mode?.toUpperCase()}
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#465B9E]">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status Overview */}
          <div
            className="border rounded-2xl p-5 sm:p-6 bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
            style={{ borderColor: LINE }}
          >
            <h4
              className="font-mono text-xs tracking-wider mb-4 flex items-center gap-2 pb-3 border-b font-medium text-[#17201C]"
              style={{ borderColor: LINE }}
            >
              <FileText className="h-4 w-4 text-[#465B9E]" />
              TRANSACTION STATUS OVERVIEW
            </h4>
            <div className="space-y-4">
              {[
                { key: "success", label: "Successful", count: successPayments.length },
                { key: "failed", label: "Failed", count: failedPayments.length },
                { key: "pending", label: "Pending", count: pendingPayments.length },
              ].map(({ key, label, count }) => {
                const pct = filteredPayments.length
                  ? Math.round((count / filteredPayments.length) * 100)
                  : 0;
                const barColor = key === "success" ? GOOD : key === "failed" ? RUST : "#C99A2E";
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <StatusPill status={key} />
                      <span className="font-mono text-xs tracking-wider text-[#5B625C]">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden bg-[#F0EFEA]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Monthly Breakdown ─────────────────────────── */}
        <div
          className="border rounded-2xl p-5 sm:p-6 bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
          style={{ borderColor: LINE }}
        >
          <h4
            className="font-mono text-xs tracking-wider mb-5 flex items-center gap-2 pb-3 border-b font-medium text-[#17201C]"
            style={{ borderColor: LINE }}
          >
            <Calendar className="h-4 w-4 text-[#465B9E]" />
            MONTHLY REVENUE
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                  className="p-4 rounded-xl border border-[#E3E2DC] bg-[#F8F7F3]/50 transition-colors hover:bg-[#F8F7F3]"
                >
                  <p className="font-mono text-[11px] tracking-wider text-[#5B625C] truncate">
                    {month.toUpperCase()}
                  </p>
                  <p className="font-sans text-base font-semibold text-[#17201C] mt-1 truncate">
                    {formatCurrency(amount)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* ── Summary Footer ───────────────────────────── */}
        <div
          className="p-6 rounded-2xl border bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
          style={{ borderColor: LINE }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#E3E2DC]">
            {[
              { label: "TOTAL REVENUE", value: formatCurrency(totals.total) },
              { label: "TRANSACTIONS", value: totals.count },
              { label: "AVG AMOUNT", value: formatCurrency(totals.average) },
              {
                label: "SUCCESS RATE",
                value: `${Math.round(
                  (successPayments.length / (filteredPayments.length || 1)) * 100
                )}%`,
              },
            ].map((item, idx) => (
              <div key={item.label} className={idx > 0 ? "pt-4 sm:pt-0 sm:pl-4" : ""}>
                <p className="font-mono text-xs tracking-wider text-[#8A908B]">
                  {item.label}
                </p>
                <p className="font-display text-xl sm:text-2xl font-semibold mt-1 text-[#17201C]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentDashboard;

