import React from "react";
import { FileText, Settings, CreditCard, Download, ArrowRight } from "lucide-react";

function HowitWork() {
  const steps = [
    {
      id: "01",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: "Enter Details",
      description: "Fill in your experience, education, and skills in our simple form.",
      color: "bg-indigo-50 border-indigo-100",
    },
    {
      id: "02",
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "AI Optimization",
      description: "Our AI instantly formats and optimizes your content for ATS.",
      color: "bg-purple-50 border-purple-100",
    },
    {
      id: "03",
      icon: <CreditCard className="w-6 h-6 text-pink-600" />,
      title: "Pay & Finalize",
      description: "Preview your resume. Pay just ₹100 to unlock the download.",
      color: "bg-pink-50 border-pink-100",
    },
    {
      id: "04",
      icon: <Download className="w-6 h-6 text-emerald-600" />,
      title: "Download PDF",
      description: "Get your polished, professional resume instantly.",
      color: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section name="How It Works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Create a Professional Resume in <span className="text-indigo-600">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-slate-600">
             No complicated design software. No subscriptions. Just a seamless process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 -z-10 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className={`w-14 h-14 rounded-2xl ${step.color} border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10 bg-white`}>
                  {step.icon}
                  <span className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white text-sm font-bold rounded-full flex items-center justify-center border-4 border-slate-50">
                    {step.id}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Arrow for mobile/tablet flow */}
                {index < 3 && (
                  <div className="lg:hidden absolute top-6 right-0 text-slate-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats / Time Badge */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg shadow-slate-200 border border-slate-100">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-slate-700 font-medium">
               Average completion time: <span className="font-bold text-slate-900">~5 minutes</span>
             </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowitWork;
