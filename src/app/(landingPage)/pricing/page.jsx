import Link from "next/link";
import { Check, ShieldCheck, Zap, Download, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Resume Price in India (2026) – Free vs Paid Resume Builders",
  description:
    "Wondering how much a resume costs in India? Compare free vs paid resume builders, pricing, and what you actually get. See NextCV plans starting at ₹49.",
  keywords:
    "resume price, resume builder price, resume builder cost, resume charges, cv rates, resume builder pricing, resume banane ka kitna paisa lagta hai, cv cost, cv-resume subscription, resume fees, resume pricing, resume maker price, resume making price, cv fee, resume builder india pricing, how much resume cost, pay for resume, resume payment",
  alternates: {
    canonical: `https://www.nextcv.in/pricing`,
  },
};

export const revalidate = 3600;

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

  const faqs = [
    {
      question: "How much does a resume cost in India?",
      answer: "A professional resume in India can cost anywhere from ₹500 for a basic freelancer service to ₹10,000 for executive agency packages. NextCV provides professional AI-powered resume templates starting at just ₹49.",
    },
    {
      question: "Is it worth paying for a resume builder?",
      answer: "Yes, especially if they provide ATS optimization, professional templates, and AI writing assistance. These features significantly increase your chances of getting an interview, making the small investment worth it.",
    },
    {
      question: "How much do professional resume writers charge?",
      answer: "Professional resume writers in India typically charge between ₹1,000 to ₹5,000 depending on your experience level. NextCV offers agency-level quality through AI for a fraction of that cost.",
    },
    {
      question: "Can I create a resume for free?",
      answer: "Yes, you can create a basic resume using Word or Google Docs for free. However, if you want an ATS-friendly, professional layout with AI assistance, premium tools like NextCV offer exceptional value starting at just ₹49.",
    },
    {
      question: "What is the difference between free and paid resume builders?",
      answer: "Free builders often have basic templates, hidden watermarks, or lack ATS optimization. Paid resume builders offer premium designs, AI content generation, keyword optimization, and high-quality PDF downloads without watermarks.",
    },
    {
      question: "What is the cheapest resume builder?",
      answer: "NextCV is one of the most affordable professional resume builders in India, offering premium ATS-friendly templates starting at just ₹49 with no hidden monthly subscriptions.",
    },
    {
      question: "How much does an ATS-friendly resume cost?",
      answer: "While some agencies charge ₹2,000+ for an ATS-optimized resume, you can build a 100% ATS-friendly resume on NextCV starting at just ₹49 using our pre-tested templates.",
    },
    {
      question: "Should freshers pay for resume writing services?",
      answer: "Freshers don't need expensive ₹3,000 writing services. An affordable resume builder that provides professional templates and AI bullet points (like NextCV at ₹49) is the perfect, cost-effective solution for campus placements.",
    },
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
              Pricing Options
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Affordable <span className="text-indigo-600">Resume Price</span> with No
              Subscriptions.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Transparent resume charges that fit your budget. Pay only when you are ready to
              download.
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
                  MOST POPULAR
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Premium Resume</h3>
                  <p className="text-slate-500 mt-2">
                    Professional ATS-ready resume for job seekers.
                  </p>
                </div>

                <div className="flex items-baseline mb-8">
                  <span className="text-2xl font-bold tracking-tight text-slate-500 mr-2 uppercase ">
                    Starting at
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">₹49</span>
                  <span className="text-xl font-semibold text-slate-500 ml-2">/ resume</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {features.map(feature => (
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
                  One-time payment. No hidden CV builder costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison / Trust Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-200 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
              Why NextCV Offers the Best CV Rates
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">No Recurring Charges</h3>
                <p className="text-slate-500 text-sm">
                  International brands often charge ₹800 - ₹1500 per month automatically. We believe
                  you should only pay once for a resume.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Instant Download</h3>
                <p className="text-slate-500 text-sm">
                  Once you pay the resume charges, the PDF is yours. Highly compatible with all job
                  portals and ATS systems.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">AI-Powered Value</h3>
                <p className="text-slate-500 text-sm">
                  Don't pay thousands to professional writers. Use our Gemini-powered AI to generate
                  perfect bullet points included in the affordable template price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New SEO Content Sections */}
        <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto prose prose-slate">
          <h2 className="text-3xl font-bold text-slate-900">
            How Much Does a Resume Cost in India?
          </h2>
          <p>
            The cost of professional resume services in India varies significantly based on the
            level of expertise you need:
          </p>
          <div className="grid sm:grid-cols-3 gap-6 not-prose mb-8">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h4 className="font-bold text-indigo-900">Freelancers</h4>
              <p className="text-2xl font-bold text-indigo-600">₹500 – ₹3000</p>
              <p className="text-xs text-indigo-700">Variable quality, manual process.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="font-bold text-purple-900">Agencies</h4>
              <p className="text-2xl font-bold text-purple-600">₹2000 – ₹10000</p>
              <p className="text-xs text-purple-700">Premium services for executives.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-900">Online Tools</h4>
              <p className="text-2xl font-bold text-green-600">₹0 – ₹999</p>
              <p className="text-xs text-green-700">Self-service, instant results.</p>
            </div>
          </div>
          <p>
            NextCV bridges the gap by offering <strong>agency-level quality</strong> with{" "}
            <strong>tool-level pricing</strong>. With templates starting at just ₹49, it's the most
            affordable professional resume maker in India.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12">
            Why Resume Pricing Varies (Free vs Paid)
          </h2>
          <p>
            You might wonder why some tools charge while others are free. Here's what goes into the
            cost:
          </p>
          <ul>
            <li>
              <strong>Templates vs AI:</strong> Free tools often provide basic templates. Paid tools
              like NextCV use AI to analyze your job role and suggest keyword-rich content.
            </li>
            <li>
              <strong>ATS Optimization:</strong> Passing the Applicant Tracking System (ATS) is
              crucial. Premium tools ensure the PDF structure is readable by recruiters' software.
            </li>
            <li>
              <strong>No Hidden Subscriptions:</strong> Many "free" builders are actually
              subscription traps. One-time payment models are more transparent and honest. Choose a <Link href="/blogs/best-resume-maker-for-freshers-in-india-inr100-only-no-subscription" className="text-indigo-600 hover:underline">resume builder with no hidden subscriptions</Link> to save money.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12">
            NextCV Pricing Explained (What You Actually Get)
          </h2>
          <p>
            Our resume fees are straightforward. For a one-time fee between ₹49 and ₹999 per resume,
            you unlock:
          </p>
          <ul>
            <li>
              <strong>Advanced AI Writing:</strong> Powered by Google Gemini to help you phrase
              complex achievements.
            </li>
            <li>
              <strong>20+ Premium Templates:</strong> Access any design, from creative to corporate.
            </li>
            <li>
              <strong>ATS Scoring:</strong> Real-time feedback on how well your resume matches job
              descriptions.
            </li>
            <li>
              <strong>Lifetime Access:</strong> Pay once, and you can come back to edit and
              re-download your resume anytime for that specific version.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12">
            Is Paying for a Resume Worth It?
          </h2>
          <p>
            A professional resume is an investment in your career. If a ₹49 tool helps you land a
            job even one day faster, it has already paid for itself. Professional resumes often lead
            to:
          </p>
          <ul>
            <li>Higher response rates from top companies.</li>
            <li>Confidence during the interview process.</li>
            <li>Better initial salary offers due to professional branding.</li>
          </ul>

          {/* Professional Resume Pricing Section */}
          <h2 className="text-3xl font-bold text-slate-900 mt-16">
            Professional Resume Writing Cost in India
          </h2>
          <p>
            If you're comparing tools versus hiring a human writer, here is the standard professional resume cost breakdown in the Indian market:
          </p>
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-slate-200 bg-white">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-6 py-3 text-left text-sm font-semibold text-slate-900">Service Type</th>
                  <th className="border border-slate-200 px-6 py-3 text-left text-sm font-semibold text-slate-900">Average Cost</th>
                  <th className="border border-slate-200 px-6 py-3 text-left text-sm font-semibold text-slate-900">Turnaround Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">NextCV Premium Builder</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm font-bold text-indigo-600">₹49 - ₹99</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">Instant</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">Freelance Resume Writer</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm font-bold text-slate-900">₹1,000 - ₹3,000</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">3 - 5 Days</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">Professional Agency</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm font-bold text-slate-900">₹4,000 - ₹10,000+</td>
                  <td className="border border-slate-200 px-6 py-4 text-sm text-slate-700">1 - 2 Weeks</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bilingual Hindi Section */}
          <div className="mt-16 bg-slate-900 text-white p-8 rounded-2xl not-prose shadow-xl">
            <h2 className="text-2xl font-bold mb-6">
              Resume Banane Mein Kitna Paisa Lagta Hai?
            </h2>
            <div className="space-y-6 text-slate-300">
              <p className="text-lg">
                Agar aap search kar rahe hain ki ek professional <strong>resume banane me kitna paisa lagta hai</strong>, toh yahan clear cost breakdown hai:
              </p>
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                  <span className="font-medium">Free Resume Builder (Word/Docs)</span>
                  <span className="text-xl font-bold text-slate-400">₹0</span>
                </div>
                <div className="bg-indigo-900/50 p-4 rounded-xl border border-indigo-700 flex justify-between items-center">
                  <span className="font-medium text-indigo-100">Premium Resume Builder (NextCV)</span>
                  <span className="text-xl font-bold text-indigo-400">₹49 – ₹99</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                  <span className="font-medium">Professional Resume Writing Service</span>
                  <span className="text-xl font-bold text-slate-400">₹500 – ₹5000+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50 px-6 lg:px-8 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 flex items-center justify-center gap-2">
              <HelpCircle className="text-indigo-600" /> Frequently Asked Questions
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
