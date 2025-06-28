"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Copy,
  Download,
  Trash2,
  Calendar,
  Eye,
  MoreVertical,
  Plus,
  Filter,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Document } from "react-pdf";

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const mockResumes = [
      {
        _id: "1",
        name: "Alex Johnson",
        ResumeType: "modernTemplate",
        status: "paid",
        createdAt: "2025-06-12T00:00:00Z",
        updatedAt: "2025-06-12T00:00:00Z",
        email: "alex@example.com",
        phone_no: "+1234567890",
        summary:
          "Experienced software developer with 5+ years in full-stack development...",
        skills: ["React", "Node.js", "Python", "AWS"],
        experience: [
          {
            jobTitle: "Senior Developer",
            company: "Tech Corp",
            startDate: "2023-01-01",
            endDate: "2025-06-01",
            description: "Led development of multiple web applications",
          },
        ],
      },
      {
        _id: "2",
        name: "Sarah Smith",
        ResumeType: "classicTemplate",
        status: "paid",
        createdAt: "2025-06-10T00:00:00Z",
        updatedAt: "2025-06-25T00:00:00Z",
        email: "sarah@example.com",
        phone_no: "+1234567891",
        summary:
          "Marketing professional with expertise in digital campaigns...",
        skills: ["Digital Marketing", "SEO", "Analytics", "Content Strategy"],
        experience: [
          {
            jobTitle: "Marketing Manager",
            company: "Marketing Inc",
            startDate: "2022-03-01",
            endDate: "2025-06-01",
            description: "Managed multi-channel marketing campaigns",
          },
        ],
      },
      {
        _id: "3",
        name: "John Doe",
        ResumeType: "MinimalistTemplate",
        status: "draft",
        createdAt: "2025-06-08T00:00:00Z",
        updatedAt: "2025-06-20T00:00:00Z",
        email: "john@example.com",
        phone_no: "+1234567892",
        summary:
          "Recent graduate seeking entry-level position in data science...",
        skills: ["Python", "Machine Learning", "SQL", "Tableau"],
        experience: [],
      },
      {
        _id: "4",
        name: "Emily Davis",
        ResumeType: "MordenBluesidebar",
        status: "draft",
        createdAt: "2025-06-05T00:00:00Z",
        updatedAt: "2025-06-18T00:00:00Z",
        email: "emily@example.com",
        phone_no: "+1234567893",
        summary:
          "UI/UX Designer with passion for creating intuitive user experiences...",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        experience: [
          {
            jobTitle: "Junior Designer",
            company: "Design Studio",
            startDate: "2024-01-01",
            endDate: "2024-12-01",
            description: "Created user interfaces for mobile applications",
          },
        ],
      },
    ];

    setTimeout(() => {
      setResumes(mockResumes);
      setLoading(false);
    }, 1000);
  }, []);

  const getTemplateDisplayName = (templateKey) => {
    const templateNames = {
      modernTemplate: "Modern",
      classicTemplate: "Classic",
      MinimalistTemplate: "Minimalist",
      MordenBluesidebar: "Modern Blue Sidebar",
      ModernFullStack: "Modern Full Stack",
      Businessanlayist: "Business Analyst",
    };
    return templateNames[templateKey] || templateKey;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Edited 1 day ago";
    if (diffDays < 30) return `Edited ${diffDays} days ago`;
    if (diffDays < 365) return `Edited ${Math.ceil(diffDays / 30)} months ago`;
    return `Edited ${Math.ceil(diffDays / 365)} years ago`;
  };

  const handleDownload = (resumeId) => {
    console.log("Download resume:", resumeId);
  };

  const handleDelete = (resumeId) => {
    console.log("Delete resume:", resumeId);
    // Delete resume logic
    setResumes(resumes.filter((resume) => resume._id !== resumeId));
  };

  const handleViewResume = (resumeId) => {
    console.log("View versions:", resumeId);
    setIsModelOpen(true);
    console.log(isModelOpen);
  };

  const ResumeCard = ({ resume }) => (
    <Card className="group hover:shadow-xl transition-all duration-200 border border-pink-200 hover:border-pink-400 rounded-lg">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge
              variant={resume.status === "paid" ? "default" : "secondary"}
              className={`uppercase px-3 py-1 text-xs font-bold tracking-wide ${
                resume.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {resume.status}
            </Badge>
            <span className="text-xs text-gray-400">
              {formatDate(resume.updatedAt)}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleDownload(resume._id)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(resume._id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center"
            onClick={() => handleViewResume(resume._id)}
          >
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
              {resume.name}
            </h3>
            <div className="text-xs text-gray-500">
              Template: {getTemplateDisplayName(resume.ResumeType)}
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Calendar className="h-3 w-3 mr-1" />
          Created on{" "}
          {new Date(resume.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        {/* <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => handleEdit(resume._id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={() => handleDownload(resume._id)}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
  const paidResumes = resumes.filter((resume) => resume.status === "paid");
  const draftResumes = resumes.filter((resume) => resume.status === "draft");

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
        <p className="text-gray-600">
          Manage and organize all your resumes in one place
        </p>
      </div>
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50">
          <Card className="relative w-full max-w-2xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsModelOpen(false)}
              aria-label="Close"
            >
              <X />
            </Button>
            <CardContent>
              {/* Replace this with your PDF viewer or resume preview */}
              <div className="text-center py-12 text-lg text-gray-700">
                Resume PDF Preview
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <Tabs defaultValue="My-Resume" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="My-Resume" className="px-6">
              My Resume ({paidResumes.length})
            </TabsTrigger>
            <TabsTrigger value="Draft-Resume" className="px-6">
              Draft Resume ({draftResumes.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
        </div>

        <TabsContent value="My-Resume" className="mt-0">
          {paidResumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Edit className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No paid resumes yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first professional resume to get started
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paidResumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="Draft-Resume" className="mt-0">
          {draftResumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-400 mb-4">
                  <Edit className="h-12 w-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No draft resumes
                </h3>
                <p className="text-gray-600 mb-6">
                  Save work-in-progress resumes as drafts
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Start a New Draft
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {draftResumes.map((resume) => (
                <ResumeCard key={resume._id} resume={resume} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyResume;
