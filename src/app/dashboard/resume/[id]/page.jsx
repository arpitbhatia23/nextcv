"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Minus,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Loader2,
  ArrowLeft
} from "lucide-react";
import axios from "axios";
import { formatDate } from "@/utils/datefromater";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function getChangedFields(original, edited) {
  const changed = {};
  for (const key in edited) {
    if (JSON.stringify(edited[key]) !== JSON.stringify(original[key])) {
      changed[key] = edited[key];
    }
  }
  return changed;
}

const page = ({ params }) => {
  const { id } = React.use(params);
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
      console.error("Failed to fetch resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchResumeById();
    // eslint-disable-next-line
  }, [id]);

  const handleInputChange = (field, value) => {
    setEditdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayItemChange = (arrayName, index, field, value) => {
    setEditdata((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (arrayName, newItem) => {
    setEditdata((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setEditdata((prev) => ({
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
      toast.error("Error saving resume. Please try again.");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
     </div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
                onClick={() => router.back()} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-2 text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Edit Resume
            </h1>
            <p className="text-slate-500 mt-1">
              Update your professional details to keep your resume fresh.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm px-8"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="shadow-sm border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <User className="w-4 h-4 text-indigo-600" />
              </div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-600">Full Name</Label>
                <Input
                  id="name"
                  value={editdata.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobRole" className="text-slate-600">Job Role</Label>
                <Input
                  id="jobRole"
                  value={editdata.jobRole}
                  onChange={(e) => handleInputChange("jobRole", e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editdata.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={editdata.phone_no}
                  onChange={(e) =>
                    handleInputChange("phone_no", e.target.value)
                  }
                  placeholder="Your phone number"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5" />
                Address
              </Label>
              <Textarea
                id="address"
                value={editdata.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Your full address"
                rows={2}
                className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2 text-slate-600">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={editdata.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="GitHub profile URL"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2"> 
                <Label htmlFor="linkedin" className="flex items-center gap-2 text-slate-600">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={editdata.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  placeholder="LinkedIn profile URL"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio" className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-3.5 h-3.5" />
                  Portfolio
                </Label>
                <Input
                  id="portfolio"
                  value={editdata.portfolio}
                  onChange={(e) =>
                    handleInputChange("portfolio", e.target.value)
                  }
                  placeholder="Portfolio website URL"
                  className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-slate-600">Professional Summary</Label>
              <Textarea
                id="summary"
                value={editdata.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Brief description of your professional background and goals"
                rows={4}
                className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="shadow-sm border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <Code className="w-4 h-4 text-indigo-600" />
              </div>
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {editdata.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "skills",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Skill name"
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      value={skill.level}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "skills",
                          index,
                          "level",
                          e.target.value
                        )
                      }
                      placeholder="Level"
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 hover:text-red-600 shrink-0"
                    onClick={() => removeArrayItem("skills", index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem("skills", { name: "", level: "" })}
                className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="shadow-sm border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {editdata.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white relative group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-700">
                      Experience {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("experience", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Job Title</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "experience",
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        placeholder="Job title"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">Company</Label>
                      <Input
                        value={exp.companyName}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "experience",
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        placeholder="Company name"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Start Date</Label>
                      <Input
                        value={formatDate(exp.startDate)}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "experience",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        placeholder="Start date"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">End Date</Label>
                      <Input
                        value={formatDate(exp.endDate)}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "experience",
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="End date"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "experience",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe your role and achievements"
                      rows={3}
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() =>
                  addArrayItem("experience", {
                    position: "",
                    companyName: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="shadow-sm border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <GraduationCap className="w-4 h-4 text-indigo-600" />
              </div>
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {editdata.education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-700">
                      Education {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("education", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        placeholder="Degree name"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="Institution name"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600">Start Year</Label>
                      <Input
                        value={formatDate(edu.startYear)}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "startYear",
                            e.target.value
                          )
                        }
                        placeholder="Start year"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">End Year</Label>
                      <Input
                        value={formatDate(edu.endYear)}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "education",
                            index,
                            "endYear",
                            e.target.value
                          )
                        }
                        placeholder="End year"
                        className="bg-slate-50 border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Grade/Score</Label>
                    <Input
                      value={edu.grade}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "education",
                          index,
                          "grade",
                          e.target.value
                        )
                      }
                      placeholder="CGPA/Percentage"
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Description</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "education",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe your education"
                      rows={2}
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
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
                className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-sm border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                 <FolderOpen className="w-4 h-4 text-indigo-600" />
              </div>
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {editdata.projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-700">
                      Project {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => removeArrayItem("projects", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label className="text-slate-600">Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "projects",
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Project title"
                          className="bg-slate-50 border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600">Role/Type</Label>
                        <Input
                          value={project.roleOrType}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "projects",
                              index,
                              "roleOrType",
                              e.target.value
                            )
                          }
                          placeholder="Role or type"
                          className="bg-slate-50 border-slate-200"
                        />
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label className="text-slate-600">Organization</Label>
                        <Input
                          value={project.organization}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "projects",
                              index,
                              "organization",
                              e.target.value
                            )
                          }
                          placeholder="Organization"
                          className="bg-slate-50 border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600">Date</Label>
                        <Input
                          value={project.date}
                          onChange={(e) =>
                            handleArrayItemChange(
                              "projects",
                              index,
                              "date",
                              e.target.value
                            )
                          }
                          placeholder="Date"
                          className="bg-slate-50 border-slate-200"
                        />
                      </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Technologies/Topics</Label>
                    <Input
                      value={project.technologiesOrTopics}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          "technologiesOrTopics",
                          e.target.value
                        )
                      }
                      placeholder="Technologies or topics"
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "projects",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Project description"
                      rows={3}
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
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
                className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end gap-4">
            <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
                Cancel
            </Button>
            <Button
                onClick={handleSave}
                disabled={saving}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-200 px-8"
            >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Save className="w-4 h-4 mr-2" />}
                {saving ? "Saving..." : "Save Resume"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
