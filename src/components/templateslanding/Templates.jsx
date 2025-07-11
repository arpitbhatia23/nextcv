import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import HowitWork from "../herosection/HowitWork";
import { signIn } from "next-auth/react";

const Templates = () => {
  const cards = [
    {
      img: "",
      title: "Executive Pro",
      description: "Perfect for senior professionals",
    },
    {
      img: "",
      title: "Creative Edge",
      description: "Ideal for creative professionals",
    },
    {
      img: "",
      title: "Tech Modern",
      description: "Great for tech professionals",
    },
    { img: "", title: "Clean Minimal", description: "Simple and professional" },
    {
      img: "",
      title: "Student Fresh",
      description: "Perfect for new graduates",
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
        <Card className="max-w-screen-lg mx-auto border-none shadow-none space-y-6">
          <h1 className="text-4xl font-bold text-center">Templates</h1>
          <h2 className="text-gray-600 text-lg text-center">
            Choose from our collection of professionally designed, ATS-optimized
            resume templates.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map(({ img, title, description }, index) => (
              <Card key={index} className="p-4">
                <CardHeader>
                  {img || <div className="h-32 bg-gray-200 rounded" />}
                </CardHeader>
                <CardTitle className="font-bold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            ))}
          </div>
        </Card>
      </section>

      {/* All Templates Include Section */}
      <section className="px-4 py-12 ">
        <Card className="max-w-screen-lg mx-auto border-none shadow-none space-y-6">
          <h1 className="text-2xl font-bold text-center">
            All Templates Include
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-blue-100 dark:bg-black p-6 rounded-lg">
            {templates_includ.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center bg-blue-100 dark:bg-black border-none shadow-none"
              >
                <CardHeader className="text-3xl">{icon}</CardHeader>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription className="text-gray-700">
                  {description}
                </CardDescription>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 w-full sm:w-auto"
              onClick={() => {
                signIn("google");
              }}
            >
              Create your Resume
            </Button>
            <h1 className="text-center text-gray-600">
              Start building your professional resume today
            </h1>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Templates;
