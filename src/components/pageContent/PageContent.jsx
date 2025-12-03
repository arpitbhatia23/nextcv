import React from "react";
import { Button } from "../ui/button"; // Assuming you have a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Zap,
  Brain,
  DollarSign,
  GraduationCap,
  Clock,
  Package,
  Headset,
} from "lucide-react"; // Using lucide-react for better icons

const PageContent = () => {
  const card_detail = [
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Smart AI Resume Generator",
      description:
        "Our advanced AI analyzes your information to create an ATS-friendly resume that's perfectly tailored to your target industry. Try the resume builder AI free today!",
      isEmphasis: true, // Mark for visual emphasis
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-500" />,
      title: "ATS-Optimized Templates",
      description:
        "Use our ATS-friendly resume templates and ATS-friendly CV designs. We guarantee our ATS-friendly resumes and ATS free resume structures beat applicant tracking systems, giving you a clear edge. Learn the ATS friendly resume meaning and how we help you master it.",
      isEmphasis: true, // Mark for visual emphasis
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Just ₹100 per Resume",
      description:
        "Build your ATS free resume with affordable pricing that won't break the bank. Get professional results at a fraction of the cost, starting with our resume builder features!",
      isEmphasis: false,
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-600" />,
      title: "Made for Students & Job Seekers",
      description:
        "Whether you’re a fresh graduate needing an Indian sample resume or an experienced professional, we provide the best Indian resume format templates for everyone. Resume building simplified.",
      isEmphasis: false,
    },
  ];

  const cardSecond = [
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      title: "Instant Generation",
      description:
        "Use our AI resume generator for fast resume building. Create professional resumes in under 5 minutes.",
    },
    {
      icon: <Package className="w-5 h-5 text-blue-600" />,
      title: "Multiple Formats",
      description:
        "Download your resume in the best Indian resume format in Word, PDF, or plain text, ensuring compatibility.",
    },
    {
      icon: <Headset className="w-5 h-5 text-blue-600" />,
      title: "24/7 Support",
      description:
        "Get help with your professional resume format whenever you need it from our support team.",
    },
  ];

  // Component for the Success Rate Card
  const SuccessRateCard = () => (
    <Card className="bg-blue-600 text-white w-full rounded-xl mb-12">
      <CardContent className="text-center p-6 space-y-2">
        <CardHeader className="text-4xl sm:text-5xl font-extrabold p-0">
          95%
        </CardHeader>
        <CardTitle className="text-2xl">Success Rate</CardTitle>
        <CardDescription className="text-blue-200 text-sm max-w-2xl mx-auto">
          Users who got interviews within 30 days, thanks to our ATS friendly
          resume designs. (ATS friendly resume meaning: a format designed to
          pass automated screening.)
        </CardDescription>
      </CardContent>
    </Card>
  );

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* 1. Heading and Primary CTA */}
      <Card className="items-center text-center border-none shadow-none mb-4">
        <p className="text-xl sm:text-3xl text-gray-900 font-semibold mt-2 max-w-4xl mx-auto">
          Unlock interviews with the best AI resume generator. Experience our
          ATS-friendly templates and professional resume building platform for
          modern job seekers.
        </p>
        {/* New: Primary CTA */}
        <Button
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-7 px-5 rounded-lg shadow-lg transition duration-300"
          size="lg"
        >
          Start Building Your ATS Resume Now
        </Button>
      </Card>

      {/* 2. Elevated Trust Signal */}
      <div className="mb-10">
        <SuccessRateCard />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {card_detail.map(({ icon, title, description, isEmphasis }, index) => (
          <Card
            key={index}
            className={`h-full transition duration-300 ${
              isEmphasis
                ? "border-4 border-blue-500 shadow-xl"
                : "border-gray-200 shadow-md"
            }`} // 3. Visual Emphasis
          >
            <CardContent className="flex flex-col items-center text-center px-4 py-6">
              <CardHeader className="text-4xl p-0 mb-4">{icon}</CardHeader>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="text-md text-gray-600 mt-2">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lower Section (Built for Success) */}
      <section className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Text Section */}
        <Card className="flex-1 border-none shadow-none">
          <CardContent className="space-y-6 p-0">
            <h2 className="text-3xl font-bold mb-4">
              Built for Success: The Best Indian Resume Format
            </h2>
            {cardSecond.map(({ icon, title, description }, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{icon}</div>{" "}
                {/* 4. New Icons */}
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{title}</CardTitle>
                  <CardDescription className="text-gray-700">
                    {description}
                  </CardDescription>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Space Filler (Placeholder for another CTA or Trust Signal if needed) */}
        <Card className="flex-1 border-none shadow-none flex items-center justify-center lg:pt-10">
          {/* Secondary CTA suggestion */}
          <Button className="w-full lg:w-3/4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-6 rounded-lg shadow-lg transition duration-300">
            Start Your Journey Now
          </Button>
        </Card>
      </section>
    </section>
  );
};

export default PageContent;
