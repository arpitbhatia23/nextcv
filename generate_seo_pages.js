const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/app/(landingPage)');

const pages = [
  {
    path: 'templates',
    title: 'Resume Format India 2026: ATS Templates for Freshers | NextCV',
    description: 'Explore ATS-friendly resume formats for Indian freshers. Choose templates for IT, BCA, B.Tech, MBA, TCS, Infosys, Wipro and more.',
    h1: 'Best Resume Format for Freshers in India (2026)',
    sections: ['Best Resume Format for Freshers in India', 'ATS-Friendly Resume Templates', 'Resume Format for IT Freshers', 'Resume Format for BCA and B.Tech Students', 'Single Column ATS Resume Templates', 'Company Resume Formats'],
    faqs: [
      { q: 'Which is the best resume format for freshers in India?', a: 'The reverse-chronological format is generally the best for freshers, prioritizing education and projects.' },
      { q: 'Are these templates ATS-friendly?', a: 'Yes, all our templates are designed to be easily readable by Applicant Tracking Systems.' },
      { q: 'Can I download the resume for free?', a: 'You can create your resume for free, and download it starting from ₹49.' },
      { q: 'Do these templates work for IT jobs?', a: 'Absolutely, we have specialized templates highlighting technical skills and projects ideal for IT freshers.' }
    ]
  },
  {
    path: 'tcs-resume-format-for-freshers',
    title: 'TCS Resume Format for Freshers 2026 | ATS-Friendly Template',
    description: 'Build an ATS-friendly TCS resume format for freshers. Use ready-made resume templates for TCS NQT, BCA, B.Tech, IT and fresher job applications.',
    h1: 'TCS Resume Format for Freshers (2026)',
    sections: ['Best TCS Resume Format for Freshers', 'TCS NQT Resume Format', 'What to Include in a TCS Fresher Resume', 'TCS Resume Format for BCA and B.Tech Students', 'Skills to Add in TCS Resume', 'Project Examples for TCS Resume', 'TCS Resume Mistakes to Avoid'],
    faqs: [
      { q: 'How to make a resume for TCS freshers?', a: 'Use a simple, ATS-friendly template focusing on education, programming skills, and relevant projects.' },
      { q: 'Is TCS resume format different from others?', a: 'TCS often looks for specific technical proficiencies and problem-solving skills, so highlighting these is key.' },
      { q: 'What should I write in TCS NQT resume?', a: 'Include your NQT score prominently, along with academic achievements and technical skills.' },
      { q: 'Does TCS use ATS?', a: 'Yes, TCS receives thousands of applications and uses ATS to filter resumes, making ATS-friendliness crucial.' }
    ]
  },
  {
    path: 'infosys-resume-format-for-freshers',
    title: 'Infosys Resume Format for Freshers 2026 | ATS-Friendly Template',
    description: 'Create an ATS-friendly Infosys resume format for freshers. Use ready-made resume templates for BCA, B.Tech, IT and non-IT freshers applying to Infosys jobs.',
    h1: 'Infosys Resume Format for Freshers (2026)',
    sections: ['Best Infosys Resume Format for Freshers', 'What to Include in an Infosys Fresher Resume', 'Infosys Resume Format for BCA and B.Tech Students', 'Skills to Add in Infosys Resume', 'Project Examples for Infosys Resume', 'Common Mistakes in Infosys Resume'],
    faqs: [
      { q: 'What is the best resume format for Infosys?', a: 'A clear, structured format highlighting technical skills, internships, and relevant projects.' },
      { q: 'Can BCA students apply for Infosys?', a: 'Yes, Infosys frequently hires BCA graduates for various technical roles.' },
      { q: 'Should I add a photo to my Infosys resume?', a: 'It is generally not required and often advised against to ensure ATS compatibility.' },
      { q: 'How to clear Infosys ATS screening?', a: 'Use relevant keywords from the job description and maintain a clean, single-column format.' }
    ]
  },
  {
    path: 'wipro-resume-format-for-freshers',
    title: 'Wipro Resume Format for Freshers 2026 | ATS-Friendly Template',
    description: 'Create an ATS-friendly Wipro resume format for freshers. Use clean resume templates for IT, BCA, B.Tech and non-IT fresher roles.',
    h1: 'Wipro Resume Format for Freshers (2026)',
    sections: ['Best Wipro Resume Format for Freshers', 'Key Sections for Wipro Resume', 'Wipro Resume Format for B.Tech and IT Freshers', 'Essential Skills for Wipro Jobs', 'Resume Mistakes to Avoid'],
    faqs: [
      { q: 'How to create a resume for Wipro?', a: 'Focus on clear formatting, strong objective statement, and highlight your technical proficiencies.' },
      { q: 'Is NextCV suitable for Wipro applications?', a: 'Yes, our templates are optimized for ATS systems like those used by Wipro.' },
      { q: 'What skills does Wipro look for?', a: 'Java, Python, communication skills, and problem-solving abilities are highly valued.' },
      { q: 'How long should a fresher resume be?', a: 'A fresher resume should ideally be one page long, keeping information concise and relevant.' }
    ]
  },
  {
    path: 'cognizant-resume-format-for-freshers',
    title: 'Cognizant Resume Format for Freshers 2026 | ATS-Friendly Template',
    description: 'Build an ATS-friendly Cognizant resume format for freshers. Use professional templates for BCA, B.Tech, IT and fresher job applications.',
    h1: 'Cognizant Resume Format for Freshers (2026)',
    sections: ['Best Cognizant Resume Format', 'What to Include in CTS Resume', 'Cognizant Resume for IT Professionals', 'Key Skills for Cognizant', 'CTS ATS Screening'],
    faqs: [
      { q: 'What is CTS resume?', a: 'CTS stands for Cognizant Technology Solutions, so a CTS resume is tailored for their job openings.' },
      { q: 'Does Cognizant use ATS?', a: 'Yes, like most MNCs, Cognizant uses Applicant Tracking Systems to screen resumes.' },
      { q: 'How to stand out for Cognizant roles?', a: 'Highlight specific technical projects and certifications relevant to the role you are applying for.' },
      { q: 'Which template is best for Cognizant?', a: 'A clean, ATS-friendly single-column template is highly recommended.' }
    ]
  },
  {
    path: 'tech-mahindra-resume-format-for-freshers',
    title: 'Tech Mahindra Resume Format for Freshers 2026 | ATS Template',
    description: 'Create an ATS-friendly Tech Mahindra resume format for freshers with clean sections for skills, projects, education and certifications.',
    h1: 'Tech Mahindra Resume Format for Freshers (2026)',
    sections: ['Best Tech Mahindra Resume Format', 'Important Sections to Include', 'Tech Mahindra Skills', 'Projects for Tech Mahindra Resume', 'Resume Tips'],
    faqs: [
      { q: 'How to write a resume for Tech Mahindra?', a: 'Ensure your resume is ATS-friendly, highlighting relevant skills and projects clearly.' },
      { q: 'What is the selection process for Tech Mahindra?', a: 'It typically involves an aptitude test, technical round, and HR interview. A strong resume helps clear the initial screening.' },
      { q: 'Are certifications important for Tech Mahindra?', a: 'Yes, relevant technical certifications can significantly boost your resume.' },
      { q: 'Should I mention extracurriculars?', a: 'Only if they highlight leadership or relevant soft skills.' }
    ]
  },
  {
    path: 'ltimindtree-resume-format-for-freshers',
    title: 'LTIMindtree Resume Format for Freshers 2026 | ATS Template',
    description: 'Build a clean ATS-friendly LTIMindtree resume format for freshers applying to IT, support, analyst and trainee roles.',
    h1: 'LTIMindtree Resume Format for Freshers (2026)',
    sections: ['Best LTIMindtree Resume Format', 'What to Include', 'LTIMindtree Resume for IT Freshers', 'Key Skills', 'LTIMindtree ATS Guide'],
    faqs: [
      { q: 'How to make an ATS friendly resume for LTIMindtree?', a: 'Use standard headings, avoid complex formatting, and include keywords from the job description.' },
      { q: 'What roles does LTIMindtree hire freshers for?', a: 'They hire for various roles including software engineers, analysts, and support staff.' },
      { q: 'Can I use NextCV for LTIMindtree?', a: 'Yes, NextCV provides ATS-friendly templates suitable for LTIMindtree.' },
      { q: 'How many pages should the resume be?', a: 'One page is standard and recommended for freshers.' }
    ]
  },
  {
    path: 'ats-resume-checker',
    title: 'Free ATS Resume Checker India 2026 | Check Resume Score Online',
    description: 'Check your resume ATS score online for free. Find missing skills, formatting issues and ATS problems before applying to TCS, Infosys, Wipro, Accenture and more.',
    h1: 'Free ATS Resume Checker Online (2026)',
    sections: ['Free ATS Resume Checker for Indian Freshers', 'Check Resume Score Before Applying', 'ATS Resume Checker for TCS, Infosys, Wipro and Accenture', 'Common ATS Resume Mistakes'],
    faqs: [
      { q: 'How can I check my ATS resume score for free?', a: 'You can use NextCV\'s ATS resume checker to evaluate your resume format and keyword density.' },
      { q: 'What is a good ATS score?', a: 'A score above 80% is generally considered good and indicates high compatibility with ATS systems.' },
      { q: 'Does the checker work for TCS and Infosys?', a: 'Yes, the checker is designed to evaluate resumes based on common ATS criteria used by major IT companies.' },
      { q: 'Why is my ATS score low?', a: 'A low score could be due to missing keywords, complex formatting, or incorrect file types.' }
    ]
  },
  {
    path: 'ats-friendly-resume-format-india',
    title: 'ATS Friendly Resume Format India 2026 | Freshers Guide',
    description: 'Learn the best ATS-friendly resume format for Indian freshers. See structure, skills, projects and formatting tips to pass resume screening systems.',
    h1: 'ATS Friendly Resume Format in India (2026)',
    sections: ['What is an ATS Friendly Resume?', 'Best ATS Format for Indian Freshers', 'How to Write ATS Friendly Skills', 'ATS Resume Formatting Tips', 'Mistakes to Avoid'],
    faqs: [
      { q: 'What does ATS friendly mean?', a: 'It means the resume is formatted in a way that software (Applicant Tracking Systems) can easily read and parse the text.' },
      { q: 'Is single column better for ATS?', a: 'Yes, single-column formats are generally safer and more reliably parsed by most ATS software.' },
      { q: 'Can I use colors in an ATS resume?', a: 'Minimal color is okay, but avoid complex designs or background graphics.' },
      { q: 'Which font is best for ATS?', a: 'Standard fonts like Arial, Calibri, or Times New Roman are safe choices.' }
    ]
  },
  {
    path: 'fresher-resume-format-india',
    title: 'Fresher Resume Format India 2026 | ATS-Friendly Examples',
    description: 'Create an ATS-friendly fresher resume for Indian jobs. Best format for BCA, B.Tech, MBA, commerce, IT and non-IT freshers.',
    h1: 'Fresher Resume Format India (2026)',
    sections: ['Best Fresher Resume Format', 'Resume for B.Tech Freshers', 'Resume for BCA and MCA Freshers', 'Resume for Commerce and MBA', 'Key Skills for Freshers'],
    faqs: [
      { q: 'What is the standard fresher resume format in India?', a: 'A reverse-chronological format focusing on education, skills, and academic projects is standard.' },
      { q: 'Should freshers include an objective statement?', a: 'Yes, a concise objective statement tailored to the job can be beneficial.' },
      { q: 'How to list projects on a fresher resume?', a: 'Include the project title, technologies used, your role, and the outcome.' },
      { q: 'Is a 2-page resume okay for freshers?', a: 'Usually, 1 page is preferred unless you have extensive projects or internships.' }
    ]
  },
  {
    path: 'mnc-resume-format-for-freshers',
    title: 'MNC Resume Format for Freshers 2026 | ATS-Friendly Template',
    description: 'Create a professional MNC resume format for freshers applying to TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini and more.',
    h1: 'MNC Resume Format for Freshers (2026)',
    sections: ['What MNCs Look for in a Resume', 'Best MNC Resume Format', 'MNC Resume for IT Freshers', 'Essential Skills for MNC Jobs', 'How to Pass MNC ATS Screening'],
    faqs: [
      { q: 'What is an MNC resume?', a: 'It is a resume tailored to meet the standards and expectations of Multinational Corporations.' },
      { q: 'Do all MNCs use ATS?', a: 'Yes, almost all major MNCs use Applicant Tracking Systems to handle large volumes of applications.' },
      { q: 'How to format a resume for MNCs?', a: 'Keep it clean, professional, and use a standard, easily readable font.' },
      { q: 'Should I customize my resume for each MNC?', a: 'Yes, tailoring your skills and objective to the specific job description is highly recommended.' }
    ]
  },
  {
    path: 'resume-builder-price-india',
    title: 'Resume Banane Me Kitna Paisa Lagta Hai? India Pricing Guide',
    description: 'India me resume banane ka cost samjhein. Free resume builder, paid resume templates, ATS resume download pricing aur fresher resume cost compare karein.',
    h1: 'Resume Banane Me Kitna Paisa Lagta Hai? (2026 Guide)',
    sections: ['Cost of Making a Resume in India', 'Free vs Paid Resume Builders', 'Why Choose NextCV?', 'ATS Resume Download Pricing', 'Value of a Professional Resume'],
    faqs: [
      { q: 'Is NextCV free?', a: 'You can build your resume for free. Downloading premium ATS templates starts at ₹49.' },
      { q: 'Can I find completely free resume builders?', a: 'Yes, but they often have watermarks or lack true ATS optimization.' },
      { q: 'Is it worth paying for a resume builder?', a: 'Yes, a professional, ATS-friendly resume significantly increases your chances of getting shortlisted.' },
      { q: 'What are the payment options?', a: 'We accept UPI, Credit/Debit cards, and Net Banking.' }
    ]
  },
  {
    path: 'resume-vs-cv-india',
    title: 'CV vs Resume in India: Difference, Meaning and Examples',
    description: 'Understand the difference between CV and resume in India. Learn which one freshers should use for jobs, internships and campus placements.',
    h1: 'CV vs Resume in India: What is the Difference?',
    sections: ['What is a Resume?', 'What is a CV?', 'Key Differences Between CV and Resume', 'Which One Should Freshers Use in India?', 'Examples and Templates'],
    faqs: [
      { q: 'Is CV and resume the same in India?', a: 'While often used interchangeably, a resume is typically shorter (1-2 pages) and a CV is longer and more detailed.' },
      { q: 'Should freshers use a CV or a resume?', a: 'Freshers in India should generally use a resume for corporate jobs and internships.' },
      { q: 'When is a CV used?', a: 'A CV is mostly used for academic, research, or highly specialized positions.' },
      { q: 'Can I call my resume a CV?', a: 'In the Indian corporate context, yes, HR often uses the terms interchangeably.' }
    ]
  }
];

