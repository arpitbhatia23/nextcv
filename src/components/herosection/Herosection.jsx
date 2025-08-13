"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { scroller } from "react-scroll";

function AnimatedHeroSection() {
  const [currentMockup, setCurrentMockup] = useState(0);

  const resumeMockups = [
    {
      name: "Modern",
      color: "from-blue-500 to-purple-600",
      width: 446,
      height: 587,
      textColor: "text-white",
      img: "/modern.png",
    },
    {
      name: "Minimalist",
      color: "from-emerald-500 to-teal-600",
      width: 351,
      height: 451,
      textColor: "text-white",
      img: "/minalmalist.png",
    },
    {
      name: "Classic",
      color: "from-slate-700 to-slate-900",
      width: 446,
      height: 587,
      textColor: "text-white",
      img: "/classic.png",
    },
    {
      name: "Tech Specialist",
      width: 351,
      height: 451,
      color: "from-orange-500 to-red-600",
      textColor: "text-white",
      img: "/ModernSideBar.png",
    },
  ];

  const stats = [
    {
      number: "10K+",
      title: "Resumes Created",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "98%",
      title: "Success Rate",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "2 Min",
      title: "Average Time",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      number: "₹100",
      title: "Fixed Price",
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMockup((prev) => (prev + 1) % resumeMockups.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const ResumeMockup = ({ mockup, isActive }) => (
    <section
      className={`relative transform transition-all duration-1000 ${
        isActive
          ? "scale-100 opacity-100 rotate-0"
          : "scale-95 opacity-60 rotate-3"
      }`}
    >
      <div
        className={`w-72 h-96 rounded-2xl bg-gradient-to-br ${mockup.color} p-2 shadow-2xl relative overflow-hidden`}
      >
        <Image
          src={mockup?.img}
          height={mockup.height}
          width={mockup.width}
          alt="resume template"
          className="rounded-lg object-cover"
        />
        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-sm opacity-50 pointer-events-none" />
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-lg">
        {mockup.name}
      </div>
    </section>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 px-4 overflow-hidden z-0">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8 z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium animate-bounce">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered Resume Builder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Build Your
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                {" "}
                Perfect Resume
              </span>
              <br />
              with AI – In Minutes
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
              AI-powered resume creation that gets you hired.
              <span className="text-yellow-300 font-semibold">
                {" "}
                Pay only ₹100 per resume.
              </span>{" "}
              No subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/25 flex items-center justify-center gap-2 z-10 relative"
                onClick={() => signIn("google")}
              >
                Create Your Resume
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 z-10 relative"
                onClick={() => scrollTo("Templates")}
              >
                View Templates
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: <Zap className="w-5 h-5" />, text: "AI-Powered" },
                { icon: <Target className="w-5 h-5" />, text: "ATS-Optimized" },
                { icon: <DollarSign className="w-5 h-5" />, text: "Just ₹100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-lg bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <span className="text-yellow-400">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-center -z-10">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse pointer-events-none z-0" />
              <div className="relative -z-10 flex items-center justify-center min-h-[500px]">
                {resumeMockups.map((mockup, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-1000 ${
                      index === currentMockup
                        ? "z-20"
                        : index === (currentMockup + 1) % resumeMockups.length
                        ? "z-10"
                        : "z-0"
                    }`}
                    style={{
                      transform:
                        index === currentMockup
                          ? "translateX(0) scale(1) rotateY(0deg)"
                          : index === (currentMockup + 1) % resumeMockups.length
                          ? "translateX(30px) scale(0.9) rotateY(15deg)"
                          : "translateX(60px) scale(0.8) rotateY(30deg)",
                    }}
                  >
                    <ResumeMockup
                      mockup={mockup}
                      isActive={index === currentMockup}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {resumeMockups.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMockup(index)}
                    className={`w-4 lg:w-3 h-4 lg:h-2 p-3 rounded-full transition-all duration-300 ${
                      index === currentMockup
                        ? "bg-yellow-400 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label="buttons"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto z-10 relative">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-center mb-3 text-yellow-400 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-blue-200 font-medium">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AnimatedHeroSection;
