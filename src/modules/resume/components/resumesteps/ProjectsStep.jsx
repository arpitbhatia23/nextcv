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

const ProjectsStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const [projectList, setProjectList] = useState(formData.projects || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/certificate");
  }, [router]);

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

  useEffect(() => {
    updateForm({ projects: projectList });
  }, [projectList]);

  const onSubmit = values => {
    if (isEditing) {
      setProjectList(prev =>
        prev.map(proj => (proj.id === editingId ? { ...values, id: editingId } : proj))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setProjectList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = project => {
    form.reset(project);
    setIsEditing(true);
    setEditingId(project.id);
  };

  const handleDelete = id => {
    setProjectList(prev => prev.filter(proj => proj.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };
  const { handleAiGeneration, isGenerating } = useAiGeneration({ type: "project", form });

  return (
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Projects</h2>
        <p className="text-[10px] md:text-sm text-slate-500">Highlight your best work</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          id="tour-projects-form"
        >
          <CardHeader className="border-b bg-slate-50/50 p-3 md:p-4 rounded-t-xl flex flex-row justify-between items-center gap-2">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
              {isEditing ? "Edit Project" : "Add Project"}
            </CardTitle>
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
          <CardContent className={"p-3 md:p-6"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Portfolio Site"
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
                    name="roleOrType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Your Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Lead"
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Date</FormLabel>
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
                  name="technologiesOrTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Tech Stack</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. React, Tailwind"
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
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">Project Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/..."
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
                              : "AI Generated"}
                        </Button>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea
                            placeholder="Brief records..."
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
            className="bg-slate-50 rounded-xl border border-slate-200 p-4 md:p-5"
            id="tour-projects-list"
          >
            <h3 className="text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <FolderKanban className="w-4 h-4 text-indigo-500" /> Portfolio Showcase
            </h3>

            {projectList.length === 0 ? (
              <div className="text-center py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                <p className="text-slate-400 text-xs">No projects added yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projectList.map((project, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 md:p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-2 group hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-xs md:text-sm truncate">{project.title}</h4>
                        <div className="text-[10px] md:text-xs text-indigo-600 font-medium truncate">
                          {project.roleOrType}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-[9px] md:text-xs text-slate-500 font-medium bg-slate-100 self-start px-2 py-0.5 md:py-1 rounded">
                      {project.technologiesOrTopics}
                    </div>

                    {project.description && (
                      <p className="text-[10px] md:text-xs text-slate-600 line-clamp-2 mt-1 italic border-l-2 border-slate-100 pl-2">
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
              className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={() => router.push("/dashboard/builder/certificate")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
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

