"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, GraduationCap, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Tips } from "../Tips";
import { useAiGeneration } from "../../hooks/useAiGeneation";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

/* Fonts: Fraunces for the section title, IBM Plex Mono for eyebrows,
   labels, and helper text — matches BasicInfoStep. */
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

const EducationStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const [isloading, setIsLoading] = useState(false);

  const [educationList, setEducationList] = useState(formData.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/skills");
  }, [router]);

  const schema = z.object({
    degree: z.string().min(2, { message: "degree is required" }),
    institution: z.string().min(2, { message: "intustion is required" }),
    startYear: z.string({ message: "date is required" }),
    endYear: z.string({ message: "end date is required" }),
    grade: z.string({ message: "grade is required" }),
    description: z.string().nonempty("Please click 'Generate with AI' to create a description"),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      grade: "",
      description: "",
      jobDescription: formData.jobDescription,
    },
  });

  useEffect(() => {
    if (educationList.length > 0) {
      updateForm({ education: educationList });
    }
  }, [educationList]);
  useEffect(() => {
    setEducationList(formData.education);
  }, [formData.education]);

  const onSubmit = values => {
    if (isEditing) {
      setEducationList(prev =>
        prev.map(edu => (edu.id === editingId ? { ...values, id: editingId } : edu))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setEducationList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = education => {
    form.reset(education);
    setIsEditing(true);
    setEditingId(education.id);
  };

  const handleDelete = id => {
    setEducationList(prev => prev.filter(edu => edu.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const { handleAiGeneration, isGenerating } = useAiGeneration({ form, type: "education" });

  return (
    <div className="py-4 md:py-8" style={{ backgroundColor: "#F7F7F5" }}>
      <FontImports />

      <div className="mb-2 pb-4 border-b-2" style={{ borderColor: "#1C2333" }}>
        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "#B3382C" }}>
          STEP 03 — EDUCATION
        </div>
        <h2 className="font-display text-lg md:text-xl font-medium" style={{ color: "#1C2333" }}>
          Education
        </h2>
        <p className="text-[10px] md:text-xs mt-1" style={{ color: "#6B7280" }}>
          Add your academic background
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="rounded-none border shadow-none py-0 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
          id="tour-education-form"
        >
          <CardHeader
            className="border-b p-3 gap-0 pb-0 flex flex-row justify-between items-center"
            style={{ borderColor: "#E4E2DC" }}
          >
            <div>
              <CardTitle
                className="font-mono text-[10px] md:text-xs tracking-widest"
                style={{ color: "#6B7280" }}
              >
                {isEditing ? "EDIT EDUCATION" : "ADD EDUCATION"}
              </CardTitle>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-6 rounded-none font-mono text-[10px] md:text-xs hover:bg-transparent"
                style={{ color: "#6B7280" }}
              >
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-3 md:p-4 px-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        DEGREE/QUALIFICATION
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. B.Tech CS"
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
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        INSTITUTION/SCHOOL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. NIT Delhi"
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
                    name="startYear"
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
                    name="endYear"
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
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        GRADE/GPA
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 8.5 CGPA"
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
                              : "AI BULLET POINTS"}
                        </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief achievements..."
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
                    {isEditing ? "UPDATE ENTRY" : "SAVE QUALIFICATION"}
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
            id="tour-education-list"
          >
            <h3
              className="font-mono text-[10px] md:text-xs font-medium mb-4 flex items-center gap-2 uppercase tracking-widest"
              style={{ color: "#6B7280" }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: "#B3382C" }} /> Academic Timeline
            </h3>

            {educationList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No records added.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {educationList.map((edu, index) => (
                  <div
                    key={edu?.id || index}
                    className="p-3 md:p-4 border flex justify-between group transition-colors"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-display font-medium text-xs md:text-sm truncate"
                        style={{ color: "#1C2333" }}
                      >
                        {edu.degree}
                      </h4>
                      <div
                        className="font-mono text-[10px] md:text-xs truncate mt-0.5"
                        style={{ color: "#6B7280" }}
                      >
                        {edu.institution}
                      </div>
                      <div
                        className="font-mono text-[9px] md:text-xs mt-1"
                        style={{ color: "#B7B5AC" }}
                      >
                        {edu.startYear} - {edu.endYear || "Present"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                        style={{ color: "#B7B5AC" }}
                        onClick={() => handleEdit(edu)}
                      >
                        <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                        style={{ color: "#B7B5AC" }}
                        onClick={() => handleDelete(edu.id)}
                      >
                        <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Tips section={"education"} />

          <div className="flex justify-between items-center pt-3">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/builder/basicInfo")}
              className="rounded-none h-10 px-4 md:px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ borderColor: "#E4E2DC", color: "#1C2333" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> PREVIOUS
            </Button>
            <Button
              onClick={() => router.push("/dashboard/builder/skills")}
              className="rounded-none text-white shadow-none h-10 px-4 md:px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ backgroundColor: "#B3382C" }}
              id="tour-next-button"
            >
              SKILLS INFO <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EducationStep);
