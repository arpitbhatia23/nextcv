import os
import re

pages_data = [
    {
        "path": "/templates",
        "title": "Resume Format India 2026: ATS Templates for Freshers | NextCV",
        "description": "Explore ATS-friendly resume formats for Indian freshers. Choose templates for IT, BCA, B.Tech, MBA, TCS, Infosys, Wipro and more."
    },
    {
        "path": "/tcs-resume-format-for-freshers",
        "title": "TCS Resume Format for Freshers 2026 | ATS-Friendly Template",
        "description": "Build an ATS-friendly TCS resume format for freshers. Use ready-made templates for TCS NQT, BCA, B.Tech, IT and fresher job applications."
    },
    {
        "path": "/infosys-resume-format-for-freshers",
        "title": "Infosys Resume Format for Freshers 2026 | ATS-Friendly Template",
        "description": "Create an ATS-friendly Infosys resume format for freshers. Use clean templates for BCA, B.Tech, IT and non-IT fresher applications."
    },
    {
        "path": "/ats-resume-checker",
        "title": "Free ATS Resume Checker India 2026 | Check Resume Score Online",
        "description": "Check your resume ATS score online for free. Find missing skills, formatting issues and ATS problems before applying to TCS, Infosys, Wipro and more."
    },
    {
        "path": "/ats-friendly-resume-format-india",
        "title": "ATS Friendly Resume Format India 2026 | Freshers Guide",
        "description": "Learn the best ATS-friendly resume format for Indian freshers. See structure, skills, projects and formatting tips to pass resume screening systems."
    },
    {
        "path": "/resume-format-india",
        "title": "Best Resume Format in India 2026 | Free Templates & Examples",
        "description": "Find the best resume format in India for freshers and job seekers. Explore ATS-friendly templates, examples, sections and formatting tips."
    },
    {
        "path": "/best-resume-format-for-freshers-india-2026",
        "title": "Best Resume Format for Freshers in India 2026 | NextCV",
        "description": "See the best resume format for Indian freshers in 2026 with ATS-friendly sections, examples, skills, projects and free resume templates."
    },
    {
        "path": "/fresher-resume-format-india",
        "title": "Fresher Resume Format India 2026 | Free ATS Templates",
        "description": "Create an ATS-friendly fresher resume for Indian jobs. Best format for BCA, B.Tech, MBA, commerce, IT and non-IT freshers."
    },
    {
        "path": "/wipro-resume-format-for-freshers",
        "title": "Wipro Resume Format for Freshers 2026 | ATS-Friendly Template",
        "description": "Create an ATS-friendly Wipro resume format for freshers with clean sections for skills, projects, education and certifications."
    },
    {
        "path": "/accenture-resume-format-for-freshers",
        "title": "Accenture Resume Format for Freshers 2026 | ATS Approved",
        "description": "Build an ATS-friendly Accenture resume format for freshers with professional sections for skills, projects, education and certifications."
    },
    {
        "path": "/tech-mahindra-resume-format",
        "title": "Tech Mahindra Resume Format for Freshers 2026 | NextCV",
        "description": "Create an ATS-friendly Tech Mahindra resume format for freshers applying to IT, support, analyst and trainee roles."
    },
    {
        "path": "/hcl-resume-format-for-freshers",
        "title": "HCL Resume Format for Freshers 2026 | NextCV",
        "description": "Build an ATS-friendly HCL resume format for freshers with clean resume sections for skills, education, projects and certifications."
    },
    {
        "path": "/resume-for-mnc-company",
        "title": "Resume for MNC Company 2026 | ATS-Friendly Format for Freshers",
        "description": "Learn how to build a resume for MNC companies like TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini and HCL."
    },
    {
        "path": "/pricing",
        "title": "Resume Price in India 2026 | Free vs Paid Resume Builders",
        "description": "Compare resume builder pricing in India. Understand free resume tools, paid ATS templates, PDF downloads and NextCV resume pricing."
    },
    {
        "path": "/resume-builder-price-in-india",
        "title": "Resume Builder Price in India 2026 | Cost & Value Guide",
        "description": "Understand resume builder cost in India, free vs paid resume options, ATS resume pricing and when a paid template is worth it."
    },
    {
        "path": "/resume-vs-cv-in-india",
        "title": "Resume vs CV in India 2026 | Difference, Meaning & Examples",
        "description": "Understand the difference between resume and CV in India. Learn which one freshers should use for jobs, internships and campus placements."
    },
    {
        "path": "/best-ai-resume-builder-india",
        "title": "Best AI Resume Builder India 2026 | Free vs Paid Comparison",
        "description": "Compare the best AI resume builders in India for freshers. See features, ATS support, pricing, templates and resume download options."
    },
    {
        "path": "/best-resume-builder-india-2026",
        "title": "Best Resume Builder in India 2026 | Free for Freshers",
        "description": "Find the best resume builder in India for freshers. Create ATS-friendly resumes with templates, AI writing help and PDF download options."
    },
    {
        "path": "/ai-writer",
        "title": "AI Resume Writer India | Generate Resume Points with AI",
        "description": "Use NextCV AI Resume Writer to generate professional resume points, summaries, skills and project descriptions for Indian fresher jobs."
    },
    {
        "path": "/examples",
        "title": "Resume Examples for Every Industry | NextCV India",
        "description": "Explore resume examples for IT, non-IT, BCA, B.Tech, MBA, commerce, freshers and experienced job seekers in India."
    },
    {
        "path": "/blogs",
        "title": "ATS Resume Templates & Career Guides India 2026 | NextCV",
        "description": "Read resume writing guides, ATS tips, career advice and template resources for Indian freshers and job seekers."
    },
    {
        "path": "/career-objective-for-resume-for-freshers",
        "title": "Career Objective for Resume for Freshers | Examples 2026",
        "description": "Find the best career objective examples for fresher resumes in India, including IT, BCA, B.Tech, MBA, commerce and non-IT roles."
    },
    {
        "path": "/how-to-make-resume-ats-friendly-2026",
        "title": "How to Make Your Resume ATS Friendly in 2026 | NextCV",
        "description": "Learn how to make your resume ATS-friendly with the right format, keywords, sections, file type and common mistakes to avoid."
    },
    {
        "path": "/ats-resume-best-practices",
        "title": "ATS Resume Best Practices 2026 | Get Past Resume Bots",
        "description": "Follow ATS resume best practices for 2026, including formatting, keywords, headings, file type, skills and resume structure."
    },
    {
        "path": "/ats-friendly-resume-meaning",
        "title": "ATS Friendly Resume Meaning Explained | 2026 Guide",
        "description": "Understand what an ATS-friendly resume means, why companies use ATS systems and how freshers can create resumes that pass screening."
    },
    {
        "path": "/ats-resume-optimization",
        "title": "ATS Resume Optimization 2026 | Keywords & Formatting Guide",
        "description": "Optimize your resume for ATS systems with better keywords, clean formatting, correct sections and job-specific resume improvements."
    },
    {
        "path": "/ats-friendly-resume-checklist",
        "title": "ATS Friendly Resume Checklist 2026 | NextCV",
        "description": "Use this ATS-friendly resume checklist to fix formatting, keywords, sections, file type and common mistakes before applying for jobs."
    },
    {
        "path": "/ats-friendly-resume-tips",
        "title": "ATS Friendly Resume Tips 2026 | 10 Practical Fixes",
        "description": "Improve your resume with practical ATS-friendly resume tips for formatting, keywords, skills, projects and fresher job applications."
    },
    {
        "path": "/common-ats-resume-mistakes",
        "title": "Common ATS Resume Mistakes | 7 Fixes for 2026",
        "description": "Avoid common ATS resume mistakes like tables, graphics, missing keywords, wrong file type, poor headings and unreadable formatting."
    },
    {
        "path": "/what-is-ats-friendly-resume",
        "title": "What Is an ATS Friendly Resume? Complete Guide 2026",
        "description": "Learn what an ATS-friendly resume is, how ATS software reads resumes and how to create a resume that passes automated screening."
    },
    {
        "path": "/latest-resume-format-2026",
        "title": "Latest Resume Format 2026 | Trends, Examples & Templates",
        "description": "Explore the latest resume format for 2026 with ATS-friendly structure, modern sections, examples and free resume templates."
    },
    {
        "path": "/resume-format-for-bca-freshers",
        "title": "Resume Format for BCA Freshers | ATS-Friendly Templates",
        "description": "Create a professional BCA fresher resume with ATS-friendly format, skills, projects, education, certifications and template examples."
    },
    {
        "path": "/resume-format-for-mca-freshers",
        "title": "Resume Format for MCA Freshers 2026 | ATS Templates",
        "description": "Build an ATS-friendly MCA fresher resume with clean sections for technical skills, projects, education, internships and certifications."
    },
    {
        "path": "/best-resume-format-for-it-jobs-in-india-2026",
        "title": "Best Resume Format for IT Jobs in India 2026 | Tech Guide",
        "description": "Learn the best resume format for IT jobs in India with ATS-friendly sections for skills, projects, experience, education and certifications."
    },
    {
        "path": "/non-it-resume-for-freshers",
        "title": "Non-IT Resume for Freshers | BCom, BBA, BA Templates",
        "description": "Create a non-IT fresher resume for BCom, BBA, BA, sales, support, HR, operations and business roles with ATS-friendly templates."
    },
    {
        "path": "/indian-resume-format",
        "title": "Indian Resume Format 2026 | Professional Templates",
        "description": "Explore professional Indian resume formats with ATS-friendly sections, examples and templates for freshers and job seekers."
    },
    {
        "path": "/cv-format-for-ai-screening",
        "title": "CV Format for AI Screening 2026 | Pass Resume Bots",
        "description": "Create a CV format that works with AI screening systems using clean structure, readable sections, keywords and ATS-friendly formatting."
    },
    {
        "path": "/free-resume-builder-no-payment",
        "title": "Free Resume Builder Without Payment | PDF Download Guide 2026",
        "description": "Learn how to create a resume online without payment and compare free resume builders, paid templates and PDF download options."
    },
    {
        "path": "/about-us",
        "title": "About NextCV | AI Resume Builder for Freshers in India",
        "description": "Learn about NextCV, an AI-powered ATS resume builder helping Indian freshers create professional resumes for job applications."
    },
    {
        "path": "/contact",
        "title": "Contact NextCV | Resume Support & Enquiries",
        "description": "Contact NextCV for resume builder support, account questions, payment help, template issues and general enquiries."
    },
    {
        "path": "/privacy-policy",
        "title": "Privacy Policy | NextCV",
        "description": "Read the NextCV privacy policy to understand how we collect, use, store and protect user information on our resume builder platform."
    },
    {
        "path": "/terms",
        "title": "Terms and Conditions | NextCV",
        "description": "Read the NextCV terms and conditions for using the resume builder, templates, payments, downloads and related services."
    }
]

