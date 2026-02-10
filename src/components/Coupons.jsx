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
} from "@/components/ui/form"; // ShadCN
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Zod schema
const couponSchema = z.object({
  code: z.string().min(1),
  discount: z.coerce.number().min(0),
  type: z.enum(["percentage", "fixed"]),
  expiryDate: z.string().min(1),
});

const page = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discount: 0,
      type: "percentage",
      expiryDate: "",
    },
  });

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("/api/coupons/getAllCoupon");
      setCoupons(res?.data?.data || []);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data || "something went wrong");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const onSubmit = async (values) => {
    const payload = {
      couponCode: values.code,
      discount: values.discount,
      type: values.type,
      expiry: values.expiryDate,
    };

    try {
      const created = await axios.post("/api/coupons/create", payload);
      setCoupons((prev) => [...prev, created.data]);

      form.reset();
      setEditingCoupon(null);
      setShowAddForm(false);
    } catch (err) {
      toast.error(err.response.data);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/coupons/delete/${id}`);
    setCoupons((prev) => prev.filter((c) => c._id !== id));
  };

  const toggleStatus = async (id) => {
    try {
      const coupon = coupons.find((c) => c._id === id);
      const updated = await axios.put(`/api/coupons/toggle/${id}`, {
        isActive: !coupon.isActive,
      });
      console.log(updated.data);
      setCoupons((prev) =>
        prev.map((c) => (c._id === id ? updated.data.data : c)),
      );
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Coupon Management
            </h1>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your promotional coupons
            </p>
          </div>
          <Button
            onClick={() => {
              form.reset();
              setEditingCoupon(null);
              setShowAddForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </div>

        {/* Form */}
        {showAddForm && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white p-6 rounded-lg border shadow-sm mb-6 grid gap-4 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="SAVE20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex gap-4">
                <Button type="submit">
                  {editingCoupon ? "Update Coupon" : "Create Coupon"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
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
        )}

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <div
              key={coupon._id || index}
              className="bg-white rounded-lg border shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded">
                    <Tag className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{coupon.couponCode}</h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        coupon.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => copyToClipboard(coupon.couponCode)}
                    title="Copy"
                  >
                    <Copy className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                  </button>

                  <button
                    onClick={() => handleDelete(coupon._id)}
                    title="Delete"
                  >
                    <Trash2 className="h-6 w-6 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-700 mb-4">
                {coupon.type === "percentage" ? (
                  <Percent className="h-4 w-4 text-green-600" />
                ) : (
                  <DollarSign className="h-4 w-4 text-green-600" />
                )}
                <span>
                  {coupon.type === "percentage"
                    ? `${coupon.discount}%`
                    : `$${coupon.discount}`}
                </span>
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  Expires {new Date(coupon.expiry).toLocaleDateString()}
                </span>
              </div>

              <Button
                variant="outline"
                className={`w-full ${
                  coupon.isActive
                    ? "text-red-600 border-red-200"
                    : "text-green-600 border-green-200"
                }`}
                onClick={() => toggleStatus(coupon._id)}
              >
                {coupon.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
          ))}
        </div>

        {coupons.length === 0 && (
          <div className="mt-10 text-center text-blue-600">
            No coupons yet. Add one!
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
