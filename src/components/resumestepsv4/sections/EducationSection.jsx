"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Edit2,
  Trash2,
  GraduationCap,
  Sparkles,
  Plus,
  Calendar,
  School,
  Trophy,
} from "lucide-react";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";

const EducationSection = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);

  const [educationList, setEducationList] = useState(formData.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
      toast.error("AI Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-6">
          <Card className="border shadow-sm border-slate-100 bg-white rounded-2xl overflow-hidden">
            <div className="bg-indigo-50/50 px-4 py-3 border-b border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-3 h-3" /> {isEditing ? "Modify Entry" : "New Qualification"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-6 text-[10px] font-bold text-slate-400"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                          <Trophy className="w-3 h-3 text-indigo-500" /> Degree / Program
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Master of Computer Science"
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                          <School className="w-3 h-3 text-indigo-500" /> Institution Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Stanford University"
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-indigo-500" /> Started
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs">
                            <Calendar className="w-3 h-3 text-indigo-500" /> Completed
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold text-xs">
                          Grade / CGPA
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 3.9 / 4.0 or 92%"
                            {...field}
                            className="h-9 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold text-xs">
                            Coursework/Awards
                          </FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-[10px] font-black text-indigo-600 flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                            {isGenerating ? "Synthesizing..." : "Generate AI"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Mention Dean's list, electives..."
                            rows={3}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all resize-none p-3 text-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-10 rounded-xl text-sm"
                  >
                    {isEditing ? "Update" : "Add Education"}
                    <Plus className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-6">
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />
            <AnimatePresence initial={false}>
              {educationList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center"
                >
                  <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 font-bold text-sm">No education added</p>
                </motion.div>
              ) : (
                educationList.map(edu => (
                  <motion.div
                    key={edu.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative"
                  >
                    <div className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2 border-white bg-indigo-500 z-10" />
                    <Card className="group border shadow-xs bg-white rounded-xl transition-all overflow-hidden border-slate-100">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs mt-0.5">
                              <School className="w-3 h-3" />
                              {edu.institution}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 flex gap-2">
                              <span>
                                {edu.startYear} - {edu.endYear}
                              </span>
                              <span className="bg-emerald-50 text-emerald-600 px-1.5 rounded uppercase font-bold text-[9px]">
                                {edu.grade}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleEdit(edu)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 rounded"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(edu.id)}
                              className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EducationSection);
