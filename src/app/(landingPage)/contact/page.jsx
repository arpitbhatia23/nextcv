import ContactForm from "@/modules/contact/components/ContactForm";
import { createSeoMetadata } from "@/shared/utils/seo";
import { Mail, MessageSquare, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = createSeoMetadata({
  title: "Contact NextCV | Resume Support & Enquiries",
  description:
    "Contact NextCV for resume builder support, account questions, payment help, template issues, and general enquiries.",
  path: "/contact",
  keywords: ["contact nextcv", "resume builder support", "nextcv help"],
});

export const revalidate = 86400;

export default function ContactPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact us",
    url: "https://www.nextcv.in/contact",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-[400px] w-[500px] rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Dedicated 24/7 Support Team
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              Let's Build Your{" "}
              <span className="block bg-gradient-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                Career Together
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Have questions about our <span className="font-semibold text-slate-900">AI Resume Builder</span>, template payments (₹49 – ₹399), or ATS features? Our Indian support team typically replies within 24 hours.
            </p>
          </div>
        </section>

        {/* KPI Stats Cards */}
        <div className="max-w-5xl mx-auto px-6 mb-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-xs">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-[#071644]">&lt; 24h</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">
                Average Reply Time
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-xs">
              <div className="flex justify-center mb-2 font-bold text-indigo-600 text-xl">₹</div>
              <div className="text-xl sm:text-2xl font-bold text-[#071644]">₹49 – ₹399</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">
                Pay Per Resume
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-xs col-span-2 md:col-span-1">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-[#071644]">99.8%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>

        {/* Main Form & Info Section */}
        <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Contact Form Card */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-[#071644] mb-2">Send Us A Message</h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-8">
                  Fill out the form below and our team will get back to you shortly.
                </p>

                {/* Contact Form Component */}
                <ContactForm />
              </div>
            </div>

            {/* Right: Sidebar Info */}
            <aside className="space-y-6">
              {/* Direct Email Card */}
              <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-md space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Direct Email Support</h3>
                <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                  Need priority assistance with your resume download or account? Reach out to us directly.
                </p>
                <a
                  href="mailto:help@nextcv.in"
                  className="inline-block w-full bg-white hover:bg-slate-100 text-indigo-700 font-bold py-3 px-6 rounded-xl text-center text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  help@nextcv.in
                </a>
              </div>

              {/* Quick Jump Links */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
                <h3 className="font-bold text-[#071644] text-base">Helpful Links</h3>
                <ul className="space-y-3 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/pricing"
                      className="flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors group p-2 rounded-xl hover:bg-slate-200/60"
                    >
                      <span>Pricing Details (₹49 – ₹399)</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors group p-2 rounded-xl hover:bg-slate-200/60"
                    >
                      <span>Privacy Policy</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors group p-2 rounded-xl hover:bg-slate-200/60"
                    >
                      <span>Terms of Service</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl shadow-xs">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Himachal Pradesh, India</p>
                  <p className="text-xs text-slate-500">Remote-First Operations Team</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
