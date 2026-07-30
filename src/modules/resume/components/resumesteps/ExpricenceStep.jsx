"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Briefcase, Edit2, Trash2, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Textarea } from "@/shared/components/ui/textarea";

import { Tips } from "../Tips";
import { useAiGeneration } from "../../hooks/useAiGeneation";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

/* Fonts: Fraunces for the section title, IBM Plex Mono for eyebrows,
   labels, and helper text — matches BasicInfoStep / EducationStep / SkillStep. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const inputClass =
  "rounded-none border transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm";
const inputStyle = { backgroundColor: "#F7F7F5", borderColor: "#E4E2DC", color: "#1C2333" };

const ExperienceStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const [experienceList, setExperienceList] = useState(formData.experience || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/projects");
  }, [router]);

  const form = useForm({
    defaultValues: {
      companyName: "",
      position: "",
      startDate: "",
      endDate: "",
      work: [],
      tools: [],
      description: "",
    },
  });

  useEffect(() => {
    if (experienceList.length > 0) {
      updateForm({ experience: experienceList });
    }
  }, [experienceList]);
  useEffect(() => {
    setExperienceList(formData.experience);
  }, [formData.experience]);

  const onSubmit = values => {
    if (isEditing) {
      setExperienceList(prev =>
        prev.map(exp => (exp.id === editingId ? { ...values, id: editingId } : exp))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setExperienceList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = experience => {
    form.reset(experience);
    setIsEditing(true);
    setEditingId(experience.id);
  };

  const handleDelete = id => {
    setExperienceList(prev => prev.filter(exp => exp.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const { handleAiGeneration, isGenerating } = useAiGeneration({
    form,
    type: "experience",
    jobDescription: formData.jobDescription,
  });
  return (
    <div className="py-4 md:py-8" style={{ backgroundColor: "#F7F7F5" }}>
      <FontImports />

      <div className="mb-2 pb-4 border-b-2" style={{ borderColor: "#1C2333" }}>
        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "#B3382C" }}>
          STEP 05 — WORK EXPERIENCE
        </div>
        <h2 className="font-display text-lg md:text-xl font-medium" style={{ color: "#1C2333" }}>
          Work Experience
        </h2>
        <p className="text-[10px] md:text-xs mt-1" style={{ color: "#6B7280" }}>
          Add your professional experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="rounded-none border shadow-none py-0 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
          id="tour-experience-form"
        >
          <CardHeader
            className="border-b p-3 gap-0 pb-0 flex flex-row justify-between items-center"
            style={{ borderColor: "#E4E2DC" }}
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              {isEditing ? "EDIT EXPERIENCE" : "ADD EXPERIENCE"}
            </CardTitle>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-7 rounded-none font-mono text-[10px] md:text-xs hover:bg-transparent"
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        COMPANY NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Google"
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
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        POSITION/ROLE
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Developer"
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
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          START DATE
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
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          END DATE
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
                  name="work"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        RESPONSIBILITIES (COMMA SEPARATED)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. UI dev, API"
                          className={inputClass}
                          style={inputStyle}
                          value={
                            Array.isArray(field.value) ? field.value.join(", ") : field.value || ""
                          }
                          onChange={e =>
                            field.onChange(
                              e.target.value ? e.target.value.split(",").map(s => s.trim()) : []
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        TOOLS (COMMA SEPARATED)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. React, Docker"
                          className={inputClass}
                          style={inputStyle}
                          value={
                            Array.isArray(field.value) ? field.value.join(", ") : field.value || ""
                          }
                          onChange={e =>
                            field.onChange(
                              e.target.value ? e.target.value.split(",").map(s => s.trim()) : []
                            )
                          }
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
                          className="h-6 rounded-none font-mono text-[10px] tracking-widest hover:bg-transparent"
                          style={{ color: "#B3382C" }}
                          disabled={isGenerating}
                          onClick={handleAiGeneration}
                          id="tour-ai-button"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {isGenerating
                            ? "AI WRITING..."
                            : form.watch("description")?.trim()
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
                            className={`rounded-none border resize-none text-xs md:text-sm placeholder:text-[10px] md:placeholder:text-sm transition-all ${
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
                    className="w-full rounded-none text-white shadow-none h-10 md:h-11 font-mono text-xs md:text-sm tracking-widest"
                    style={{ backgroundColor: "#B3382C" }}
                  >
                    {isEditing ? "UPDATE EXPERIENCE" : "SAVE EXPERIENCE"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="border p-4 md:p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
            id="tour-experience-list"
          >
            <h3
              className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2 mb-4"
              style={{ color: "#6B7280" }}
            >
              <Briefcase className="w-4 h-4" style={{ color: "#B3382C" }} /> Career Journey
            </h3>

            {experienceList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No experience added.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {experienceList.map((exp, index) => (
                  <div
                    key={index}
                    className="p-3 md:p-4 border flex flex-col gap-2 group transition-colors"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-display font-medium text-xs md:text-sm truncate"
                          style={{ color: "#1C2333" }}
                        >
                          {exp.position}
                        </h4>
                        <div
                          className="font-mono text-[10px] md:text-xs truncate mt-0.5"
                          style={{ color: "#B3382C" }}
                        >
                          {exp.companyName}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleEdit(exp)}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleDelete(exp.id)}
                        >
                          <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div
                      className="font-mono text-[9px] md:text-xs self-start px-2 py-0.5 md:py-1"
                      style={{ color: "#6B7280", backgroundColor: "#F7F7F5" }}
                    >
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>

                    {exp.description && (
                      <p
                        className="text-[10px] md:text-xs line-clamp-2 mt-1 italic border-l-2 pl-2"
                        style={{ color: "#6B7280", borderColor: "#E4E2DC" }}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Tips section={"experience"} />
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/builder/skills")}
              className="rounded-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ borderColor: "#E4E2DC", color: "#1C2333" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> PREVIOUS
            </Button>
            <Button
              onClick={() => router.push("/dashboard/builder/projects")}
              className="rounded-none text-white shadow-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ backgroundColor: "#B3382C" }}
              id="tour-next-button"
            >
              PROJECTS INFO <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExperienceStep);
