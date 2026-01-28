import ContactForm from "@/components/ContactForm";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact NextCV - Resume Support & Enquiries",
  description: "Get in touch with the NextCV team. We support students and job seekers with 24/7 assistance for their resume building needs.",
  keywords: ["Contact NextCV", "Resume Support", "CV Builder Help", "NextCV Email"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-100 pt-32 pb-16 px-6">
         <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
              <MessageSquare className="w-4 h-4" />
              We're here to help
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 transition-all">
               Let's build your <span className="text-indigo-600">career together</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
               Have questions about our <span className="font-semibold">AI Resume Builder</span>? 
               Need help with your template? We typically reply within 24 hours.
            </p>
         </div>
      </section>

      {/* Stats KPI */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 mb-12 relative z-10">
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
               <div className="flex justify-center mb-2"><Clock className="w-6 h-6 text-indigo-500" /></div>
               <div className="text-2xl font-bold text-slate-900">24h</div>
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reply Time</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
               <div className="flex justify-center mb-2 text-indigo-500 font-bold">₹</div>
               <div className="text-2xl font-bold text-slate-900">100</div>
               <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Fixed Price</div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
         <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-2">
               <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
                  <p className="text-slate-500 mb-8">
                     Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  {/* Reuse existing accessible form component, ensure it's styled for light mode internally or has neutral styles */}
                  <ContactForm /> 
               </div>
            </div>

            {/* Right: Sidebar Info */}
            <aside className="space-y-6">
               {/* Email Card */}
               <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-600/20">
                  <Mail className="w-8 h-8 mb-4 opacity-80" />
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-indigo-100 mb-6 text-sm">
                     Prefer email? reaching out directly is always faster for technical support.
                  </p>
                  <a href="mailto:support@nextcv.in" className="inline-block bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                     help@nextcv.in
                  </a>
               </div>

               {/* Quick Info */}
               <div className="bg-white p-8 rounded-3xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-6">Quick Links</h3>
                   <ul className="space-y-4">
                      <li>
                         <a href="/privacy-policy" className="flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors group">
                            <span>Privacy Policy</span>
                            <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                         </a>
                      </li>
                      <li>
                         <a href="/terms" className="flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors group">
                            <span>Terms of Service</span>
                            <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                         </a>
                      </li>
                   </ul>
               </div>

               {/* Location */}
               <div className="flex items-center gap-4 p-6 bg-slate-100/50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-slate-900">India</p>
                     <p className="text-xs text-slate-500">Remote First Team</p>
                  </div>
               </div>
            </aside>

         </div>
      </main>

    </div>
  );
}
