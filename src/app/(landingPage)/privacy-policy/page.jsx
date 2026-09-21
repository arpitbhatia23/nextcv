import Link from "next/link";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - NextCV",
  description:
    "Read NextCV's privacy policy to understand how we collect, use, and protect your personal data.",
  robots: "index, follow",
  alternates: {
    canonical: `https://www.nextcv.in/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://www.nextcv.in/privacy-policy",
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
    { id: "collection", title: "1. Data Collection" },
    { id: "usage", title: "2. How We Use Data" },
    { id: "sharing", title: "3. Information Sharing" },
    { id: "security", title: "4. Data Security" },
    { id: "deletion", title: "5. Account Deletion" },
    { id: "rights", title: "6. Rights & Consent" },
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
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
        </div>

        {/* Hero Header */}
        <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto border-b border-slate-100 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Data Protection Guaranteed
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-xs sm:text-sm text-[#365184] max-w-xl mx-auto">
              Your trust is our priority. Learn how NextCV handles, protects, and respects your resume data.
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
                  Navigation
                </span>
                <nav className="space-y-2 text-xs font-medium">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
              {/* Intro Card */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <p>
                  This Privacy Policy describes how <strong className="text-slate-900">NEXTCV</strong> and its operators collect, use, share, and protect your personal information when you use our website and AI resume builder services.
                </p>
                <p>
                  By accessing NextCV, providing your information, or creating a resume, you consent to the practices described in this Privacy Policy and applicable laws of India.
                </p>
              </div>

              {/* Section 1 */}
              <section id="collection" className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">1. Collection of Information</h2>
                <p>
                  We collect personal data that you voluntarily provide when creating your account or building a resume, including your full name, email address, contact number, educational history, work experience, and technical skills.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Fraud Prevention Warning:</strong> NEXTCV will never ask for your credit card PIN, CVV, or banking OTP over email or phone. Please report any suspicious contact immediately.
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="usage" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">2. Use of Information</h2>
                <ul className="space-y-2 list-disc pl-5 text-slate-700">
                  <li>To render resume templates and process AI content suggestions via Gemini AI.</li>
                  <li>To provide downloadable high-resolution PDF documents.</li>
                  <li>To enhance user experience and resolve technical support requests.</li>
                  <li>To detect security breaches, prevent fraud, and enforce platform terms.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="sharing" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">3. Sharing & Third-Party Disclosures</h2>
                <p>
                  We do not sell your personal resume data to third-party advertisers. We may share necessary information only with encrypted payment gateways (e.g., Razorpay) to process payments, or with law enforcement agencies if mandated by Indian law.
                </p>
              </section>

              {/* Section 4 */}
              <section id="security" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">4. Security Measures</h2>
                <p>
                  We deploy industry-standard SSL encryption and secured cloud servers to protect your document data against unauthorized access, loss, or alteration. Access to personal data is restricted to authorized personnel only.
                </p>
              </section>

              {/* Section 5 */}
              <section id="deletion" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">5. Account & Data Deletion</h2>
                <p>
                  You retain complete ownership of your data. You may delete your account and stored resume drafts at any time through your account settings or by submitting a deletion request to support.
                </p>
              </section>

              {/* Section 6 */}
              <section id="rights" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">6. Your Rights & Consent Withdrawal</h2>
                <p>
                  You have the right to access, update, or request rectifications to your personal data. You may withdraw your consent at any time by emailing us with the subject:
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-indigo-700 font-semibold">
                  Subject: Withdrawal of consent for processing personal data
                </div>
                <p>
                  Send requests to <span className="font-mono text-indigo-600 font-medium">help@nextcv.in</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
