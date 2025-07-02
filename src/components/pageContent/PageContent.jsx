"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const PageContent = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count < 95) {
      const timer = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const card_detail = [
    {
      icon: "⚡",
      title: "Smart AI Resume Generator",
      description:
        "Our advanced AI analyzes your information and creates professional resumes tailored to your industry.",
    },
    {
      icon: "🧠",
      title: "ATS-Optimized Templates",
      description:
        "Beat applicant tracking systems with our carefully designed templates that pass ATS filters.",
    },
    {
      icon: "💸",
      title: "Just ₹100 per Resume",
      description:
        "Affordable pricing that won't break the bank. Get professional results at a fraction of the cost.",
    },
    {
      icon: "🎓",
      title: "Made for Students & Job Seekers",
      description:
        "Whether you’re a fresh graduate or experienced professional, we have templates for everyone.",
    },
  ];

  const cardSecond = [
    {
      icon: "✓",
      title: "Instant Generation",
      description: "Create professional resumes in under 5 minutes",
    },
    {
      icon: "✓",
      title: "Multiple Formats",
      description: "Download in PDF, Word, or plain text formats",
    },
    {
      icon: "✓",
      title: "24/7 Support",
      description: "Get help whenever you need it with our support team",
    },
  ];

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Heading */}
      <Card className="items-center text-center border-none shadow-none mb-10">
        <h1 className="text-4xl font-bold">{count}%</h1>
        <p className="text-xl text-gray-800 mt-2">
          Experience the future of resume building with our AI-powered platform
          designed for modern job seekers.
        </p>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {card_detail.map(({ icon, title, description }, index) => (
          <Card key={index} className="h-full">
            <CardContent className="flex flex-col items-center text-center p-6">
              <CardHeader className="text-4xl">{icon}</CardHeader>
              <CardTitle className="text-xl font-bold mt-2">{title}</CardTitle>
              <CardDescription className="text-md text-gray-600 mt-2">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lower Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Text Section */}
        <Card className="flex-1 border-none shadow-none">
          <CardContent className="space-y-4">
            <h1 className="text-3xl font-bold mb-2">Built for Success</h1>
            {cardSecond.map(({ icon, title, description }, index) => (
              <div key={index} className="space-y-1">
                <CardTitle className="text-lg font-bold">
                  {icon} {title}
                </CardTitle>
                <CardDescription className="text-gray-700">
                  {description}
                </CardDescription>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Stat Card */}
        <Card className="flex-1 border-none shadow-none flex items-center justify-center">
          <Card className="bg-blue-600 text-white w-full max-w-sm rounded-xl">
            <CardContent className="text-center p-6 space-y-2">
              <CardHeader className="text-3xl font-bold">95%</CardHeader>
              <CardTitle className="text-xl">Success Rate</CardTitle>
              <CardDescription className="text-white">
                Users who got interviews within 30 days
              </CardDescription>
            </CardContent>
          </Card>
        </Card>
      </div>
    </section>
  );
};

export default PageContent;
