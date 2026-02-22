"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, GraduationCap, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const EducationStep = ({ next, previous, formData, updateForm }) => {
  const [educationList, setEducationList] = useState(formData.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const schema = z.object({
    degree: z.string().min(2, { message: "degree is required" }),
    institution: z.string().min(2, { message: "intustion is required" }),
    startYear: z.string({ message: "date is required" }),
    endYear: z.string({ message: "end date is required" }),
    grade: z.string({ message: "grade is required" }),
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
          edu.id === editingId ? { ...values, id: editingId } : edu
        )
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

  const handelAiGenration = async () => {
    try {
      const educationdetail = form.getValues();
      console.log(educationdetail);
      const isValid = Object.entries(educationdetail)
        .filter(([key]) => key !== "description")
        .some(([, val]) => val && val.trim() !== "");

      console.log(isValid);
      if (!isValid) {
        toast("Please fill in all education field before generating");
      } else {
        setIsGenerating(true);

        const res = await axios.post("/api/gen/description", {
          type: "education",
          data: educationdetail,
        });

        if (res.data?.data) {
          form.setValue("description", String(res.data.data));
        }
      }
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Education</h2>
          <p className="text-slate-500">Add your academic background</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200" id="tour-education-form">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  {isEditing ? "Edit Education" : "Add Education"}
                </CardTitle>
             </div>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500 hover:text-slate-700">
                Cancel
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Degree/Qualification</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Bachelor of Science"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                        />
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
                      <FormLabel className="text-slate-700 font-semibold">Institution/School</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. MIT" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type={"month"}
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                          />
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
                        <FormLabel className="text-slate-700 font-semibold">End Date</FormLabel>
                        <FormControl>
                          <Input
                            type={"month"}
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                          />
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
                      <FormLabel className="text-slate-700 font-semibold">Grade/GPA</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3.8 GPA" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
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
                      <FormLabel className="flex justify-between items-center text-slate-700 font-semibold">
                         Description
                         <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            disabled={isGenerating}
                            onClick={handelAiGenration}
                            id="tour-ai-button"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            {isGenerating ? "Magic..." : "Generate with AI"}
                          </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief achievements or coursework..."
                            rows={3}
                            {...field}
                            className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all resize-none ${
                              isGenerating ? "opacity-50" : ""
                            }`}
                            disabled={isGenerating}
                          />
                        </FormControl>

                        {isGenerating && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                             <div className="flex items-center gap-2 text-indigo-600 font-semibold animate-pulse">
                                <Sparkles className="w-4 h-4" /> Generating...
                             </div>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-11 rounded-lg"
                  >
                    {isEditing ? "Update Qualification" : "Add Qualification"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
           <div className="bg-slate-50 rounded-xl border border-slate-200 p-5" id="tour-education-list">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                 <GraduationCap className="w-5 h-5 text-indigo-500" /> Added Education
              </h3>
              
              {educationList.length === 0 ? (
                 <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                    <p className="text-slate-400 text-sm">No education added yet.</p>
                 </div>
              ) : (
                 <div className="space-y-3">
                    {educationList.map((edu, index) => (
                       <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex justify-between group hover:border-indigo-300 transition-colors">
                          <div>
                             <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                             <div className="text-sm text-slate-600 font-medium">{edu.institution}</div>
                             <div className="text-xs text-slate-400 mt-1">{edu.startYear} - {edu.endYear || 'Present'}</div>
                          </div>
                          <div className="flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => handleEdit(edu)}>
                                <Edit2 className="w-3.5 h-3.5" />
                             </Button>
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(edu.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                             </Button>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={previous} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8" id="tour-next-button">
                 Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EducationStep;
