import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Code,
  Megaphone,
  TrendingUp,
  Users,
  GraduationCap,
} from "lucide-react";

export const metadata = {
  title: "Resume Examples for Every Industry | NextCV India",
  description:
    "Browse professionally written resume examples for Engineering, Marketing, Sales, and more. Get inspired and build your own winning CV.",
  keywords:
    "resume examples, cv samples, software engineer resume, marketing resume sample, sales resume format, fresher resume examples india",
};

const categories = [
  {
    id: "tech",
    name: "Technology & Engineering",
    icon: Code,
    color: "bg-blue-100 text-blue-600",
    roles: [
      "Software Engineer",
      "Data Scientist",
      "Product Manager",
      "DevOps Engineer",
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Creative",
    icon: Megaphone,
    color: "bg-pink-100 text-pink-600",
    roles: [
      "Digital Marketer",
      "Content Writer",
      "Graphic Designer",
      "Social Media Manager",
    ],
  },
  {
    id: "business",
    name: "Business & Management",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-600",
    roles: [
      "Business Analyst",
      "Project Manager",
      "Sales Executive",
      "HR Manager",
    ],
  },
  {
    id: "fresher",
    name: "Students & Freshers",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600",
    roles: [
      "Computer Science Graduate",
      "MBA Intern",
      "B.Com Fresher",
      "Engineering Intern",
    ],
  },
];

export default function ExamplesPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Examples",
    url: "https://www.nextcv.in/examples",
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
      <main className="bg-slate-50 text-slate-900 font-sans">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-8 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Resume Examples for{" "}
              <span className="text-indigo-600">Every Career Path</span>
            </h1>
            <p className="text-lg leading-8 text-slate-600 mb-10">
              Stuck on what to write? Browse our library of ATS-optimized resume
              examples tailored for the Indian job market to find inspiration
              for your next role.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/resume/new"
                className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all flex items-center"
              >
                Create Your Resume <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-indigo-100 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center mb-6`}
                >
                  <cat.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {cat.name}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.roles.map((role) => (
                    <li key={role}>
                      <Link
                        href={`/dashboard/resume/new?role=${encodeURIComponent(role)}`}
                        className="flex items-center text-slate-600 hover:text-indigo-600 group transition-colors p-2 rounded-md hover:bg-slate-50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 mr-2 transition-colors"></span>
                        {role}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don't just copy. Create.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Found an example you like? Use our AI writer to create a
              personalized version for your unique experience in seconds.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/resume/new"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-24 px-6 lg:px-8 max-w-3xl mx-auto prose prose-slate">
          <h2>How Resume Examples Can Fast-Track Your Job Search</h2>
          <p>
            Writing a resume starting with a blank white page is daunting.
            That's why successful job seekers often start by reviewing **resume
            examples** from their industry. Seeing how others describe similar
            roles, structure their achievements, and list their technical skills
            can provide the necessary blueprint for your own document.
          </p>

          <h3>Tailoring Your Resume to Each Job</h3>
          <p>
            One of the biggest mistakes candidates make is sending the same
            generic resume to every job opening. By looking at role-specific
            examples, you can learn how to:
          </p>
          <ul>
            <li>
              <strong>Prioritize Keywords:</strong> A Marketing Manager resume
              needs different keywords (SEO, ROI, Campaign Strategy) compared to
              a Sales Manager (Revenue Growth, Lead Generation, CRM).
            </li>
            <li>
              <strong>Quantify Achievements:</strong> Notice how great examples
              use numbers. Instead of "Managed a team," a strong example says
              "Led a team of 15 to achieve 20% YoY revenue growth."
            </li>
            <li>
              <strong>Structure for Impact:</strong> Tech roles often put skills
              at the top, while executive roles prioritize professional summary
              and leadership experience.
            </li>
          </ul>

          <h3>Common Resume Mistakes to Avoid</h3>
          <p>
            While examples are great for inspiration, avoid copying them
            word-for-word.
          </p>
          <ul>
            <li>
              <strong>Buzzword Stuffing:</strong> Don't just list every skill
              you find in an example unless you actually possess it.
            </li>
            <li>
              <strong>Formatting Errors:</strong> Make sure the format you
              choose is consistent. Using NextCV ensures your formatting stays
              perfect automatically.
            </li>
            <li>
              <strong>Relevance:</strong> Ensure the example you are following
              matches your experience level. A fresher using a Senior Director's
              resume structure will look out of place.
            </li>
          </ul>

          <h3>Conclusion</h3>
          <p>
            Whether you are a fresher looking for your first break in the IT
            industry or a seasoned marketing professional aiming for a
            leadership role, our collection of resume examples provides the
            guidance you need. Combine these insights with NextCV's AI-powered
            builder to create a resume that truly represents your potential.
          </p>
        </section>
      </main>
    </>
  );
}
