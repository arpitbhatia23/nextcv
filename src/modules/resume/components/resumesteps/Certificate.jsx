"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, ArrowRight, ArrowLeft, Award } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tips } from "../Tips";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import posthog from "@/shared/utils/posthog";
/* Fonts: Fraunces for the section title, IBM Plex Mono for eyebrows,
   labels, and helper text — matches BasicInfoStep / EducationStep / SkillStep / ExperienceStep / ProjectsStep. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const inputClass =
  "rounded-xl border transition-all h-10 md:h-11 text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 focus-visible:ring-[#465B9E]";
const inputStyle = { backgroundColor: "#F8F7F3", borderColor: "#E3E2DC", color: "#17201C" };

const CertificateStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "certifications",
      step_number: 7,
    });
    router.prefetch("/dashboard/builder/summary");
  }, [router]);

  const schema = z.object({
    title: z.string().min(2, { message: "Certificate name is required" }),
    organization: z.string().min(2, { message: "Issuing organization is required" }),
    year: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      organization: "",
      year: "",
      credentialUrl: "",
    },
  });

  useEffect(() => {
    if (certList.length > 0) {
      updateForm({ certificates: certList });
    }
  }, [certList]);

  const onSubmit = values => {
    if (isEditing) {
      setCertList(prev =>
        prev.map(cert => (cert.id === editingId ? { ...values, id: editingId } : cert))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setCertList(prev => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = cert => {
    form.reset(cert);
    setIsEditing(true);
    setEditingId(cert.id);
  };

  const handleDelete = id => {
    setCertList(prev => prev.filter(cert => cert.id !== id));
  };

  const cancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />

      <div className="mb-2 pb-4 border-b border-[#E3E2DC]">
        <div className="font-mono text-[10px] tracking-widest mb-1 text-[#465B9E]">
          STEP 07 — CERTIFICATIONS
        </div>
        <h2 className="font-display text-xl md:text-2xl font-medium text-[#17201C]">
          Certifications (optional)
        </h2>
        <p className="text-xs md:text-sm mt-1 text-[#5B625C]">
          Add your credentials, specialized training, and awards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* Form Section */}
        <Card
          className="rounded-2xl border border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white"
          id="tour-certificates-form"
        >
          <CardHeader
            className="border-b border-[#E3E2DC] p-4 flex flex-row justify-between items-center"
          >
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              {isEditing ? "EDIT CERTIFICATE" : "ADD CERTIFICATE"}
            </CardTitle>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-7 rounded-none font-mono text-[10px] md:text-xs hover:bg-transparent"
                style={{ color: "#6B7280" }}
              >
                Cancel
              </Button>
            )}
          </CardHeader>

          <CardContent className="p-3 md:p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        CERTIFICATE NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. AWS Expert"
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
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-mono text-[10px] md:text-xs tracking-widest"
                        style={{ color: "#6B7280" }}
                      >
                        ISSUING ORGANIZATION
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Google"
                          {...field}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          YEAR (OPTIONAL)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 2024"
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="credentialUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          LINK (OPTIONAL)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full rounded-xl text-white shadow-xs h-10 md:h-11 font-sans text-xs md:text-sm font-medium tracking-wide bg-[#465B9E] hover:bg-[#344B93] transition-colors"
                  >
                    {isEditing ? "Update Certificate" : "Save Certificate"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="space-y-6">
          <div
            className="rounded-2xl border p-4 md:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)] bg-white"
            style={{ borderColor: "#E3E2DC" }}
            id="tour-certificates-list"
          >
            <h3
              className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2 mb-4 text-[#5B625C]"
            >
              <Award className="w-4 h-4 text-[#465B9E]" /> Verified Credentials
            </h3>

            {certList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{ borderColor: "#E4E2DC", backgroundColor: "#F7F7F5" }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No certifications added.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {certList.map(cert => (
                  <div
                    key={cert.id}
                    className="p-3 md:p-4 border flex flex-col gap-2 group transition-colors"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-display font-medium text-xs md:text-sm truncate"
                          style={{ color: "#1C2333" }}
                        >
                          {cert.title}
                        </h4>
                        <div
                          className="font-mono text-[10px] md:text-xs truncate mt-0.5"
                          style={{ color: "#B3382C" }}
                        >
                          {cert.organization}
                          {cert.year && (
                            <span style={{ color: "#B7B5AC" }} className="ml-1 font-normal">
                              ({cert.year})
                            </span>
                          )}
                        </div>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[9px] md:text-xs hover:underline mt-1 inline-block tracking-widest"
                            style={{ color: "#1C2333" }}
                          >
                            VERIFY LINK ↗
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleEdit(cert)}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleDelete(cert.id)}
                        >
                          <Trash2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Tips section={"certificates"} />
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                router.push("/dashboard/builder/projects");
              }}
              className="rounded-xl h-10 px-4 md:px-5 font-sans text-xs md:text-sm font-medium border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={() => {
                posthog.capture("builder_step_complete", {
                  step: "certifications",
                  step_number: 7,
                });
                router.push("/dashboard/builder/summary");
              }}
              className="rounded-xl text-white shadow-xs h-10 px-5 md:px-6 font-sans text-xs md:text-sm font-medium bg-[#465B9E] hover:bg-[#344B93] transition-colors"
              id="tour-next-button"
            >
              Summary Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateStep);
