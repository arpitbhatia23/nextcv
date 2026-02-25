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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const EducationStepV2 = ({ next, previous, formData, updateForm }) => {
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
    description: z.string().optional(),
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

  const onSubmit = (values) => {
    if (isEditing) {
      setEducationList((prev) =>
        prev.map((edu) =>
          edu.id === editingId ? { ...values, id: editingId } : edu,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setEducationList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (education) => {
    form.reset(education);
    setIsEditing(true);
    setEditingId(education.id);
  };

  const handleDelete = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
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
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Academic Journey</h2>
            <p className="text-slate-500 mt-2 text-lg">Detail your educational background and achievements.</p>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="bg-indigo-600/5 px-6 py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4" /> {isEditing ? "Modify Entry" : "New Qualification"}
              </span>
              {isEditing && (
                <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-8 text-xs font-bold text-slate-400 hover:text-slate-600">
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-8" id="tour-education-form-v2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-indigo-500" /> Degree / Program
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Master of Computer Science" {...field} className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <School className="w-4 h-4 text-indigo-500" /> Institution Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Stanford University" {...field} className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" /> Started
                          </FormLabel>
                          <FormControl>
                            <Input type="month" {...field} className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" /> Completed
                          </FormLabel>
                          <FormControl>
                            <Input type="month" {...field} className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold">Grade / CGPA</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3.9 / 4.0 or 92%" {...field} className="h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center mb-1">
                          <FormLabel className="text-slate-900 font-bold">Key Coursework / Awards</FormLabel>
                          <button
                            type="button"
                            onClick={handleAiGeneration}
                            disabled={isGenerating}
                            className="text-xs font-black text-indigo-600 flex items-center gap-1.5 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
                            id="tour-ai-button-v2"
                          >
                            <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                            {isGenerating ? "Synthesizing..." : "AI Magic"}
                          </button>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Mention Dean's list, relevant electives, or projects..."
                            rows={4}
                            {...field}
                            className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl transition-all resize-none p-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-14 rounded-2xl transition-all group">
                    {isEditing ? "Update Experience" : "Add to Academic Record"}
                    <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-6 space-y-8">
           <div className="flex items-center justify-between">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.35em]">Timeline Status</h3>
             <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{educationList.length} Entries</span>
          </div>

          <div className="relative pl-8 space-y-6" id="tour-education-list-v2">
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-100" />

            <AnimatePresence initial={false}>
              {educationList.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-[2rem] p-12 text-center"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-bold">No academic history added yet.<br/><span className="text-xs font-medium">Your credentials will appear here.</span></p>
                </motion.div>
              ) : (
                educationList.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.9, opacity: 0, x: -20 }}
                    className="relative"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[27px] top-8 w-4 h-4 rounded-full border-4 border-white shadow-md bg-indigo-600 z-10" />
                    
                    <Card className="group border-none bg-white hover:bg-indigo-50/50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(79,70,229,0.08)] rounded-[2rem] transition-all overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="font-black text-slate-900 text-lg leading-tight">{edu.degree}</h4>
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                              <School className="w-3.5 h-3.5" />
                              {edu.institution}
                            </div>
                            <div className="text-xs font-black text-slate-400 flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {edu.startYear} - {edu.endYear}</span>
                              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-lg">{edu.grade}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(edu)} className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-sm transition-all">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(edu.id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {edu.description && (
                          <p className="mt-4 text-sm text-slate-500 line-clamp-2 leading-relaxed italic border-l-2 border-indigo-100 pl-4">
                            "{edu.description}"
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="pt-8 flex justify-between gap-4">
             <Button onClick={previous} variant="ghost" className="h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
               <ArrowLeft className="mr-2 w-5 h-5" /> Back
             </Button>
             <Button onClick={next} disabled={educationList.length === 0} className="h-14 px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2x rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all disabled:opacity-50" id="tour-next-button-v2">
               Skills Architecture <ArrowRight className="ml-2 w-5 h-5" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EducationStepV2);
