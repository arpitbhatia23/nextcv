import { CheckCircle2, Users, Heart, Zap } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About NextCV - The Best AI Resume Builder for Freshers in India",
  description: "NextCV is an ATS-friendly resume builder designed by students for students. Create professional resumes for the Indian job market for just ₹100.",
  keywords: ["About NextCV", "Resume Builder India", "Fresher Resume", "ATS Resume Builder", "Student CV Maker"],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-8 border border-indigo-100">
            <Users className="w-4 h-4" />
            Built by Students, For Students
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            We make professional resumes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              affordable for everyone.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            NextCV is India's most affordable <span className="font-semibold text-slate-800">AI Resume Builder</span>. 
            We help freshers and students create ATS-friendly resumes without expensive monthly subscriptions.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Why we built NextCV?</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                   <p>
                     We're BCA students who faced a common problem: <span className="font-semibold text-slate-800">resume builders are too expensive</span>. 
                     Most platforms charge ₹500-1200/month, which is hard for students to justify.
                   </p>
                   <p>
                     We believed there had to be a better way. A way to get a high-quality, <span className="font-semibold text-slate-800">ATS-optimized resume</span> for the price of a coffee.
                   </p>
                   <p>
                     So we built NextCV with a simple promise: <b className="text-indigo-600">₹100, one time. No hidden fees.</b>
                   </p>
                </div>
             </div>
             
             {/* Stats/Visual */}
             <div className="flex-1 w-full">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-indigo-50 p-6 rounded-2xl text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">₹100</div>
                      <div className="text-sm text-indigo-800 font-medium">One-time Fee</div>
                   </div>
                   <div className="bg-emerald-50 p-6 rounded-2xl text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">100%</div>
                      <div className="text-sm text-emerald-800 font-medium">ATS Friendly</div>
                   </div>
                   <div className="bg-amber-50 p-6 rounded-2xl text-center col-span-2">
                       <div className="text-3xl font-bold text-amber-600 mb-1">Student First</div>
                       <div className="text-sm text-amber-800 font-medium">Designed for Indian Job Market</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mission Values */}
      <section className="py-24 px-6">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">
                 To democratize career opportunities by making professional resume tools accessible to every student in India.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   icon: <Zap className="w-6 h-6 text-white" />,
                   bg: "bg-indigo-600",
                   title: "Lightning Fast",
                   desc: "Create a resume in under 5 minutes with our AI-powered builder."
                 },
                 {
                   icon: <CheckCircle2 className="w-6 h-6 text-white" />,
                   bg: "bg-emerald-600",
                   title: "ATS Guaranteed",
                   desc: "Templates tested against major Applicant Tracking Systems to ensure you get ranked."
                 },
                 {
                   icon: <Heart className="w-6 h-6 text-white" />,
                   bg: "bg-pink-600",
                   title: "Fair Pricing",
                   desc: "We charge what we'd want to pay. Affordable, transparent, and honest."
                 }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 border border-slate-100 hover:shadow-lg">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6 shadow-md`}>
                       {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-6 bg-slate-900 text-white rounded-t-[3rem]">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
               {/* Aurpit */}
               <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur">
                  <div className="w-20 h-20 bg-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/20">A</div>
                  <h3 className="text-xl font-bold mb-1">Aurpit</h3>
                  <p className="text-indigo-300 text-sm mb-4">Co-Founder & Developer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Full-stack developer passionate about building tools that solve real problems.
                  </p>
               </div>

               {/* Tamanna */}
               <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/20">T</div>
                  <h3 className="text-xl font-bold mb-1">Tamanna</h3>
                  <p className="text-emerald-300 text-sm mb-4">Co-Founder & Developer</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Obsessed with user experience and making technology accessible to everyone.
                  </p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
