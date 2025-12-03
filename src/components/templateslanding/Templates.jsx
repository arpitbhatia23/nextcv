import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

// Utility function to handle template selection/sign-in
const handleTemplateSelection = () => {
  // In a real application, you might pass the template ID here
  // and navigate to the builder, checking authentication first.
  signIn("google");
};

const Templates = () => {
  const cards = [
    {
      img: "/classic.webp",
      width: 446,
      height: 587,
      title: "Classic",
      // Refined description
      description: "Simple, chronological, and highly scannable by all ATS.",
      isATS: true,
    },
    {
      img: "/minalmalist.webp",
      width: 351,
      height: 451,
      title: "Minimalist",
      // Refined description
      description:
        "Clean design, prioritizes content readability. Best for creatives.",
      isATS: true,
    },
    {
      img: "/modern.webp",
      width: 446,
      height: 587,
      title: "Modern",
      // Refined description
      description:
        "Balanced layout with subtle design elements. Great for tech roles.",
      isATS: true,
    },
    {
      img: "/ModernSideBar.webp",
      width: 351,
      height: 451,
      title: "Modern Sidebar",
      // Refined description
      description:
        "Uses a two-column structure for maximum information density.",
      isATS: true,
    },
  ];

  const templates_includ = [
    {
      icon: "🎯",
      title: "ATS-Optimized",
      description: "Designed to pass applicant tracking systems",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Looks great on all devices and screen sizes",
    },
    {
      icon: "✏️",
      title: "Fully Customizable",
      description: "Edit colors, fonts, and layout to match your style",
    },
  ];

  return (
    <>
      {/* Templates Section */}
      <section name="Templates" className="px-4 py-12">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-center">Templates</h2>
          <h3 className="text-gray-600 text-lg text-center">
            Choose from our collection of professionally designed, ATS-optimized
            resume templates.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {cards.map(
              ({ img, width, height, title, description, isATS }, index) => (
                <Card
                  key={index}
                  className="p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="p-0 mb-4 relative">
                    <Image
                      src={img}
                      height={width}
                      width={height}
                      // Adjusted Tailwind classes for better image fit/style
                      className="rounded-lg w-full h-auto object-cover border border-gray-100"
                      alt={`${title} resume template preview`}
                      loading="lazy"
                    />
                    {/* ATS Badge/Tag Implementation */}
                    {isATS && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-md">
                        ✅ ATS Friendly
                      </span>
                    )}
                  </CardHeader>
                  <div className="flex-grow">
                    {" "}
                    {/* Container for title/desc to push button to bottom */}
                    <CardTitle className="font-extrabold text-xl mb-1">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mb-4">
                      {description}
                    </CardDescription>
                  </div>
                  {/* Secondary CTA Implementation */}
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-auto"
                    onClick={handleTemplateSelection}
                  >
                    Choose Template
                  </Button>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* All Templates Include Section */}
      <section className="px-4 py-12 ">
        <div className="max-w-screen-lg mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center">
            All Templates Include
          </h2>

          {/* Added visual distinction for ATS feature */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-blue-50 dark:bg-gray-800 p-8 rounded-xl shadow-inner">
            {templates_includ.map(({ icon, title, description }, index) => (
              <div
                key={index}
                className={
                  `flex flex-col items-center text-center p-4 rounded-lg 
                  ${
                    title === "ATS-Optimized"
                      ? "bg-white shadow-xl scale-105"
                      : "bg-transparent"
                  }` // Highlight ATS feature
                }
              >
                <div className="text-4xl mb-2">{icon}</div>
                <h4 className="text-xl font-extrabold mb-1">{title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <section className="flex flex-col items-center space-y-6 pt-8">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              onClick={handleTemplateSelection}
            >
              Start Building Your Resume Now
            </Button>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Start building your professional resume today — it only takes a
              few minutes!
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default Templates;
