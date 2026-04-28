"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Calendar,
  Percent,
  DollarSign,
  Tag,
  CheckCircle2,
  XCircle,
  Search,
  X,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const couponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discount: z.coerce.number().min(0, "Must be ≥ 0"),
  type: z.enum(["percentage", "fixed"]),
  expiryDate: z.string().min(1, "Expiry date required"),
});

function CouponCard({ coupon, onDelete, onToggle, onCopy }) {
  const isActive = coupon.isActive;
  const isExpired = new Date(coupon.expiry) < new Date();

  return (
    <div
      className={`relative bg-white rounded-xl border shadow-sm p-4 sm:p-5 transition-all hover:shadow-md ${
        isActive ? "border-slate-200" : "border-slate-100 opacity-70"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`p-1.5 rounded-lg flex-shrink-0 ${
              isActive ? "bg-indigo-100" : "bg-slate-100"
            }`}
          >
            <Tag
              className={`h-3.5 w-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-bold text-slate-800 truncate font-mono tracking-wide">
              {coupon.couponCode}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isActive ? (
                  <CheckCircle2 className="h-2.5 w-2.5" />
                ) : (
                  <XCircle className="h-2.5 w-2.5" />
                )}
                {isActive ? "Active" : "Inactive"}
              </span>
              {isExpired && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                  Expired
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onCopy(coupon.couponCode)}
            title="Copy code"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(coupon._id)}
            title="Delete"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-slate-100 my-3" />

      {/* Discount info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          {coupon.type === "percentage" ? (
            <Percent className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
          )}
          <span className="text-sm sm:text-base font-bold text-slate-800">
            {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
          </span>
          <span className="text-xs text-slate-400 capitalize">{coupon.type}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="h-3 w-3" />
          <span className="text-xs">
            {new Date(coupon.expiry).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => onToggle(coupon._id)}
        className={`w-full py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
          isActive
            ? "border-red-200 text-red-600 hover:bg-red-50"
            : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
        }`}
      >
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}

const Page = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive

  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: "", discount: 0, type: "percentage", expiryDate: "" },
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("/api/coupons/getAllCoupon");
        setCoupons(res?.data?.data || []);
      } catch (error) {
        toast.error(error?.response?.data || "Something went wrong");
      }
    };
    fetchCoupons();
  }, []);

  const onSubmit = async values => {
    const payload = {
      couponCode: values.code,
      discount: values.discount,
      type: values.type,
      expiry: values.expiryDate,
    };
    try {
      const created = await axios.post("/api/coupons/create", payload);
      setCoupons(prev => [...prev, created.data]);
      form.reset();
      setEditingCoupon(null);
      setShowAddForm(false);
      toast.success("Coupon created!");
    } catch (err) {
      toast.error(err?.response?.data || "Failed to create coupon");
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/coupons/delete/${id}`);
      setCoupons(prev => prev.filter(c => c._id !== id));
      toast.success("Coupon deleted");
    } catch {
      toast.error("Failed to delete coupon");
    }
  };

  const toggleStatus = async id => {
    try {
      const coupon = coupons.find(c => c._id === id);
      const updated = await axios.put(`/api/coupons/toggle/${id}`, {
        isActive: !coupon.isActive,
      });
      setCoupons(prev => prev.map(c => (c._id === id ? updated.data.data : c)));
    } catch (error) {
      toast.error(error?.response?.data || "Failed to update status");
    }
  };

  const copyToClipboard = code => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`);
  };

  // Filtered coupons
  const filtered = coupons.filter(c => {
    const matchSearch = c.couponCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
        ? c.isActive
        : !c.isActive;
    return matchSearch && matchStatus;
  });

  const activeCoupons = coupons.filter(c => c.isActive).length;

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">
        {/* ── Header ── */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                Coupon Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Create and manage promotional coupons
              </p>
            </div>
            <button
              onClick={() => {
                form.reset();
                setEditingCoupon(null);
                setShowAddForm(v => !v);
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                showAddForm
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {showAddForm ? (
                <>
                  <X className="h-3.5 w-3.5" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  Add Coupon
                </>
              )}
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-100">
            {[
              { label: "Total", value: coupons.length, color: "text-slate-700" },
              { label: "Active", value: activeCoupons, color: "text-emerald-600" },
              { label: "Inactive", value: coupons.length - activeCoupons, color: "text-slate-400" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Add Form ── */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 sm:p-5">
            <h2 className="text-xs sm:text-sm font-semibold text-slate-700 mb-4 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-indigo-600" />
              {editingCoupon ? "Update Coupon" : "Create New Coupon"}
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Coupon Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SAVE20"
                          className="text-xs sm:text-sm uppercase"
                          {...field}
                          onChange={e => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-xs sm:text-sm">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Discount Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="text-xs sm:text-sm"
                          placeholder="e.g. 20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="text-xs sm:text-sm" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="sm:col-span-2 flex gap-2 pt-1">
                  <Button type="submit" size="sm" className="text-xs sm:text-sm">
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCoupon(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* ── Search & Filter ── */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search coupons…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none bg-white transition"
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "active", "inactive"].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors capitalize ${
                  filterStatus === status
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* ── Coupon Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((coupon, index) => (
              <CouponCard
                key={coupon._id || index}
                coupon={coupon}
                onDelete={handleDelete}
                onToggle={toggleStatus}
                onCopy={copyToClipboard}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm py-16 px-4 text-center">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Tag className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-600">
              {searchTerm || filterStatus !== "all" ? "No coupons match your filters" : "No coupons yet"}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter"
                : "Click 'Add Coupon' to create your first one"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
