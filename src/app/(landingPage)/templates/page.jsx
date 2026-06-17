import Link from "next/link";
import { ArrowRight, CheckCircle2, Layout, Zap, Award, Edit } from "lucide-react";
import TemplateImage from "@/shared/components/TemplateImage";
import { templatesMetadata } from "@/shared/utils/template-metadata";
export const metadata = {
  title: "Best Resume Format for Freshers in India 2026 | ATS Templates",
  description:
    "Explore ATS-friendly resume formats for freshers in India 2026. Choose professional resume templates for TCS, Infosys, Wipro, HCL, and Indian job applications.",
  keywords:
    "best resume format for freshers in india with example, tcs resume builder format, accenture infographic resume builder, ltimindtree resume format, free ats-optimized resume template india, it resume sample india 2026, resume maker for engineering freshers india, cv format for indian internships 2026",
  alternates: {
    canonical: `https://www.nextcv.in/templates`,
  },
};

export const revalidate = 3600;
const templates = templatesMetadata;
export default function TemplatesPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Templates",
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
  return (
    <main className="bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors-indigo-100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-100 bg-indigo-50 mb-6">
            <Layout className="w-4 h-4 mr-2" />
            Recruiter Approved Formats
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight  mb-6">
            Best Resume Format for <br />
            <span className="text-indigo-600">Freshers in India 2026</span>
          </h1>
          <p className="text-sm leading-8 text-slate-600 mb-10">
            Don't get lost in the pile. Use our{" "}
            <strong>free ATS-optimized resume template India</strong>
            designed to help you pass automated screenings and impress hiring managers in the 2026
            hiring season.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all flex items-center"
            >
              Build Your Resume Now <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="#templates"
              className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600 transition-colors"
            >
              Browse Design <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Comparison Section */}
      <section className="py-12 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-indigo-50 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Which Resume Template is Right for You?
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    ATS Resume Format
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Freshers, IT jobs, MNCs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    Professional Resume Format
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Experienced candidates</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    Fresher Resume Format
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">First job, campus placement</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    Single-column Template
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">ATS screening</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">Modern Template</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Design/creative roles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Explore Our Collection</h2>
          <p className="text-slate-600">
            From creative designs for designers to clean corporate formats for executives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(template => (
            <div
              key={template.key}
              className="group relative rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="aspect-210/297 bg-slate-100 relative overflow-hidden p-6 flex items-center justify-center">
                {/* Placeholder for template preview if image fails or isn't perfect */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10" />

                {/* Replaced Next Image with a visual div if image is missing, but assuming images work based on context */}
                <div className="relative w-full h-full shadow-lg transform group-hover:scale-105 transition-transform duration-500 origin-top">
                  <TemplateImage
                    src={template.image}
                    alt={`${template.label} Resume Template`}
                    className="w-full h-full object-cover object-top rounded-md"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <Link
                    href={`/dashboard/builder`}
                    className="block w-full text-center bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-lg hover:bg-indigo-700"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">{template.label}</h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    ATS Optimized
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">
                  Perfect for professionals looking for a clean, structure that highlights
                  experience.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Block */}
      <section className="bg-white py-24 sm:py-32 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Why NextCV?</h2>
            <p className="mt-2 text-sm  tracking-tight text-slate-900 sm:text-4xl">
              More than just a pretty document
            </p>
            <p className="mt-6 text-sm leading-8 text-slate-600">
              Our templates are engineered to parse correctly by Applicant Tracking Systems while
              looking stunning to human eyes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                {
                  name: "ATS Friendly",
                  description:
                    "We use standard fonts, correct headings, and clean code to ensure your resume is readable by bots.",
                  icon: CheckCircle2,
                },
                {
                  name: "Instant Customization",
                  description:
                    "Change colors, fonts, and layout densities with a single click inside our editor.",
                  icon: Edit,
                },
                {
                  name: "Industry Standards",
                  description:
                    "Layouts approved by HR professionals from top MNCs and startups in India.",
                  icon: Award,
                },
                {
                  name: "Fast Generation",
                  description:
                    "Create a complete resume in under 5 minutes using our AI-powered content suggestions.",
                  icon: Zap,
                },
              ].map(feature => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto prose prose-slate prose-indigo">
        <h2>Best Resume Format for Freshers in India 2026</h2>
        <p>
          In today's competitive job market, your resume is often the only chance you get to make a
          first impression. The best resume format for freshers in India 2026 is the
          reverse-chronological, single-column format. Recruiters at top Indian MNCs spend an
          average of just 6-7 seconds scanning a resume. A well-structured resume template organizes
          your education, technical skills, and projects in a way that highlights your strengths
          immediately. Using an{" "}
          <Link
            href="/blogs/best-resume-maker-for-freshers-in-india-inr100-only-no-subscription"
            className="text-indigo-600 hover:underline"
          >
            affordable resume builder with no monthly subscriptions
          </Link>{" "}
          is the easiest way to get started.
        </p>

        <h2>ATS-Friendly Resume Templates for Indian Jobs</h2>
        <p>
          Over 90% of large companies in India and globally use Applicant Tracking Systems (ATS) to
          filter resumes before a human ever sees them. Many fancy, design-heavy templates found
          online can confuse these systems, leading to instant rejection. NextCV templates are
          rigorously tested to ensure:
        </p>
        <ul>
          <li>
            <strong>Text Readability:</strong> No text trapped in images or unreadable columns.
          </li>
          <li>
            <strong>Standard Headings:</strong> Clear sections like "Experience" and "Education"
            that bots understand.
          </li>
          <li>
            <strong>Clean Formatting:</strong> Absence of complex graphics or tables that break
            parsing algorithms.
          </li>
        </ul>

        <h2>Professional Resume Format India 2026</h2>
        <p>
          For experienced candidates, a professional resume format is vital. It focuses on career
          progression, leadership, and quantified achievements. Whether you're in banking, law, or
          corporate management, these templates rely on standard fonts and conservative layouts to
          project authority and competence.
        </p>

        <h2>Resume Templates for TCS, Infosys, Wipro & HCL</h2>
        <p>
          Indian IT giants like <strong>TCS, Infosys, Wipro, and HCL</strong> have specific
          screening criteria. They look for clear mentions of your technical stack (Java, Python,
          React), academic percentages, and final year projects. Our customized ATS-friendly
          templates are designed specifically to pass through the screening systems of these mass
          recruiters during campus placements and off-campus drives.
        </p>

        <h2>Single-Column vs Modern Resume Templates</h2>
        <p>
          Not sure which layout to pick?
          <strong>Single-column templates</strong> are the safest bet for engineering and IT roles
          because they have a 100% success rate with ATS parsers.
          <strong>Modern, multi-column templates</strong> are better suited for designers,
          marketers, and creative roles where you need to show a bit of flair and visual hierarchy,
          provided you apply directly via email or networking.
        </p>

        <h2>Which Resume Template Should Freshers Use?</h2>
        <p>
          If you are a fresher aiming for campus placements or entry-level corporate jobs, stick to
          the
          <strong>ATS-Friendly Fresher Format</strong>. It places your Education and Projects at the
          top, proving your competence even without formal work experience. Stop struggling with
          Word formatting and start applying with the{" "}
          <Link
            href="/blogs/best-resume-maker-for-freshers-in-india-inr100-only-no-subscription"
            className="text-indigo-600 hover:underline"
          >
            best resume maker for freshers in India
          </Link>{" "}
          today!
        </p>
      </section>
    </main>
  );
}
