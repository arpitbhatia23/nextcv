import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, IndianRupee, Plus, Timer, Zap, Cpu } from "lucide-react";
import Link from "next/link";

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 font-(family-name:--font-geist-sans) bg-linear-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          AI Resume Maker
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Create your professional resume with AI
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Option 1: Manual + AI Summary */}
          <Card className="border-2 border-purple-200 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-8 text-center">
              <Link href="/dashboard/resumeform">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                  <Plus size={32} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Custom Resume
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill in your own details and craft a professional resume your
                  way.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  Start Manual Resume
                </button>
              </Link>
            </CardContent>
          </Card>

          {/* Option 2: Full AI Resume Maker */}
          <Card className="border-2 border-purple-200 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-8 text-center">
              <Link href="/dashboard/full-ai-resume">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Cpu size={32} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Full AI Resume Maker
                </h2>
                <p className="text-gray-600 mb-6">
                  Let AI create your complete professional resume automatically
                  in seconds.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  Generate Full Resume
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
              <Zap size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Advanced AI creates tailored content for your industry
            </p>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3 mx-auto">
              <Timer size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional resume ready in minutes, not hours
            </p>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3 mx-auto">
              <FileText size={24} className="text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ATS-friendly formats that get you noticed
            </p>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-linear-to-br from-purple-50 to-purple-100 text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full mb-3 mx-auto">
              <IndianRupee size={24} className="text-purple-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">₹100</h3>
            <p className="text-sm font-medium text-purple-700 mb-1">
              per resume
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              No monthly fees • Pay only when you create
            </p>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Join thousands of professionals who've created winning resumes with
            our AI technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
