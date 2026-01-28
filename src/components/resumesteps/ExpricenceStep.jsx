"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Briefcase, Plus, Edit2, Trash2, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const ExperienceStep = ({ next, previous, formData, updateForm }) => {
  const [experienceList, setExperienceList] = useState(
    formData.experience || [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
    updateForm({ experience: experienceList });
  }, [experienceList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setExperienceList((prev) =>
        prev.map((exp) =>
          exp.id === editingId ? { ...values, id: editingId } : exp,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setExperienceList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (experience) => {
    form.reset(experience);
    setIsEditing(true);
    setEditingId(experience.id);
  };

  const handleDelete = (id) => {
    setExperienceList((prev) => prev.filter((exp) => exp.id !== id));
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

      if (!isValid) {
        toast("Please fill in all education field before generating");
      } else {
        setIsGenerating(true);

        const res = await axios.post("/api/gen/description", {
          type: "experience",
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
          <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
          <p className="text-slate-500">Add your professional experience</p>
       </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 rounded-t-xl flex flex-row justify-between items-center">
             <div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  {isEditing ? "Edit Experience" : "Add Experience"}
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Google, Amazon" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Position/Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Frontend Developer"
                          {...field}
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">End Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="work"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Key Responsibilities (Comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. UI development, API integration"
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value || ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? e.target.value.split(",").map((s) => s.trim())
                                : [],
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold">Tools & Tech (Comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. React, Tailwind CSS"
                          className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all"
                          value={
                            Array.isArray(field.value)
                              ? field.value.join(", ")
                              : field.value || ""
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? e.target.value.split(",").map((s) => s.trim())
                                : [],
                            )
                          }
                        />
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
                    {isEditing ? "Update Experience" : "Add Experience"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
           <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                 <Briefcase className="w-5 h-5 text-indigo-500" /> Professional Experience
              </h3>

            {experienceList.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                   <p className="text-slate-400 text-sm">No work experience added.</p>
                </div>
            ) : (
              <div className="space-y-3">
                {experienceList.map((exp, index) => (
                   <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-indigo-300 transition-colors">
                      <div className="flex justify-between items-start">
                         <div>
                             <h4 className="font-bold text-slate-800">{exp.position}</h4>
                             <div className="text-sm text-indigo-600 font-medium">{exp.companyName}</div>
                         </div>
                         <div className="flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => handleEdit(exp)}>
                                <Edit2 className="w-3.5 h-3.5" />
                             </Button>
                             <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(exp.id)}>
                                <Trash2 className="w-3.5 h-3.5" />
                             </Button>
                          </div>
                      </div>
                      
                      <div className="text-xs text-slate-500 font-medium bg-slate-100 self-start px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate || "Present"}
                      </div>
                      
                      {exp.description && (
                         <p className="text-xs text-slate-600 line-clamp-2 mt-1">{exp.description}</p>
                      )}
                  </div>
                ))}
              </div>
            )}
           </div>
           
           <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={previous} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8">
                 Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceStep;
