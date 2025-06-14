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
import { BadgePercent, IndianRupee } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
import PDFResumeTemplate from "../../../templates/resume-pdf/ClassicTemplate";
import ClassicTemplate from "../../../templates/resume-pdf/moderntemplate";
import SparkleBurst from "../spearkelburst";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const FinalStep = ({ formData }) => {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classictemplate");
  const [pdfUrl, setPdfUrl] = useState("");
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: "50%", y: "50%" });
  const buttonRef = useRef(null); // Define all available templates here
  const templates = [
    {
      key: "modernTemplate",
      label: "modren",
      component: PDFResumeTemplate,
    },
    {
      key: "classicTemplate",
      label: "classic",
      component: ClassicTemplate,
    },
  ];

  const handleApplyCoupon = (e) => {
    if (couponCode.trim() !== "") {
      setApplied(true);

      // Get click position relative to viewport for sparkle burst
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setSparklePos({
          x: rect.left + rect.width / 2 + "px",
          y: rect.top + rect.height / 2 + "px",
        });
      }

      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200); // Hide after animation
    }
  };

  useEffect(() => {
    let currentUrl = null;
    const generatePdf = async () => {
      // Find the selected template component
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

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 min-h-screen">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        {/* Left: Template List */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
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
                      selectedTemplate === template.key ? "default" : "outline"
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
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right: Resume Preview */}
        <ResizablePanel defaultSize={75}>
          <ScrollArea className="h-full p-6">
            <Card className="mb-4 ">
              <CardContent className={" "}>
                <div className="flex justify-center  overflow-hidden">
                  {pdfUrl ? (
                    <Document file={pdfUrl}>
                      <Page pageNumber={1} size="A5"></Page>
                    </Document>
                  ) : (
                    <div>Loading preview...</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Coupon + Payment Section */}
            <Card>
              <CardHeader className="flex items-center gap-2">
                <BadgePercent className="text-indigo-600" />
                <CardTitle>Apply Coupon or Pay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <Button ref={buttonRef} onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                  <SparkleBurst
                    show={showSparkle}
                    x={sparklePos.x}
                    y={sparklePos.y}
                  />
                  {/* ...rest of your component... */}
                </div>
                {applied && (
                  <p className="text-green-600">Coupon applied successfully!</p>
                )}
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <IndianRupee className="mr-2 h-4 w-4" />
                  Proceed to Payment
                </Button>
                {pdfUrl && (
                  <div className="mt-4 flex justify-center">
                    <a
                      href={pdfUrl}
                      download="resume.pdf"
                      className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default FinalStep;
