"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Edit2,
  Trash2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  Calendar,
  School,
  Trophy,
} from "lucide-react";
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
import { Card, CardContent } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Tips } from "../Tips";
import { useRouter } from "next/navigation";

const EducationStepV2 = ({ next, previous, formData, updateForm }) => {
  const router = useRouter();
  const [educationList, setEducationList] = useState(formData.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/skills");
  }, [router]);

  const schema = z.object({
    degree: z.string().min(2, { message: "Degree is required" }),
    institution: z.string().min(2, { message: "Institution is required" }),
    startYear: z.string({ message: "Start date is required" }),
    endYear: z.string({ message: "End date is required" }),
    grade: z.string({ message: "Grade is required" }),
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

  const handleAiGeneration = async () => {
    try {
      const educationDetail = form.getValues();
      const isValid = educationDetail.degree && educationDetail.institution;

      if (!isValid) {
        toast.error("Enter Degree and Institution first!");
        return;
      }

      setIsGenerating(true);
      const res = await axios.post("/api/gen/description", {
        type: "education",
        data: educationDetail,
      });

      if (res.data?.data) {
        form.setValue("description", String(res.data.data));
        toast.success("AI Content Generated!");
      }
    } catch (err) {
      toast.error(err.message || "AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Form Column */}
        <div className="lg:col-span-6 space-y-4 md:space-y-6">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Academic Journey
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Detail your educational background and achievements.
            </p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="bg-indigo-600/5 px-4 md:px-6 py-3 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-[10px] md:text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-3 md:w-4 h-3 md:h-4" />{" "}
                {isEditing ? "Modify Entry" : "New Qualification"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-7 md:h-8 text-[10px] md:text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4 md:p-8" id="tour-education-form-v2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Trophy className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Degree / Program
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Computer Science"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <School className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Institution Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Stanford University"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <FormField
                      control={form.control}
                      name="startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Calendar className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Started
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm"
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
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                            <Calendar className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" /> Completed
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm"
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
                        <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">Grade / CGPA</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 3.9 / 4.0"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold text-xs md:text-sm">
                            Achievements
                          </FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-[9px] md:text-xs font-black text-indigo-600 flex items-center gap-x-1.5 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                            id="tour-ai-button-v2"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                            {isGenerating ? "Working..." : "AI Content"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your major coursework or awards..."
                            rows={3}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all resize-none p-4 text-xs md:text-sm placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-11 md:h-14 rounded-xl md:rounded-2xl transition-all group text-xs md:text-sm"
                  >
                    {isEditing ? "Update Entry" : "Add Qualification"}
                    <Plus className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest">
              Live Preview
            </h3>
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {educationList.length} Entries
            </span>
          </div>

          <div className="relative pl-6 md:pl-8 space-y-4 md:space-y-6" id="tour-education-list-v2">
            {/* Timeline Line */}
            <div className="absolute left-2 md:left-2.75 top-4 bottom-4 w-0.5 bg-slate-100" />

            <AnimatePresence initial={false}>
              {educationList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-2xl md:rounded-4xl p-8 md:p-12 text-center"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-bold text-xs md:text-sm">
                    No academic history added.
                  </p>
                </motion.div>
              ) : (
                educationList.map(edu => (
                  <motion.div
                    key={edu.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.9, opacity: 0, x: -20 }}
                    className="relative"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-5 md:-left-6.75 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 border-white shadow-md bg-indigo-600 z-10" />

                    <Card className="group border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-xl md:rounded-4xl transition-all overflow-hidden border border-slate-50">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1 min-w-0 flex-1">
                            <h4 className="font-black text-slate-900 text-xs md:text-lg leading-tight truncate">
                              {edu.degree}
                            </h4>
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] md:text-sm truncate">
                              <School className="w-3 md:w-4 h-3 md:h-4" />
                              {edu.institution}
                            </div>
                            <div className="text-[9px] md:text-xs font-black text-slate-400 flex items-center gap-2 md:gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {edu.startYear} - {edu.endYear}
                              </span>
                              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg">
                                {edu.grade}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 md:gap-2 shrink-0">
                            <button
                              onClick={() => handleEdit(edu)}
                              className="p-1.5 md:p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm transition-all"
                            >
                              <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(edu.id)}
                              className="p-1.5 md:p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>
                        {edu.description && (
                          <div className="mt-3 text-[10px] md:text-sm text-slate-500 line-clamp-2 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
                            {edu.description}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <Tips section={"education"} />
          <div className="pt-6 md:pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-11 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs md:text-sm"
            >
              <ArrowLeft className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Previous
            </Button>
            <Button
              onClick={next}
              disabled={educationList.length === 0}
              className="h-11 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all disabled:opacity-50 text-xs md:text-sm"
              id="tour-next-button-v2"
            >
              Skills Info <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EducationStepV2);

