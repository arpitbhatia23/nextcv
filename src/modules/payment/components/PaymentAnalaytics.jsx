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
const GOOD = "#0F6E63";
const GOOD_BG = "#EAF4F2";

// Status badge config — restyled to the letterhead's ink / rust / good-green trio
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
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono tracking-widest border"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{cfg.label.toUpperCase()}</span>
    </span>
  );
}

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
        <Search className="mx-auto mb-3 h-8 w-8" style={{ color: LINE }} strokeWidth={1.25} />
        <p className="font-display text-base font-medium" style={{ color: INK }}>
          No transactions found
        </p>
        <p className="font-mono text-[11px] tracking-widest mt-1" style={{ color: FAINT }}>
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
        style={{ borderColor: LINE, backgroundColor: PAPER }}
      >
        <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
          SHOWING {start + 1}–{Math.min(start + ITEMS_PER_PAGE, payments.length)} OF{" "}
          {payments.length}
        </p>
        <p className="font-mono text-[11px] tracking-widest" style={{ color: FAINT }}>
          PAGE {page}/{totalPages}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: PAPER }} className="hover:bg-transparent">
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3"
                style={{ color: MUTE }}
              >
                TRANSACTION ID
              </TableHead>
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3"
                style={{ color: MUTE }}
              >
                DATE
              </TableHead>
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3 hidden sm:table-cell"
                style={{ color: MUTE }}
              >
                TIME
              </TableHead>
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3"
                style={{ color: MUTE }}
              >
                AMOUNT
              </TableHead>
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3 hidden md:table-cell"
                style={{ color: MUTE }}
              >
                MODE
              </TableHead>
              <TableHead
                className="font-mono text-[10px] tracking-widest py-3"
                style={{ color: MUTE }}
              >
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current.map((payment, idx) => {
              const isLast = idx === current.length - 1;
              return (
                <React.Fragment key={payment._id}>
                  <TableRow className="transition-colors" style={{ borderColor: LINE }}>
                    <TableCell className="py-3 sm:py-4">
                      <span
                        className="font-mono text-xs truncate block max-w-25 sm:max-w-40"
                        style={{ color: INK }}
                      >
                        {payment?.transcationId || payment?.transactionId || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <span className="font-mono text-xs whitespace-nowrap" style={{ color: MUTE }}>
                        {new Date(payment?.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "2-digit",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 hidden sm:table-cell">
                      <span className="font-mono text-[11px]" style={{ color: FAINT }}>
                        {new Date(payment?.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <span
                        className="font-display text-sm font-semibold"
                        style={{
                          color: payment?.status?.toLowerCase() === "failed" ? RUST : GOOD,
                        }}
                      >
                        {formatCurrency(payment?.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 hidden md:table-cell">
                      <span
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        {(payment?.paymentMode || "—").toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4">
                      <StatusPill status={payment?.status} />
                    </TableCell>
                  </TableRow>
                  {/* Visual separator between groups of 5 rows */}
                  {(idx + 1) % 5 === 0 && !isLast && (
                    <TableRow key={`sep-${idx}`} className="h-0 p-0 hover:bg-transparent">
                      <TableCell
                        colSpan={6}
                        className="p-0"
                        style={{ borderTop: `1px dashed ${LINE}` }}
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
        <div
          className="px-4 sm:px-6 py-3 flex items-center justify-between border-t"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] tracking-widest border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: INK, borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <div className="flex items-center gap-1">
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
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-xs transition-colors border"
                  style={
                    active
                      ? { backgroundColor: INK, color: "#FFFFFF", borderColor: INK }
                      : { color: MUTE, borderColor: LINE, backgroundColor: "#FFFFFF" }
                  }
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] tracking-widest border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: INK, borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="h-3.5 w-3.5" />
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
    // Only successful / completed payments count toward revenue
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
        <p className="font-mono text-[11px] tracking-widest" style={{ color: MUTE }}>
          RETRIEVING TRANSACTION LEDGER&hellip;
        </p>
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
      sub: `${totals.successCount} paid txns`,
      value: formatCurrency(totals.average),
      icon: Calculator,
    },
    {
      label: "All Transactions",
      sub: "Any status",
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
    <div style={{ backgroundColor: PAPER }} className="min-h-screen p-3 sm:p-4 lg:p-6">
      <FontImports />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Letterhead ───────────────────────────────────── */}
        <div
          className="pb-5 border-b-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ borderColor: INK }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-widest mb-2" style={{ color: RUST }}>
              TRANSACTION LEDGER
            </div>
            <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
              Payment Transactions
            </h1>
            <p className="font-mono text-[11px] tracking-widest mt-1" style={{ color: MUTE }}>
              VIEW, FILTER, AND EXPORT ALL PAYMENT RECORDS
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="flex items-center gap-1.5 border px-3 py-2 font-mono text-[10px] tracking-widest transition-colors disabled:opacity-50"
              style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">REFRESH</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 font-mono text-[10px] tracking-widest text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: RUST }}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">EXPORT CSV</span>
              <span className="inline sm:hidden">EXPORT</span>
            </button>
          </div>
        </div>

        {/* ── Summary Cards ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border" style={{ borderColor: LINE }}>
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-4 sm:p-5"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRight: i < summaryCards.length - 1 ? `1px solid ${LINE}` : "none",
                  borderBottom: i < 2 ? `1px solid ${LINE}` : "none",
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-mono text-[10px] tracking-widest" style={{ color: MUTE }}>
                    {card.label.toUpperCase()}
                  </p>
                  <Icon className="h-4 w-4 shrink-0" style={{ color: FAINT }} />
                </div>
                <p
                  className="font-display text-lg sm:text-2xl font-semibold truncate"
                  style={{ color: INK }}
                >
                  {card.value}
                </p>
                {card.sub && (
                  <p
                    className="font-mono text-[10px] tracking-widest mt-1 truncate"
                    style={{ color: FAINT }}
                  >
                    {card.sub.toUpperCase()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Filters ───────────────────────────────────── */}
        <div className="border p-4" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-3.5 w-3.5" style={{ color: FAINT }} />
            <span className="font-mono text-[11px] tracking-widest" style={{ color: INK }}>
              FILTERS &amp; SEARCH
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: FAINT }}
              />
              <input
                type="text"
                placeholder="Search by ID, mode, status…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border outline-none transition"
                style={{ borderColor: LINE }}
              />
            </div>
            <select
              value={dateFilter.period}
              onChange={e => setDateFilter(f => ({ ...f, period: e.target.value }))}
              aria-label="time range"
              className="border px-3 py-2 font-mono text-[11px] tracking-widest outline-none transition"
              style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
            >
              <option value="all">ALL TIME</option>
              <option value="today">TODAY</option>
              <option value="thisWeek">THIS WEEK</option>
              <option value="thisMonth">THIS MONTH</option>
              <option value="thisYear">THIS YEAR</option>
              <option value="custom">CUSTOM RANGE</option>
            </select>
            {dateFilter.period === "custom" && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFilter.startDate}
                  onChange={e => setDateFilter(f => ({ ...f, startDate: e.target.value }))}
                  className="border px-3 py-2 font-mono text-xs outline-none"
                  style={{ borderColor: LINE, color: INK }}
                />
                <input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={e => setDateFilter(f => ({ ...f, endDate: e.target.value }))}
                  className="border px-3 py-2 font-mono text-xs outline-none"
                  style={{ borderColor: LINE, color: INK }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Transaction Tabs (All / Success / Failed / Pending) ── */}
        <div className="border" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
          {/* Tab bar */}
          <div
            className="flex border-b overflow-x-auto scrollbar-hide"
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
                  className="flex items-center gap-1.5 px-3 sm:px-5 py-3 sm:py-3.5 font-mono text-[11px] tracking-widest whitespace-nowrap border-b-2 transition-all duration-200 shrink-0"
                  style={
                    isActive
                      ? { borderColor: INK, color: INK, backgroundColor: PAPER }
                      : { borderColor: "transparent", color: MUTE }
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label.toUpperCase()}
                  <span
                    className="ml-0.5 px-1.5 py-0.5 text-[10px] font-mono"
                    style={
                      isActive
                        ? { backgroundColor: INK, color: "#FFFFFF" }
                        : { backgroundColor: "#F0EFEA", color: MUTE }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section header inside panel */}
          <div className="px-4 sm:px-6 py-3 border-b" style={{ borderColor: LINE }}>
            <h3
              className="font-mono text-[11px] tracking-widest flex items-center gap-1.5"
              style={{ color: INK }}
            >
              {(() => {
                const tab = TX_TABS.find(t => t.id === activeTxTab);
                const Icon = tab?.icon;
                return (
                  <>
                    {Icon && <Icon className="h-3.5 w-3.5" style={{ color: RUST }} />}
                    {tab?.label.toUpperCase()} TRANSACTIONS
                  </>
                );
              })()}
            </h3>
          </div>

          {/* Table */}
          <TransactionTable payments={tabPayments[activeTxTab]} />
        </div>

        {/* ── Analytics Cards ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Mode Breakdown */}
          <div
            className="border p-4 sm:p-5"
            style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <h4
              className="font-mono text-[10px] tracking-widest mb-3 flex items-center gap-1.5 pb-3 border-b"
              style={{ color: MUTE, borderColor: LINE }}
            >
              <DollarSign className="h-3.5 w-3.5" style={{ color: RUST }} />
              PAYMENT MODE BREAKDOWN
            </h4>
            <div className="divide-y" style={{ borderColor: LINE }}>
              {Object.entries(totals.byPaymentMode).length === 0 ? (
                <p
                  className="font-mono text-[11px] tracking-widest text-center py-6"
                  style={{ color: FAINT }}
                >
                  NO DATA
                </p>
              ) : (
                Object.entries(totals.byPaymentMode).map(([mode, amount]) => (
                  <div key={mode} className="flex justify-between items-center py-2.5">
                    <span className="font-mono text-[11px] tracking-widest" style={{ color: INK }}>
                      {mode?.toUpperCase()}
                    </span>
                    <span className="font-display text-sm font-semibold" style={{ color: RUST }}>
                      {formatCurrency(amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status Overview */}
          <div
            className="border p-4 sm:p-5"
            style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <h4
              className="font-mono text-[10px] tracking-widest mb-3 flex items-center gap-1.5 pb-3 border-b"
              style={{ color: MUTE, borderColor: LINE }}
            >
              <FileText className="h-3.5 w-3.5" style={{ color: RUST }} />
              TRANSACTION STATUS OVERVIEW
            </h4>
            <div className="space-y-3">
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
                    <div className="flex justify-between items-center mb-1.5">
                      <StatusPill status={key} />
                      <span
                        className="font-mono text-[11px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full" style={{ backgroundColor: "#F0EFEA" }}>
                      <div
                        className="h-full transition-all duration-500"
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
          className="border p-4 sm:p-5"
          style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
        >
          <h4
            className="font-mono text-[10px] tracking-widest mb-4 flex items-center gap-1.5 pb-3 border-b"
            style={{ color: MUTE, borderColor: LINE }}
          >
            <Calendar className="h-3.5 w-3.5" style={{ color: RUST }} />
            MONTHLY REVENUE
          </h4>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border"
            style={{ borderColor: LINE }}
          >
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
              .map(([month, amount], i, arr) => (
                <div
                  key={month}
                  className="p-3"
                  style={{
                    borderRight:
                      (i + 1) % 4 !== 0 && i !== arr.length - 1 ? `1px solid ${LINE}` : "none",
                    borderTop: i >= 4 ? `1px solid ${LINE}` : "none",
                  }}
                >
                  <p
                    className="font-mono text-[10px] tracking-widest truncate"
                    style={{ color: MUTE }}
                  >
                    {month.toUpperCase()}
                  </p>
                  <p
                    className="font-display text-sm sm:text-base font-semibold mt-0.5 truncate"
                    style={{ color: INK }}
                  >
                    {formatCurrency(amount)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* ── Summary Footer ───────────────────────────── */}
        <div className="p-5 sm:p-6" style={{ backgroundColor: INK }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
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
            ].map(item => (
              <div key={item.label}>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: "#8B90A0" }}>
                  {item.label}
                </p>
                <p className="font-display text-lg sm:text-2xl font-semibold mt-1 text-white">
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
