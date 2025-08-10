"use client";
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Copy,
  Download,
  Trash2,
  Calendar,
  Eye,
  MoreVertical,
  Plus,
  Filter,
  X,
  IndianRupee,
  BadgePercent,
  Edit2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { pdfGenerator } from "@/lib/pdfGenerator";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [applied, setApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(100);
  const [originalAmount] = useState(100); // Store original amount
  const [discount, setDiscount] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // Track applied coupon

  const route = useRouter();
  const buttonRef = useRef();

  const fetchResume = async () => {
    setLoading(true);
    const res = await axios.get("/api/resume/getAllResume");
    setResumes(res.data.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const paidResumes = resumes.paid;
  const draftResumes = resumes.draft;

  const getTemplateDisplayName = (templateKey) => {
    const templateNames = {
      modernTemplate: "Modern",
      classicTemplate: "Classic",
      MinimalistTemplate: "Minimalist",
      MordenBluesidebar: "Modern Blue Sidebar",
      ModernFullStack: "Modern Full Stack",
      Businessanlayist: "Business Analyst",
    };
    return templateNames[templateKey] || templateKey;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Edited 1 day ago";
    if (diffDays < 30) return `Edited ${diffDays} days ago`;
    if (diffDays < 365) return `Edited ${Math.ceil(diffDays / 30)} months ago`;
    return `Edited ${Math.ceil(diffDays / 365)} years ago`;
  };

  const handleDownload = async (resume) => {
    console.log("Download resume:", resume);

    if (resume.status === "paid") {
      const pdfGen = new pdfGenerator(resume);
      await pdfGen.downloadPdf();
    } else {
      setPaymentModal(true);
      setResumeData(resume);
      // Reset payment modal state when opening
      setAmount(originalAmount);
      setDiscount(null);
      setApplied(false);
      setCouponCode("");
      setAppliedCoupon(null);
    }
  };

  const handleCoupon = async (coupon) => {
    // Prevent applying the same coupon multiple times
    if (appliedCoupon === coupon) {
      toast.info("This coupon is already applied");
      return;
    }

    try {
      const res = await axios.post(`/api/coupons/getByCouponCode`, {
        couponCode: coupon,
      });

      const couponData = res.data.data;

      // Store discount info
      const discountInfo = {
        type: couponData.type,
        value: couponData.discount,
      };
      setDiscount(discountInfo);

      // Calculate final amount from original amount
      let finalAmount = originalAmount;

      if (discountInfo.type === "percentage") {
        finalAmount = originalAmount * (1 - discountInfo.value / 100);
      } else if (discountInfo.type === "amount") {
        finalAmount = originalAmount - discountInfo.value;
      }

      // Ensure minimum price is not negative
      finalAmount = Math.max(finalAmount, 0);
      setAmount(finalAmount);

      setApplied(true);
      setAppliedCoupon(coupon);
      toast.success("Coupon applied successfully");
    } catch (error) {
      console.error("Coupon apply error:", error);
      toast.error(
        error?.response?.data || "Something went wrong while applying coupon"
      );
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

  const handleDelete = async (resumeId) => {
    try {
      const res = await axios.delete(`/api/resume/deleteById?id=${resumeId}`);
      if (res.data.success) {
        setResumes((prev) => ({
          ...prev,
          paid: prev.paid?.filter(
            (resume) => resume.resumedata._id !== resumeId
          ),
          draft: prev.draft?.filter(
            (resume) => resume.resumedata._id !== resumeId
          ),
        }));
      }
    } catch (error) {
      toast.error(
        error.message || "something went wrong while deleting resume"
      );
    }
  };

  const handleEdit = (resumeId) => {
    console.log(resumeId);
    route.push(`/dashboard/resume/${resumeId}`);
  };

  const handleViewResume = async (resumeData) => {
    const pdfGen = new pdfGenerator(resumeData);
    const url = await pdfGen.createPdf();
    setPdfUrl(url);
    setIsModelOpen(true);
  };

  const handelPayment = async (draftId) => {
    const res = await axios.post("/api/payment/order", {
      amount: Math.floor(amount * 100), // Convert ₹ to paise
      draftId,
      isDraft: true,
    });

    if (res.data.success) {
      const paymentUrl = res.data.data?.redirectUrl;
      window.location.href = paymentUrl;
    }
  };

  const ResumeCard = ({ resume }) => (
    <Card className="group hover:shadow-xl transition-all duration-200 border border-pink-200 hover:border-pink-400 rounded-lg">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge
              variant={resume.status === "paid" ? "default" : "secondary"}
              className={`uppercase px-3 py-1 text-xs font-bold tracking-wide ${
                resume.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {resume.status}
            </Badge>
            <span className="text-xs text-gray-400">
              {formatDate(resume?.updatedAt)}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleDownload(resume)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(resume?._id)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(resume._id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
            onClick={() => handleViewResume(resume)}
          >
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
              {resume.name}
            </h3>
            <div className="text-xs text-gray-500">
              Template: {getTemplateDisplayName(resume.ResumeType)}
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Calendar className="h-3 w-3 mr-1" />
          Created on{" "}
          {new Date(resume.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
        <p className="text-gray-600">
          Manage and organize all your resumes in one place
        </p>
      </div>

      {/* PDF Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
          <ScrollArea className="h-full p-4 max-w-6xl">
            <Card className="relative w-full min-w-3xl mx-auto">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => {
                  setPdfUrl("");
                  setNumPages(null);
                  setIsModelOpen(false);
                }}
                aria-label="Close"
              >
                <X />
              </Button>
              <CardContent className="flex justify-center items-center">
                <div className="text-center py-12 text-lg text-gray-700">
                  {pdfUrl ? (
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      loading={<div className="p-8">Loading PDF...</div>}
                    >
                      {Array.from(new Array(numPages), (el, idx) => (
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
                    <div className="p-8">No PDF to display</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setPaymentModal(false);
            setResumeData(null);
          }}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setPaymentModal(false);
              setResumeData(null);
            }
          }}
          style={{ overflow: "auto" }}
        >
          <Card
            className="relative w-full max-w-3xl h-8/12 mx-auto rounded-2xl shadow-2xl bg-white p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              onClick={() => {
                setPaymentModal(false);
                setResumeData(null);
              }}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="p-8">
              <Card>
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
                        onClick={() => handleCoupon(couponCode)}
                        disabled={!couponCode.trim()}
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={removeCoupon}>
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
                    onClick={() => handelPayment(resumeData._id)}
                  >
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Proceed to Pay ₹{amount}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Card>
        </div>
      )}

      <Tabs defaultValue="My-Resume" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="My-Resume" className="px-6">
              My Resume ({paidResumes?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="Draft-Resume" className="px-6">
              Draft Resume ({draftResumes?.length || 0})
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
        </div>

        <TabsContent value="My-Resume" className="mt-0">
          {!paidResumes || paidResumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Edit className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No paid resumes yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first professional resume to get started
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paidResumes.map((resume) => (
                <ResumeCard
                  key={resume?.resumedata._id}
                  resume={resume?.resumedata}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="Draft-Resume" className="mt-0">
          {!draftResumes || draftResumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Edit className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No draft resumes
                </h3>
                <p className="text-gray-600 mb-6">
                  Save work-in-progress resumes as drafts
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Start a New Draft
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {draftResumes.map((resume) => (
                <ResumeCard
                  key={resume?.resumedata._id}
                  resume={resume?.resumedata}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyResume;
