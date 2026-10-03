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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

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
      className={`relative rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
        isActive
          ? "border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] hover:shadow-[0_8px_24px_rgba(23,32,28,0.08)]"
          : "border-[#E3E2DC] opacity-70 bg-[#FBFBF9]"
      }`}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#EEF0F7] flex items-center justify-center text-[#465B9E] shrink-0">
              <Tag className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold tracking-wider text-[#17201C] truncate">
                {coupon.couponCode}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full border ${
                    isActive
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-[#66706B] bg-[#F1F0EB] border-[#E3E2DC]"
                  }`}
                >
                  {isActive ? (
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  ) : (
                    <XCircle className="h-2.5 w-2.5" />
                  )}
                  {isActive ? "ACTIVE" : "INACTIVE"}
                </span>

                {isExpired && (
                  <span className="text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full text-amber-800 bg-amber-50 border border-amber-200">
                    EXPIRED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onCopy(coupon.couponCode)}
              title="Copy code"
              className="p-1.5 rounded-lg text-[#8A908B] hover:text-[#17201C] hover:bg-[#F1F0EB] transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(coupon._id)}
              title="Delete"
              className="p-1.5 rounded-lg text-[#8A908B] hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E3E2DC] my-3.5" />

        {/* Discount info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {coupon.type === "percentage" ? (
              <Percent className="h-4 w-4 text-[#465B9E]" />
            ) : (
              <DollarSign className="h-4 w-4 text-[#465B9E]" />
            )}
            <span className="font-display text-xl font-semibold text-[#17201C]">
              {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#8A908B] uppercase">
              {coupon.type}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px] text-[#66706B]">
            <Calendar className="h-3 w-3 text-[#8A908B]" />
            {new Date(coupon.expiry).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => onToggle(coupon._id)}
          className={`w-full py-2 rounded-xl text-xs font-sans font-medium border transition-colors ${
            isActive
              ? "border-[#E3E2DC] text-[#5B625C] bg-white hover:bg-[#F1F0EB] hover:text-[#17201C]"
              : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
          }`}
        >
          {isActive ? "Deactivate Coupon" : "Activate Coupon"}
        </button>
      </div>
    </div>
  );
}

const Page = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  const filtered = coupons.filter(c => {
    const matchSearch = c.couponCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" ? true : filterStatus === "active" ? c.isActive : !c.isActive;
    return matchSearch && matchStatus;
  });

  const activeCoupons = coupons.filter(c => c.isActive).length;

  return (
    <div className="bg-[#F8F7F3] min-h-screen p-4 sm:p-6 lg:p-8">
      <FontImports />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-5 border-b border-[#E3E2DC] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#465B9E] mb-1">
              PROMOTIONS WORKSPACE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-[#17201C]">
              Coupon Management
            </h1>
            <p className="text-xs sm:text-sm text-[#5B625C] mt-1">
              Create, configure, and monitor discount vouchers.
            </p>
          </div>

          <button
            onClick={() => {
              form.reset();
              setEditingCoupon(null);
              setShowAddForm(v => !v);
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-medium transition-colors shadow-xs ${
              showAddForm
                ? "border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
                : "bg-[#465B9E] hover:bg-[#344B93] text-white"
            }`}
          >
            {showAddForm ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Coupon
              </>
            )}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Coupons", value: coupons.length, tag: "ALL CREATED" },
            { label: "Active Codes", value: activeCoupons, tag: "REDEEMABLE" },
            { label: "Inactive Codes", value: coupons.length - activeCoupons, tag: "PAUSED" },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border border-[#E3E2DC] bg-white shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] tracking-wider text-[#66706B] uppercase">
                  {stat.label}
                </span>
                <span className="font-mono text-[9px] text-[#8A908B] px-1.5 py-0.5 rounded-md bg-[#F8F7F3]">
                  {stat.tag}
                </span>
              </div>
              <p className="font-display text-3xl font-semibold text-[#17201C]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="rounded-2xl border border-[#E3E2DC] bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(23,32,28,0.06)] animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="font-sans text-sm font-semibold mb-4 flex items-center gap-2 pb-3 border-b border-[#E3E2DC] text-[#17201C]">
              <Tag className="h-4 w-4 text-[#465B9E]" />
              {editingCoupon ? "Update Coupon" : "Create New Coupon"}
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[10px] tracking-wider text-[#5B625C]">
                        COUPON CODE
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. SAVE20"
                          className="text-sm uppercase rounded-xl border-[#E3E2DC] bg-[#F8F7F3] focus:bg-white focus:border-[#465B9E]"
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
                      <FormLabel className="font-mono text-[10px] tracking-wider text-[#5B625C]">
                        DISCOUNT TYPE
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-sm rounded-xl border-[#E3E2DC] bg-[#F8F7F3]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-[#E3E2DC]">
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
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
                      <FormLabel className="font-mono text-[10px] tracking-wider text-[#5B625C]">
                        DISCOUNT VALUE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="text-sm rounded-xl border-[#E3E2DC] bg-[#F8F7F3] focus:bg-white focus:border-[#465B9E]"
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
                      <FormLabel className="font-mono text-[10px] tracking-wider text-[#5B625C]">
                        EXPIRY DATE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="text-sm rounded-xl border-[#E3E2DC] bg-[#F8F7F3] focus:bg-white focus:border-[#465B9E]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="sm:col-span-2 flex gap-2.5 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-medium text-white bg-[#465B9E] hover:bg-[#344B93] transition-colors shadow-xs"
                  >
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-medium border border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB] transition-colors"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCoupon(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-[#8A908B]" />
            <input
              type="text"
              placeholder="Search coupons by code…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E3E2DC] bg-white outline-none focus:border-[#465B9E] focus:ring-1 focus:ring-[#465B9E] transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center p-1 bg-white border border-[#E3E2DC] rounded-xl shadow-xs">
            {["all", "active", "inactive"].map(status => {
              const active = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 font-sans text-xs font-medium rounded-lg transition-all ${
                    active
                      ? "bg-[#465B9E] text-white shadow-xs"
                      : "text-[#5B625C] hover:text-[#17201C] hover:bg-[#F1F0EB]"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coupon Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="rounded-2xl border border-dashed border-[#C8CDD9] bg-white py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#EEF0F7] text-[#465B9E] flex items-center justify-center mx-auto mb-3">
              <Tag className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <p className="font-display text-lg font-medium text-[#17201C]">
              {searchTerm || filterStatus !== "all"
                ? "No coupons match your filters"
                : "No coupons created yet"}
            </p>
            <p className="font-sans text-xs text-[#8A908B] mt-1">
              {searchTerm || filterStatus !== "all"
                ? "Try searching for a different code or resetting filters."
                : "Click 'Add Coupon' above to create your first discount voucher."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
