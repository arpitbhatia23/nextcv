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

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", level: "" },
  });

  useEffect(() => {
    updateForm({ skills: skillList });
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
    router.push("/dashboard/resumeform/experience");
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">Skills</h2>
        <p className="text-slate-500">Showcase your technical and soft skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <Card className="bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200">
          <CardHeader className="border-b p-4 rounded-t-xl flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-slate-800">
              {isEditing ? "Edit Skill" : "Add Skill"}
            </CardTitle>
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
            <Button
              // variant="outline"
              size="sm"
              onClick={handleAiGeneration}
              disabled={isGenerating || skillList.length > 0}
              variant="default"
              className="bg-indigo-600 text-white"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Suggest Skills"}
            </Button>
          </CardHeader>

          <CardContent className="p-2 md:p-6">
            {/* Suggestions */}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. React.js, Node.js (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proficiency</FormLabel>
                        <FormControl>
                          <Input placeholder="Beginner / Intermediate / Expert" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-slate-900 text-white">
                  {isEditing ? "Update Skill" : "Add Skill"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0">
            <div className="bg-blue-50 p-4 w-full rounded-b-xl">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" /> Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-1 pl-6 list-disc">
                <li>You can add multiple skills separated by commas.</li>
                <li>Include both technical and soft skills.</li>
              </ul>
            </div>
          </CardFooter>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <div className="flex justify-between">
              <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-500" /> Added Skills
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-red-500 hover:text-red-600"
              >
                Clear All
              </Button>
            </div>

            {skillList.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                <p className="text-slate-400 text-sm">No skills added yet.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skillList.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-white pl-4 pr-2 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-3"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm">{skill.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-medium">
                        {skill.level}
                      </span>
                    </div>

                    <div className="flex items-center border-l border-slate-100 pl-2 ml-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(skill)}
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(skill.id)}
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Trash2 className="w-3 h-3" />
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
              onClick={() => router.push("/dashboard/resumeform/education")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={handleNext} className="bg-indigo-600 text-white">
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillStep);
