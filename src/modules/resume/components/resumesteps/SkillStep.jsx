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
import posthog from "@/shared/utils/posthog";
import { FontImports } from "../fontImport";

const inputClass =
  "rounded-none! border transition-all h-10 md:h-11 text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 focus-visible:ring-[#465B9E]";
const inputStyle = { backgroundColor: "#F8F7F3", borderColor: "#E3E2DC", color: "#17201C" };

const SkillStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const [skillList, setSkillList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "skill",
      step_number: 4,
    });
    router.prefetch("/dashboard/builder/experience");
  }, [router]);

  const schema = z.object({
    name: z.string().min(2, { message: "Skill name is required" }),
    level: z.string().optional(),
  });

  const EMPTY_FORM = { name: "", level: "" };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", level: "" },
  });

  useEffect(() => {
    if (formData?.skills.length > 0) {
      setSkillList((formData.skills || []).map((s, i) => ({ ...s, id: s.id ?? Date.now() + i })));
    }
  }, [formData]);

  // ✅ Add skill (supports comma separated)
  const onSubmit = values => {
    const names = values.name
      .split(",")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (isEditing) {
      const updatedSkill = {
        name: names[0],
        level: values.level || "Intermediate",
      };
      setSkillList(prev =>
        prev.map(skill => (skill.id === editingId ? { ...skill, updatedSkill } : skill))
      );
      updateForm({
        skills: formData.skills.map(item => (item.id === editingId ? updatedSkill : item)),
      });
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

    form.reset(EMPTY_FORM);
  };

  const handleEdit = skill => {
    form.reset(skill);
    setIsEditing(true);
    setEditingId(skill.id);
  };

  const handleDelete = id => {
    console.log(id);
    const updatedSkills = skillList.filter(skill => skill.id !== id);
    setSkillList(updatedSkills);
    updateForm({ skills: updatedSkills });
  };

  const cancelEdit = () => {
    form.reset(EMPTY_FORM);
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
    posthog.capture("builder_step_complete", {
      step: "skill",
      step_number: 4,
    });
    router.push("/dashboard/builder/experience");
  };

  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />

      <div className="mb-2 pb-4 border-b border-[#E3E2DC]">
        <div className="font-mono text-[10px] tracking-widest mb-1 text-[#465B9E]">
          STEP 04 — SKILLS
        </div>
        <h2 className="font-display text-xl md:text-2xl font-medium text-[#17201C]">Skills</h2>
        <p className="text-xs md:text-sm mt-1 text-[#5B625C]">
          Showcase your technical capabilities and key strengths
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card className="border rounded-none! border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white">
          <CardHeader className="border-b border-[#E3E2DC] p-4 flex justify-between items-center">
            <CardTitle className="font-mono text-[10px] md:text-xs tracking-wider text-[#5B625C]">
              {isEditing ? "EDIT SKILL" : "ADD SKILL"}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cancelEdit}
                  className="h-8 font-sans text-xs text-[#5B625C] hover:bg-[#F1F0EB]"
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleAiGeneration}
                disabled={isGenerating || skillList.length > 0}
                variant="default"
                className="text-[#465B9E] bg-[#EEF0F7] hover:bg-[#C8CDD9]/40 border border-[#C8CDD9] h-8 text-xs font-sans font-medium shadow-none"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {isGenerating ? "Generating..." : "Suggest Skills"}
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
                  className="w-full text-white shadow-xs h-10 md:h-11 font-sans text-xs md:text-sm font-medium tracking-wide bg-[#465B9E] hover:bg-[#344B93] transition-colors"
                >
                  {isEditing ? "Update Skill" : "Add Skill"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="border p-4 md:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)] bg-white"
            style={{ borderColor: "#E3E2DC" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2 text-[#5B625C]">
                <Wrench className="w-4 h-4 text-[#465B9E]" /> Added Skills
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-7 font-sans text-xs text-[#8A908B] hover:text-red-600 hover:bg-red-50"
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
                        className="h-6 w-6 rounded-none! hover:bg-transparent"
                        style={{ color: "#B7B5AC" }}
                      >
                        <Edit2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(skill.id)}
                        size="icon"
                        className="h-6 w-6 rounded-none! hover:bg-transparent"
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
              className="h-10 px-4 md:px-5 font-sans text-xs md:text-sm font-medium border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              className="text-white shadow-xs h-10 px-5 md:px-6 font-sans text-xs md:text-sm font-medium bg-[#465B9E] hover:bg-[#344B93] transition-colors"
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
