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
    },
  });

  useEffect(() => {
    updateForm({ education: educationList });
  }, [educationList]);

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
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Education</h2>
        <p className="text-[10px] md:text-sm text-slate-500">Add your academic background</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          id="tour-education-form"
        >
          <CardHeader className="border-b bg-slate-50/50 p-3 md:p-4 rounded-t-xl flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
                {isEditing ? "Edit Education" : "Add Education"}
              </CardTitle>
            </div>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-7 text-[10px] md:text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                        Degree/Qualification
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. B.Tech CS"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                        Institution/School
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. NIT Delhi"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type={"month"}
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">End Date</FormLabel>
                        <FormControl>
                          <Input
                            type={"month"}
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Grade/GPA</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 8.5 CGPA"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center text-slate-700 font-semibold text-xs md:text-sm">
                        Description
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold"
                          disabled={isGenerating}
                          onClick={handleAiGeneration}
                          id="tour-ai-button"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {isGenerating
                            ? "AI Writing..."
                            : form.watch("description")?.trim()
                              ? "Refine AI"
                              : "AI Bullet Points"}
                        </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief achievements..."
                            rows={3}
                            {...field}
                            className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all resize-none text-xs md:text-sm placeholder:text-[10px] ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            disabled={isGenerating}
                          />
                        </FormControl>

                        {isGenerating && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold animate-pulse">
                              <Sparkles className="w-3 h-3" /> Generating...
                            </div>
                          </div>
                        )}
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 md:h-11 rounded-lg text-xs md:text-sm"
                  >
                    {isEditing ? "Update Entry" : "Save Qualification"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="bg-slate-50 rounded-xl border border-slate-200 p-4 md:p-5"
            id="tour-education-list"
          >
            <h3 className="text-[10px] md:text-sm font-black text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-indigo-500" /> Academic Timeline
            </h3>

            {educationList.length === 0 ? (
              <div className="text-center py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                <p className="text-slate-400 text-xs">No records added.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {educationList.map((edu, index) => (
                  <div
                    key={edu?.id || index}
                    className="bg-white p-3 md:p-4 rounded-lg border border-slate-200 shadow-sm flex justify-between group hover:border-indigo-300 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-800 text-xs md:text-sm truncate">{edu.degree}</h4>
                      <div className="text-[10px] md:text-xs text-slate-600 font-medium truncate">{edu.institution}</div>
                      <div className="text-[9px] md:text-xs text-slate-400 mt-1">
                        {edu.startYear} - {edu.endYear || "Present"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                        onClick={() => handleEdit(edu)}
                      >
                        <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
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

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/builder/basicInfo")}
              className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={() => router.push("/dashboard/builder/skills")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
              id="tour-next-button"
            >
              Skills Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EducationStep);

