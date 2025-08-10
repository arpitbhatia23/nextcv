"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Download,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminPaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
    period: "all",
  });

  // Simulate API call
  const fetchPayments = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      const res = await axios.get("/api/payment/getTransctionData");
      console.log(res.data.data);
      setPayments(res.data.data);
      setFilteredPayments(res.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter payments based on date and search
  useEffect(() => {
    let filtered = [...payments];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.transactionId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.paymentMode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (dateFilter.period !== "all") {
      const now = new Date();
      let startDate;

      switch (dateFilter.period) {
        case "today":
          startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          filtered = filtered.filter((p) => new Date(p.createdAt) >= startDate);
          break;
        case "thisWeek":
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          filtered = filtered.filter((p) => new Date(p.createdAt) >= startDate);
          break;
        case "thisMonth":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          filtered = filtered.filter((p) => new Date(p.createdAt) >= startDate);
          break;
        case "thisYear":
          startDate = new Date(now.getFullYear(), 0, 1);
          filtered = filtered.filter((p) => new Date(p.createdAt) >= startDate);
          break;
        case "custom":
          if (dateFilter.startDate && dateFilter.endDate) {
            filtered = filtered.filter((p) => {
              const paymentDate = new Date(p.createdAt);
              return (
                paymentDate >= new Date(dateFilter.startDate) &&
                paymentDate <= new Date(dateFilter.endDate)
              );
            });
          }
          break;
      }
    }

    setFilteredPayments(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [payments, dateFilter, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Calculate totals
  const accountingTotals = useMemo(() => {
    const totalAmount = filteredPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    const byPaymentMode = filteredPayments.reduce((acc, payment) => {
      acc[payment.paymentMode] =
        (acc[payment.paymentMode] || 0) + payment.amount;
      return acc;
    }, {});

    const byStatus = filteredPayments.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {});

    const byMonth = filteredPayments.reduce((acc, payment) => {
      const month = new Date(payment.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      });
      acc[month] = (acc[month] || 0) + payment.amount;
      return acc;
    }, {});

    return {
      total: totalAmount,
      count: filteredPayments.length,
      byPaymentMode,
      byStatus,
      byMonth,
      average: totalAmount / (filteredPayments.length || 1),
    };
  }, [filteredPayments]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Transaction ID",
      "Date",
      "Time",
      "Amount (₹)",
      "Payment Mode",
      "Status",
    ];

    const csvData = filteredPayments.map((payment) => [
      payment.transactionId,
      new Date(payment.createdAt).toLocaleDateString("en-IN"),
      new Date(payment.createdAt).toLocaleTimeString("en-IN"),
      payment.amount,
      payment.paymentMode,
      payment.status,
    ]);

    // Add summary
    csvData.push(
      [],
      ["SUMMARY"],
      ["Total Amount", "", "", accountingTotals.total, "", ""],
      ["Total Transactions", "", "", accountingTotals.count, "", ""],
      ["Average Amount", "", "", Math.round(accountingTotals.average), "", ""]
    );

    // Add payment mode breakdown
    csvData.push([], ["PAYMENT MODE BREAKDOWN"]);
    Object.entries(accountingTotals.byPaymentMode).forEach(([mode, amount]) => {
      csvData.push([mode, "", "", amount, "", ""]);
    });

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payment_report_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPaymentModeColor = (mode) => {
    const colors = {
      "Bank Transfer": "bg-blue-100 text-blue-800",
      UPI: "bg-purple-100 text-purple-800",
      "Credit Card": "bg-indigo-100 text-indigo-800",
      Cash: "bg-green-100 text-green-800",
    };
    return colors[mode] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Payment Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                View all transactions with advanced filtering and pagination
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchPayments}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(accountingTotals.total)}
                </p>
              </div>
              <DollarSign className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Transactions
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {accountingTotals.count}
                </p>
              </div>
              <FileText className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Amount
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(accountingTotals.average)}
                </p>
              </div>
              <Calculator className="text-purple-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Payment Methods
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {Object.keys(accountingTotals.byPaymentMode).length}
                </p>
              </div>
              <Eye className="text-orange-600" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold">Filters & Search</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={dateFilter.period}
              onChange={(e) =>
                setDateFilter({ ...dateFilter, period: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {dateFilter.period === "custom" && (
              <>
                <input
                  type="date"
                  value={dateFilter.startDate}
                  onChange={(e) =>
                    setDateFilter({ ...dateFilter, startDate: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={dateFilter.endDate}
                  onChange={(e) =>
                    setDateFilter({ ...dateFilter, endDate: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">All Transactions</h3>
                <p className="text-sm text-gray-600">
                  Showing {filteredPayments.length} transactions with time data
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPayments.map((payment) => (
                  <TableRow key={payment._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {payment?.transcationId}
                    </TableCell>
                    <TableCell>
                      {new Date(payment?.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(payment?.createdAt).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-green-600 font-bold">
                      {formatCurrency(payment?.amount)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentModeColor(
                          payment?.paymentMode
                        )}`}
                      >
                        {payment?.paymentMode}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                          payment?.status
                        )}`}
                      >
                        {payment.status?.charAt(0).toUpperCase() +
                          payment.status?.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredPayments.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredPayments.length}</span>{" "}
                results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-3 py-2 text-sm font-medium border rounded-md ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400">
                <Search size={48} className="mx-auto mb-4" />
              </div>
              <p className="text-gray-500 text-lg">No transactions found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-blue-600" />
              Payment Mode Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(accountingTotals.byPaymentMode).map(
                ([mode, amount]) => (
                  <div
                    key={mode}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentModeColor(
                          mode
                        )}`}
                      >
                        {mode}
                      </span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-green-600" />
              Transaction Status Overview
            </h3>
            <div className="space-y-3">
              {Object.entries(accountingTotals.byStatus).map(
                ([status, count]) => (
                  <div
                    key={status}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                          status
                        )}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <span className="font-bold text-green-600">
                      {count} transactions
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-purple-600" />
            Monthly Revenue Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(accountingTotals.byMonth)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([month, amount]) => (
                <div
                  key={month}
                  className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100"
                >
                  <p className="text-sm font-medium text-gray-600">{month}</p>
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(amount)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-blue-100 font-medium">TOTAL REVENUE</p>
              <p className="text-2xl font-bold">
                {formatCurrency(accountingTotals.total)}
              </p>
            </div>
            <div>
              <p className="text-blue-100 font-medium">TRANSACTIONS</p>
              <p className="text-2xl font-bold">{accountingTotals.count}</p>
            </div>
            <div>
              <p className="text-blue-100 font-medium">AVERAGE AMOUNT</p>
              <p className="text-2xl font-bold">
                {formatCurrency(accountingTotals.average)}
              </p>
            </div>
            <div>
              <p className="text-blue-100 font-medium">DATA STATUS</p>
              <p className="text-2xl font-bold">✓ READY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentDashboard;
