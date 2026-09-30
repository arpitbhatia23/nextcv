import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Check,
  ShieldCheck,
  Zap,
  Download,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Star,
  Globe,
  Crown,
  X,
  FileText,
  Layers,
  Percent,
} from "lucide-react";

export const metadata = createSeoMetadata({
  title: "Resume Builder Pricing in India | Plans from ₹49 | NextCV",
  description:
    "Create a professional resume with NextCV. Choose from Basic, Standard, Premium and Elite plans. Get 20% OFF your first payment with coupon FIRST20. Elite also includes a professional portfolio website.",
  keywords: [
    "resume builder pricing India",
    "resume maker price India",
    "resume builder ₹49",
    "resume builder ₹99",
    "resume builder ₹199",
    "resume builder ₹399",
    "resume sharing link",
    "online resume portfolio",
    "portfolio website for resume",
    "AI resume builder",
    "NextCV pricing",
  ],
});

const plans = [
  {
    name: "Basic",
    price: 49,
    description: "A clean professional resume for getting started.",
    icon: FileText,
    popular: false,
    href: "/templates?plan=basic",
    features: [
      "Single-column ATS format",
      "Professional resume structure",
      "High-resolution PDF download",
      "AI-assisted resume writing",
      "Instant UPI & card checkout",
    ],
    unavailable: ["Resume sharing link", "Professional portfolio", "AI cover letter"],
  },
  {
    name: "Standard",
    price: 99,
    description: "More layouts and AI tools for a stronger resume.",
    icon: Layers,
    popular: false,
    href: "/templates?plan=standard",
    features: [
      "Multiple professional formats",
      "AI bullet optimizer",
      "Role-focused resume layouts",
      "High-resolution PDF download",
      "AI-assisted content generation",
    ],
    unavailable: ["Resume sharing link", "Professional portfolio", "AI cover letter"],
  },
  {
    name: "Premium",
    price: 199,
    description: "A polished resume plus a shareable online resume link.",
    icon: Globe,
    popular: true,
    href: "/templates?plan=premium",
    features: [
      "Live resume sharing link",
      "1-click LinkedIn & WhatsApp sharing",
      "20+ professional layouts",
      "Specialized role templates",
      "AI writer tools",
      "High-resolution PDF download",
    ],
    unavailable: ["Professional portfolio website"],
  },
  {
    name: "Elite",
    price: 399,
    description: "The complete package — premium resume, sharing link, cover letter and portfolio.",
    icon: Crown,
    popular: false,
    href: "/templates?plan=elite",
    features: [
      "Live resume sharing link",
      "Professional portfolio website",
      "Generate portfolio from your resume",
      "Shareable portfolio link",
      "AI cover letter generator",
      "Modern premium layouts",
      "High-resolution PDF download",
      "Advanced AI writing tools",
    ],
    unavailable: [],
  },
];

const faqs = [
  {
    question: "How does the FIRST20 coupon work?",
    answer:
      "Use coupon code FIRST20 at checkout to receive 20% OFF your first payment. The discount applies only to the first eligible payment.",
  },
  {
    question: "Which plans include a Resume Sharing Link?",
    answer:
      "Premium and Elite include a public Resume Sharing Link. You can share your resume through a web link on LinkedIn, WhatsApp, email or anywhere else.",
  },
  {
    question: "Which plan includes the Portfolio Website?",
    answer:
      "The professional Portfolio Website is included with the Elite ₹399 plan. You can turn your resume information into a personal portfolio with sections such as your profile, experience, projects, skills, education and contact information.",
  },
  {
    question: "Does Elite include normal PDF resume download?",
    answer:
      "Yes. Elite includes a normal high-resolution PDF resume download along with the online resume sharing link and portfolio website.",
  },
  {
    question: "Do I need a monthly subscription?",
    answer:
      "No. NextCV uses one-time payments for the selected resume plan. There is no mandatory monthly subscription for creating your resume.",
  },
  {
    question: "Can I edit my resume after purchasing?",
    answer:
      "Yes. You can continue editing your resume and update your information before downloading or sharing it.",
  },
  {
    question: "What is the difference between Premium and Elite?",
    answer:
      "Premium gives you a professional resume with a live sharing link. Elite adds the professional portfolio website, portfolio sharing, AI cover letter generation and additional premium features.",
  },
];

