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
     HELPERS
  ------------------------------------------------------- */

  const normalizeUrl = url => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

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

  const SectionHeading = ({ eyebrow, icon: Icon, title, description, count }) => (
    <div className="mb-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {eyebrow}
            </div>
          )}

          <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#17201C] sm:text-3xl">
            {title}
          </h2>

          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66706B]">{description}</p>
          )}
        </div>

        {count && (
          <span className="hidden rounded-full border border-[#E3E2DC] bg-white px-3 py-1 text-[11px] font-medium text-[#66706B] sm:inline-flex">
            {count}
          </span>
        )}
      </div>

      <div className="mt-6 h-px bg-[#E3E2DC]" />
    </div>
  );

  /* -------------------------------------------------------
     RETURN
  ------------------------------------------------------- */

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F7F3]
        text-[#17201C]
        font-sans
        selection:bg-[#465B9E]/15
        selection:text-[#17201C]
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(#17201C 0.7px, transparent 0.7px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          className="
            absolute
            -top-40
            left-1/2
            h-105
            w-175
            -translate-x-1/2
            rounded-full
            bg-[#465B9E]/4.5
            blur-[100px]
          "
        />
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#E3E2DC]/90
          bg-[#F8F7F3]/90
          backdrop-blur-xl
        "
      >
        <div className="mx-auto flex h-17 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Identity */}

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#E3E2DC]
                bg-white
                font-serif
                text-sm
                font-semibold
                text-[#465B9E]
                shadow-[0_4px_14px_rgba(23,32,28,0.05)]
              "
            >
              {initials}
            </div>

            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-[#17201C] sm:text-[15px]">
                {name}
              </span>

              <span className="block truncate text-[11px] text-[#66706B]">
                {jobRole || "Professional Portfolio"}
              </span>
            </div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              type="button"
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#E3E2DC]
                bg-white
                px-3
                text-xs
                font-semibold
                text-[#17201C]
                transition-all
                hover:border-[#CFCFC8]
                hover:bg-[#F1F0EB]
                active:scale-[0.98]
                sm:px-4
              "
              title="Share portfolio"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#465B9E]" />
                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-[#66706B]" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              type="button"
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#465B9E]
                px-3.5
                text-xs
                font-semibold
                text-white
                shadow-[0_7px_20px_rgba(70,91,158,0.18)]
                transition-all
                hover:bg-[#344B93]
                hover:-translate-y-0.5
                active:translate-y-0
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:px-4
              "
            >
              <Download className="h-3.5 w-3.5" />

              <span>{downloading ? "Preparing..." : "Download Resume"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="border-b border-[#E3E2DC] pb-14 sm:pb-20">
          <div className="max-w-4xl">
            {/* Small label */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E3E2DC] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#465B9E]" />
              Professional Portfolio
            </div>

            {/* Name */}

            <h1
              className="
                max-w-4xl
                font-serif
                text-[3.1rem]
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                text-[#17201C]
                sm:text-6xl
                lg:text-7xl
              "
            >
              {name.toUpperCase()}
            </h1>

            {/* Role */}

            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#465B9E] sm:text-xl">
              {jobRole || "Professional"}
            </p>

            {/* Location */}

            {address && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#66706B]">
                <MapPin className="h-4 w-4 text-[#465B9E]" />
                {address}
              </div>
            )}

            {/* Summary */}

            {summary && (
              <p className="mt-7 max-w-3xl text-base leading-8 text-[#66706B] sm:text-lg">
                {summary}
              </p>
            )}

            {/* Actions */}

            <div className="mt-8 flex flex-wrap gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#17201C]
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-[#26312C]
                    hover:-translate-y-0.5
                  "
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
              )}

              {linkedin && (
                <a
                  href={normalizeUrl(linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E3E2DC]
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                    text-[#17201C]
                    transition-all
                    hover:border-[#465B9E]/40
                    hover:bg-[#F1F0EB]
                  "
                >
                  <Linkedin className="h-4 w-4 text-[#465B9E]" />
                  LinkedIn
                </a>
              )}

              {github && (
                <a
                  href={normalizeUrl(github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E3E2DC]
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                    text-[#17201C]
                    transition-all
                    hover:bg-[#F1F0EB]
                  "
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}

              {websiteUrl && (
                <a
                  href={normalizeUrl(websiteUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E3E2DC]
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                    text-[#17201C]
                    transition-all
                    hover:bg-[#F1F0EB]
                  "
                >
                  <Globe className="h-4 w-4 text-[#465B9E]" />
                  Website
                </a>
              )}

              {phone_no && (
                <a
                  href={`tel:${phone_no}`}
                  className="
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E3E2DC]
                    bg-white
                    px-5
                    text-sm
                    font-semibold
                    text-[#17201C]
                    transition-all
                    hover:bg-[#F1F0EB]
                  "
                >
                  <Phone className="h-4 w-4 text-[#465B9E]" />
                  Call
                </a>
              )}
            </div>
          </div>

          {/* Hero metadata */}

          <div className="mt-12 grid grid-cols-2 border-t border-[#E3E2DC] pt-6 sm:grid-cols-4">
            <div className="border-r border-[#E3E2DC] pr-4">
              <p className="font-serif text-2xl font-semibold text-[#17201C]">
                {experience.length || "—"}
              </p>

              <p className="mt-1 text-xs text-[#66706B]">Career roles</p>
            </div>

            <div className="border-r border-[#E3E2DC] px-4 sm:px-5">
              <p className="font-serif text-2xl font-semibold text-[#17201C]">
                {projects.length || "—"}
              </p>

              <p className="mt-1 text-xs text-[#66706B]">Projects</p>
            </div>

            <div className="border-r border-[#E3E2DC] px-4 sm:px-5">
              <p className="font-serif text-2xl font-semibold text-[#17201C]">
                {skills.length || "—"}
              </p>

              <p className="mt-1 text-xs text-[#66706B]">Skills</p>
            </div>

            <div className="pl-4 sm:pl-5">
              <p className="font-serif text-2xl font-semibold text-[#17201C]">
                {certificates.length || "—"}
              </p>

              <p className="mt-1 text-xs text-[#66706B]">Certifications</p>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPERIENCE
        ====================================================== */}

        {experience.length > 0 && (
          <section className="mt-20">
            <SectionHeading
              eyebrow="Experience"
              icon={Briefcase}
              title="Professional experience"
              description="Career experience, responsibilities, and contributions."
              count={`${experience.length} ${experience.length === 1 ? "Role" : "Roles"}`}
            />

            <div className="space-y-5">
              {experience.map((exp, idx) => {
                const dateRange = renderDateRange(exp.startDate, exp.endDate);

                const descList = Array.isArray(exp.description)
                  ? exp.description
                  : typeof exp.description === "string"
                    ? exp.description.split("\n").filter(Boolean)
                    : [];

                return (
                  <article
                    key={idx}
                    className="
                      group
                      relative
                      rounded-2xl
                      border
                      border-[#E3E2DC]
                      bg-white
                      p-6
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-[#CFCFC8]
                      hover:shadow-[0_14px_40px_rgba(23,32,28,0.06)]
                      sm:p-7
                    "
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-semibold tracking-tight text-[#17201C]">
                          {exp.position || "Role Title"}
                        </h3>

                        {exp.companyName && (
                          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#66706B]">
                            <Building className="h-4 w-4 text-[#465B9E]" />
                            {exp.companyName}
                          </div>
                        )}
                      </div>

                      {dateRange && (
                        <span
                          className="
                            inline-flex
                            w-fit
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-[#E3E2DC]
                            bg-[#F8F7F3]
                            px-3
                            py-1.5
                            text-[11px]
                            font-medium
                            text-[#66706B]
                          "
                        >
                          <Calendar className="h-3 w-3 text-[#465B9E]" />
                          {dateRange}
                        </span>
                      )}
                    </div>

                    {descList.length > 0 && (
                      <ul className="mt-6 space-y-3">
                        {descList.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-3 text-sm leading-7 text-[#66706B]"
                          >
                            <span className="mt-2.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#465B9E]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            PROJECTS
        ====================================================== */}

        {projects.length > 0 && (
          <section className="mt-20">
            <SectionHeading
              eyebrow="Selected Work"
              icon={Layers}
              title="Featured projects"
              description="Selected projects, products, and work worth exploring."
              count={`${projects.length} ${projects.length === 1 ? "Project" : "Projects"}`}
            />

            <div className="grid gap-5 md:grid-cols-2">
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
                  <article
                    key={idx}
                    className="
                      group
                      flex
                      flex-col
                      justify-between
                      rounded-2xl
                      border
                      border-[#E3E2DC]
                      bg-white
                      p-6
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:border-[#CFCFC8]
                      hover:shadow-[0_16px_45px_rgba(23,32,28,0.07)]
                    "
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-xl font-semibold tracking-tight text-[#17201C] transition-colors group-hover:text-[#465B9E]">
                          {proj.title || "Project Title"}
                        </h3>

                        {proj.link && (
                          <a
                            href={normalizeUrl(proj.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-[#E3E2DC]
                              bg-[#F8F7F3]
                              text-[#66706B]
                              transition-all
                              hover:border-[#465B9E]/30
                              hover:bg-[#465B9E]
                              hover:text-white
                            "
                            title="Visit Project"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#66706B]">
                        {proj.roleOrType && (
                          <span className="font-medium text-[#465B9E]">{proj.roleOrType}</span>
                        )}

                        {proj.organization && (
                          <>
                            <span>·</span>
                            <span>{proj.organization}</span>
                          </>
                        )}

                        {proj.date && (
                          <>
                            <span>·</span>
                            <span>{formatDate(proj.date)}</span>
                          </>
                        )}
                      </div>

                      {descList.length > 0 && (
                        <div className="mt-6 space-y-3">
                          {descList.slice(0, 3).map((bullet, bIdx) => (
                            <p
                              key={bIdx}
                              className="flex items-start gap-3 text-sm leading-7 text-[#66706B]"
                            >
                              <span className="mt-2.25 h-1.5 w-1.5 shrink-0 rounded-full bg-[#465B9E]" />
                              <span>{bullet}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-7">
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 border-t border-[#E3E2DC] pt-5">
                          {tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="
                                rounded-full
                                border
                                border-[#E3E2DC]
                                bg-[#F8F7F3]
                                px-3
                                py-1.5
                                text-[11px]
                                font-medium
                                text-[#66706B]
                              "
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {proj.link && (
                        <a
                          href={normalizeUrl(proj.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-[#465B9E]
                            transition-colors
                            hover:text-[#344B93]
                          "
                        >
                          Explore project
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================
            SKILLS
        ====================================================== */}

        {skills.length > 0 && (
          <section className="mt-20">
            <SectionHeading
              eyebrow="Expertise"
              icon={CheckCircle2}
              title="Skills & expertise"
              description="Technical skills and professional capabilities."
              count={`${skills.length} Skills`}
            />

            <div className="rounded-3xl border border-[#E3E2DC] bg-white p-6 sm:p-8">
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === "string" ? skill : skill?.name;

                  const skillLevel = typeof skill === "object" ? skill?.level : null;

                  return (
                    <div
                      key={idx}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#E3E2DC]
                        bg-[#F8F7F3]
                        px-3.5
                        py-2
                        transition-all
                        hover:border-[#465B9E]/30
                        hover:bg-white
                      "
                    >
                      <span className="text-xs font-semibold text-[#17201C] sm:text-sm">
                        {skillName}
                      </span>

                      {skillLevel && (
                        <span className="rounded-full bg-[#465B9E]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#465B9E]">
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

        {(education.length > 0 || certificates.length > 0) && (
          <div className="mt-20 grid items-start gap-12 lg:grid-cols-2">
            {/* Education */}

            {education.length > 0 && (
              <section>
                <SectionHeading
                  eyebrow="Education"
                  icon={GraduationCap}
                  title="Academic background"
                  description="Education and qualifications."
                />

                <div className="space-y-4">
                  {education.map((edu, idx) => {
                    const yearText =
                      edu.startYear || edu.endYear
                        ? `${edu.startYear || ""}${edu.endYear ? ` — ${edu.endYear}` : ""}`.trim()
                        : null;

                    return (
                      <article
                        key={idx}
                        className="
                          rounded-2xl
                          border
                          border-[#E3E2DC]
                          bg-white
                          p-5
                          transition-all
                          hover:border-[#CFCFC8]
                          hover:shadow-[0_12px_35px_rgba(23,32,28,0.05)]
                        "
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                            {edu.degree || "Degree / Course"}
                          </h3>

                          {yearText && (
                            <span className="shrink-0 text-[11px] font-medium text-[#66706B]">
                              {yearText}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm font-medium text-[#465B9E]">
                          {edu.institution || "Institution"}
                        </p>

                        {edu.grade && (
                          <p className="mt-1 text-xs font-medium text-[#66706B]">
                            Grade / Score: {edu.grade}
                          </p>
                        )}

                        {edu.description && edu.description.length > 0 && (
                          <div className="mt-3 space-y-1 text-xs leading-6 text-[#66706B]">
                            {Array.isArray(edu.description) ? (
                              edu.description.map((d, dIdx) => <p key={dIdx}>• {d}</p>)
                            ) : (
                              <p>{edu.description}</p>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Certifications */}

            {certificates.length > 0 && (
              <section>
                <SectionHeading
                  eyebrow="Credentials"
                  icon={Award}
                  title="Certifications"
                  description="Professional credentials and certifications."
                />

                <div className="space-y-4">
                  {certificates.map((cert, idx) => (
                    <article
                      key={idx}
                      className="
                        rounded-2xl
                        border
                        border-[#E3E2DC]
                        bg-white
                        p-5
                        transition-all
                        hover:border-[#CFCFC8]
                        hover:shadow-[0_12px_35px_rgba(23,32,28,0.05)]
                      "
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-[#17201C]">
                            {cert.title || "Certification"}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-[#465B9E]">
                            {cert.organization || "Issuing Body"}
                          </p>

                          {cert.year && (
                            <p className="mt-1 text-[11px] text-[#66706B]">
                              Issued: {formatDate(cert.year) || cert.year}
                            </p>
                          )}
                        </div>

                        {cert.credentialUrl && (
                          <a
                            href={normalizeUrl(cert.credentialUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              shrink-0
                              items-center
                              gap-1.5
                              rounded-xl
                              border
                              border-[#E3E2DC]
                              bg-[#F8F7F3]
                              px-3
                              py-2
                              text-[11px]
                              font-semibold
                              text-[#17201C]
                              transition-all
                              hover:border-[#465B9E]/30
                              hover:bg-white
                            "
                          >
                            View
                            <ExternalLink className="h-3 w-3 text-[#465B9E]" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* =====================================================
            CONTACT
        ====================================================== */}

        {(email || phone_no || linkedin) && (
          <section className="mt-20">
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[#E3E2DC]
                bg-[#17201C]
                px-6
                py-12
                text-center
                sm:px-10
                sm:py-16
              "
            >
              {/* subtle decoration */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-[#465B9E]/20
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  -left-20
                  h-72
                  w-72
                  rounded-full
                  bg-white/3
                  blur-3xl
                "
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Sparkles className="h-5 w-5 text-[#AAB7E8]" />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AAB7E8]">
                  Get in touch
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Interested in working with {name}?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                  Connect directly to discuss opportunities, collaborations, or professional work.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  {email && (
                    <a
                      href={`mailto:${email}?subject=Opportunity Inquiry for ${encodeURIComponent(
                        name
                      )}`}
                      className="
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-white
                        px-5
                        text-sm
                        font-semibold
                        text-[#17201C]
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-[#F1F0EB]
                      "
                    >
                      <Send className="h-4 w-4" />
                      Get in touch
                    </a>
                  )}

                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                    type="button"
                    className="
                      inline-flex
                      min-h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/15
                      bg-white/5
                      px-5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      hover:bg-white/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <Download className="h-4 w-4" />
                    {downloading ? "Preparing..." : "Download Resume"}
                  </button>

                  {linkedin && (
                    <a
                      href={normalizeUrl(linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/15
                        bg-white/5
                        px-5
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        hover:bg-white/10
                      "
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="mt-16 border-t border-[#E3E2DC] pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#66706B] sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/nextcvlogolight.png"
                alt="NextCV"
                width={19}
                height={19}
                className="opacity-70"
              />

              <span>
                Portfolio created with <span className="font-semibold text-[#17201C]">NextCV</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyLink}
                type="button"
                className="font-medium transition-colors hover:text-[#465B9E]"
              >
                {copied ? "Link copied" : "Share portfolio"}
              </button>

              <span className="text-[#C5C5BE]">•</span>

              <Link href="/" className="font-medium transition-colors hover:text-[#465B9E]">
                Create yours
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
