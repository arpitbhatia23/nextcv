"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { pdf } from "@react-pdf/renderer";

import ConfettiBurst from "../animated/confittebrust";
import PDFResumeTemplate from "../../../templates/resume-pdf/morden";
import ClassicTemplate from "../../../templates/resume-pdf/classic";
import ModernPDFResumeTemplate from "../../../templates/resume-pdf/morden";
import ClassicMinimalistPDFResume from "../../../templates/resume-pdf/Minimalist";
import ModernBlueSidebarPDFResume from "../../../templates/resume-pdf/ModernBlueSideBar";
import CleanBusinessAnalystPDFResume from "../../../templates/resume-pdf/businessAnalistTemplate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { templates } from "@/utils/template";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FinalStep = ({ formData }) => {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classicTemplate");
  const [pdfUrl, setPdfUrl] = useState("");
  const [showSparkle, setShowSparkle] = useState(false);
  const buttonRef = useRef();
  const [confettiOrigin, setConfettiOrigin] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  // const templates = [
  //   {
  //     key: "modernTemplate",
  //     label: "Modern",
  //     component: ModernPDFResumeTemplate,
  //   },
  //   {
  //     key: "classicTemplate",
  //     label: "Classic",
  //     component: ClassicTemplate,
  //   },
  //   {
  //     key: "MinimalistTemplate",
  //     label: "Minimalist",
  //     component: ClassicMinimalistPDFResume,
  //   },
  //   {
  //     key: "MordenBluesidebar",
  //     label: "Morden blue sidebar",
  //     component: ModernBlueSidebarPDFResume,
  //   },
  //   {
  //     key: "ModernFullStack",
  //     label: "MordenFullStack",
  //     component: ModernPDFResumeTemplate,
  //   },
  //   {
  //     key: "Businessanlayist",
  //     label: "BusinessAnalyst",
  //     component: CleanBusinessAnalystPDFResume,
  //   },
  // ];

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.x;
      const y = rect.y;
      setConfettiOrigin({ x, y });

      setTimeout(() => setConfettiOrigin(null), 2000);
    }
  };

  const handleSaveDraft = () => {
    const res = axios.post("/api/resume/savedraft", {
      resumeType: selectedTemplate,
      ...formData,
    });
    console.log(res);
    if (res.data.success) {
      toast("saved draft sucessfully");
    }
  };

  useEffect(() => {
    let currentUrl = null;
    const generatePdf = async () => {
      const selected = templates.find((t) => t.key === selectedTemplate);
      const TemplateComponent = selected?.component || PDFResumeTemplate;
      const blob = await pdf(<TemplateComponent data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      currentUrl = url;
    };
    generatePdf();
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
    // eslint-disable-next-line
  }, [formData, selectedTemplate]);

  const handelPayment = async () => {
    const amount = Math.floor(100 - discount) * 100;
    console.log(amount);

    const res = await axios.post("/api/payment/order", {
      amount,
      ...formData,
      ResumeType: selectedTemplate,
    });
    if (res.data.success) {
      const { data } = res.data;
      const paymentUrl = data?.redirectUrl;
      window.location.href = paymentUrl;
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center py-4 px-2 md:p-6">
      {confettiOrigin && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <ConfettiBurst origin={confettiOrigin} />
        </div>
      )}
      {showSparkle && (
        <div className="absolute top-4 right-4 z-30">
          <ConfettiBurst origin={{ x: window.innerWidth - 60, y: 60 }} />
        </div>
      )}

      {/* Mobile Layout */}
      <div className="w-full  flex flex-col gap-4 md:hidden">
        {/* Template Picker */}
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
                      {/* Insert divider after each page except the last */}
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
          <CardHeader className="flex flex-row items-center gap-2">
            <BadgePercent className="text-indigo-600" />
            <CardTitle>Apply Coupon or Pay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2 items-center">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1"
              />
              <Button ref={buttonRef} onClick={handleClick}>
                Apply
              </Button>
            </div>
            {applied && (
              <p className="text-green-600">Coupon applied successfully!</p>
            )}
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              onClick={handelPayment}
            >
              <IndianRupee className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleSaveDraft}
              type="button"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </Button>
            {/* {pdfUrl && (
              <div className="mt-3 flex justify-center">
                <a
                  href={pdfUrl}
                  download="resume.pdf"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Download PDF
                </a>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full  ">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border bg-white shadow-md w-full"
        >
          {/* Left: Template List */}
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
                    >
                      {template.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
              <Button
                variant="outline"
                className="w-full mt-4 flex items-center justify-center gap-2"
                onClick={handleSaveDraft}
                type="button"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right: Resume Preview and Payment */}
          <ResizablePanel defaultSize={75} className="bg-white">
            <ScrollArea className="max-h-full p-6">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center   overflow-x-auto">
                    {pdfUrl ? (
                      <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      >
                        {Array.from({ length: numPages || 0 }).map((_, idx) => (
                          <div key={idx}>
                            <Page pageNumber={idx + 1} width={400} />
                            {/* Insert divider after each page except the last */}
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
                    />
                    <Button ref={buttonRef} onClick={handleClick}>
                      Apply
                    </Button>
                  </div>
                  {applied && (
                    <p className="text-green-600">
                      Coupon applied successfully!
                    </p>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    onClick={handelPayment}
                  >
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </Button>
                  {/* {pdfUrl && (
                    <div className="mt-4 flex justify-center">
                      <a
                        href={pdfUrl}
                        download="resume.pdf"
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        Download PDF
                      </a>
                    </div>
                  )} */}
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
