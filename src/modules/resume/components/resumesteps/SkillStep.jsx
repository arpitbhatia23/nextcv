"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, Sparkles, ArrowRight, ArrowLeft, Wrench } from "lucide-react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tips } from "../Tips";
import { useAiGeneration } from "../../hooks/useAiGeneation";
import { useRouter } from "next/navigation";
import useResumeStore from "@/store/useResumeStore";

const SkillStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const [skillList, setSkillList] = useState(formData.skills || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/experience");
  }, [router]);

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", level: "" },
  });

  useEffect(() => {
    if (formData.skills) {
      setSkillList(formData.skills);
    }
  }, [formData]);

  useEffect(() => {
    if (skillList.length > 0) {
      updateForm({ skills: skillList });
    }
  }, [skillList]);

  // ✅ Add skill (supports comma separated)
  const onSubmit = values => {
    const names = values.name
      .split(",")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (isEditing) {
      setSkillList(prev =>
        prev.map(skill =>
          skill.id === editingId
            ? {
                ...skill,
                name: names[0],
                level: values.level || "Intermediate",
              }
            : skill
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newSkills = names
        .filter(name => !skillList.some(skill => skill.name.toLowerCase() === name.toLowerCase()))
        .map(name => ({
          id: Date.now() + Math.random(),
          name,
          level: values.level || "Intermediate",
        }));

      setSkillList(prev => [...prev, ...newSkills]);
    }

    form.reset();
  };

  const handleEdit = skill => {
    form.reset(skill);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleDelete = id => {
    setSkillList(prev => prev.filter(skill => skill.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  const handleClearAll = () => {
    if (skillList.length === 0) {
      toast("No skills to clear");
      return;
    }

    toast("Remove all skills?", {
      description: "This action cannot be undone",
      action: {
        label: "Clear All",
        onClick: () => {
          setSkillList([]);
          updateForm({ skills: [] });
          toast("All skills cleared 🧹");
        },
      },
    });
  };

  const { handleAiGeneration, isGenerating } = useAiGeneration({
    type: "skills",

    getPayload: () => ({
      role: formData.jobRole,
    }),

    onSuccess: result => {
      const skills = result
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean);

      const newSkills = skills
        .filter(s => !skillList.some(skill => skill.name.toLowerCase() === s.toLowerCase()))
        .map(skill => ({
          id: Date.now() + Math.random(),
          name: skill,
          level: "Intermediate",
        }));

      setSkillList(prev => [...prev, ...newSkills]);
    },
  });

  const handleNext = () => {
    if (skillList.length < 4) {
      toast("Please add at least 4 skills to continue.");
      return;
    }
    router.push("/dashboard/builder/experience");
  };

  return (
    <div className="py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900">Skills</h2>
        <p className="text-[10px] md:text-sm text-slate-500">Showcase your technical and soft skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50 p-3 md:p-4 rounded-t-xl flex justify-between items-center gap-2">
            <CardTitle className="text-sm md:text-lg font-bold text-slate-800">
              {isEditing ? "Edit Skill" : "Add Skill"}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isEditing && (
                <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-7 text-xs">
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleAiGeneration}
                disabled={isGenerating || skillList.length > 0}
                variant="default"
                className="bg-indigo-600 text-white h-7 text-[10px] md:text-xs font-bold"
              >
                <Sparkles className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                {isGenerating ? "Wait..." : "Suggest"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-3 md:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs md:text-sm font-semibold">Skill Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React, Node etc."
                            {...field}
                            className="text-xs md:text-sm h-9 md:h-11 bg-slate-50 border-slate-200 focus:bg-white placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs md:text-sm font-semibold">Proficiency</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Expert"
                            {...field}
                            className="text-xs md:text-sm h-9 md:h-11 bg-slate-50 border-slate-200 focus:bg-white placeholder:text-[10px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-slate-900 text-white font-bold h-9 md:h-11 text-xs md:text-sm">
                  {isEditing ? "Update Skill" : "Add Skill"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="bg-blue-50/50 p-3 md:p-4 w-full border-t border-blue-100">
              <h3 className="text-[10px] md:text-sm font-bold text-blue-900 mb-2 flex items-center gap-2 uppercase tracking-tight">
                <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-[10px] md:text-sm text-blue-800/80 space-y-1 pl-4 list-disc font-medium">
                <li>Comma separated list works! (React, Next.js)</li>
                <li>Balance hard skills with soft skills.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 md:p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-500" /> Added Skills
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-red-500 hover:text-red-600 h-7 text-[10px] font-bold"
              >
                Clear All
              </Button>
            </div>

            {skillList.length === 0 ? (
              <div className="text-center py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                <p className="text-slate-400 text-xs">No skills added yet.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skillList.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-white pl-3 pr-1.5 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 md:gap-3 group hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-800 text-[10px] md:text-sm truncate">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black leading-none">
                          {skill.level}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center border-l border-slate-100 pl-1.5 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(skill)}
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Edit2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(skill.id)}
                        size="icon"
                        className="h-6 w-6 text-red-500"
                      >
                        <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Tips section={"skills"} />

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/builder/education")}
              className="border-slate-300 text-slate-600 hover:bg-slate-50 h-10 md:h-11 px-4 md:px-6 text-xs md:text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
            >
              Experience Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillStep);

