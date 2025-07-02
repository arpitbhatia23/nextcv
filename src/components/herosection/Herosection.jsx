import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
function Herosection() {
  const card_detail = [
    {
      number: "1K+",
      title: "Resumes Created",
    },
    {
      number: "95%",
      title: "Success Rate",
    },
    {
      number: "2 Min",
      title: "Average Time",
    },
    {
      number: "₹100",
      title: "Fixed Price",
    },
  ];

  const signinWithGoogle = async () => {
    signIn("google");
  };

  return (
    <section
      name="Home"
      className="bg-blue-500 text-white py-32 px-4 dark:bg-gray-950 sm:px-8 md:px-10 w-full"
    >
      <Card className="mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-4 dark:bg-gray-800 ">
        {/* Left Text Content */}
        <div className="space-y-6 max-w-2xl p-4 ">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Build Your Perfect Resume with AI – In Minutes
          </h1>
          <h2 className="text-xl sm:text-2xl">
            AI-powered. Pay only ₹100 per resume. No subscriptions.
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              className="text-lg px-6 py-4 text-blue-600 bg-white hover:bg-gray-100 font-semibold"
              onClick={signinWithGoogle}
            >
              Create Your Resume
            </Button>
            <Button className="text-lg px-6 py-4 bg-blue-700 border border-white hover:bg-white hover:text-blue-600 font-semibold">
              View Templates
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-4 mt-6 text-lg">
            <span>⚡ AI-Powered</span>
            <span>🎯 ATS-Optimized</span>
            <span>💰 Just ₹100</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full px-7">
          <Image
            src="https://images.unsplash.com/photo-1549923746-9507eec27243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cmVzdW1lJTI1MjB3b3Jrc3BhY2UlMjUyMG1vZGVybiUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTM5NTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Resume workspace"
            className="rounded-2xl w-full h-auto object-cover shadow-lg"
            height={500}
            width={500}
          />
        </div>
      </Card>

      {/* Stats Section (still inside the blue area) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
        {card_detail.map(({ number, title }, index) => (
          <Card
            key={index}
            className="bg-transparent border-none shadow-none text-center"
          >
            <CardContent>
              <CardTitle className="text-3xl font-bold text-white">
                {number}
              </CardTitle>
              <CardDescription className="text-white text-lg">
                {title}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Herosection;
