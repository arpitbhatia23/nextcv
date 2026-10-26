import { ShieldCheck, AlertTriangle, Eye, Database, Cpu, Globe, Lock, Sliders, RefreshCw, HelpCircle } from "lucide-react";
import Link from "next/link";
import PrivacyPreferencesButton from "@/shared/components/PrivacyPreferencesButton";

export const metadata = {
  title: "Privacy Policy | NextCV – Data Protection & Privacy Notice",
  description:
    "Learn how NextCV collects, processes, and protects your personal data under India's Digital Personal Data Protection (DPDP) Act, 2023 and DPDP Rules, 2025.",
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
    description:
      "Privacy policy and data protection notice for NextCV under the Digital Personal Data Protection (DPDP) Act, 2023.",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
      email: "help@nextcv.in",
    },
  };

  const sections = [
    { id: "overview", title: "1. Overview & Data Fiduciary" },
    { id: "collection", title: "2. Personal Data We Collect" },
    { id: "ai-processing", title: "3. Resume, Portfolios & AI Processing" },
    { id: "service-providers", title: "4. Third-Party Service Providers" },
    { id: "analytics-cookies", title: "5. Analytics, Cookies & Tracking" },
    { id: "sharing-controls", title: "6. Public Links & Pause Controls" },
    { id: "retention-deletion", title: "7. Retention & Account Deletion" },
    { id: "security", title: "8. Data Security & Storage" },
    { id: "user-rights", title: "9. Data Principal Rights & Grievances" },
    { id: "updates", title: "10. Updates to This Policy" },
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Digital Personal Data Protection (DPDP) Compliance
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-xs sm:text-sm text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Last Updated: March 2026. This Privacy Notice explains how NextCV collects, processes, protects, and handles your personal data in accordance with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 and DPDP Rules, 2025.
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

                <div className="pt-4 border-t border-slate-200">
                  <PrivacyPreferencesButton className="w-full justify-center px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 shadow-xs flex items-center gap-2 cursor-pointer transition-colors" />
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12 text-slate-700 text-sm sm:text-base leading-relaxed">
              {/* Intro / Legal Entity */}
              <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <p>
                  This Privacy Policy constitutes a formal notice under Section 5 of the <strong>Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;)</strong> and applicable rules. NextCV (&quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a <strong>Data Fiduciary</strong> regarding the personal data you furnish while using our services.
                </p>
                <p>
                  We are committed to processing your personal data lawfully, transparently, and only for specific, explicit, and legitimate purposes relating to resume creation, AI drafting, portfolio building, and digital downloads.
                </p>
              </div>

              {/* Section 1: Overview & Data Fiduciary */}
              <section id="overview" className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">1. Overview & Data Fiduciary Details</h2>
                <p>
                  The platform <strong className="text-slate-900">NextCV.in</strong> is an online resume-building service operated in India.
                </p>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-1 shadow-xs">
                  <p><strong>Entity Name:</strong> NextCV</p>
                  <p><strong>Primary Contact & Support:</strong> <a href="mailto:help@nextcv.in" className="text-indigo-600 hover:underline">help@nextcv.in</a></p>
                  <p><strong>Registered Address:</strong> Village Arth, Post Office Jalag, Tehsil Jaisinghpur, District Kangra, Himachal Pradesh, 176094, India.</p>
                  <p><strong>Grievance Officer:</strong> Grievance Redressal Officer, NextCV (Contact: <a href="mailto:help@nextcv.in?subject=DPDP%20Grievance" className="text-indigo-600 hover:underline">help@nextcv.in</a>)</p>
                </div>
              </section>

              {/* Section 2: Personal Data We Collect */}
              <section id="collection" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">2. Personal Data We Collect & Grounds for Processing</h2>
                <p>
                  Under the DPDP Act, personal data is processed either on the basis of your explicit consent (Section 6) or for certain legitimate uses as recognized by law (Section 7). We collect:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Database className="w-4 h-4 text-indigo-600" /> Account & Profile Information
                    </h3>
                    <p className="text-slate-600">
                      When signing in via Google NextAuth or email registration: your name, email address, profile avatar, and account authentication identifiers.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Purpose: User authentication, session management, and dashboard access.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-600" /> Resume & Career Content
                    </h3>
                    <p className="text-slate-600">
                      Contact details (phone number, physical city/address), educational background, employment history, project descriptions, skills, certifications, and LinkedIn/GitHub URLs.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Purpose: Template formatting, PDF generation, and cover-letter tailoring.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600" /> Uploaded Documents & Parsing
                    </h3>
                    <p className="text-slate-600">
                      Files you upload (.pdf or .docx up to 5 MB) for parsing into the resume editor or AI cover letter generator.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Purpose: Temporary text extraction; uploaded raw files are parsed and not retained longer than necessary.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-indigo-600" /> Transaction & Payment Records
                    </h3>
                    <p className="text-slate-600">
                      Razorpay order ID, payment ID, transaction amounts, timestamps, and coupon codes used.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Purpose: Statutory accounting, fraud prevention, and template download access.</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Payment Safety Notice:</strong> NextCV never collects, stores, or sees your bank account passwords, UPI PINs, credit/debit card numbers, or CVVs. All monetary transactions are processed directly by RBI-licensed payment aggregators (Razorpay).
                  </div>
                </div>
              </section>

              {/* Section 3: Resume, Portfolios & AI Processing */}
              <section id="ai-processing" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">3. Resume Data, Online Portfolios & AI Processing</h2>
                <p>
                  NextCV utilizes artificial intelligence (including Google Gemini AI and Groq Llama models) to help draft summaries, optimize bullet points, and generate personalized cover letters.
                </p>
                <ul className="space-y-2 list-disc pl-5 text-slate-700 text-xs sm:text-sm">
                  <li>
                    <strong>User-Initiated Only:</strong> AI generation operates strictly when you request assistance (e.g. clicking &quot;Improve with AI&quot; or &quot;Generate Cover Letter&quot;).
                  </li>
                  <li>
                    <strong>No Public Model Training:</strong> Your private resume drafts and personal documents are processed via enterprise API endpoints and are not utilized to train public foundational AI models.
                  </li>
                  <li>
                    <strong>Human Review Required:</strong> AI output is a draft. You maintain sole responsibility for reviewing and verifying the accuracy of all qualifications and claims prior to submitting resumes to employers.
                  </li>
                </ul>
              </section>

              {/* Section 4: Third-Party Service Providers */}
              <section id="service-providers" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">4. Third-Party Service Providers (Data Processors)</h2>
                <p>
                  To deliver secure web services, we engage trusted third-party technology providers under strict data-protection and confidentiality obligations:
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Provider</th>
                        <th className="p-3.5">Role / Purpose</th>
                        <th className="p-3.5">Data Shared</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3.5 font-medium text-slate-900">MongoDB Atlas</td>
                        <td className="p-3.5">Encrypted Database Hosting</td>
                        <td className="p-3.5">User accounts, saved resumes, cover letter drafts</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-slate-900">Google Cloud / NextAuth</td>
                        <td className="p-3.5">OAuth Sign-in & Authentication</td>
                        <td className="p-3.5">Email address, verified profile name, avatar</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-slate-900">Razorpay (India)</td>
                        <td className="p-3.5">Payment Gateway & Invoicing</td>
                        <td className="p-3.5">Order amount, email, phone (for invoice delivery)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-slate-900">Google Gemini & Groq</td>
                        <td className="p-3.5">AI Text & Bullet Suggestion API</td>
                        <td className="p-3.5">Role description, skills, bullet prompt text</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-slate-900">PostHog, GA4, Clarity</td>
                        <td className="p-3.5">Optional Product Analytics (Consented)</td>
                        <td className="p-3.5">Aggregated interaction events, device type, traffic sources</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 5: Analytics, Cookies & Tracking */}
              <section id="analytics-cookies" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">5. Optional Analytics, Cookies & Tracking Consent</h2>
                <p>
                  NextCV employs an explicit, opt-in consent model for optional analytics tools in compliance with DPDP principles:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="font-semibold text-slate-900">Default Non-Tracking State</h3>
                    <p className="mt-1 text-slate-600">
                      When you first visit NextCV, optional analytics scripts (PostHog, Google Analytics 4, and Microsoft Clarity) remain <strong>completely disabled</strong>. No optional cookies or tracking beacons are stored until you make an affirmative choice.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="font-semibold text-slate-900">Scope of Optional Tools</h3>
                    <ul className="mt-2 space-y-1.5 list-disc pl-5 text-slate-600">
                      <li><strong>PostHog:</strong> Evaluates funnel completion rates and product usability. Input fields are masked, and session tracking does not record passwords or raw credit card data.</li>
                      <li><strong>Google Analytics 4 (GA4):</strong> Aggregates page view statistics and visitor acquisition channels with IP anonymization active.</li>
                      <li><strong>Microsoft Clarity:</strong> Provides aggregated click heatmaps and session replay with full input masking to ensure sensitive resume text is not stored in heatmaps.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-indigo-950">Manage or Withdraw Your Consent</h3>
                      <p className="text-xs text-indigo-800">
                        You can modify your analytics choices or withdraw consent at any time without impacting your resume editing or account access.
                      </p>
                    </div>
                    <PrivacyPreferencesButton className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors" />
                  </div>
                </div>
              </section>

              {/* Section 6: Public Links & Pause Controls */}
              <section id="sharing-controls" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">6. Public Resume & Portfolio Sharing Controls</h2>
                <p>
                  NextCV offers optional public sharing links for your resume (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5">/r/[slug]</code>) and online portfolio (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5">/p/[slug]</code>).
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p>
                    <strong>Explicit Generation:</strong> Public links are never generated automatically. A shareable link is created only when you explicitly click &quot;Generate Share Link&quot; or &quot;Generate Portfolio&quot;.
                  </p>
                  <p>
                    <strong>Pause Public Access:</strong> You can pause public access at any moment by clicking &quot;Pause Sharing&quot; in the share modal. While paused, visitors to your link see a private status notice rather than your profile.
                  </p>
                  <p>
                    <strong>Delete Public Link:</strong> You can permanently delete the share record. Deleting the link removes the public slug from our servers immediately.
                  </p>
                </div>
              </section>

              {/* Section 7: Retention & Account Deletion */}
              <section id="retention-deletion" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">7. Data Retention & Account Deletion (Erasure)</h2>
                <div className="space-y-3 text-xs sm:text-sm">
                  <p>
                    <strong>Retention Period:</strong> We retain your resume drafts and account profile for as long as your account remains active so you can update and re-download resumes in the future. Financial transaction logs are preserved for the statutory period mandated under Indian tax and accounting regulations.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="font-semibold text-slate-900">Current vs. Planned Deletion Features:</h3>
                    <ul className="mt-2 space-y-1.5 list-disc pl-5 text-slate-600">
                      <li><strong>Individual Resume Deletion (Implemented):</strong> You can delete any saved resume draft or cover letter draft at any time directly from your dashboard via the delete button.</li>
                      <li><strong>Public Link Revocation (Implemented):</strong> You can pause or delete public resume links and portfolio URLs at any time.</li>
                      <li><strong>Full Account Deletion (Planned / Available on Request):</strong> Automated one-click account deletion is currently being finalized in the dashboard. In the interim, you may exercise your statutory right to erasure under the DPDP Act by emailing <a href="mailto:help@nextcv.in?subject=Account%20Deletion%20Request" className="text-indigo-600 underline font-medium">help@nextcv.in</a> with the subject <em>&quot;Account Deletion Request&quot;</em>. Requests are verified and processed within 30 days.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 8: Data Security & Storage */}
              <section id="security" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">8. Data Security & Technical Measures</h2>
                <p className="text-xs sm:text-sm">
                  We deploy industry-grade security protocols, including HTTPS (TLS 1.3) encryption in transit, isolated database environments with access-control logging, and stateless AI API integrations. While we maintain rigorous technical controls, no internet transmission is 100% impenetrable; we recommend safeguarding your Google/NextCV login credentials.
                </p>
              </section>

              {/* Section 9: Data Principal Rights & Grievance Redressal */}
              <section id="user-rights" className="space-y-4 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">9. Data Principal Rights & Grievance Redressal</h2>
                <p className="text-xs sm:text-sm">
                  Under the DPDP Act, 2023, you are recognized as a <strong>Data Principal</strong> and possess specific statutory rights:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                    <p className="font-semibold text-slate-900">Right to Access Information</p>
                    <p className="mt-1 text-slate-600 text-xs">Request a summary of personal data being processed and identities of processors.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                    <p className="font-semibold text-slate-900">Right to Correction & Erasure</p>
                    <p className="mt-1 text-slate-600 text-xs">Correct outdated data, update inaccurate qualifications, or request complete erasure.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                    <p className="font-semibold text-slate-900">Right of Grievance Redressal</p>
                    <p className="mt-1 text-slate-600 text-xs">File complaints with our designated Grievance Officer and receive timely resolution.</p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                    <p className="font-semibold text-slate-900">Right to Nominate</p>
                    <p className="mt-1 text-slate-600 text-xs">Nominate another individual to exercise your rights in the event of death or incapacity.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <p className="font-semibold text-slate-900">Grievance Redressal Mechanism:</p>
                  <p className="text-slate-600">
                    If you have any grievance regarding the processing of your personal data or wish to exercise any statutory right, please submit a communication to:
                  </p>
                  <p className="font-mono text-indigo-700 font-medium">
                    Grievance Officer, NextCV — Email: <a href="mailto:help@nextcv.in?subject=Grievance%20Redressal" className="underline">help@nextcv.in</a>
                  </p>
                  <p className="text-slate-500 text-xs">
                    We will acknowledge your grievance and endeavor to resolve it expeditiously within the timeframes prescribed under the DPDP Rules. If your grievance is not resolved satisfactorily, you may approach the Data Protection Board of India in accordance with applicable rules and notifications.
                  </p>
                </div>
              </section>

              {/* Section 10: Updates */}
              <section id="updates" className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-[#071644]">10. Updates to This Policy</h2>
                <p className="text-xs sm:text-sm">
                  We may periodically revise this Privacy Policy to reflect evolving technical features, commencement notifications, or regulatory guidelines issued under the DPDP Act. When changes occur, the &quot;Last Updated&quot; date at the top of this notice will be amended. Continued usage of NextCV after publication of updates constitutes acknowledgment of the revised policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