const internalLinks = `
  <div className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Link href="/templates" className="text-blue-600 hover:underline">Explore Templates</Link>
    <Link href="/ats-resume-checker" className="text-blue-600 hover:underline">ATS Resume Checker</Link>
    <Link href="/tcs-resume-format-for-freshers" className="text-blue-600 hover:underline">TCS Resume Format</Link>
    <Link href="/infosys-resume-format-for-freshers" className="text-blue-600 hover:underline">Infosys Resume Format</Link>
    <Link href="/wipro-resume-format-for-freshers" className="text-blue-600 hover:underline">Wipro Resume Format</Link>
    <Link href="/ats-friendly-resume-format-india" className="text-blue-600 hover:underline">ATS Resume Format Guide</Link>
    <Link href="/fresher-resume-format-india" className="text-blue-600 hover:underline">Fresher Resume Format</Link>
  </div>
`;

pages.forEach(page => {
  const dirPath = path.join(baseDir, page.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = \`import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = {
  title: "\${page.title}",
  description: "\${page.description}",
  alternates: {
    canonical: "https://www.nextcv.in/\${page.path}",
  },
};

export default function Page() {
  const faqs = \${JSON.stringify(page.faqs, null, 2)};
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.nextcv.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "\${page.h1}",
        "item": "https://www.nextcv.in/\${page.path}"
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">\${page.h1}</h1>
      <p className="text-lg text-gray-700 mb-8">\${page.description}</p>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
        <h2 className="text-xl font-semibold mb-2">Build Your ATS-Friendly Resume Now</h2>
        <p className="mb-4">Use NextCV to create a resume that passes screening tools used by top Indian companies.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">Create Resume Free</Link>
      </div>

      <div className="prose max-w-none">
        \${page.sections.map(sec => \`
        <h2 className="text-2xl font-semibold mt-8 mb-4">\${sec}</h2>
        <p className="mb-4">This section is designed to guide Indian freshers in creating an optimal resume for 2026. Make sure to include relevant skills, internships, and educational background correctly structured for Applicant Tracking Systems (ATS).</p>
        \`).join('')}
      </div>

      \${['templates', 'tcs-resume-format-for-freshers', 'infosys-resume-format-for-freshers', 'wipro-resume-format-for-freshers', 'cognizant-resume-format-for-freshers', 'tech-mahindra-resume-format-for-freshers', 'ltimindtree-resume-format-for-freshers', 'fresher-resume-format-india', 'mnc-resume-format-for-freshers'].includes(page.path) ? \`
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Free ATS Templates</h2>
        <Templates />
      </section>
      \` : ''}

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Related Guides</h2>
        ${internalLinks}
      </section>
      
      <div className="mt-12 text-center">
        <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">Build Your Resume Now</Link>
      </div>
    </div>
  );
}
\`;

  fs.writeFileSync(path.join(dirPath, 'page.jsx'), content);
  console.log(\`Generated \${page.path}\`);
});
