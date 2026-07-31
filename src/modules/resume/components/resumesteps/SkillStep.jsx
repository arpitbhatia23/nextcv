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

/* Fonts: Fraunces for the section title, IBM Plex Mono for eyebrows,
   labels, and helper text — matches BasicInfoStep / EducationStep. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const inputClass =
  "rounded-none border transition-all h-9 md:h-10 text-xs md:text-sm placeholder:text-[10px]";
const inputStyle = { backgroundColor: "#F7F7F5", borderColor: "#E4E2DC", color: "#1C2333" };

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
    jobDescription: formData.jobDescription,
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
    <div className="py-4 md:py-8" style={{ backgroundColor: "#F7F7F5" }}>
      <FontImports />

      <div className="mb-2 pb-4 border-b-2" style={{ borderColor: "#1C2333" }}>
        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "#B3382C" }}>
          STEP 04 — SKILLS
        </div>
        <h2 className="font-display text-lg md:text-xl font-medium" style={{ color: "#1C2333" }}>
          Skills
        </h2>
        <p className="text-[10px] md:text-xs mt-1" style={{ color: "#6B7280" }}>
          Showcase your technical and soft skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="rounded-none border shadow-none py-0 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
        >
          <CardHeader
            className="border-b p-3 pb-0 flex justify-between items-center gap-0"
            style={{ borderColor: "#E4E2DC" }}
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              {isEditing ? "EDIT SKILL" : "ADD SKILL"}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-7 rounded-none font-mono text-[10px] tracking-widest hover:bg-transparent"
                  style={{ color: "#6B7280" }}
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleAiGeneration}
                disabled={isGenerating || skillList.length > 0}
                variant="default"
                className="rounded-none text-white h-7 text-[10px] md:text-xs font-mono tracking-widest shadow-none"
                style={{ backgroundColor: "#B3382C" }}
              >
                <Sparkles className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                {isGenerating ? "WAIT..." : "SUGGEST"}
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
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          SKILL NAME
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="React, Node etc."
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
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          PROFICIENCY
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Expert"
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-none text-white shadow-none h-9 md:h-10 font-mono text-xs md:text-sm tracking-widest"
                  style={{ backgroundColor: "#B3382C" }}
                >
                  {isEditing ? "UPDATE SKILL" : "ADD SKILL"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="border p-4 md:p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2"
                style={{ color: "#6B7280" }}
              >
                <Wrench className="w-4 h-4" style={{ color: "#B3382C" }} /> Added Skills
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-7 rounded-none font-mono text-[10px] tracking-widest hover:bg-transparent"
                style={{ color: "#B3382C" }}
              >
                Clear All
              </Button>
            </div>

            {skillList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No skills added yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skillList.map(skill => (
                  <div
                    key={skill.id}
                    className="pl-3 pr-1.5 py-1.5 border flex items-center gap-2 md:gap-3 group transition-colors"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div className="flex flex-col min-w-0">
                      <span
                        className="font-display font-medium text-[10px] md:text-sm truncate"
                        style={{ color: "#1C2333" }}
                      >
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span
                          className="font-mono text-[8px] md:text-[9px] uppercase tracking-widest leading-none mt-0.5"
                          style={{ color: "#B7B5AC" }}
                        >
                          {skill.level}
                        </span>
                      )}
                    </div>

                    <div
                      className="flex items-center border-l pl-1.5 shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      style={{ borderColor: "#E4E2DC" }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(skill)}
                        size="icon"
                        className="h-6 w-6 rounded-none hover:bg-transparent"
                        style={{ color: "#B7B5AC" }}
                      >
                        <Edit2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(skill.id)}
                        size="icon"
                        className="h-6 w-6 rounded-none hover:bg-transparent"
                        style={{ color: "#B3382C" }}
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
              className="rounded-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ borderColor: "#E4E2DC", color: "#1C2333" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> PREVIOUS
            </Button>
            <Button
              onClick={handleNext}
              className="rounded-none text-white shadow-none h-10 px-4 font-mono text-xs md:text-sm tracking-widest"
              style={{ backgroundColor: "#B3382C" }}
            >
              EXPERIENCE INFO <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillStep);
