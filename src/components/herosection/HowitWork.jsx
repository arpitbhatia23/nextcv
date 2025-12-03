import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Zap, DownloadCloud, FileText, Settings } from "lucide-react"; // Suggested icons for a more professional look

function HowitWork() {
  const works = [
    {
      // Updated icon to a more professional one (FileText)
      icon: <FileText className="w-10 h-10 text-purple-600" />,
      title: "Fill Out Info",
      description:
        "Enter your personal details, work experience, education, and skills in our user-friendly form.",
    },
    {
      // Implementation of Suggestion #2: Emphasize ATS & new icon (Settings/Gear)
      icon: <Settings className="w-10 h-10 text-purple-600" />,
      title: "Generate Your ATS-Optimized Resume", // Updated Title
      description:
        "Our smart AI instantly analyzes, optimizes, and formats your details to create a high-ranking, ATS-compliant resume.", // Updated Description
    },
    {
      // Icon remains the same, but you could use a dollar/eye icon if available
      icon: "👀",
      title: "Preview & Pay",
      description:
        "Review your generated resume, make any final adjustments, and pay just ₹100 for the final version.",
    },
    {
      // Implementation of Suggestion #5: Rename the Last Step & new icon (DownloadCloud)
      icon: <DownloadCloud className="w-10 h-10 text-purple-600" />,
      title: "Download and Submit", // Updated Title
      description:
        "Instantly download your professional resume in high-quality PDF format, ready to send to employers.",
    },
  ];

  return (
    <>
      <section name="How It Works" className="px-4 py-12">
        <Card className="max-w-screen-lg mx-auto border-none shadow-none space-y-8">
          {/* Heading - Implementation of Suggestion #1: Enhance the Value Proposition */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              <span className="text-purple-600">
                Create Your ATS-Optimized Professional Resume
              </span>
            </h2>
            <h3 className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              In just 4 simple steps. Our AI-powered platform makes it fast and
              easy.
            </h3>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {works.map(({ icon, title, description }, index) => (
              // Using Card instead of CardContent for better visual definition of each step
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="text-center space-y-3 p-6 pt-8">
                  {/* Changed to use the icon as a React element */}
                  <div className="flex justify-center mb-4">{icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Average Time Card (Kept) */}
          <section className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-amber-100 px-6 py-4 rounded-2xl shadow-inner w-full sm:w-max mx-auto">
            <h2 className="text-4xl">⏱️</h2>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-gray-900">
                Average Time: 5 Minutes
              </h3>
              <h4 className="text-gray-600 text-sm">From start to download</h4>
            </div>
          </section>
        </Card>
      </section>
    </>
  );
}

export default HowitWork;
