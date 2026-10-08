"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, FolderKanban, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

import { Tips } from "../Tips";
import { useAiGeneration } from "../../hooks/useAiGeneation";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import posthog from "@/shared/utils/posthog";
import { FontImports } from "../fontImport";

const inputClass =
  "rounded-none! border transition-all h-10 md:h-11 text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 focus-visible:ring-[#465B9E]";
const inputStyle = { backgroundColor: "#F8F7F3", borderColor: "#E3E2DC", color: "#17201C" };

const ProjectsStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const [projectList, setProjectList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "project",
      step_number: 6,
    });
    router.prefetch("/dashboard/builder/certificate");
  }, [router]);

  const EMPTY_FORM = {
    title: "",
    roleOrType: "",
    organization: "",
    date: "",
    technologiesOrTopics: "",
    link: "",
    description: "",
    features: "",
  };
  const form = useForm({
    defaultValues: {
      title: "",
      roleOrType: "",
      organization: "",
      date: "",
      technologiesOrTopics: "",
      link: "",
      description: "",
      features: "",
    },
  });

  // Sync local list → store on every change (including empty array deletions)
  useEffect(() => {
    if (formData.projects.length > 0) {
      console.log(formData.projects[0].id);
      setProjectList(
        (formData.projects || []).map((p, i) => {
          return { ...p, id: p.id ?? Date.now() + i };
        })
      );
    }
  }, [formData.projects]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onSubmit = values => {
    if (isEditing) {
      const updatedproject = { ...values, id: editingId };
      setProjectList(prev => prev.map(proj => (proj.id === editingId ? updatedproject : proj)));
      updateForm({
        projects: formData.projects.map(item => (item.id === editingId ? updatedproject : item)),
      });

      setIsEditing(false);
      setEditingId(null);
    } else {
      const updatedProject = { ...values, id: Date.now() };
      setProjectList(prev => [...prev, updatedProject]);
      updateForm({ projects: [...formData.projects, updatedProject] });
    }
    form.reset(EMPTY_FORM);
  };

  const handleEdit = project => {
    const descValue = Array.isArray(project.description)
      ? project.description.join("\n")
      : String(project.description ?? "");

    form.reset({ ...project, description: descValue });
    setIsEditing(true);
    setEditingId(project.id);
  };

  const handleDelete = id => {
    console.log(id, formData.projects);
    const updatedporject = projectList.filter(proj => proj.id !== id);
    console.log(updatedporject);
    setProjectList(updatedporject);
    updateForm({ projects: updatedporject });
  };

  const cancelEdit = () => {
    form.reset(EMPTY_FORM);
    setIsEditing(false);
    setEditingId(null);
  };
  const { handleAiGeneration, isGenerating } = useAiGeneration({
    type: "project",
    form,
    jobDescription: formData.jobDescription,
  });

  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />

      <div className="mb-2 pb-4 border-b border-[#E3E2DC]">
        <div className="font-mono text-[10px] tracking-widest mb-1 text-[#465B9E]">
          STEP 06 — PROJECTS
        </div>
        <h2 className="font-display text-xl md:text-2xl font-medium text-[#17201C]">
          Projects (optional)
        </h2>
        <p className="text-xs md:text-sm mt-1 text-[#5B625C]">
          Highlight your best work, portfolio projects, and technical initiatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="border rounded-none! border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white"
          id="tour-projects-form"
        >
          <CardHeader className="border-b border-[#E3E2DC] p-4 flex flex-row justify-between items-center">
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              {isEditing ? "EDIT PROJECT" : "ADD PROJECT"}
            </CardTitle>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-7 rounded-none!font-mono text-[10px] md:text-xs hover:bg-transparent"
                style={{ color: "#6B7280" }}
              >
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        PROJECT TITLE
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Portfolio Site"
                          {...field}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="roleOrType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          YOUR ROLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Lead"
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          DATE
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="month"
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="technologiesOrTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        TECH STACK
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. React, Tailwind"
                          {...field}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        PROJECT LINK
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/..."
                          {...field}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="flex justify-between items-center font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        DESCRIPTION
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 rounded-none!font-mono text-[10px] tracking-widest hover:bg-transparent"
                          style={{ color: "#B3382C" }}
                          disabled={isGenerating}
                          onClick={handleAiGeneration}
                          id="tour-ai-button"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {isGenerating
                            ? "AI WRITING..."
                            : String(form.watch("description") ?? "").trim()
                              ? "REFINE AI"
                              : "AI GENERATED"}
                        </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief records..."
                            rows={3}
                            {...field}
                            className={`rounded-none!border resize-none text-xs md:text-sm placeholder:text-[10px] md:placeholder:text-sm transition-all ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            style={inputStyle}
                            disabled={isGenerating}
                          />
                        </FormControl>

                        {isGenerating && (
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
                            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                          >
                            <div
                              className="flex items-center gap-2 font-mono text-[10px] tracking-widest animate-pulse"
                              style={{ color: "#B3382C" }}
                            >
                              <Sparkles className="w-3 h-3" /> GENERATING...
                            </div>
                          </div>
                        )}
                      </div>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full text-white shadow-xs h-10 md:h-11 font-sans text-xs md:text-sm font-medium tracking-wide bg-[#465B9E] hover:bg-[#344B93] transition-colors"
                  >
                    {isEditing ? "Update Project" : "Save Project"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="border p-4 md:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)] bg-white"
            style={{ borderColor: "#E3E2DC" }}
            id="tour-projects-list"
          >
            <h3 className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2 mb-4 text-[#5B625C]">
              <FolderKanban className="w-4 h-4 text-[#465B9E]" /> Portfolio Showcase
            </h3>

            {projectList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No projects added yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {projectList.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-3 md:p-4 border flex flex-col gap-2 group transition-colors"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-display font-medium text-xs md:text-sm truncate"
                          style={{ color: "#1C2333" }}
                        >
                          {project.title}
                        </h4>
                        <div
                          className="font-mono text-[10px] md:text-xs truncate mt-0.5"
                          style={{ color: "#B3382C" }}
                        >
                          {project.roleOrType}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none!hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleEdit(project)}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none!hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div
                      className="font-mono text-[9px] md:text-xs self-start px-2 py-0.5 md:py-1"
                      style={{ color: "#6B7280", backgroundColor: "#F7F7F5" }}
                    >
                      {project.technologiesOrTopics}
                    </div>

                    {project.description && (
                      <p
                        className="text-[10px] md:text-xs line-clamp-2 mt-1 italic border-l-2 pl-2"
                        style={{ color: "#6B7280", borderColor: "#E4E2DC" }}
                      >
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Tips section={"projects"} />

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/builder/experience")}
              className="h-10 px-4 md:px-5 font-sans text-xs md:text-sm font-medium border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={() => {
                posthog.capture("builder_step_complete", {
                  step: "project",
                  step_number: 6,
                });
                router.push("/dashboard/builder/certificate");
              }}
              className="text-white shadow-xs h-10 px-5 md:px-6 font-sans text-xs md:text-sm font-medium bg-[#465B9E] hover:bg-[#344B93] transition-colors"
              id="tour-next-button"
            >
              Certificates Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectsStep);
