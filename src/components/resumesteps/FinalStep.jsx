"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BadgePercent, IndianRupee, Save } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { templates } from "@/utils/template";
import { pdfGenerator } from "@/lib/pdfGenerator";
import { useDebouncedCallback } from "use-debounce";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FinalStep = ({ formData, isdraft = false }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("classicTemplate");
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(100);
  const [originalAmount] = useState(100);
  const [discount, setDiscount] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  // Debounced handlers
  const debouncePayment = useDebouncedCallback(() => {
    handelPayment();
  }, 1000);

  const debounceDraft = useDebouncedCallback(() => {
    handleSaveDraft();
  }, 1000);

  const debounceCoupon = useDebouncedCallback((coupon) => {
    handleCoupon(coupon);
  }, 1000);

  const handleSaveDraft = async () => {
    try {
      setIsSubmit(true);
      const res = await axios.post("/api/resume/savedraft", {
        ResumeType: selectedTemplate,
        ...formData,
      });

      if (res.data.success) {
        toast("Saved draft successfully");
      } else {
        toast.error(res.data.message || "Failed to save draft");
      }
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
      toast.error("Error saving draft");
    }
  };

  const removeCoupon = () => {
    setAmount(originalAmount);
    setDiscount(null);
    setApplied(false);
    setCouponCode("");
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  useEffect(() => {
    const pdfGen = new pdfGenerator(formData, selectedTemplate);
    let isMounted = true;
    pdfGen.createPdf().then((url) => {
      if (isMounted) setPdfUrl(url);
    });

    return () => {
      isMounted = false;
      pdfGen.cleanUp();
    };
  }, [formData, selectedTemplate]);

  const handelPayment = async () => {
    try {
      setIsSubmit(true);
      const payAmount =
        discount?.type === "percentage"
          ? Math.floor(originalAmount * (1 - discount.value / 100))
          : discount?.type === "amount"
          ? Math.max(originalAmount - discount.value, 0)
          : originalAmount;

      const res = await axios.post("/api/payment/order", {
        amount: payAmount * 100, // assuming amount in paise
        ...formData,
        ResumeType: selectedTemplate,
      });
      if (res.data.success) {
        const { data } = res.data;
        const paymentUrl = data?.redirectUrl;
        window.location.href = paymentUrl;
      }
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
      toast.error("Payment error");
    }
  };

  const handleCoupon = async (coupon) => {
    if (appliedCoupon === coupon) {
      toast.info("This coupon is already applied");
      return;
    }
    setIsSubmit(true);
    try {
      const res = await axios.post(`/api/coupons/getByCouponCode`, {
        couponCode: coupon,
      });

      const couponData = res.data.data;
      const discountInfo = {
        type: couponData.type,
        value: couponData.discount,
      };
      setDiscount(discountInfo);

      let finalAmount = Math.round(originalAmount);
      console.log(finalAmount);
      if (discountInfo.type === "percentage") {
        finalAmount = originalAmount * (1 - discountInfo.value / 100);
      } else if (discountInfo.type === "amount") {
        finalAmount = originalAmount - discountInfo.value;
      }
      finalAmount = Math.max(finalAmount, 0);
      setAmount(Math.round(finalAmount));

      setApplied(true);
      setAppliedCoupon(coupon);
      toast.success("Coupon applied successfully");
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      console.error("Coupon apply error:", error);
      toast.error(
        error?.response?.data || "Something went wrong while applying coupon"
      );
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 max-h-screen flex flex-col items-center py-4 px-2 md:p-6">
      {/* Mobile Layout */}
      <div className="w-full flex flex-col gap-4 md:hidden">
        {/* Template Picker */}
        {!isdraft && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose a Template</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Choose a Template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem
                      key={template.key}
                      onClick={() => setSelectedTemplate(template.key)}
                      value={template.key}
                    >
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* PDF Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resume Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center overflow-x-auto">
              {pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from({ length: numPages || 0 }).map((_, idx) => (
                    <div key={idx}>
                      <Page pageNumber={idx + 1} width={400} />
                      {idx < (numPages || 1) - 1 && (
                        <div
                          style={{
                            margin: "24px 0",
                            borderTop: "2px dashed #bbb",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </Document>
              ) : (
                <div>Loading preview...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Coupon + Payment Section */}
        <Card>
          <CardContent className="space-y-4">
            <div className="p-8">
              <CardHeader className="flex flex-row items-center gap-2">
                <BadgePercent className="text-indigo-600" />
                <CardTitle>Apply Coupon or Pay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-center">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1"
                    disabled={applied}
                  />
                  {!applied ? (
                    <Button
                      onClick={() => debounceCoupon(couponCode)}
                      disabled={!couponCode.trim() || isSubmit}
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={removeCoupon}
                      disabled={isSubmit}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {applied && discount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-600 font-medium">
                      Coupon applied successfully!
                    </p>
                    <p className="text-sm text-green-700">
                      {discount.type === "percentage"
                        ? `${discount.value}% discount applied`
                        : `₹${discount.value} discount applied`}
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500 line-through">
                        ₹{originalAmount}
                      </span>
                      <span className="text-green-600 font-bold ml-2">
                        ₹{amount}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  onClick={debouncePayment}
                  disabled={isSubmit}
                >
                  <IndianRupee className="mr-2 h-4 w-4" />
                  Proceed to Pay ₹{amount}
                </Button>
                <Button
                  className="w-full mt-2 bg-white text-indigo-600 border border-indigo-200"
                  onClick={debounceDraft}
                  disabled={isSubmit}
                  type="button"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
              </CardContent>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border bg-white shadow-md w-full"
        >
          {/* Left: Template List */}
          {!isdraft && (
            <ResizablePanel
              defaultSize={25}
              minSize={20}
              maxSize={40}
              className="bg-white"
            >
              <ScrollArea className="h-full p-4">
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Choose a Template</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {templates.map((template) => (
                      <Button
                        key={template.key}
                        variant={
                          selectedTemplate === template.key
                            ? "default"
                            : "outline"
                        }
                        className={`w-full ${
                          selectedTemplate === template.key
                            ? "ring-2 ring-indigo-500"
                            : ""
                        }`}
                        onClick={() => setSelectedTemplate(template.key)}
                        disabled={isSubmit}
                      >
                        {template.label}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                <Button
                  variant="outline"
                  className={
                    "bg-white w-full mt-4 flex items-center justify-center gap-2"
                  }
                  disabled={isSubmit}
                  onClick={debounceDraft}
                  type="button"
                >
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
              </ScrollArea>
            </ResizablePanel>
          )}

          <ResizableHandle />

          {/* Right: Resume Preview and Payment */}
          <ResizablePanel defaultSize={75} className="bg-white">
            <ScrollArea className="max-h-full p-6">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center overflow-x-auto">
                    {pdfUrl ? (
                      <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      >
                        {Array.from({ length: numPages || 0 }).map((_, idx) => (
                          <div key={idx}>
                            <Page pageNumber={idx + 1} width={400} />
                            {idx < (numPages || 1) - 1 && (
                              <div
                                style={{
                                  margin: "24px 0",
                                  borderTop: "2px dashed #bbb",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </Document>
                    ) : (
                      <div>Loading preview...</div>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Coupon + Payment Section */}
              <Card>
                <CardContent className="space-y-4">
                  <div className="p-8">
                    <CardHeader className="flex flex-row items-center gap-2">
                      <BadgePercent className="text-indigo-600" />
                      <CardTitle>Apply Coupon or Pay</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1"
                          disabled={applied}
                        />
                        {!applied ? (
                          <Button
                            onClick={() => debounceCoupon(couponCode)}
                            disabled={!couponCode.trim() || isSubmit}
                          >
                            Apply
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={removeCoupon}
                            disabled={isSubmit}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      {applied && discount && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-green-600 font-medium">
                            Coupon applied successfully!
                          </p>
                          <p className="text-sm text-green-700">
                            {discount.type === "percentage"
                              ? `${discount.value}% discount applied`
                              : `₹${discount.value} discount applied`}
                          </p>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500 line-through">
                              ₹{originalAmount}
                            </span>
                            <span className="text-green-600 font-bold ml-2">
                              ₹{amount}
                            </span>
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        onClick={debouncePayment}
                        disabled={isSubmit}
                      >
                        <IndianRupee className="mr-2 h-4 w-4" />
                        Proceed to Pay ₹{amount}
                      </Button>
                    </CardContent>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default FinalStep;
