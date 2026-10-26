import Link from "next/link";
import { Scale, MapPin, ShieldAlert, Sliders } from "lucide-react";
import PrivacyPreferencesButton from "@/shared/components/PrivacyPreferencesButton";

export const metadata = {
  title: "Terms & Conditions - NextCV",
  description: "Review NextCV's terms and conditions of use for our AI resume builder and career tools platform.",
  robots: "index, follow",
  alternates: {
    canonical: `https://www.nextcv.in/terms`,
  },
};

export default function TermsPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions",
    url: "https://www.nextcv.in/terms",
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

  const sections = [
    { id: "agreement", title: "1. Agreement & Acceptance" },
    { id: "services", title: "2. Platform Services & User Responsibilities" },
    { id: "ai-limitations", title: "3. AI Generation & Accuracy Disclaimer" },
    { id: "public-sharing", title: "4. Public Sharing & Privacy Controls" },
    { id: "transactions", title: "5. Pricing, Transactions & Digital Deliveries" },
    { id: "refunds", title: "6. Cancellation & Refund Policy" },
    { id: "privacy-data", title: "7. Data Protection & Privacy Rights" },
    { id: "indemnity", title: "8. Indemnity & Limitation of Liability" },
    { id: "jurisdiction", title: "9. Governing Law & Jurisdiction" },
    { id: "contact", title: "10. Contact & Operator Details" },
  ];

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
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[28%] -top-20 h-112.5 w-150 rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
        </div>

        {/* Hero Header */}
        <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto border-b border-slate-100 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Scale className="w-4 h-4 text-indigo-600" />
              Legal Transparency & Fair Terms
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight">
              Terms & Conditions
            </h1>

            <p className="text-xs sm:text-sm text-[#365184] max-w-xl mx-auto">
              Last Updated: March 2026. Electronic record governed under the Information Technology Act, 2000 and applicable Indian laws.
            </p>
          </div>
        </section>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Sticky Navigation */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4 shadow-xs">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-2">
                  Table of Contents
                </span>
                <nav className="space-y-1.5 text-xs font-medium">
                  {sections.map(sec => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <Link
                    href="/privacy-policy"
                    className="block text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    View Privacy Policy →
                  </Link>
                  <PrivacyPreferencesButton className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 cursor-pointer transition-colors" />
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              {/* Introduction Card */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <p>
                  This electronic record is generated by a computer system and does not require any physical or digital signatures. It is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
                </p>
                <p>
                  The platform <strong className="text-slate-900">NextCV.in</strong> is owned and operated by its founders, located at:
                </p>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-700 shadow-xs">
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>NextCV Operating Address:</strong>
                    <br />
                    Village Arth, Post Office Jalag, Tehsil Jaisinghpur, District Kangra, Himachal Pradesh, 176094, India.
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section id="agreement" className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">1. Agreement & Acceptance of Terms</h2>
                <p>
                  By creating an account, building a resume, or using NextCV services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="services" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">2. Platform Services & User Responsibilities</h2>
                <ul className="space-y-2 list-disc pl-5 text-slate-700 text-xs sm:text-sm">
                  <li>
                    <strong>Truthful Representation:</strong> You are solely responsible for the authenticity, accuracy, and truthfulness of all qualifications, employment records, grades, and technical skills entered in your resume or portfolio. NextCV does not verify external credentials.
                  </li>
                  <li>
                    <strong>Lawful Usage:</strong> You agree not to upload defamatory, fraudulent, infringing, or malicious content, nor use NextCV to generate deceptive job application materials.
                  </li>
                  <li>
                    <strong>Account Integrity:</strong> You are responsible for maintaining the confidentiality of your Google authentication credentials and all actions taken under your account.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="ai-limitations" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">3. AI-Generated Content & Accuracy Disclaimer</h2>
                <p className="text-xs sm:text-sm">
                  NextCV integrates automated artificial intelligence tools to suggest bullet points, summaries, and cover letter drafts. You acknowledge and agree that:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-slate-700 text-xs sm:text-sm">
                  <li>AI recommendations are assistive drafting suggestions and may occasionally contain inaccuracies or exaggerated wording.</li>
                  <li>You must review, verify, and personalize all AI-generated drafts prior to submitting them to prospective employers.</li>
                  <li>NextCV provides no guarantee that an AI-generated resume or cover letter will pass any particular corporate ATS or result in job interviews or employment offers.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="public-sharing" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">4. Public Sharing & Privacy Controls</h2>
                <p className="text-xs sm:text-sm">
                  When you explicitly choose to generate a public resume link (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5">/r/[slug]</code>) or portfolio (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5">/p/[slug]</code>), you understand that anyone with access to that URL can view the rendered content.
                </p>
                <p className="text-xs sm:text-sm">
                  You retain full control to pause public sharing at any time via the modal in your dashboard, displaying a private notice to subsequent visitors, or to permanently delete the share link from NextCV servers.
                </p>
              </section>

              {/* Section 5 */}
              <section id="transactions" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">5. Pricing, Transactions & Digital Deliveries</h2>
                <p className="text-xs sm:text-sm">
                  NextCV operates on a transparent, <strong>one-time payment model per resume template</strong> (Basic ₹49, Standard ₹99, Premium ₹199, Elite ₹399). There are no hidden recurring monthly subscriptions. All prices are denominated in Indian Rupees (INR) and processed via authorized payment aggregators (e.g. Razorpay).
                </p>
              </section>

              {/* Section 6 */}
              <section id="refunds" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">6. Cancellation & Refund Policy</h2>
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-900 text-xs sm:text-sm space-y-2">
                  <p className="font-bold">Digital Products & Immediate Service Delivery:</p>
                  <p>
                    Because resume documents, AI generations, and high-resolution PDF download links are provisioned and delivered immediately upon successful transaction verification, <strong>payments are non-refundable once download access has been unlocked</strong>.
                  </p>
                  <p>
                    If an amount was debited from your account due to a payment gateway error without generating an unlocked download, please write to <a href="mailto:help@nextcv.in" className="underline font-semibold">help@nextcv.in</a> with your transaction ID for prompt reconciliation.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="privacy-data" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">7. Data Protection & Privacy Rights</h2>
                <p className="text-xs sm:text-sm">
                  We process personal data strictly in compliance with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 and our detailed <Link href="/privacy-policy" className="text-indigo-600 underline font-medium">Privacy Policy</Link>.
                </p>
                <p className="text-xs sm:text-sm">
                  General usage of NextCV does not constitute blanket consent to optional advertising or session replay tracking. You can manage your analytics choices at any time using our <PrivacyPreferencesButton className="text-indigo-600 underline cursor-pointer" />.
                </p>
              </section>

              {/* Section 8 */}
              <section id="indemnity" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">8. Indemnity & Limitation of Liability</h2>
                <p className="text-xs sm:text-sm">
                  To the maximum extent permitted under applicable Indian law, NextCV and its operators shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use the platform, hiring rejections, or recruitment decisions made by third-party recruiters.
                </p>
              </section>

              {/* Section 9 */}
              <section id="jurisdiction" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">9. Governing Law & Dispute Resolution</h2>
                <p className="text-xs sm:text-sm">
                  These Terms shall be governed by and interpreted in accordance with the laws of India. Any legal dispute, controversy, or claim arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in Jaisinghpur, District Kangra, Himachal Pradesh, India.
                </p>
              </section>

              {/* Section 10 */}
              <section id="contact" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">10. Contact & Operator Details</h2>
                <p className="text-xs sm:text-sm">
                  If you have inquiries, feedback, or legal questions concerning these Terms, please contact our support team at <a href="mailto:help@nextcv.in" className="font-mono text-indigo-600 font-medium">help@nextcv.in</a> or visit our <Link href="/contact" className="text-indigo-600 underline font-medium">Contact Page</Link>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
