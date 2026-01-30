import Link from "next/link";
import { Check, ShieldCheck, Zap, Download } from "lucide-react";

export const metadata = {
  title: "Simple & Affordable Pricing | Resume Builder India",
  description:
    "Create your professional resume for just ₹100. No subscriptions, no hidden fees. Pay only when you download. Try for free today.",
  keywords:
    "resume builder price, cheap resume builder india, cv maker cost, professional resume writer cost, one time payment resume builder",
};

export default function PricingPage() {
  const features = [
    "Unlimited Edits & AI Generations",
    "Premium ATS-Friendly Templates",
    "PDF Download in High Quality",
    "No Monthly Subscription",
    "Secure Payment via UPI/Cards",
    "Remove Watermark",
    "Priority Email Support",
    "Access to All Features",
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing",
    url: "https://www.nextcv.in/pricing",
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
      <main className="bg-white text-slate-900 font-sans">
        {/* Hero */}
        <section className="relative pt-24 pb-12 px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-indigo-600 font-semibold text-lg tracking-wide uppercase mb-4">
              Pricing
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Pay Once, Use Forever. <br className="hidden sm:block" /> No
              Hidden Subscriptions.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              We believe in honest pricing. You shouldn't have to subscribe to a
              monthly plan just to update your resume once.
            </p>
          </div>
        </section>

        {/* Pricing Card Section */}
        <section className="pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <div className="rounded-3xl p-1 bg-linear-to-b from-indigo-500 to-purple-600 shadow-2xl">
              <div className="bg-white rounded-[20px] p-8 md:p-10 h-full flex flex-col relative overflow-hidden">
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-bold px-4 py-1 rounded-bl-xl text-sm">
                  BEST VALUE
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Professional Resume
                  </h3>
                  <p className="text-slate-500 mt-2">
                    Everything you need to land your dream job.
                  </p>
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                    ₹100
                  </span>
                  <span className="text-xl font-semibold text-slate-500 ml-2">
                    / resume
                  </span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="ml-3 text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard/resume/new"
                  className="w-full block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-center transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  Create My Resume Now
                </Link>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Full refund if you are not satisfied with the quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison / Trust Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
              Why we are different
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">No Recurring Billing</h3>
                <p className="text-slate-500 text-sm">
                  Most resume builders charge ₹500 - ₹1500 per month
                  automatically. We charge a one-time fee of ₹100.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Download</h3>
                <p className="text-slate-500 text-sm">
                  Once purchased, your high-quality PDF is yours forever. No
                  locked files or low-res previews.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Powered by AI</h3>
                <p className="text-slate-500 text-sm">
                  Get access to professional content suggestions powered by
                  Google Gemini AI included in the price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-20 px-6 lg:px-8 max-w-3xl mx-auto prose prose-slate">
          <h2>Transparent Pricing for High-Quality Resumes in India</h2>
          <p>
            Finding a <strong>trustworthy and affordable resume builder</strong>{" "}
            can be frustrating. Many international tools lure users in with
            "Free" trials that require credit card details, only to charge hefty
            monthly subscription fees that are hard to cancel. At NextCV, we are
            changing that model for Indian job seekers.
          </p>

          <h3>The Problem with Subscription Models</h3>
          <p>
            Most job searches last a few weeks to a few months. Once you have
            your resume ready, you don't need to pay for a tool every month.
            Yet, competitors often charge $10-$20 (approx ₹800 - ₹1600) per
            month.
          </p>
          <p>
            <strong>NextCV offers a simple, one-time payment of ₹100.</strong>{" "}
            This micro-payment model ensures that:
          </p>
          <ul>
            <li>You only pay for what you use.</li>
            <li>There are no surprise charges on your card statement.</li>
            <li>
              Student-friendly pricing makes professional career tools
              accessible to everyone.
            </li>
          </ul>

          <h3>Value for Money</h3>
          <p>For the price of a coffee, you get access to:</p>
          <ul>
            <li>
              <strong>Premium Design:</strong> Templates that would cost
              thousands to hire a designer for.
            </li>
            <li>
              <strong>ATS Optimization:</strong> Automated formatting that
              ensures your resume passes Applicant Tracking Systems.
            </li>
            <li>
              <strong>AI Writing Assistance:</strong> Struggling to describe
              your last role? Our AI suggests professional bullet points
              instantly.
            </li>
          </ul>

          <h3>Is it really just ₹100?</h3>
          <p>
            Yes. We are a student-built project aimed at solving a real problem
            for our peers in India. Our goal is sustainability and helpfulness,
            not corporate greed. By keeping our costs low, we help millions of
            Indians upgrade their career prospects without breaking the bank.
          </p>
        </section>
      </main>
    </>
  );
}
