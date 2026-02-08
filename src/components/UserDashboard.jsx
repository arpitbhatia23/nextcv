import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  IndianRupee,
  Plus,
  Timer,
  Zap,
  Cpu,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-6 md:p-10 font-[--font-geist-sans] bg-slate-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
          Dashboard
        </h1>
        <p className="text-slate-500 text-lg">
          What would you like to create today?
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Creation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1: Manual Builder */}
          <Link href="/dashboard/resumeform" className="group">
            <Card className="h-full border-2 border-slate-200 bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <CardContent className="p-8 md:p-10 relative">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                  <Plus size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Create Resume 
                  <span className="block text-sm font-medium text-slate-400 mt-1">(Standard Form)</span>
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Build your resume step-by-step with our classic form builder.
                  Best for precise control and customization.
                </p>
                <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                  Start Form Builder <ArrowRight className="ml-2 w-5 h-5" />
                </div>

              </CardContent>
            </Card>
          </Link>

          {/* Option 2: Full AI Generator */}
          <Link href="/dashboard/full-ai-resume" className="group">
            <Card className="h-full border-2 border-slate-200 bg-white hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <CardContent className="p-8 md:p-10 relative">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Full AI Resume <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">Experimental</Badge>
                  <span className="block text-sm font-medium text-slate-400 mt-1">(Chat Assistant)</span>
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Generate a complete, ATS-friendly resume from scratch in
                  seconds using our advanced AI assistant.
                </p>
                <div className="flex items-center text-purple-600 font-bold group-hover:translate-x-2 transition-transform">
                  Generate with AI <ArrowRight className="ml-2 w-5 h-5" />
                </div>


              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Value Props Grid */}
        <div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-1">
            Why NextCV?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-xl hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Cpu size={20} />
                </div>
                <h3 className="font-bold text-slate-900">AI Powered</h3>
              </div>
              <p className="text-slate-500 text-sm">
                Create tailored content for your industry automatically.
              </p>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-xl hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Timer size={20} />
                </div>
                <h3 className="font-bold text-slate-900">Quick & Easy</h3>
              </div>
              <p className="text-slate-500 text-sm">
                Professional resume ready in under 5 minutes.
              </p>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm p-6 rounded-xl hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-slate-900">ATS Friendly</h3>
              </div>
              <p className="text-slate-500 text-sm">
                Formats designed to pass screening software.
              </p>
            </Card>

            <Card className="border_2 border-indigo-100 bg-indigo-50/50 shadow-sm p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <IndianRupee size={20} />
                </div>
                <h3 className="font-bold text-indigo-900">Just ₹100</h3>
              </div>
              <p className="text-indigo-700 text-sm">
                Pay only when you download. No subscriptions.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
