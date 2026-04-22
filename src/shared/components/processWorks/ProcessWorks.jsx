import { Zap, Eye, Wallet } from "lucide-react";
import SigninButton from "@/modules/auth/components/SigninButton";

const ProcessWorks = () => {
  const works = [
    {
      icon: <Zap className="w-8 h-8 text-indigo-500" />,
      title: "Lightning Fast",
      description:
        "No more spending hours formatting. Get professional results in minutes with our intelligent builder.",
      isHighlighted: false,
    },
    {
      icon: <Eye className="w-8 h-8 text-white" />,
      title: "Maximum Visibility",
      description:
        "Our templates are designed to be read perfectly by Applicant Tracking Systems (ATS), ensuring your resume gets seen.",
      isHighlighted: true,
    },
    {
      icon: <Wallet className="w-8 h-8 text-indigo-500" />,
      title: "Wallet-Friendly",
      description:
        "Get professional, interview-ready results starting at just ₹49. A fraction of the cost of other services.",
      isHighlighted: false,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Land Your Dream Job with the <br />
            <span className="text-indigo-600">NextCV Advantage</span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-600">
            Why thousands of Indian job seekers choose us over generic resume builders.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
          {works.map((item, index) => (
            <div
              key={index}
              className={`relative p-2 sm:p-8 rounded-xl sm:rounded-3xl transition-all duration-300 ${
                item.isHighlighted
                  ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105 z-10"
                  : "bg-slate-50 text-slate-900 hover:bg-white hover:shadow-xl hover:shadow-slate-100 border border-slate-100"
              }`}
            >
              <div
                className={`w-7 sm:w-14 h-7 sm:h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  item.isHighlighted
                    ? "bg-white/20 text-white"
                    : "bg-white text-indigo-600 shadow-sm"
                }`}
              >
                {item.icon}
              </div>

              <h3 className="text-sm sm:text-xl font-bold mb-3">{item.title}</h3>
              <p
                className={`leading-relaxed text-xs sm:text-sm ${item.isHighlighted ? "text-indigo-100" : "text-slate-600"}`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          {/* <div className="inline-block relative group"> */}
          <SigninButton />
          {/* </div> */}

          <div className="mt-8 flex flex-col items-center">
            <p className="text-xl sm:text-4xl font-black text-slate-900">10k+</p>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Successful Resumes Created
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessWorks;
