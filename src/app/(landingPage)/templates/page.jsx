import { templates } from "@/utils/template";
import TemplateImage from "../../../components/TemplateImage";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layout,
  Zap,
  Award,
  Edit,
} from "lucide-react";

export const metadata = {
  title: "Professional Resume Templates India | ATS-Friendly CV Formats",
  description:
    "Choose from 12+ professional, ATS-friendly resume templates designed for the Indian job market. Free-to-try, instant download, and recruiter-approved formats.",
  keywords:
    "resume templates, cv formats india, ats resume templates, job resume examples, professional cv designs, modern resume templates, minimal resume builder",
};

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
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Stand Out with Professional{" "}
            <span className="text-indigo-600">Resume Templates</span>
          </h1>
          <p className="text-lg leading-8 text-slate-600 mb-10">
            Don't get lost in the pile. Our ATS-friendly templates are designed
            to help you pass automated screenings and impress hiring managers in
            India and abroad.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard/resume/new"
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

      {/* Templates Grid */}
      <section id="templates" className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-slate-600">
            From creative designs for designers to clean corporate formats for
            executives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
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
                    href={`/dashboard/resume/new?template=${template.key}`}
                    className="block w-full text-center bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-lg hover:bg-indigo-700"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">
                    {template.label}
                  </h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    ATS Optimized
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">
                  Perfect for professionals looking for a clean, structure that
                  highlights experience.
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
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Why NextCV?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              More than just a pretty document
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our templates are engineered to parse correctly by Applicant
              Tracking Systems while looking stunning to human eyes.
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
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto prose prose-slate prose-indigo">
        <h2>
          Why Choosing the Right Resume Template Matters for Your Career in
          India
        </h2>
        <p>
          In today's competitive job market, your resume is often the only
          chance you get to make a first impression. With recruiters spending an
          average of just 6-7 seconds scanning a resume, the visual appeal and
          structure of your document are just as critical as the content itself.
          A well-structured resume template doesn't just look good—it organizes
          your professional story in a way that highlights your strengths
          immediately.
        </p>

        <h3>The Importance of ATS Compatibility</h3>
        <p>
          Over 90% of large companies in India and globally use Applicant
          Tracking Systems (ATS) to filter resumes before a human ever sees
          them. Many fancy, design-heavy templates found online can confuse
          these systems, leading to instant rejection. NextCV templates are
          rigorously tested to ensure:
        </p>
        <ul>
          <li>
            <strong>Text Readability:</strong> No text trapped in images or
            unreadable columns.
          </li>
          <li>
            <strong>Standard Headings:</strong> Clear sections like "Experience"
            and "Education" that bots understand.
          </li>
          <li>
            <strong>Clean Formatting:</strong> Absence of complex graphics or
            tables that break parsing algorithms.
          </li>
        </ul>

        <h3>Types of Templates for Different Career Stages</h3>
        <p>Our collection caters to diverse professional needs:</p>
        <ul>
          <li>
            <strong>The Classic Professional:</strong> Ideal for banking, law,
            and corporate roles where tradition and clarity are valued. These
            templates rely on standard fonts and conservative layouts.
          </li>
          <li>
            <strong>The Modern Tech:</strong> Perfect for software engineers,
            product managers, and startup roles. These feature clean lines,
            skill bars, and a layout that emphasizes technical proficiency.
          </li>
          <li>
            <strong>The Creative Portfolio:</strong> Designed for designers,
            marketers, and content creators who need to show a bit of flair
            without sacrificing readability.
          </li>
          <li>
            <strong>The Executive:</strong> Sophisticated, high-level layouts
            for VPs, Directors, and C-suite candidates that focus on leadership
            and results.
          </li>
        </ul>

        <h3>Why NextCV is the Best Choice for Indian Job Seekers</h3>
        <p>
          Unlike international tools that might not cater to local nuances (like
          including a photo optionally, or specific educational formats), NextCV
          is built with the Indian context in mind. We offer affordable pricing
          (just ₹100 per resume) compared to expensive monthly subscriptions,
          making premium career tools accessible to students and freshers.
        </p>
        <p>
          Whether you are a fresh graduate from an IIT/IIM or an experienced
          professional in Bangalore's tech hub, our templates provide the
          perfect canvas for your career achievements. Stop struggling with Word
          formatting and start applying with confidence today.
        </p>
      </section>
    </main>
  );
}
