import Link from "next/link";
import { Scale, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - NextCV",
  description: "Review NextCV's terms and conditions of use for our AI resume builder platform.",
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
    { id: "services", title: "2. Use of Services & Platform" },
    { id: "transactions", title: "3. Transactions & Charges" },
    { id: "refunds", title: "4. Cancellation & Refund Policy" },
    { id: "indemnity", title: "5. Indemnity & Liability" },
    { id: "jurisdiction", title: "6. Legal Jurisdiction" },
    { id: "contact", title: "7. Contact Information" },
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Scale className="w-4 h-4 text-indigo-600" />
              Legal Transparency
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight">
              Terms & Conditions
            </h1>

            <p className="text-xs sm:text-sm text-[#365184] max-w-xl mx-auto">
              Last Updated: 2026. Governed under the Information Technology Act, 2000.
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
              {/* Introduction Card */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <p>
                  This document is an electronic record in terms of the Information Technology Act, 2000 and rules thereunder as applicable, and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.
                </p>
                <p>
                  The Platform is owned by <strong className="text-slate-900">NEXTCV</strong>, with its registered office located at:
                </p>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-700 shadow-xs">
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>NEXTCV Registered Address:</strong>
                    <br />
                    Village Arth, Post Office Jalag, Tehsil Jaisinghpur, District Kangra, Himachal Pradesh, 176094, India.
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section id="agreement" className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">1. Agreement & Acceptance</h2>
                <p>
                  Accessing, browsing, or otherwise using the NextCV platform (including mobile web or subdomains) indicates your explicit agreement to all the terms and conditions in this agreement. These terms may be revised from time to time without prior individual notice.
                </p>
              </section>

              {/* Section 2 */}
              <section id="services" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">2. Use of Services & Platform</h2>
                <ul className="space-y-2 list-disc pl-5 text-slate-700">
                  <li>You agree to provide accurate and truthful information when building your resume.</li>
                  <li>Use of the Platform and services is entirely at your own risk.</li>
                  <li>No warranty is provided regarding exact placement outcomes or external ATS screening guarantees.</li>
                  <li>The structure, code, graphics, and branding are proprietary intellectual property.</li>
                  <li>You must not use the Platform for unlawful, fraudulent, or forbidden purposes.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="transactions" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">3. Transactions & Charges</h2>
                <p>
                  Initiating a payment transaction on NextCV constitutes a legally binding purchase contract. All charges are displayed transparently before payment processing via authorized payment gateways (UPI, Cards, NetBanking).
                </p>
              </section>

              {/* Section 4 */}
              <section id="refunds" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">4. Cancellation & Refund Policy</h2>
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-900 text-xs sm:text-sm space-y-2">
                  <p className="font-bold">Important Notice regarding Digital Downloads:</p>
                  <p>
                    Because digital resume documents and AI processing are delivered immediately upon payment, <strong>NextCV does not offer cancellation or refunds once a download or generation process is complete</strong>.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="indemnity" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">5. Indemnity & Liability</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless NextCV, its founders, and affiliates against any third-party claims, liabilities, damages, or costs arising from your violation of these terms or misuse of the platform.
                </p>
              </section>

              {/* Section 6 */}
              <section id="jurisdiction" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">6. Governing Law & Jurisdiction</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. All disputes arising out of or in connection with this agreement shall be subject to the exclusive jurisdiction of the competent courts in Jaisinghpur, Himachal Pradesh.
                </p>
              </section>

              {/* Section 7 */}
              <section id="contact" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">7. Contact & Operator Details</h2>
                <p>
                  This website is operated by <strong className="text-slate-900">ARPIT SO SH RAJESH KUMAR</strong>.
                </p>
                <p>
                  For any legal inquiries or concerns regarding these terms, please reach out via our{" "}
                  <Link href="/contact" className="text-indigo-600 hover:underline font-medium">
                    Contact Support Page
                  </Link>{" "}
                  or email <span className="font-mono text-indigo-600 font-medium">help@nextcv.in</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
