import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ProcessWorks from "../processWorks/ProcessWorks";

function HowitWork() {
  const works = [
    {
      icon: "📝",
      title: "Fill Out Info",
      description:
        "Enter your personal details, work experience, education, and skills in our user-friendly form.",
    },
    {
      icon: "🤖",
      title: "Generate with AI",
      description:
        "Our smart AI analyzes your information and creates a professional, ATS-optimized resume instantly.",
    },
    {
      icon: "👀",
      title: "Preview & Pay",
      description:
        "Review your generated resume, make any final adjustments, and pay just ₹100 for the final version.",
    },
    {
      icon: "📄",
      title: "Download PDF",
      description:
        "Instantly download your professional resume in high-quality PDF format, ready to send to employers.",
    },
  ];

  return (
    <>
      <section name="HowItWork" className="px-4 py-12">
        <Card className="max-w-screen-lg mx-auto border-none shadow-none space-y-8">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <h3 className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Create your professional resume in just 4 simple steps. Our
              AI-powered platform makes it fast and easy.
            </h3>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {works.map(({ icon, title, description }, index) => (
              <CardContent key={index} className="text-center space-y-3">
                <CardHeader className="text-4xl">{icon}</CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <p className="text-gray-600 text-sm">{description}</p>
              </CardContent>
            ))}
          </div>

          {/* Average Time Card */}
          <section className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-amber-100 dark: px-6 py-4 rounded-2xl shadow-inner w-full sm:w-max mx-auto">
            <h2 className="text-4xl">⏱️</h2>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg dark:text-black">
                Average Time: 5 Minutes
              </h3>
              <h4 className="text-gray-600 text-sm">From start to download</h4>
            </div>
          </section>
        </Card>

        {/* Additional Component */}
      </section>
    </>
  );
}

export default HowitWork;
