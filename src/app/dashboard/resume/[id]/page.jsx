"use client";
import { useState, useEffect, use } from "react";
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
} from "lucide-react";
import axios from "axios";
import { formatDate } from "@/utils/datefromater";

const ResumeEditPage = ({ params }) => {
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
    skills: [], // [{ name: "", level: "" }]
    experience: [], // [{ position: "", companyName: "", startDate: "", endDate: "", description: "" }]
    education: [], // [{ degree: "", institution: "", startYear: "", endYear: "", grade: "", description: "" }]
    projects: [], // [{ title: "", roleOrType: "", organization: "", date: "", technologiesOrTopics: "", description: "" }]
  });
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchResumeById = async () => {
    setLoading(true);
    const res = await axios.get(`/api/resume/getResumeById/${id}`);
    setEditdata(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchResumeById();
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
    setSaving(true);
    try {
      await axios.post(`/api/resume/update/${id}`, editdata);
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Resume</h1>
            <p className="text-gray-600 mt-1">
              Update your professional information
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editdata.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="jobRole">Job Role</Label>
                <Input
                  id="jobRole"
                  value={editdata.jobRole}
                  onChange={(e) => handleInputChange("jobRole", e.target.value)}
                  placeholder="e.g., Full Stack Developer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editdata.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={editdata.phone_no}
                  onChange={(e) =>
                    handleInputChange("phone_no", e.target.value)
                  }
                  placeholder="Your phone number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={editdata.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Your full address"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={editdata.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  placeholder="GitHub profile URL"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={editdata.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  placeholder="LinkedIn profile URL"
                />
              </div>
              <div>
                <Label htmlFor="portfolio" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Portfolio
                </Label>
                <Input
                  id="portfolio"
                  value={editdata.portfolio}
                  onChange={(e) =>
                    handleInputChange("portfolio", e.target.value)
                  }
                  placeholder="Portfolio website URL"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={editdata.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Brief description of your professional background and goals"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {editdata.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
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
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("skills", index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem("skills", { name: "", level: "" })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {editdata.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Experience {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("experience", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title</Label>
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
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
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
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
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
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
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
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
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
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {editdata.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Education {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("education", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Degree</Label>
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
                      />
                    </div>
                    <div>
                      <Label>Institution</Label>
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
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Year</Label>
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
                      />
                    </div>
                    <div>
                      <Label>End Year</Label>
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
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Grade/Score</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
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
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {editdata.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">Project {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("projects", index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Title</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Role/Type</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Organization</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Date</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Technologies/Topics</Label>
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
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
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
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={saving}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Resume"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditPage;