function DiscountPrice({ price }) {
  const discounted = (price * 0.8).toFixed(2).replace(".00", "");

  return (
    <div className="mt-5">
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black tracking-tight text-slate-950">₹{discounted}</span>

        <span className="mb-1 text-sm text-slate-400 line-through">₹{price}</span>
      </div>

      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
        <Percent className="h-3 w-3" />
        With FIRST20
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <Sparkles className="h-4 w-4" />
              FIRST20 · 20% OFF YOUR FIRST PAYMENT
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Simple pricing.
              <br />
              <span className="text-slate-500">Professional resumes.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Create a professional resume with AI-powered tools, premium templates and optional
              online sharing. Upgrade to Elite to turn your resume into a personal portfolio
              website.
            </p>

            {/* COUPON */}
            <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:px-5">
              <div className="flex items-center gap-3 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Percent className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-950">Save 20% on your first payment</p>
                  <p className="text-xs text-slate-500">Apply this code at checkout</p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-emerald-400 bg-white px-4 py-2 font-mono text-sm font-black tracking-widest text-emerald-700">
                FIRST20
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-slate-50/70 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Choose your plan
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Pay once. Build your resume.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Start with the plan you need and upgrade when you want more.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map(plan => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular ? "border-slate-950 shadow-lg" : "border-slate-200 shadow-sm"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                        <Star className="h-3 w-3 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-500">{plan.name}</p>

                      <h3 className="mt-1 text-2xl font-black text-slate-950">
                        {plan.name === "Elite" ? "Complete" : plan.name}
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-4 min-h-12 text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>

                  <DiscountPrice price={plan.price} />

                  <div className="my-6 h-px bg-slate-100" />

                  <div className="flex-1 space-y-3">
                    {plan.features.map(feature => (
                      <div
                        key={feature}
                        className={`flex items-start gap-2.5 text-sm ${
                          plan.name === "Elite" && feature === "Professional portfolio website"
                            ? "rounded-xl border border-violet-200 bg-violet-50 p-2.5 font-bold text-violet-900"
                            : "text-slate-700"
                        }`}
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.name === "Elite" && feature === "Professional portfolio website"
                              ? "text-violet-600"
                              : "text-emerald-600"
                          }`}
                        />

                        <span>{feature}</span>
                      </div>
                    ))}

                    {plan.unavailable.map(feature => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-slate-400"
                      >
                        <X className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.href}
                    className={`mt-7 flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
                      plan.name === "Elite"
                        ? "bg-slate-950 text-white hover:bg-slate-800"
                        : plan.popular
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {plan.name === "Elite" ? "Choose Elite" : `Choose ${plan.name}`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* PRICE NOTE */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center text-xs text-slate-500 sm:flex-row">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Prices shown above reflect the 20% FIRST20 introductory discount. Coupon applies to
              your first eligible payment.
            </span>
          </div>
        </div>
      </section>

      {/* ELITE PORTFOLIO FEATURE */}
      <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Crown className="h-3.5 w-3.5" />
              Elite feature
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Turn your resume into a personal portfolio
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Elite lets you transform your resume information into a clean, professional portfolio
              website that you can share with recruiters, clients and your professional network.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "Create your resume",
                text: "Build your resume using NextCV's templates and AI writing tools.",
              },
              {
                icon: Layers,
                title: "Generate your portfolio",
                text: "Turn your resume information into a structured personal portfolio.",
              },
              {
                icon: Globe,
                title: "Share one link",
                text: "Get a public portfolio link you can share on LinkedIn, WhatsApp or email.",
              },
            ].map(item => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-950">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-sm font-bold text-slate-900">
              Elite = Resume + Resume Sharing + Portfolio + Cover Letter
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Everything you need to present your professional profile online.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {/* RESUME SHARING */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Globe className="h-6 w-6" />
              </div>

              <span className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">
                Premium & Elite
              </span>

              <h3 className="mt-3 text-xl font-black text-slate-950">Live Resume Sharing</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Share your resume through a clean public web link such as
                <span className="font-semibold text-slate-700"> nextcv.in/r/your-name</span>.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-700">
                <Check className="h-4 w-4 text-emerald-600" />
                LinkedIn & WhatsApp friendly
              </div>
            </div>

            {/* PORTFOLIO */}
            <div className="rounded-3xl border border-violet-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
                <Layers className="h-6 w-6" />
              </div>

              <span className="mt-5 inline-flex rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-violet-700">
                Elite Only
              </span>

              <h3 className="mt-3 text-xl font-black text-slate-950">Professional Portfolio</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Turn your resume into a personal portfolio website with your experience, projects,
                skills, education and contact details.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-700">
                <Check className="h-4 w-4 text-emerald-600" />
                Shareable portfolio link
              </div>
            </div>

            {/* COVER LETTER */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Sparkles className="h-6 w-6" />
              </div>

              <span className="mt-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">
                Elite
              </span>

              <h3 className="mt-3 text-xl font-black text-slate-950">AI Cover Letter</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Generate a personalized cover letter based on your resume and the role you are
                applying for.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-700">
                <Check className="h-4 w-4 text-emerald-600" />
                Generate faster with AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NEXTCV */}
      <section className="border-b border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Why NextCV
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Everything stays simple
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "No monthly subscription",
                text: "Choose the resume plan you need and pay once.",
              },
              {
                icon: Download,
                title: "High-quality PDF",
                text: "Download your finished resume as a professional PDF.",
              },
              {
                icon: Zap,
                title: "AI-powered tools",
                text: "Create summaries, bullets and other resume content faster.",
              },
            ].map(item => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-950">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Compare plans</h2>

            <p className="mt-3 text-sm text-slate-500">Choose based on what you need today.</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Plan
                    </th>
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Price
                    </th>
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Resume
                    </th>
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Sharing
                    </th>
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Portfolio
                    </th>
                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Cover Letter
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Basic", "₹49", "✓", "—", "—", "—"],
                    ["Standard", "₹99", "✓", "—", "—", "—"],
                    ["Premium", "₹199", "✓", "✓ Resume", "—", "—"],
                    ["Elite", "₹399", "✓", "✓ Resume", "✓ Portfolio", "_"],
                  ].map(row => (
                    <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={`px-5 py-4 text-sm ${
                            index === 0 ? "font-bold text-slate-950" : "text-slate-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* COUPON BANNER */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
            <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  LIMITED INTRODUCTORY OFFER
                </div>

                <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                  Get 20% OFF your first payment
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Choose any eligible plan and apply the coupon at checkout.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-white/20 bg-white px-6 py-4 text-center text-slate-950">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Coupon Code
                </p>

                <p className="mt-1 font-mono text-2xl font-black tracking-widest">FIRST20</p>

                <p className="mt-1 text-xs font-bold text-emerald-600">20% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-800 shadow-sm ring-1 ring-slate-200">
              <HelpCircle className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-slate-950">
                  <span>{faq.question}</span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Build your resume from ₹49
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Use <strong className="text-slate-900">FIRST20</strong> to save 20% on your first
            payment. Choose Elite when you want your resume, online profile and portfolio in one
            place.
          </p>

          <Link
            href="/templates"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Browse Templates
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              One-time payment
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              PDF download
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              FIRST20 available
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
