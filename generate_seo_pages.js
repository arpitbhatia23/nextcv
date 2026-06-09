const fs = require("fs");
const path = require("path");

const plan1Path = path.join(__dirname, "seo_content_plan.json");
const plan2Path = path.join(__dirname, "seo_content_plan_2.json");
const targetDir = path.join(__dirname, "src", "app", "(landingPage)");

if (!fs.existsSync(plan1Path) || !fs.existsSync(plan2Path)) {
  console.error("One or both seo_content_plan files not found!");
  process.exit(1);
}

const plan1 = JSON.parse(fs.readFileSync(plan1Path, "utf8"));
const plan2 = JSON.parse(fs.readFileSync(plan2Path, "utf8"));
const plan = [...plan1, ...plan2];

// Helper to convert outline H2/H3 into engaging HTML structure
function generateContentFromOutline(outline) {
  let content = "";
  let inSection = false;

  outline.forEach((item, idx) => {
    if (item.startsWith("H1:")) {
      // Handled in hero
    } else if (item.startsWith("H2:")) {
      if (inSection) {
        content += `</div></section>\n`;
      }
      inSection = true;
      const isEven = idx % 2 === 0;
      content += `
          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full ${isEven ? "bg-indigo-500" : "bg-emerald-500"}"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="${isEven ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"} p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              ${item.replace("H2:", "").trim()}
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>${item.replace("H2:", "").trim()}</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      `;
    } else if (item.startsWith("H3:")) {
      content += `
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  ${item.replace("H3:", "").trim()}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing ${item.replace("H3:", "").trim().toLowerCase()} strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      `;
    }
  });

  if (inSection) {
    content += `</div></section>\n`;
  }

  return content;
}

plan.forEach(page => {
  const pageDir = path.join(targetDir, page.slug);

  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  // Generate FAQ schema
  const faqs = page.faqs || [];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const internalLinksUI =
    page.internalLinks && page.internalLinks.length > 0
      ? `
          <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              Related Resources
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 relative z-10">
              ${page.internalLinks
                .map(
                  link => `<li>
                <Link href="${link}" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">${link.replace("/", "").replace(/-/g, " ") || "Home"}</span>
                </Link>
              </li>`
                )
                .join("\n              ")}
            </ul>
          </section>`
      : "";

  const faqsUI = faqs
    .map(
      faq => `
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  ${faq.question}
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  ${faq.answer}
                </p>
              </div>`
    )
    .join("\n");

  const h1Text =
    page.outline
      .find(o => o.startsWith("H1:"))
      ?.replace("H1:", "")
      .trim() || page.title;

  const jsxContent = `import React from "react";
import Link from "next/link";
import { FileText, Download, Star, Zap, CheckCircle2, ArrowRight, BookOpen, Award, Layout } from "lucide-react";

export const metadata = {
  title: ${JSON.stringify(page.seoTitle)},
  description: ${JSON.stringify(page.metaDescription)},
  keywords: ${JSON.stringify([page.primaryKeyword, ...page.secondaryKeywords])},
  alternates: {
    canonical: \`https://www.nextcv.in/${page.slug}\`,
  },
};

export const revalidate = 86400;

export default function SEOPage() {
  const jsonLdSchema = ${JSON.stringify(faqSchema, null, 2)};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-200">
        
        {/* Dynamic Hero Section with Gradients & Illustration placeholder */}
        <section className="relative bg-white pt-32 pb-24 overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white opacity-80"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 border border-indigo-100 shadow-sm">
                <Award className="w-4 h-4" />
                Expert Career Guide
              </div>
              <h1 className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
                ${h1Text}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mb-10 leading-relaxed max-w-2xl">
                ${page.metaDescription}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Create Free Resume
                </Link>
              </div>
            </div>
            
            {/* Hero Graphic / Abstract UI element */}
            <div className="hidden lg:flex relative justify-center items-center">
              <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-indigo-200/50 via-purple-200/50 to-emerald-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-white/50 backdrop-blur-sm w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Layout className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-slate-200 rounded-full mb-2"></div>
                    <div className="h-3 w-24 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-100 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded-full"></div>
                  <div className="h-4 w-4/6 bg-slate-100 rounded-full"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 -ml-4"></div>
                  </div>
                  <div className="h-8 w-24 bg-indigo-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-indigo-600">
              {/* Generated Outline Content */}
              ${generateContentFromOutline(page.outline)}
            </div>

            {/* FAQs */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full z-0"></div>
              <h2 className="text-lg  mb-8 text-slate-900 relative z-10 flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 relative z-10">
                ${faqsUI}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-8">
              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                  <Zap className="w-48 h-48" />
                </div>
                <h3 className="text-lg font-bold mb-4 relative z-10">Build an ATS-Friendly Resume in 5 Mins</h3>
                <p className="text-indigo-100 mb-6 text-sm leading-relaxed relative z-10">
                  Stop worrying about formatting. Use our AI builder to automatically pass HR screening and get hired faster.
                </p>
                <Link 
                  href="/"
                  className="block w-full text-center bg-white text-indigo-700 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm relative z-10"
                >
                  Start Building Now
                </Link>
              </div>

              {/* Internal Links Sidebar */}
              ${internalLinksUI}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
`;

  fs.writeFileSync(path.join(pageDir, "page.jsx"), jsxContent, "utf8");
  console.log("Generated engaging page: " + page.slug);
});

console.log("All 30 pages successfully upgraded to new UI!");
