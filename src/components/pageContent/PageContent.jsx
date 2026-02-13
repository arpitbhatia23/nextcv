import {
  Zap,
  Brain,
  DollarSign,
  GraduationCap,
  Clock,
  Package,
  Headset,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const PageContent = () => {
  const card_detail = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Smart AI Resume Generator",
      description:
        "Our advanced AI analyzes your information to create an ATS-friendly resume that's perfectly tailored to your target industry.",
      className: "bg-slate-900 border-slate-800",
    },
    {
      icon: <Brain className="w-6 h-6 text-teal-400" />,
      title: "ATS-Optimized Templates",
      description:
        "Guaranteed to beat applicant tracking systems. We give you a clear edge with formats designed to pass automated screening.",
      className: "bg-slate-900 border-slate-800",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      title: "Just ₹100 per Resume",
      description:
        "Professional results at a fraction of the cost. No subscriptions, just transparent flat pricing.",
      className: "bg-slate-900 border-slate-800",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-400" />,
      title: "For Students & Pros",
      description:
        "Whether you're a fresh graduate or an experienced professional, we provide the best Indian resume format templates.",
      className: "bg-slate-900 border-slate-800",
    },
  ];

  const cardSecond = [
    {
      icon: <Clock className="w-5 h-5 text-indigo-400" />,
      title: "Instant Generation",
      description: "Create professional resumes in under 5 minutes.",
    },
    {
      icon: <Package className="w-5 h-5 text-indigo-400" />,
      title: "Multiple Formats",
      description: "Download in PDF or Word. formatting preserved.",
    },
    {
      icon: <Headset className="w-5 h-5 text-indigo-400" />,
      title: "24/7 Support",
      description: "Get help whenever you need it from our team.",
    },
  ];

  return (
    <section className="py-24 bg-black text-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro Section */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Unlock interviews with the{" "}
            <span className="text-indigo-400">best AI resume generator</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Experience our ATS-friendly templates and professional resume
            building platform designed for modern job seekers.
          </p>
        </div>

        {/* Success Rate Feature */}
        <div className="mb-24 relative group">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Proven Results
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Boost Your Interview Chances
                </h3>
                <p className="text-slate-400 text-lg">
                  Users who got interviews within 30 days thanks to our
                  ATS-friendly resume designs.
                </p>
              </div>
              <div className="shrink-0 text-center">
                <span className="block text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-500 tracking-tighter">
                  95%
                </span>
                <span className="text-blue-200 font-medium tracking-widest uppercase text-sm">
                  Success Rate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {card_detail.map((item, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${item.className} border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/10`}
            >
              <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-white/5 pt-20">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">
              Built for Success: <br />
              The Best Indian Resume Format
            </h2>
            <div className="space-y-6">
              {cardSecond.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 bg-indigo-500/10 p-2 rounded-lg h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Ready to get hired?
              </h3>
              <p className="text-slate-400">
                Join thousands of professionals who have accelerated their
                careers with NextCV.
              </p>
              {/* <button className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 group">
                Start Building Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageContent;
