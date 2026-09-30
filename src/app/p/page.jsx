import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Crown,
  Eye,
  Globe,
  LayoutTemplate,
  Link2,
  Rocket,
  Share2,
  Sparkles,
  Smartphone,
  UserRound,
} from "lucide-react";
import PublicPortfolioViewer from "@/modules/portfolio/components/PublicPortfolioViewer";

export const metadata = createSeoMetadata({
  title: "Resume to Portfolio Builder | Create a Professional Online Portfolio | NextCV",
  description:
    "Create your professional resume with NextCV, choose an Elite resume template, complete your payment, and turn your resume into a professional online portfolio you can share with recruiters, employers, and clients.",
  path: "/p",
  keywords: [
    "resume to portfolio",
    "resume to portfolio builder",
    "resume to website",
    "online portfolio maker",
    "professional portfolio website",
    "portfolio website for job seekers",
    "resume portfolio",
    "online resume portfolio",
    "personal portfolio website",
    "job seeker portfolio",
    "professional online portfolio",
    "resume website builder",
    "portfolio maker for job seekers",
    "shareable resume portfolio",
    "NextCV portfolio",
  ],
});

export default function PortfolioLandingPage() {
  const sampleCandidate = {
    name: "Aarav Sharma",
    jobRole: "Product & Growth Strategist",
    email: "aarav.sharma@example.com",
    phone_no: "+91 98765 43210",
    address: "Bengaluru, Karnataka, India",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    portfolio: "https://nextcv.in",

    summary:
      "Results-driven professional with 4+ years of cross-functional experience scaling digital products, optimizing growth funnels, and managing cross-disciplinary engineering and marketing teams. Proven record in increasing retention by 38% and driving revenue growth.",

    skills: [
      { name: "Product Strategy", level: "Expert" },
      { name: "Data Analytics & SQL", level: "Advanced" },
      { name: "Agile Project Management", level: "Expert" },
      { name: "User Research & UX", level: "Advanced" },
      { name: "Growth Marketing", level: "Expert" },
      { name: "Stakeholder Management", level: "Expert" },
      { name: "Financial Modeling", level: "Intermediate" },
      { name: "Python Basics", level: "Intermediate" },
    ],

    experience: [
      {
        position: "Senior Growth & Product Lead",
        companyName: "HyperGrowth Digital",
        startDate: "2023-01-01",
        endDate: "Present",
        description: [
          "Led a 12-person cross-functional squad across engineering, marketing, and design to launch 4 core product modules.",
          "Increased monthly active users by 42% through data-driven onboarding experiments and user segmentation.",
          "Spearheaded executive reporting directly to C-suite stakeholders with weekly KPI dashboards and financial unit economics.",
        ],
      },
      {
        position: "Associate Product Specialist",
        companyName: "Nexus Solutions Ltd",
        startDate: "2021-06-01",
        endDate: "2022-12-31",
        description: [
          "Managed end-to-end user research interviews with 50+ enterprise clients to define quarterly product feature roadmaps.",
          "Implemented automated feedback tracking reducing customer support escalation volume by 25%.",
        ],
      },
    ],

    projects: [
      {
        title: "OmniChannel Customer Onboarding Revamp",
        roleOrType: "Lead Project Manager",
        organization: "HyperGrowth Digital",
        date: "2024-03-01",
        technologiesOrTopics: "Figma, SQL, Mixpanel, A/B Testing",
        link: "https://nextcv.in",
        description: [
          "Redesigned customer onboarding experience reducing time-to-value from 14 minutes down to 3.5 minutes.",
          "Resulted in a 28% uplift in first-week feature adoption among 15,000+ new signups.",
        ],
      },
      {
        title: "Market Expansion Feasibility Study",
        roleOrType: "Market Researcher",
        organization: "Nexus Solutions",
        date: "2022-08-01",
        technologiesOrTopics: "Market Sizing, Competitor Analysis, ROI Modeling",
        link: "https://nextcv.in",
        description: [
          "Analyzed expansion opportunity in tier-2 Indian metros, delivering strategic go-to-market plan approved by leadership.",
        ],
      },
    ],

    education: [
      {
        degree: "Bachelor of Business Administration (BBA) & Analytics",
        institution: "Delhi University",
        startYear: "2017",
        endYear: "2021",
        grade: "8.8 / 10 CGPA",
        description: [
          "Dean's List for Academic Excellence",
          "President of University Entrepreneurship Cell",
        ],
      },
    ],

    certificates: [
      {
        title: "Certified Scrum Product Owner (CSPO)",
        organization: "Scrum Alliance",
        year: "2023",
        credentialUrl: "https://scrumalliance.org",
      },
      {
        title: "Advanced Growth & Product Analytics",
        organization: "Reforge",
        year: "2022",
        credentialUrl: "https://reforge.com",
      },
    ],
  };

  const steps = [
    {
      number: "01",
      icon: UserRound,
      title: "Create Your Resume",
      description:
        "Start by creating your professional resume with NextCV. Add your personal information, professional summary, work experience, education, skills, projects, certifications, and other relevant achievements.",
    },
    {
      number: "02",
      icon: LayoutTemplate,
      title: "Choose an Elite Template",
      description:
        "Select an Elite resume template designed to present your information with a polished and professional layout. Your selected template becomes the foundation of your resume and portfolio experience.",
    },
    {
      number: "03",
      icon: Crown,
      title: "Complete Your Payment",
      description:
        "After selecting your Elite template, complete the required one-time payment. Once your payment is confirmed, your portfolio generation becomes available.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Generate & Share Your Portfolio",
      description:
        "Your resume information is transformed into a professional online portfolio. Review your profile, then share your portfolio link with recruiters, employers, clients, or professional contacts.",
    },
  ];

  const portfolioBenefits = [
    "Turn your existing resume information into a structured online portfolio.",
    "Give recruiters a single link to explore your professional background.",
    "Showcase work experience, projects, skills, education, and certifications.",
    "Make your professional profile accessible from mobile and desktop devices.",
    "Use your portfolio link on LinkedIn, email signatures, applications, and recruiter conversations.",
    "Keep your resume and portfolio information connected instead of maintaining two completely separate profiles.",
  ];

  const useCases = [
    {
      title: "Software Developers",
      description:
        "Showcase technical skills, projects, GitHub links, work experience, education, and certifications in one professional online profile.",
    },
    {
      title: "Students & Freshers",
      description:
        "Create a stronger professional presence by combining your resume, projects, education, skills, internships, and certifications.",
    },
    {
      title: "Designers",
      description:
        "Present your professional background alongside projects, experience, skills, and relevant links in an easy-to-share portfolio format.",
    },
    {
      title: "Marketing Professionals",
      description:
        "Highlight campaigns, growth experience, achievements, skills, certifications, and professional experience in one shareable profile.",
    },
    {
      title: "Business & Finance Professionals",
      description:
        "Present your experience, qualifications, projects, analytical skills, certifications, and career achievements in an organized format.",
    },
    {
      title: "Experienced Professionals",
      description:
        "Create a centralized professional profile that provides more context than a traditional one- or two-page resume.",
    },
  ];

  const faqs = [
    {
      question: "What is a resume to portfolio builder?",
      answer:
        "A resume to portfolio builder converts the information from your professional resume into an online portfolio that can be viewed through a web link. Instead of sending only a PDF document, you can provide recruiters and employers with an interactive web profile containing your professional summary, experience, skills, projects, education, certifications, and relevant links.",
    },
    {
      question: "How does the NextCV resume to portfolio process work?",
      answer:
        "The process starts with creating your resume on NextCV. You then select an Elite template and complete the required payment. After payment confirmation, your portfolio can be generated using the information already available in your resume. You can then review your portfolio and share its link with recruiters, employers, clients, or professional contacts.",
    },
    {
      question: "Do I need to create my portfolio separately?",
      answer:
        "The purpose of the NextCV workflow is to reduce duplicate work. Your portfolio is generated from the professional information you have already entered while creating your resume, so you do not have to manually recreate every section of your professional profile from scratch.",
    },
    {
      question: "Can I share my portfolio with recruiters?",
      answer:
        "Yes. Once your portfolio has been generated and published, you can share its link through channels such as LinkedIn, email, WhatsApp recruiter conversations, job applications, and your professional profiles.",
    },
    {
      question: "Is the portfolio the same as a PDF resume?",
      answer:
        "No. A PDF resume is a document designed for downloading, reading, printing, and application systems. An online portfolio is a web page that can provide a broader and more interactive presentation of your professional information. They serve related but different purposes.",
    },
    {
      question: "Who should create an online portfolio?",
      answer:
        "Online portfolios can be useful for developers, designers, marketers, analysts, product professionals, business professionals, students, freshers, freelancers, and experienced candidates. The value depends on the candidate's profession, experience, projects, and how much additional context they want recruiters to see.",
    },
    {
      question: "Can freshers create a portfolio?",
      answer:
        "Yes. A fresher portfolio can focus on education, academic projects, personal projects, internships, certifications, technical skills, achievements, and career interests. You do not need several years of professional experience to create a useful online professional profile.",
    },
    {
      question: "Where can I share my portfolio link?",
      answer:
        "You can use your portfolio link in places where a professional web profile is useful, including LinkedIn, email signatures, recruiter messages, job applications, professional networking conversations, and other online profiles.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.10),transparent_35%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.08),transparent_30%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Resume → Professional Online Portfolio
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
              Turn Your Resume Into a{" "}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Professional Online Portfolio
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Create your resume with NextCV, choose an Elite template, complete your payment, and
              generate a professional portfolio from the information you have already entered. Share
              one simple portfolio link with recruiters, employers, clients, and professional
              contacts.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Create Your Resume
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                See How It Works
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Create your resume first. Portfolio generation is available after selecting an Elite
              template and completing payment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY RESUME + PORTFOLIO
      ========================================================== */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              More Than a Resume
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Your Resume Gets You Noticed. Your Portfolio Adds Context.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              A traditional resume is useful for applications, but it has limited space. An online
              portfolio gives you another way to present your professional information through a
              shareable web profile.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Globe className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold text-slate-950">A Professional Web Presence</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Instead of sending only a static document, give people a dedicated online page where
                they can explore your professional background.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Share2 className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold text-slate-950">One Link to Share</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Use one portfolio URL when communicating with recruiters, employers, clients,
                networking contacts, or hiring teams.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Smartphone className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold text-slate-950">Accessible Anywhere</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your professional profile can be accessed through a web browser on phones, tablets,
                and desktop computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Simple Four-Step Process
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              How to Create Your Resume Portfolio With NextCV
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              You do not need to build a separate website from scratch. Start with your resume and
              move through the NextCV workflow step by step.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {steps.map(step => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="text-xs font-bold tracking-widest text-indigo-600">
                        STEP {step.number}
                      </div>

                      <h3 className="mt-1 text-xl font-bold text-slate-950">{step.title}</h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

              <p className="text-sm leading-7 text-indigo-950">
                <strong>The key advantage:</strong> your resume information becomes the foundation
                of your portfolio. You do not have to manually rebuild your education, experience,
                skills, projects, and certifications on a separate portfolio website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DETAILED PROCESS
      ========================================================== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              From Resume Creation to a Shareable Portfolio
            </h2>

            <p>
              Building a professional online portfolio can feel like a completely separate project
              from creating a resume. You normally have to choose a website builder, create pages,
              enter your professional information again, format sections, add links, and maintain
              the website separately.
            </p>

            <p>
              NextCV is designed around a simpler workflow. You first create your professional
              resume, choose an Elite template, complete the payment, and then use the information
              already present in your resume to generate your online portfolio.
            </p>

            <h3>Create Your Resume First</h3>

            <p>
              The first step is to create a complete professional resume on NextCV. Add the
              information that represents your career background, including your name, professional
              title, summary, experience, education, skills, projects, certifications, and relevant
              professional links.
            </p>

            <p>
              For students and freshers, this can include academic projects, internships,
              coursework, certifications, achievements, and technical or professional skills. For
              experienced professionals, the resume can focus more heavily on employment history,
              measurable achievements, projects, leadership responsibilities, and specialized
              expertise.
            </p>

            <h3>Choose an Elite Resume Template</h3>

            <p>
              After building your resume, select an Elite template that fits the type of
              professional profile you want to present. A template controls the visual structure of
              your resume and establishes a consistent design language for your professional
              materials.
            </p>

            <p>
              Choosing a professional template is important because the design should support
              readability rather than compete with your information. Your work experience, skills,
              projects, and achievements should remain easy to understand.
            </p>

            <h3>Complete Your Payment</h3>

            <p>
              Portfolio generation is part of the paid Elite workflow. After selecting your Elite
              template, complete the required payment. Once the payment has been successfully
              confirmed, the portfolio generation functionality becomes available.
            </p>

            <p>
              This creates a straightforward product journey: create your resume, select your
              preferred premium design, complete payment, and then generate your professional
              portfolio without starting over on another platform.
            </p>

            <h3>Generate Your Online Portfolio</h3>

            <p>
              Once your payment is confirmed, NextCV can use the professional information already
              present in your resume as the foundation for your portfolio. This can include your
              professional summary, employment history, skills, projects, education, certifications,
              and relevant external links.
            </p>

            <p>
              The result is an online professional profile designed to be viewed through a web
              browser. Instead of asking a recruiter to download another document, you can provide a
              direct portfolio link.
            </p>

            <h3>Share Your Portfolio Link</h3>

            <p>
              Your portfolio becomes particularly useful when it is easy to share. You can place the
              link on your LinkedIn profile, send it to recruiters through professional messages,
              add it to an email signature, include it in relevant applications, or share it
              directly with employers and clients.
            </p>

            <p>
              The objective is not to replace the resume in every situation. Instead, the online
              portfolio and resume can work together. The resume provides a concise document for
              applications, while the portfolio provides a web-based view of your professional
              background.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Why Create a Portfolio?
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Give Your Professional Story More Room
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                A resume has limited space. A portfolio can provide a dedicated web experience where
                recruiters and professional contacts can explore more of your background.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {portfolioBenefits.map(benefit => (
                <div
                  key={benefit}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                  <span className="text-sm leading-6 text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHO IT IS FOR
      ========================================================== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Built for Different Careers
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Who Can Use a Professional Online Portfolio?
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              A portfolio is not limited to designers or developers. Different professionals can use
              an online profile to present their career information in a more accessible format.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map(item => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LIVE DEMO
      ========================================================== */}
      <section id="live-demo" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
              <Eye className="h-4 w-4" />
              Interactive Portfolio Preview
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              See What Your Online Portfolio Can Look Like
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Explore this example portfolio to see how professional information such as experience,
              skills, projects, education, and certifications can be presented online.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl">
            <PublicPortfolioViewer resume={sampleCandidate} slug="sample-portfolio" />
          </div>
        </div>
      </section>

      {/* =========================================================
          PORTFOLIO VS RESUME
      ========================================================== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Online Portfolio vs. Traditional Resume
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              These two formats are complementary rather than identical.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-100 text-sm font-bold text-slate-900">
              <div className="p-4">Feature</div>
              <div className="border-l border-slate-200 p-4">Resume</div>
              <div className="border-l border-slate-200 p-4">Online Portfolio</div>
            </div>

            {[
              ["Primary format", "Document", "Web page"],
              ["Easy to share", "As a file", "As a link"],
              ["Professional information", "Concise", "More room for context"],
              ["Projects", "Brief descriptions", "Dedicated presentation"],
              ["Accessibility", "Requires file access", "Accessible through browser"],
            ].map(([feature, resume, portfolio]) => (
              <div
                key={feature}
                className="grid grid-cols-3 border-b border-slate-200 last:border-b-0"
              >
                <div className="p-4 text-sm font-semibold text-slate-800">{feature}</div>

                <div className="border-l border-slate-200 p-4 text-sm text-slate-600">{resume}</div>

                <div className="border-l border-slate-200 p-4 text-sm text-slate-600">
                  {portfolio}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Resume to Portfolio Questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-slate-900">
                  {faq.question}

                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition group-open:rotate-180" />
                </summary>

                <p className="mt-4 pr-8 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <Link2 className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start With Your Resume. End With a Professional Portfolio.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Create your resume with NextCV, choose an Elite template, complete your payment, and
            generate a professional online portfolio that you can share through one simple link.
          </p>

          <div className="mt-8">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              Create Your Resume & Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
