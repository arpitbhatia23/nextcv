"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Download,
  Share2,
  Check,
  Sparkles,
  Calendar,
  ArrowRight,
  Layers,
  Building,
  CheckCircle2,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils/datefromater";

export default function PublicPortfolioViewer({ resume }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!resume) return null;

  const {
    name = "Professional",
    jobRole = "Job Seeker",
    phone_no,
    email,
    address,
    linkedin,
    github,
    portfolio: websiteUrl,
    summary,
    skills = [],
    education = [],
    experience = [],
    projects = [],
    certificates = [],
  } = resume;

  const initials = name
    .split(" ")
    .map(n => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  /* -------------------------------------------------------
     SHARE PORTFOLIO
  ------------------------------------------------------- */

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }

      setCopied(true);
      toast.success("Portfolio link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy portfolio link");
    }
  };

  /* -------------------------------------------------------
     DOWNLOAD RESUME
  ------------------------------------------------------- */

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);

      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const pdfGen = new pdfGenerator(resume, resume?.ResumeType || "classic", {
        type: "resume",
      });

      const url = await pdfGen.createPdf();

      if (url) {
        const link = document.createElement("a");

        link.href = url;

        const cleanName = name.trim().replace(/\s+/g, "_") || "Resume";

        link.download = `${cleanName}_Resume.pdf`;

        link.click();

        toast.success("Resume downloaded successfully!");
      }
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download resume.");
    } finally {
      setDownloading(false);
    }
  };

  /* -------------------------------------------------------
     DATE FORMATTER
  ------------------------------------------------------- */

  const renderDateRange = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = end ? formatDate(end) : "Present";

    if (!formattedStart && !formattedEnd) {
      return null;
    }

    return `${formattedStart || "Start"} — ${formattedEnd || "Present"}`;
  };

  /* -------------------------------------------------------
     SECTION HEADING
  ------------------------------------------------------- */

  const SectionHeading = ({
    icon: Icon,
    title,
    description,
    count,
    iconClass = "text-indigo-600 bg-indigo-50 border-indigo-100",
  }) => (
    <div className="flex items-end justify-between gap-4 pb-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl border flex items-center justify-center ${iconClass}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h2>

          {description && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>

      {count && <span className="hidden sm:block text-xs font-medium text-slate-400">{count}</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-175 h-125 bg-indigo-100/50 blur-[120px] rounded-full" />

        <div className="absolute top-[40%] -right-40 w-125 h-125 bg-purple-100/40 blur-[130px] rounded-full" />

        <div className="absolute bottom-0 -left-40 w-125 h-125 bg-blue-100/40 blur-[130px] rounded-full" />
      </div>

      {/* =====================================================
          STICKY NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Identity */}

          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-sm shrink-0">
              {initials}
            </div>

            <div className="min-w-0">
              <span className="font-bold text-sm sm:text-base text-slate-900 truncate block">
                {name}
              </span>

              <span className="text-[11px] text-slate-500 truncate block">
                {jobRole || "Professional Portfolio"}
              </span>
            </div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">
            {/* Share */}

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              title="Share portfolio"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />

                  <span className="hidden sm:inline text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />

                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* Download Resume */}

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />

              <span>{downloading ? "Preparing..." : "Download Resume"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
          {/* Accent */}

          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-200">
            {/* Identity */}

            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-lg shadow-indigo-600/20 shrink-0">
                {initials}
              </div>

              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  {name}
                </h1>

                <p className="text-base sm:text-xl font-semibold text-indigo-600">
                  {jobRole || "Professional"}
                </p>

                {address && (
                  <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />

                    <span>{address}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Contact buttons */}

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>
              )}

              {phone_no && (
                <a
                  href={`tel:${phone_no}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call</span>
                </a>
              )}

              {linkedin && (
                <a
                  href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {github && (
                <a
                  href={github.startsWith("http") ? github : `https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 transition-colors"
                  title="Personal Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Summary */}

          {summary && (
            <div className="pt-7 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                About
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
                {summary}
              </p>
            </div>
          )}

          {/* Metrics */}

          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">
                {experience.length > 0 ? `${experience.length}+` : "—"}
              </span>

              <span className="text-[11px] text-slate-500 font-medium">Career Roles</span>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-indigo-600 block">
                {skills.length > 0 ? skills.length : "—"}
              </span>

              <span className="text-[11px] text-slate-500 font-medium">Core Skills</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block">
                {projects.length > 0 ? projects.length : "—"}
              </span>

              <span className="text-[11px] text-slate-500 font-medium">Projects</span>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block">
                {certificates.length > 0 ? certificates.length : "—"}
              </span>

              <span className="text-[11px] text-slate-500 font-medium">Certifications</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPERIENCE
        ====================================================== */}

        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={Briefcase}
              title="Work Experience"
              description="Career experience and professional contributions"
              count={`${experience.length} ${experience.length === 1 ? "Role" : "Roles"}`}
            />

            <div className="relative pl-4 sm:pl-6 space-y-7 before:absolute before:left-2 sm:before:left-2.5 before:top-3 before:bottom-3 before:w-px before:bg-slate-200">
              {experience.map((exp, idx) => {
                const dateRange = renderDateRange(exp.startDate, exp.endDate);

                const descList = Array.isArray(exp.description)
                  ? exp.description
                  : typeof exp.description === "string"
                    ? exp.description.split("\n").filter(Boolean)
                    : [];

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline node */}

                    <div className="absolute -left-5.5 sm:-left-7.5 top-5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-[#F8FAFC] transition-transform group-hover:scale-125" />

                    <div className="bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {exp.position || "Role Title"}
                        </h3>

                        {dateRange && (
                          <span className="text-xs font-medium text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 w-fit">
                            <Calendar className="w-3 h-3" />

                            {dateRange}
                          </span>
                        )}
                      </div>

                      {exp.companyName && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-4">
                          <Building className="w-4 h-4 text-slate-400" />

                          <span>{exp.companyName}</span>
                        </div>
                      )}

                      {descList.length > 0 && (
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {descList.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />

                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            PROJECTS
        ====================================================== */}

        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={Layers}
              title="Featured Projects"
              description="Selected projects, products, and work"
              count={`${projects.length} ${projects.length === 1 ? "Project" : "Projects"}`}
              iconClass="text-purple-600 bg-purple-50 border-purple-100"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => {
                const descList = Array.isArray(proj.description)
                  ? proj.description
                  : typeof proj.description === "string"
                    ? proj.description.split("\n").filter(Boolean)
                    : [];

                const tags = proj.technologiesOrTopics
                  ? proj.technologiesOrTopics
                      .split(",")
                      .map(t => t.trim())
                      .filter(Boolean)
                  : [];

                return (
                  <div
                    key={idx}
                    className="bg-white hover:bg-white border border-slate-200 hover:border-purple-200 rounded-2xl p-6 transition-all flex flex-col justify-between shadow-sm hover:shadow-md group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {proj.title || "Project Title"}
                        </h3>

                        {proj.link && (
                          <a
                            href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-purple-700 transition-colors shrink-0"
                            title="Visit Project"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-4">
                        {proj.roleOrType && (
                          <span className="text-indigo-600 font-medium">{proj.roleOrType}</span>
                        )}

                        {proj.organization && <span>• {proj.organization}</span>}

                        {proj.date && (
                          <span className="font-mono text-slate-400">
                            • {formatDate(proj.date)}
                          </span>
                        )}
                      </div>

                      {descList.length > 0 && (
                        <div className="space-y-2 mb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {descList.slice(0, 3).map((bullet, bIdx) => (
                            <p key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />

                              <span>{bullet}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                          {tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.link && (
                        <div className="mt-4">
                          <a
                            href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <span>Explore Project</span>

                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            SKILLS
        ====================================================== */}

        {skills && skills.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={CheckCircle2}
              title="Skills & Expertise"
              description="Technical skills and professional capabilities"
              count={`${skills.length} Skills`}
              iconClass="text-emerald-600 bg-emerald-50 border-emerald-100"
            />

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === "string" ? skill : skill.name;

                  const skillLevel = typeof skill === "object" ? skill.level : null;

                  return (
                    <div
                      key={idx}
                      className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-all"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-indigo-700">
                        {skillName}
                      </span>

                      {skillLevel && (
                        <span className="text-[10px] font-medium uppercase bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                          {skillLevel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            EDUCATION + CERTIFICATIONS
        ====================================================== */}

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Education */}

          {education && education.length > 0 && (
            <section className="space-y-6">
              <SectionHeading
                icon={GraduationCap}
                title="Education"
                description="Academic background and qualifications"
                iconClass="text-blue-600 bg-blue-50 border-blue-100"
              />

              <div className="space-y-4">
                {education.map((edu, idx) => {
                  const yearText =
                    edu.startYear || edu.endYear
                      ? `${edu.startYear || ""} ${edu.endYear ? `— ${edu.endYear}` : ""}`.trim()
                      : null;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {edu.degree || "Degree / Course"}
                        </h3>

                        {yearText && (
                          <span className="text-xs font-medium text-slate-400 shrink-0">
                            {yearText}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-indigo-600">
                        {edu.institution || "Institution"}
                      </p>

                      {edu.grade && (
                        <p className="text-xs text-emerald-600 font-medium">
                          Grade / Score: {edu.grade}
                        </p>
                      )}

                      {edu.description && edu.description.length > 0 && (
                        <div className="text-xs text-slate-500 pt-1 space-y-1">
                          {Array.isArray(edu.description) ? (
                            edu.description.map((d, dIdx) => <p key={dIdx}>• {d}</p>)
                          ) : (
                            <p>{edu.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Certifications */}

          {certificates && certificates.length > 0 ? (
            <section className="space-y-6">
              <SectionHeading
                icon={Award}
                title="Certifications"
                description="Professional credentials and certifications"
                iconClass="text-amber-600 bg-amber-50 border-amber-100"
              />

              <div className="space-y-4">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {cert.title || "Certification"}
                      </h3>

                      <p className="text-xs text-indigo-600 font-medium">
                        {cert.organization || "Issuing Body"}
                      </p>

                      {cert.year && (
                        <p className="text-[11px] font-medium text-slate-400">
                          Issued: {formatDate(cert.year) || cert.year}
                        </p>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={
                          cert.credentialUrl.startsWith("http")
                            ? cert.credentialUrl
                            : `https://${cert.credentialUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-600 hover:text-slate-900 transition-colors shrink-0"
                      >
                        <span>View Credential</span>

                        <ExternalLink className="w-3 h-3 text-amber-600" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="space-y-6">
              <SectionHeading
                icon={Sparkles}
                title="Let's Connect"
                description="Direct contact information"
                iconClass="text-indigo-600 bg-indigo-50 border-indigo-100"
              />

              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Interested in working together? Feel free to connect directly through email or the
                  available social profiles.
                </p>

                <div className="space-y-2.5 pt-2">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-xs sm:text-sm text-slate-700 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />

                        <span>{email}</span>
                      </span>

                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  )}

                  {phone_no && (
                    <a
                      href={`tel:${phone_no}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-100 text-xs sm:text-sm text-slate-700 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />

                        <span>{phone_no}</span>
                      </span>

                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* =====================================================
            CONTACT CTA
        ====================================================== */}

        <section className="relative bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-xl shadow-indigo-600/15">
          {/* Decorative background */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Let's Connect
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Interested in working with {name}?
            </h2>

            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Get in touch directly or download the resume to learn more about their professional
              experience.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
            {/* Download Resume */}

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />

              <span>{downloading ? "Preparing..." : "Download Resume"}</span>
            </button>

            {/* Email */}

            {email && (
              <a
                href={`mailto:${email}?subject=Opportunity Inquiry for ${encodeURIComponent(name)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />

                <span>Get in Touch</span>
              </a>
            )}

            {/* LinkedIn */}

            {linkedin && (
              <a
                href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <Linkedin className="w-4 h-4" />

                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/nextcvlogolight.png"
              alt="NextCV"
              width={20}
              height={20}
              className="opacity-60"
            />

            <span>Portfolio created with NextCV</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Create Your Portfolio
            </Link>

            <span>•</span>

            <button
              onClick={handleCopyLink}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Share Page
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
