"use client";
import { useState, useEffect, useMemo, use } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Plus,
  Minus,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { formatDate } from "@/shared/utils/datefromater";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* Fonts: Fraunces for the letterhead display type, IBM Plex Mono for
   reference codes / labels / counters. Body stays on the default sans. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const INK = "#1C2333";
const RUST = "#B3382C";
const LINE = "#E4E2DC";
const MUTED = "#6B7280";
const PAPER = "#F7F7F5";
const FIELD = "#FBFBF9";

function getChangedFields(original, edited) {
  const changed = {};
  for (const key in edited) {
    if (JSON.stringify(edited[key]) !== JSON.stringify(original[key])) {
      changed[key] = edited[key];
    }
  }
  return changed;
}

/* ---- Local building blocks, styled to match the archive/letterhead theme ---- */

const fieldClass = "rounded-none border focus-visible:ring-1";
const fieldStyle = { backgroundColor: FIELD, borderColor: LINE };

const FieldLabel = ({ icon: Icon, children }) => (
  <Label
    className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase"
    style={{ color: MUTED }}
  >
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </Label>
);

const SectionCard = ({ id, icon: Icon, eyebrow, title, count, children }) => (
  <Card
    className="border rounded-none shadow-none"
    style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
  >
    <div
      className="px-6 pt-5 pb-4 border-b flex items-center justify-between"
      style={{ borderColor: LINE }}
      id={id}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 flex items-center justify-center border"
          style={{ borderColor: LINE, backgroundColor: PAPER }}
        >
          <Icon className="w-4 h-4" style={{ color: RUST }} strokeWidth={1.5} />
        </div>
        <div>
          {eyebrow && (
            <div className="font-mono text-[10px] tracking-widest mb-0.5" style={{ color: MUTED }}>
              {eyebrow}
            </div>
          )}
          <h3 className="font-display text-lg font-medium" style={{ color: INK }}>
            {title}
          </h3>
        </div>
      </div>
      {typeof count === "number" && (
        <span className="font-mono text-[11px] tracking-widest" style={{ color: MUTED }}>
          {String(count).padStart(2, "0")} {count === 1 ? "ENTRY" : "ENTRIES"}
        </span>
      )}
    </div>
    <CardContent className="p-6">{children}</CardContent>
  </Card>
);

const EmptyState = ({ label }) => (
  <div
    className="text-center py-8 px-4 border mb-4"
    style={{ borderStyle: "dashed", borderColor: "#D8D6CE", backgroundColor: PAPER }}
  >
    <p className="text-sm" style={{ color: MUTED }}>
      Nothing on file yet — add your first {label}.
    </p>
  </div>
);

const AddButton = ({ onClick, label }) => (
  <Button
    variant="outline"
    onClick={onClick}
    className="w-full rounded-none border-dashed font-mono text-xs tracking-widest uppercase transition-colors"
    style={{ borderColor: "#D8D6CE", color: MUTED }}
  >
    <Plus className="w-4 h-4 mr-2" />
    {label}
  </Button>
);

const RemoveButton = ({ onClick }) => (
  <Button
    variant="ghost"
    size="sm"
    className="rounded-none hover:bg-transparent"
    style={{ color: MUTED }}
    onClick={onClick}
    onMouseEnter={e => (e.currentTarget.style.color = RUST)}
    onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
  >
    <Minus className="w-4 h-4" />
  </Button>
);

const EntryCard = ({ index, label, onRemove, children }) => (
  <div className="border p-6 space-y-4" style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}>
    <div className="flex justify-between items-start">
      <h4 className="font-mono text-[11px] tracking-widest uppercase" style={{ color: RUST }}>
        {label} · {String(index + 1).padStart(2, "0")}
      </h4>
      <RemoveButton onClick={onRemove} />
    </div>
    {children}
  </div>
);

