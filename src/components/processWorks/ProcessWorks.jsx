import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import TestimonialCarousel from "../testimonial/Testimonial";
import { signIn } from "next-auth/react";

const ProcessWorks = () => {
  const works = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "No more spending hours formatting. Get results in minutes.",
    },
    {
      icon: "🎯",
      title: "ATS-Friendly",
      description: "Optimized to pass through applicant tracking systems.",
    },
    {
      icon: "💰",
      title: "Affordable",
      description: "Professional results at a fraction of traditional costs.",
    },
  ];

  return (
    <>
      <section className="px-4 py-12">
        {/* Why Our Process Works */}
        <Card className="max-w-6xl mx-auto p-6 sm:p-10 space-y-8 border-none shadow-none">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Why Our Process Works
          </h2>

          {/* Features */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {works.map(({ icon, title, description }, index) => (
              <CardContent
                key={index}
                className="text-center space-y-2 max-w-xs"
              >
                <CardHeader className="text-4xl">{icon}</CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {description}
                </CardDescription>
              </CardContent>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center mt-10 space-y-4">
          <Button
            className="bg-blue-700 px-8 py-4 text-lg sm:text-xl font-semibold hover:bg-blue-800"
            onClick={() => {
              signIn("google");
            }}
          >
            Start Your Resume Now
          </Button>
          <p className="text-gray-700">
            Join thousands of successful job seekers
          </p>
        </div>
      </section>

      {/* Testimonials */}
    </>
  );
};

export default ProcessWorks;
