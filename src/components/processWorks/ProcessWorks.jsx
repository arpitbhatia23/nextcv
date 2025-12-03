import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
// import TestimonialCarousel from "../testimonial/Testimonial"; // Keeping this commented out as it's not used in the return
import { signIn } from "next-auth/react";

const ProcessWorks = () => {
  const works = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "No more spending hours formatting. Get professional results in minutes.",
      isHighlighted: false,
    },
    {
      icon: "🎯",
      title: "Maximum Visibility: ATS-Friendly", // Updated Title
      description:
        "Our templates are designed to be read perfectly by Applicant Tracking Systems (ATS), ensuring your **ATS-Friendly resume** gets seen by a recruiter.", // Updated Description
      isHighlighted: true, // Mark for highlighting
      highlightClass:
        "bg-blue-50 border-blue-200 shadow-lg ring-2 ring-blue-500", // Tailwind classes for highlighting
    },
    {
      icon: "💰",
      title: "Wallet-Friendly", // Updated Title
      description:
        "Get professional, interview-ready results at a fraction of traditional costs.",
      isHighlighted: false,
    },
  ];

  // Helper to handle the click event for the CTA
  const handleStartResume = () => {
    // Replace with your actual sign-in logic if necessary, or just navigate
    signIn("google");
  };

  return (
    <>
      <section className="px-4 py-16 bg-white">
        {/* Updated Headline */}
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900">
            Land Your Dream Job: The Next CV Advantage
          </h2>

          {/* Features */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8">
            {works.map(
              (
                { icon, title, description, isHighlighted, highlightClass },
                index
              ) => (
                <Card
                  key={index}
                  className={`text-center space-y-2 max-w-sm flex-1 transition-all duration-300 hover:scale-[1.03] ${
                    isHighlighted ? highlightClass : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {/* Larger, more prominent icon */}
                      <div
                        className={`text-5xl p-2 rounded-full ${
                          isHighlighted ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {icon}
                      </div>
                    </div>

                    <CardTitle className="text-xl font-bold mb-2">
                      {title}
                    </CardTitle>

                    {/* Use dangerouslySetInnerHTML to render the bolded keyword in the description */}
                    <CardDescription
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* CTA and Social Proof */}
          <div className="text-center pt-8 space-y-4">
            <Button
              className="bg-blue-700 px-8 py-5 text-lg sm:text-lg font-bold rounded-lg shadow-xl hover:bg-blue-800 transition duration-200"
              onClick={handleStartResume}
            >
              Start Your ATS-Friendly Resume
            </Button>
            <p className="text-gray-700 text-lg">
              Join thousands of successful job seekers
            </p>

            {/* 1K Statistic Added */}
            <div className="pt-4">
              <p className="text-5xl font-extrabold text-blue-700">1K+</p>
              <p className="text-gray-500 font-semibold uppercase tracking-wider">
                Successful Users
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
    </>
  );
};

export default ProcessWorks;