const Page = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const [editdata, setEditdata] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    jobRole: "",
    summary: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certificates: [],
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchResumeById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/resume/getResumeById/${id}`);
      setEditdata(res.data.data);
      setOriginalData(res.data.data);
    } catch (error) {
      console.error(error?.message || "Failed to fetch resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchResumeById();
    // eslint-disable-next-line
  }, [id]);

  const handleInputChange = (field, value) => {
    setEditdata(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayItemChange = (arrayName, index, field, value) => {
    setEditdata(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (arrayName, newItem) => {
    setEditdata(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setEditdata(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!originalData) return;
    setSaving(true);
    try {
      const changedFields = getChangedFields(originalData, editdata);
      if (Object.keys(changedFields).length === 0) {
        toast.info("No changes to save.");
        setSaving(false);
        return;
      }
      await axios.patch(`/api/resume/update/${id}`, changedFields);
      toast.success("Resume saved successfully!");
      setOriginalData(editdata); // update originalData to new state
    } catch (error) {
      toast.error(error.message || "Error saving resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const hasUnsavedChanges = useMemo(() => {
    if (!originalData) return false;
    return Object.keys(getChangedFields(originalData, editdata)).length > 0;
  }, [originalData, editdata]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: PAPER }}
      >
        <FontImports />
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: RUST }} />
          <p className="font-mono text-xs tracking-widest" style={{ color: MUTED }}>
            LOADING RECORD…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAPER }}>
      <FontImports />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Letterhead */}
        <div
          className="pb-6 border-b-2 flex flex-col md:flex-row md:items-end justify-between gap-4"
          style={{ borderColor: INK }}
        >
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-3 text-sm font-medium transition-colors"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = INK)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div
              className="font-mono text-[11px] tracking-widest mb-2 flex items-center gap-2"
              style={{ color: RUST }}
            >
              DRAFT ON FILE
              {hasUnsavedChanges && (
                <span className="inline-flex items-center gap-1" style={{ color: "#B08900" }}>
                  · UNSAVED CHANGES
                </span>
              )}
            </div>
            <h1
              className="font-display text-3xl font-medium"
              id="tour-edit-header"
              style={{ color: INK }}
            >
              Edit Resume
            </h1>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>
              Update your professional details to keep your record current.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-none h-11 px-8 text-white shadow-none w-full md:w-auto"
            style={{ backgroundColor: INK }}
            id="tour-save-button"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Personal Information */}
        <SectionCard
          id="tour-personal-info"
          icon={User}
          eyebrow="SECTION 01"
          title="Personal Information"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  value={editdata.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
              <div className="space-y-2">
                <FieldLabel>Job Role</FieldLabel>
                <Input
                  value={editdata.jobRole}
                  onChange={e => handleInputChange("jobRole", e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <FieldLabel icon={Mail}>Email</FieldLabel>
                <Input
                  type="email"
                  value={editdata.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
              <div className="space-y-2">
                <FieldLabel icon={Phone}>Phone Number</FieldLabel>
                <Input
                  value={editdata.phone_no}
                  onChange={e => handleInputChange("phone_no", e.target.value)}
                  placeholder="Your phone number"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel icon={MapPin}>Address</FieldLabel>
              <Textarea
                value={editdata.address}
                onChange={e => handleInputChange("address", e.target.value)}
                placeholder="Your full address"
                rows={2}
                className={fieldClass}
                style={fieldStyle}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <FieldLabel icon={Github}>GitHub</FieldLabel>
                <Input
                  value={editdata.github}
                  onChange={e => handleInputChange("github", e.target.value)}
                  placeholder="GitHub profile URL"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
              <div className="space-y-2">
                <FieldLabel icon={Linkedin}>LinkedIn</FieldLabel>
                <Input
                  value={editdata.linkedin}
                  onChange={e => handleInputChange("linkedin", e.target.value)}
                  placeholder="LinkedIn profile URL"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
              <div className="space-y-2">
                <FieldLabel icon={Globe}>Portfolio</FieldLabel>
                <Input
                  value={editdata.portfolio}
                  onChange={e => handleInputChange("portfolio", e.target.value)}
                  placeholder="Portfolio website URL"
                  className={fieldClass}
                  style={fieldStyle}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel>Professional Summary</FieldLabel>
              <Textarea
                value={editdata.summary}
                onChange={e => handleInputChange("summary", e.target.value)}
                placeholder="Brief description of your professional background and goals"
                rows={4}
                className={fieldClass}
                style={fieldStyle}
              />
            </div>
          </div>
        </SectionCard>

        {/* Skills */}
        <SectionCard
          id="tour-skills-card"
          icon={Code}
          eyebrow="SECTION 02"
          title="Skills"
          count={editdata.skills.length}
        >
          <div className="space-y-3">
            {editdata.skills.length === 0 && <EmptyState label="skill" />}
            {editdata.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 border"
                style={{ backgroundColor: PAPER, borderColor: LINE }}
              >
                <div className="flex-1">
                  <Input
                    value={skill.name}
                    onChange={e => handleArrayItemChange("skills", index, "name", e.target.value)}
                    placeholder="Skill name"
                    className="rounded-none border"
                    style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
                  />
                </div>
                <div className="w-32">
                  <Input
                    value={skill.level}
                    onChange={e => handleArrayItemChange("skills", index, "level", e.target.value)}
                    placeholder="Level"
                    className="rounded-none border font-mono text-xs"
                    style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
                  />
                </div>
                <RemoveButton onClick={() => removeArrayItem("skills", index)} />
              </div>
            ))}
            <AddButton
              onClick={() => addArrayItem("skills", { name: "", level: "" })}
              label="Add Skill"
            />
          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard
          id="tour-experience-card"
          icon={Briefcase}
          eyebrow="SECTION 03"
          title="Experience"
          count={editdata.experience.length}
        >
          <div className="space-y-6">
            {editdata.experience.length === 0 && <EmptyState label="role" />}
            {editdata.experience.map((exp, index) => (
              <EntryCard
                key={index}
                index={index}
                label="Role"
                onRemove={() => removeArrayItem("experience", index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Job Title</FieldLabel>
                    <Input
                      value={exp.position}
                      onChange={e =>
                        handleArrayItemChange("experience", index, "position", e.target.value)
                      }
                      placeholder="Job title"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Company</FieldLabel>
                    <Input
                      value={exp.companyName}
                      onChange={e =>
                        handleArrayItemChange("experience", index, "companyName", e.target.value)
                      }
                      placeholder="Company name"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Start Date</FieldLabel>
                    <Input
                      value={formatDate(exp.startDate)}
                      onChange={e =>
                        handleArrayItemChange("experience", index, "startDate", e.target.value)
                      }
                      placeholder="Start date"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>End Date</FieldLabel>
                    <Input
                      value={formatDate(exp.endDate)}
                      onChange={e =>
                        handleArrayItemChange("experience", index, "endDate", e.target.value)
                      }
                      placeholder="End date"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={exp.description}
                    onChange={e =>
                      handleArrayItemChange("experience", index, "description", e.target.value)
                    }
                    placeholder="Describe your role and achievements"
                    rows={3}
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
              </EntryCard>
            ))}
            <AddButton
              onClick={() =>
                addArrayItem("experience", {
                  position: "",
                  companyName: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              label="Add Experience"
            />
          </div>
        </SectionCard>

        {/* Education */}
        <SectionCard
          id="tour-education-card"
          icon={GraduationCap}
          eyebrow="SECTION 04"
          title="Education"
          count={editdata.education.length}
        >
          <div className="space-y-6">
            {editdata.education.length === 0 && <EmptyState label="degree" />}
            {editdata.education.map((edu, index) => (
              <EntryCard
                key={index}
                index={index}
                label="Degree"
                onRemove={() => removeArrayItem("education", index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Degree</FieldLabel>
                    <Input
                      value={edu.degree}
                      onChange={e =>
                        handleArrayItemChange("education", index, "degree", e.target.value)
                      }
                      placeholder="Degree name"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Institution</FieldLabel>
                    <Input
                      value={edu.institution}
                      onChange={e =>
                        handleArrayItemChange("education", index, "institution", e.target.value)
                      }
                      placeholder="Institution name"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Start Year</FieldLabel>
                    <Input
                      value={formatDate(edu.startYear)}
                      onChange={e =>
                        handleArrayItemChange("education", index, "startYear", e.target.value)
                      }
                      placeholder="Start year"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>End Year</FieldLabel>
                    <Input
                      value={formatDate(edu.endYear)}
                      onChange={e =>
                        handleArrayItemChange("education", index, "endYear", e.target.value)
                      }
                      placeholder="End year"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Grade/Score</FieldLabel>
                  <Input
                    value={edu.grade}
                    onChange={e =>
                      handleArrayItemChange("education", index, "grade", e.target.value)
                    }
                    placeholder="CGPA/Percentage"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={edu.description}
                    onChange={e =>
                      handleArrayItemChange("education", index, "description", e.target.value)
                    }
                    placeholder="Describe your education"
                    rows={2}
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
              </EntryCard>
            ))}
            <AddButton
              onClick={() =>
                addArrayItem("education", {
                  degree: "",
                  institution: "",
                  startYear: "",
                  endYear: "",
                  grade: "",
                  description: "",
                })
              }
              label="Add Education"
            />
          </div>
        </SectionCard>

        {/* Projects */}
        <SectionCard
          id="tour-projects-card"
          icon={FolderOpen}
          eyebrow="SECTION 05"
          title="Projects"
          count={editdata.projects.length}
        >
          <div className="space-y-6">
            {editdata.projects.length === 0 && <EmptyState label="project" />}
            {editdata.projects.map((project, index) => (
              <EntryCard
                key={index}
                index={index}
                label="Project"
                onRemove={() => removeArrayItem("projects", index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      value={project.title}
                      onChange={e =>
                        handleArrayItemChange("projects", index, "title", e.target.value)
                      }
                      placeholder="Project title"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Role/Type</FieldLabel>
                    <Input
                      value={project.roleOrType}
                      onChange={e =>
                        handleArrayItemChange("projects", index, "roleOrType", e.target.value)
                      }
                      placeholder="Role or type"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Organization</FieldLabel>
                    <Input
                      value={project.organization}
                      onChange={e =>
                        handleArrayItemChange("projects", index, "organization", e.target.value)
                      }
                      placeholder="Organization"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Date</FieldLabel>
                    <Input
                      value={project.date}
                      onChange={e =>
                        handleArrayItemChange("projects", index, "date", e.target.value)
                      }
                      placeholder="Date"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Technologies/Topics</FieldLabel>
                  <Input
                    value={project.technologiesOrTopics}
                    onChange={e =>
                      handleArrayItemChange(
                        "projects",
                        index,
                        "technologiesOrTopics",
                        e.target.value
                      )
                    }
                    placeholder="Technologies or topics"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={project.description}
                    onChange={e =>
                      handleArrayItemChange("projects", index, "description", e.target.value)
                    }
                    placeholder="Project description"
                    rows={3}
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
              </EntryCard>
            ))}
            <AddButton
              onClick={() =>
                addArrayItem("projects", {
                  title: "",
                  roleOrType: "",
                  organization: "",
                  date: "",
                  technologiesOrTopics: "",
                  description: "",
                })
              }
              label="Add Project"
            />
          </div>
        </SectionCard>

        {/* Certificates */}
        <SectionCard
          id="tour-certificates-card"
          icon={BadgeCheck}
          eyebrow="SECTION 06"
          title="Certificates"
          count={editdata.certificates?.length || 0}
        >
          <div className="space-y-6">
            {(!editdata.certificates || editdata.certificates.length === 0) && (
              <EmptyState label="certificate" />
            )}
            {editdata.certificates?.map((cert, index) => (
              <EntryCard
                key={index}
                index={index}
                label="Certificate"
                onRemove={() => removeArrayItem("certificates", index)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      value={cert.title}
                      onChange={e =>
                        handleArrayItemChange("certificates", index, "title", e.target.value)
                      }
                      placeholder="Certificate title"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Issued By</FieldLabel>
                    <Input
                      value={cert.organization}
                      onChange={e =>
                        handleArrayItemChange("certificates", index, "issuedBy", e.target.value)
                      }
                      placeholder="Issuing organization"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FieldLabel>Issue Date</FieldLabel>
                    <Input
                      value={formatDate(cert.year)}
                      onChange={e =>
                        handleArrayItemChange("certificates", index, "issueDate", e.target.value)
                      }
                      placeholder="Issue date"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Credential URL</FieldLabel>
                    <Input
                      value={cert.credentialUrl}
                      onChange={e =>
                        handleArrayItemChange(
                          "certificates",
                          index,
                          "credentialUrl",
                          e.target.value
                        )
                      }
                      placeholder="Link to credential"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>
              </EntryCard>
            ))}
            <AddButton
              onClick={() =>
                addArrayItem("certificates", {
                  title: "",
                  organization: "",
                  year: "",
                  credentialUrl: "",
                })
              }
              label="Add Certificate"
            />
          </div>
        </SectionCard>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pb-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-none"
            style={{ borderColor: LINE, color: INK }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-none px-8 text-white shadow-none"
            style={{ backgroundColor: INK }}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? "Saving..." : "Save Resume"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
