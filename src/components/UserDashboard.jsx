import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, IndianRupee, Plus, Timer, Zap } from "lucide-react";
import Link from "next/link";

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-50 to-blue-50">
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
        {/* Main Create Resume Card */}
        <Card className="mb-8 border-2 border-purple-200 shadow-lg bg-white">
          <CardContent className="p-8">
            <Link href={"dashboard/resumeform"}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Plus size={32} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your AI-Powered Resume
                </h2>
                <p className="text-gray-600 mb-6">
                  Get started with your professional resume in minutes
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg">
                  Start Creating
                </button>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI-Powered */}
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Zap size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Advanced AI creates tailored content for your industry
              </p>
            </CardContent>
          </Card>

          {/* Quick & Easy */}
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <Timer size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional resume ready in minutes, not hours
              </p>
            </CardContent>
          </Card>

          {/* Professional */}
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-white">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
                <FileText size={24} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ATS-friendly formats that get you noticed
              </p>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border-2 border-purple-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full mb-3">
                <IndianRupee size={24} className="text-purple-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">₹100</h3>
              <p className="text-sm font-medium text-purple-700 mb-1">
                per resume
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                No monthly fees • Pay only when you create
              </p>
            </CardContent>
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