# We also need to add the homepage manually
pages_data.append({
    "path": "",
    "title": "Free ATS Resume Builder for Indian Freshers 2026 | NextCV",
    "description": "Create an ATS-friendly resume for Indian fresher jobs in minutes. Choose templates for TCS, Infosys, Wipro and more. Start free, download from ₹49."
})

import glob

base_dir = r"f:\nextcv\src\app\(landingPage)"

for page in pages_data:
    if page["path"] == "":
        file_path = os.path.join(base_dir, "page.jsx")
        if not os.path.exists(file_path):
            file_path = os.path.join(base_dir, "page.js")
    else:
        file_path = os.path.join(base_dir, page["path"].strip("/"), "page.jsx")
        if not os.path.exists(file_path):
            file_path = os.path.join(base_dir, page["path"].strip("/"), "page.js")
    
    if not os.path.exists(file_path):
        print(f"Page not found: {file_path}")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    import_statement = 'import { createSeoMetadata } from "@/shared/utils/seo";\n'
    
    # Check if createSeoMetadata is already imported
    if "createSeoMetadata" not in content:
        # insert it after other imports
        import_match = re.search(r"import .*?;\n", content)
        if import_match:
            content = content[:import_match.end()] + import_statement + content[import_match.end():]
        else:
            content = import_statement + content

    metadata_str = f"""export const metadata = createSeoMetadata({{
  title: "{page['title']}",
  description: "{page['description']}",
  path: "{page['path']}",
}});
"""

    # remove old export const metadata
    if "export const metadata" in content:
        # Regex to match export const metadata = { ... };
        content = re.sub(r"export const metadata = \{[^}]*\};", metadata_str, content, flags=re.MULTILINE|re.DOTALL)
    else:
        # insert it before export default function
        content = content.replace("export default function", metadata_str + "\nexport default function")
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        print(f"Updated {file_path}")

