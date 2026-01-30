import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Wand2,
  RefreshCcw,
} from "lucide-react";

export const metadata = {
  title: "AI Resume Writer | Generate CV Points with AI",
  description:
    "Beat writer's block with our AI resume writer. Generate professional summaries and experience bullet points instantly personalized for your role.",
  keywords:
    "ai resume writer, free ai cv maker, chatgpt for resume, automated resume writing, resume bullet points generator",
};

export default function AIWriterPage() {
  return (
    <main className="bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-10 md:right-32 w-72 h-72 bg-purple-200 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 md:left-32 w-72 h-72 bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="relative mx-auto max-w-3xl text-center z-10">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-purple-600 ring-1 ring-inset ring-purple-100 bg-purple-50 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Write Your Resume <br />{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
              at the Speed of AI
            </span>
          </h1>
          <p className="text-lg leading-8 text-slate-600 mb-10">
            Stop staring at a blank cursor. Let our intelligent AI write
            professional summaries and impactful bullet points for you in
            seconds.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard/resume/new"
              className="rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 hover:scale-105 transition-all flex items-center"
            >
              Try AI Writer Now <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo / How it works */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-indigo-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Enter Your Job Title
                  </h3>
                  <p className="text-slate-600">
                    Simply tell the AI what role you want to apply for (e.g.,
                    "Software Engineer").
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Detailed Suggestions
                  </h3>
                  <p className="text-slate-600">
                    Our AI analyzes thousands of successful resumes to generate
                    relevant skills and achievements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-pink-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">One-Click Add</h3>
                  <p className="text-slate-600">
                    Review the suggestions and add them to your resume with a
                    single click. Edit as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Representation of AI Generation */}
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-slate-900">
                  NextCV AI Assistant
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <Wand2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-sm text-indigo-900 mb-2 font-medium">
                    Suggestion:
                  </p>
                  <p className="text-sm text-slate-700">
                    "Developed scalable REST APIs using Node.js and Express,
                    reducing server response time by 40%."
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-indigo-900 mb-2 font-medium">
                    Suggestion:
                  </p>
                  <p className="text-sm text-slate-700">
                    "Collaborated with cross-functional teams to deploy
                    microservices architecture on AWS."
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                <RefreshCcw className="w-4 h-4" /> Generate More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-6 lg:px-8 max-w-3xl mx-auto prose prose-slate prose-indigo">
        <h2>Why Use an AI Resume Writer?</h2>
        <p>
          Writer's block is real. Staring at a blank screen wondering how to
          phrase "I answered calls" into a professional achievement can be
          paralyzing. An <strong>AI Resume Writer</strong> solves this by acting
          as your personal career coach.
        </p>

        <h3>Professional Summaries in Seconds</h3>
        <p>
          The summary section is the first thing recruiters read. It needs to be
          punchy, relevant, and keyword-rich. Instead of spending hours crafting
          the perfect 3 sentences, let NextCV AI analyze your job title and
          generate a compelling professional summary that highlights your years
          of experience and key strengths.
        </p>

        <h3>Optimizing for Keywords</h3>
        <p>
          Applicant Tracking Systems look for specific keywords in your resume.
          If you are applying for a "Project Manager" role, your resume needs
          words like "Agile," "Budget Management," and "Stakeholder
          Communication." Our AI is trained on thousands of job descriptions to
          understand exactly what keywords correspond to your target role,
          ensuring you don't miss out on these critical terms.
        </p>

        <h3>Improving Grammar and Tone</h3>
        <p>
          Even small grammatical errors can lead to rejection. AI helps maintain
          a consistent, professional tone throughout your document. It ensures
          you use strong action verbs (like "Spearheaded," "Orchestrated,"
          "Delivered") instead of passive language, making your contributions
          sound more impactful.
        </p>

        <h3>Is AI Cheating?</h3>
        <p>
          Absolutely not. AI is a tool to help you articulate <em>your</em>{" "}
          actual experiences better. You still control the content. You select
          the suggestions that match your history and edit them to reflect the
          truth. It simply does the heavy lifting of phrasing and formatting,
          allowing you to focus on the substance of your career.
        </p>
      </section>
    </main>
  );
}
