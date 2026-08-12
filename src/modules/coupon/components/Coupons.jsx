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

/* Fonts match the Correspondence Archive letterhead:
   Fraunces for display type, IBM Plex Mono for labels / codes. */
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

const couponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discount: z.coerce.number().min(0, "Must be ≥ 0"),
  type: z.enum(["percentage", "fixed"]),
  expiryDate: z.string().min(1, "Expiry date required"),
});

/* Coupon card, styled as a perforated ticket stub — the signature
   element for this page, since a coupon literally is a redeemable slip. */
function CouponCard({ coupon, onDelete, onToggle, onCopy }) {
  const isActive = coupon.isActive;
  const isExpired = new Date(coupon.expiry) < new Date();

  return (
    <div
      className="relative flex border transition-opacity"
      style={{
        borderColor: isActive ? INK : LINE,
        backgroundColor: "#FFFFFF",
        opacity: isActive ? 1 : 0.65,
      }}
    >
      {/* Perforation notches */}
      <span
        className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full"
        style={{ backgroundColor: PAPER, border: `1px solid ${isActive ? INK : LINE}` }}
      />
      <span
        className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full"
        style={{ backgroundColor: PAPER, border: `1px solid ${isActive ? INK : LINE}` }}
      />

      <div className="flex-1 p-4 sm:p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <Tag className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? RUST : FAINT }} />
            <div className="min-w-0">
              <p
                className="font-mono text-sm font-medium tracking-widest truncate"
                style={{ color: INK }}
              >
                {coupon.couponCode}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="inline-flex items-center gap-0.5 text-[10px] font-mono tracking-widest px-1.5 py-0.5 border"
                  style={
                    isActive
                      ? { color: GOOD, backgroundColor: GOOD_BG, borderColor: "#BFE0DA" }
                      : { color: MUTE, backgroundColor: "#F0EFEA", borderColor: LINE }
                  }
                >
                  {isActive ? (
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  ) : (
                    <XCircle className="h-2.5 w-2.5" />
                  )}
                  {isActive ? "ACTIVE" : "INACTIVE"}
                </span>
                {isExpired && (
                  <span
                    className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border"
                    style={{ color: RUST, backgroundColor: "#FBF3F1", borderColor: "#E9C7C0" }}
                  >
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
              className="p-1.5 transition-colors"
              style={{ color: FAINT }}
              onMouseEnter={e => (e.currentTarget.style.color = INK)}
              onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(coupon._id)}
              title="Delete"
              className="p-1.5 transition-colors"
              style={{ color: FAINT }}
              onMouseEnter={e => (e.currentTarget.style.color = RUST)}
              onMouseLeave={e => (e.currentTarget.style.color = FAINT)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="border-t border-dashed my-3" style={{ borderColor: LINE }} />

        {/* Discount info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            {coupon.type === "percentage" ? (
              <Percent className="h-3.5 w-3.5" style={{ color: RUST }} />
            ) : (
              <DollarSign className="h-3.5 w-3.5" style={{ color: RUST }} />
            )}
            <span className="font-display text-lg font-semibold" style={{ color: INK }}>
              {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
            </span>
            <span className="font-mono text-[10px] tracking-widest" style={{ color: FAINT }}>
              {coupon.type?.toUpperCase()}
            </span>
          </div>
          <div
            className="flex items-center gap-1 font-mono text-[10px] tracking-widest"
            style={{ color: MUTE }}
          >
            <Calendar className="h-3 w-3" />
            {new Date(coupon.expiry)
              .toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })
              .toUpperCase()}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => onToggle(coupon._id)}
          className="w-full py-2 font-mono text-[10px] tracking-widest border transition-colors"
          style={
            isActive
              ? { borderColor: "#E9C7C0", color: RUST, backgroundColor: "#FFFFFF" }
              : { borderColor: "#BFE0DA", color: GOOD, backgroundColor: "#FFFFFF" }
          }
        >
          {isActive ? "DEACTIVATE" : "ACTIVATE"}
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
      filterStatus === "all" ? true : filterStatus === "active" ? c.isActive : !c.isActive;
    return matchSearch && matchStatus;
  });

  const activeCoupons = coupons.filter(c => c.isActive).length;

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen p-3 sm:p-4 lg:p-6">
      <FontImports />
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ── Letterhead ── */}
        <div
          className="pb-5 border-b-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{ borderColor: INK }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-widest mb-2" style={{ color: RUST }}>
              PROMOTIONAL LEDGER
            </div>
            <h1 className="font-display text-3xl font-medium" style={{ color: INK }}>
              Coupon Management
            </h1>
            <p className="font-mono text-[11px] tracking-widest mt-1" style={{ color: MUTE }}>
              CREATE AND MANAGE PROMOTIONAL COUPONS
            </p>
          </div>
          <button
            onClick={() => {
              form.reset();
              setEditingCoupon(null);
              setShowAddForm(v => !v);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 font-mono text-[11px] tracking-widest transition-colors"
            style={
              showAddForm
                ? { border: `1px solid ${LINE}`, color: INK, backgroundColor: "#FFFFFF" }
                : { backgroundColor: RUST, color: "#FFFFFF" }
            }
          >
            {showAddForm ? (
              <>
                <X className="h-3.5 w-3.5" />
                CANCEL
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                ADD COUPON
              </>
            )}
          </button>
        </div>

        {/* ── Quick Stats ── */}
        <div className="grid grid-cols-3 border" style={{ borderColor: LINE }}>
          {[
            { label: "TOTAL", value: coupons.length, color: INK },
            { label: "ACTIVE", value: activeCoupons, color: GOOD },
            { label: "INACTIVE", value: coupons.length - activeCoupons, color: FAINT },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="p-4 text-center"
              style={{
                backgroundColor: "#FFFFFF",
                borderRight: i < 2 ? `1px solid ${LINE}` : "none",
              }}
            >
              <p className="font-display text-2xl font-semibold" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="font-mono text-[10px] tracking-widest mt-1" style={{ color: MUTE }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Add Form ── */}
        {showAddForm && (
          <div
            className="border p-4 sm:p-5"
            style={{ borderColor: RUST, backgroundColor: "#FFFFFF" }}
          >
            <h2
              className="font-mono text-[11px] tracking-widest mb-4 flex items-center gap-1.5 pb-3 border-b"
              style={{ color: INK, borderColor: LINE }}
            >
              <Tag className="h-3.5 w-3.5" style={{ color: RUST }} />
              {editingCoupon ? "UPDATE COUPON" : "CREATE NEW COUPON"}
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
                      <FormLabel
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        COUPON CODE
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SAVE20"
                          className="text-sm uppercase rounded-none"
                          style={{ borderColor: LINE }}
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
                      <FormLabel
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        DISCOUNT TYPE
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger
                            className="text-sm rounded-none"
                            style={{ borderColor: LINE }}
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
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
                      <FormLabel
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        DISCOUNT VALUE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="text-sm rounded-none"
                          style={{ borderColor: LINE }}
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
                      <FormLabel
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: MUTE }}
                      >
                        EXPIRY DATE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="text-sm rounded-none"
                          style={{ borderColor: LINE }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="sm:col-span-2 flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-mono text-[11px] tracking-widest text-white transition hover:opacity-90"
                    style={{ backgroundColor: RUST }}
                  >
                    {editingCoupon ? "UPDATE COUPON" : "CREATE COUPON"}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 font-mono text-[11px] tracking-widest border transition"
                    style={{ borderColor: LINE, color: INK, backgroundColor: "#FFFFFF" }}
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCoupon(null);
                      form.reset();
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* ── Search & Filter ── */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
              style={{ color: FAINT }}
            />
            <input
              type="text"
              placeholder="Search coupons…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border outline-none transition"
              style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
            />
          </div>
          <div className="flex gap-1.5">
            {["all", "active", "inactive"].map(status => {
              const active = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className="px-3 py-2.5 font-mono text-[10px] tracking-widest border transition-colors"
                  style={
                    active
                      ? { backgroundColor: INK, color: "#FFFFFF", borderColor: INK }
                      : { backgroundColor: "#FFFFFF", color: MUTE, borderColor: LINE }
                  }
                >
                  {status.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Coupon Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
          <div
            className="border py-16 px-4 text-center"
            style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
          >
            <Tag className="mx-auto mb-3 h-8 w-8" style={{ color: LINE }} strokeWidth={1.25} />
            <p className="font-display text-base font-medium" style={{ color: INK }}>
              {searchTerm || filterStatus !== "all"
                ? "No coupons match your filters"
                : "No coupons yet"}
            </p>
            <p className="font-mono text-[11px] tracking-widest mt-1" style={{ color: FAINT }}>
              {searchTerm || filterStatus !== "all"
                ? "TRY ADJUSTING YOUR SEARCH OR FILTER"
                : "CLICK 'ADD COUPON' TO CREATE YOUR FIRST ONE"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
