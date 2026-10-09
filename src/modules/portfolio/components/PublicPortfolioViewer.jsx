"use client";

import { useState } from "react";
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
  Calendar,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/shared/utils/datefromater";

const C = {
  bg: "#F8F7F3",
  text: "#17201C",
  accent: "#465B9E",
  hover: "#344B93",
  muted: "#66706B",
  border: "#E3E2DC",
  white: "#FFFFFF",
};

const arr = value => (Array.isArray(value) ? value : []);

function url(value) {
  if (!value || typeof value !== "string") return "";
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function descriptions(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split("\n")
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
}

function initials(name) {
  return String(name || "Professional")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(v => v[0] || "")
    .join("")
    .toUpperCase();
}

function SectionTitle({ eyebrow, title, count }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 border-b border-[#E3E2DC] pb-4">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#465B9E]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#17201C] sm:text-3xl">
          {title}
        </h2>
      </div>
      {count ? <span className="pb-1 text-xs text-[#66706B]">{count}</span> : null}
    </div>
  );
}

function TextList({ value, limit }) {
  const items = descriptions(value);
  const visible = limit ? items.slice(0, limit) : items;

  if (!visible.length) return null;

  return (
    <ul className="mt-4 space-y-2.5">
      {visible.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#66706B]">
          <span className="mt-2.75 h-1.5 w-1.5 shrink-0 bg-[#465B9E]" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContactLink({ href, icon: Icon, children, primary, external }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-medium",
        "transition-colors duration-200 focus-visible:outline ",
        "focus-visible:outline-offset-2 focus-visible:outline-[#465B9E]",
        primary
          ? "bg-[#465B9E] text-white hover:bg-[#344B93]"
          : "border border-[#E3E2DC] bg-white text-[#17201C] hover:border-[#465B9E] hover:text-[#465B9E]",
      ].join(" ")}
    >
      {Icon && <Icon size={16} />}
      {children}
    </a>
  );
}

export default function PublicPortfolioViewer({ resume }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!resume) return null;

  const {
    name = "Professional",
    jobRole = "Professional",
    phone_no,
    email,
    address,
    linkedin,
    github,
    portfolio: websiteUrl,
    summary,
  } = resume;

  const experience = arr(resume.experience);
  const projects = arr(resume.projects);
  const skills = arr(resume.skills);
  const education = arr(resume.education);
  const certificates = arr(resume.certificates);

  const skillCount = skills.filter(s => typeof s === "string" || s?.name).length;

  const dateRange = (start, end) => {
    const a = start ? formatDate(start) : "";
    const b = end ? formatDate(end) : "Present";
    if (!a && !end) return null;
    return `${a || "Start"} — ${b || "Present"}`;
  };

  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        toast.error("Clipboard unavailable. Copy the page URL manually.");
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Portfolio link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy the portfolio link.");
    }
  };

  const downloadResume = async () => {
    if (downloading) return;

    try {
      setDownloading(true);

      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
      const generator = new pdfGenerator(resume, resume?.ResumeType || "classic", {
        type: "resume",
      });

      const pdfUrl = await generator.createPdf();

      if (!pdfUrl) {
        toast.error("Could not generate the resume PDF.");
        return;
      }

      const link = document.createElement("a");
      const filename =
        String(name || "Resume")
          .trim()
          .replace(/[^\w-]+/g, "_") || "Resume";

      link.href = pdfUrl;
      link.download = `${filename}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Resume download started!");
    } catch (error) {
      console.error("Resume download failed:", error);
      toast.error("Failed to download the resume.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F8F7F3] font-sans text-[#17201C]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#E3E2DC] bg-[#F8F7F3]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-17 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/logos/nextcvlogo.png"
              alt="NextCV"
              width={28}
              height={28}
              className="shrink-0 object-contain"
            />
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">Portfolio</span>
            <span className="hidden text-[#E3E2DC] sm:inline">/</span>
            <span className="max-w-36 truncate text-sm text-[#66706B]">{name}</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={copyLink}
              aria-label="Share portfolio"
              className="inline-flex h-10 items-center gap-2 border border-[#E3E2DC] bg-white px-3 text-sm transition-colors hover:border-[#465B9E] hover:text-[#465B9E] sm:px-4"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={downloadResume}
              disabled={downloading}
              className="inline-flex h-10 items-center gap-2 bg-[#465B9E] px-3 text-sm font-medium text-white transition-colors hover:bg-[#344B93] disabled:opacity-60 sm:px-4"
            >
              <Download size={16} />
              <span className="hidden sm:inline">
                {downloading ? "Preparing..." : "Download resume"}
              </span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section className="grid gap-10 border-b border-[#E3E2DC] py-14 sm:py-20 lg:grid-cols-[1fr_280px] lg:gap-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#465B9E]">
              <span className="h-1.5 w-1.5 bg-[#465B9E]" />
              Independent professional portfolio
            </p>

            <h1
              className="bwrap-break-word font-serif text-5xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-[88px]"
              style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
            >
              {name}
              <span className="text-[#465B9E]">.</span>
            </h1>

            <p className="mt-5 text-lg font-medium leading-7 text-[#465B9E] sm:text-xl">
              {jobRole}
            </p>

            {summary && (
              <p className="mt-7 max-w-2xl whitespace-pre-line text-[15px] leading-8 text-[#66706B]">
                {summary}
              </p>
            )}

            {address && (
              <p className="mt-5 flex items-start gap-2 text-sm text-[#66706B]">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#465B9E]" />
                {address}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-2.5">
              {email && (
                <ContactLink href={`mailto:${email}`} icon={Mail} primary>
                  Get in touch <ArrowUpRight size={15} />
                </ContactLink>
              )}
              {linkedin && (
                <ContactLink href={url(linkedin)} icon={Linkedin} external>
                  LinkedIn
                </ContactLink>
              )}
              {github && (
                <ContactLink href={url(github)} icon={Github} external>
                  GitHub
                </ContactLink>
              )}
              {websiteUrl && (
                <ContactLink href={url(websiteUrl)} icon={Globe} external>
                  Website
                </ContactLink>
              )}
            </div>
          </div>

          {/* Profile overview */}
          <aside className="self-start border-t-2 border-[#465B9E] pt-5 lg:mt-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#66706B]">
              At a glance
            </p>

            <div className="mt-5 divide-y divide-[#E3E2DC]">
              {[
                { label: "Experience", value: experience.length },
                { label: "Projects", value: projects.length },
                { label: "Skills", value: skillCount },
                { label: "Certifications", value: certificates.length },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-4">
                  <span className="text-sm text-[#66706B]">{item.label}</span>
                  <span className="font-serif text-2xl font-semibold">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[#E3E2DC] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F1F0EB] font-serif text-lg font-semibold text-[#465B9E]">
                  {initials(name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="mt-1 text-xs text-[#66706B]">Professional profile</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="py-14 sm:py-20">
            <SectionTitle
              eyebrow="01 / Career"
              title="Experience"
              count={`${experience.length} roles`}
            />

            <div>
              {experience.map((exp, i) => (
                <article
                  key={`${exp.position || "role"}-${i}`}
                  className="grid gap-4 border-b border-[#E3E2DC] py-7 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[1fr_190px] sm:gap-10"
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                      {exp.position || "Position"}
                    </h3>
                    {exp.companyName && (
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#465B9E]">
                        <Briefcase size={15} />
                        {exp.companyName}
                      </p>
                    )}
                    <TextList value={exp.description} />
                  </div>

                  {(exp.startDate || exp.endDate) && (
                    <p className="flex items-start gap-2 text-xs leading-6 text-[#66706B] sm:justify-end">
                      <Calendar size={14} className="mt-1 shrink-0" />
                      {dateRange(exp.startDate, exp.endDate)}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="border-t border-[#E3E2DC] py-14 sm:py-20">
            <SectionTitle
              eyebrow="02 / Selected work"
              title="Projects"
              count={`${projects.length} projects`}
            />

            <div className="grid gap-x-12 md:grid-cols-2">
              {projects.map((project, i) => {
                const tags = Array.isArray(project.technologiesOrTopics)
                  ? project.technologiesOrTopics
                  : typeof project.technologiesOrTopics === "string"
                    ? project.technologiesOrTopics.split(",")
                    : [];

                const projectUrl = project.link ? url(project.link) : "";

                return (
                  <article
                    key={`${project.title || "project"}-${i}`}
                    className="flex min-w-0 flex-col border-b border-[#E3E2DC] py-7 first:pt-0 md:nth-[-n+2]]:pt-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="wrap-break-wordDS font-serif text-xl font-semibold tracking-tight sm:text-2xl">
                        {project.title || "Project"}
                      </h3>
                      {projectUrl && (
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.title || "project"}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#E3E2DC] bg-white text-[#465B9E] transition-colors hover:bg-[#465B9E] hover:text-white"
                        >
                          <ArrowUpRight size={17} />
                        </a>
                      )}
                    </div>

                    {(project.roleOrType || project.organization || project.date) && (
                      <p className="mt-3 text-xs leading-6 text-[#66706B]">
                        {[
                          project.roleOrType,
                          project.organization,
                          project.date ? formatDate(project.date) : "",
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}

                    <TextList value={project.description} limit={3} />

                    {tags.filter(Boolean).length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-[#E3E2DC] pt-4">
                        {tags.map((tag, j) => (
                          <span key={`${tag}-${j}`} className="text-xs text-[#66706B]">
                            {String(tag).trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {projectUrl && (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#465B9E] hover:text-[#344B93]"
                      >
                        Explore project <ArrowUpRight size={14} />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="border-t border-[#E3E2DC] py-14 sm:py-20">
            <SectionTitle
              eyebrow="03 / Expertise"
              title="Skills & expertise"
              count={`${skillCount} skills`}
            />

            <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, i) => {
                const skillName = typeof skill === "string" ? skill : skill?.name;
                const level = typeof skill === "object" ? skill?.level : null;

                if (!skillName) return null;

                return (
                  <div
                    key={`${skillName}-${i}`}
                    className="flex items-center justify-between gap-3 border-b border-[#E3E2DC] py-4"
                  >
                    <span className="text-sm font-medium">{skillName}</span>
                    {level && <span className="text-xs text-[#66706B]">{level}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education and certifications */}
        {(education.length > 0 || certificates.length > 0) && (
          <section className="border-t border-[#E3E2DC] py-14 sm:py-20">
            <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
              {education.length > 0 && (
                <div>
                  <SectionTitle eyebrow="04 / Education" title="Academic background" />

                  {education.map((edu, i) => (
                    <article
                      key={`${edu.degree || "education"}-${i}`}
                      className="border-b border-[#E3E2DC] py-5 first:pt-0 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <GraduationCap size={18} className="mt-1 shrink-0 text-[#465B9E]" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-lg font-semibold">
                            {edu.degree || "Degree / Course"}
                          </h3>
                          <p className="mt-2 text-sm text-[#465B9E]">
                            {edu.institution || "Institution"}
                          </p>
                          {(edu.startYear || edu.endYear) && (
                            <p className="mt-2 text-xs text-[#66706B]">
                              {[edu.startYear, edu.endYear].filter(Boolean).join(" — ")}
                            </p>
                          )}
                          {edu.grade && (
                            <p className="mt-2 text-xs text-[#66706B]">
                              Grade / Score: {edu.grade}
                            </p>
                          )}
                          <TextList value={edu.description} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {certificates.length > 0 && (
                <div>
                  <SectionTitle eyebrow="05 / Credentials" title="Certifications" />

                  {certificates.map((cert, i) => (
                    <article
                      key={`${cert.title || "certificate"}-${i}`}
                      className="border-b border-[#E3E2DC] py-5 first:pt-0 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <Award size={18} className="mt-1 shrink-0 text-[#465B9E]" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-lg font-semibold">
                            {cert.title || "Certification"}
                          </h3>
                          <p className="mt-2 text-sm text-[#465B9E]">
                            {cert.organization || "Issuing organization"}
                          </p>
                          {cert.year && (
                            <p className="mt-2 text-xs text-[#66706B]">
                              Issued: {formatDate(cert.year) || cert.year}
                            </p>
                          )}
                        </div>
                        {cert.credentialUrl && (
                          <a
                            href={url(cert.credentialUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1.5 border border-[#E3E2DC] bg-white px-3 py-2 text-xs hover:border-[#465B9E] hover:text-[#465B9E]"
                          >
                            Verify <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        {(email || phone_no || linkedin) && (
          <section className="mb-14 bg-[#17201C] px-6 py-10 text-white sm:mb-20 sm:px-12 sm:py-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5CBE5]">
              Have a project or opportunity?
            </p>

            <div className="mt-4 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h2
                  className="font-serif text-3xl font-medium tracking-tight sm:text-5xl"
                  style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}
                >
                  Let&apos;s make something meaningful.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
                  Interested in working with {name}? Reach out to discuss opportunities,
                  collaborations, or professional work.
                </p>
              </div>

              {email && (
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    `Professional opportunity for ${name}`
                  )}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#E8EAF4]"
                >
                  <Send size={15} /> Get in touch
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-5 border-t border-white/15 pt-5 text-sm text-white/70">
              {phone_no && (
                <a
                  href={`tel:${phone_no}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone size={15} /> Call
                </a>
              )}
              {linkedin && (
                <a
                  href={url(linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail size={15} /> Email
                </a>
              )}
              <button
                type="button"
                onClick={downloadResume}
                disabled={downloading}
                className="inline-flex items-center gap-2 hover:text-white disabled:opacity-60"
              >
                <Download size={15} />
                {downloading ? "Preparing..." : "Download resume"}
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-[#E3E2DC] py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex w-fit items-center gap-2">
              <Image
                src="/logos/nextcvlogo.png"
                alt="NextCV"
                width={23}
                height={23}
                className="object-contain"
              />
              <span className="text-xs text-[#66706B]">
                Portfolio powered by <span className="font-semibold text-[#17201C]">NextCV</span>
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-5 text-xs">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 text-[#66706B] hover:text-[#465B9E]"
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied ? "Link copied" : "Share portfolio"}
              </button>

              <Link href="/templates" className="font-semibold text-[#465B9E] hover:text-[#344B93]">
                Build your portfolio →
              </Link>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-5 text-[#8A918C]">
            A professional portfolio showcasing experience, projects, skills, and qualifications.
          </p>
        </footer>
      </main>
    </div>
  );
}
