"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Linkedin, Github, Globe, ArrowRight, ChevronDown, Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import React, { useEffect, useState } from "react";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import posthog from "@/shared/utils/posthog";
import { FontImports } from "../fontImport";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone_no: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(3, { message: "Address is required" }),
  jobRole: z.string().optional(),

  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  jobDescription: z.string().optional(),
});

const inputClass =
  " border transition-all h-10 md:h-11 text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 rounded-none! focus-visible:ring-[#465B9E]";
const inputStyle = { backgroundColor: "#F8F7F3", borderColor: "#E3E2DC", color: "#17201C" };

const BasicInfoStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const [openJd, setOpenJd] = useState(false);
  const [openSocial, setOpenSocail] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "basic_info",
      step_number: 2,
    });
    router.prefetch("/dashboard/builder/education");
  }, [router]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formData?.name ?? "",
      phone_no: formData?.phone_no ?? "",
      email: formData?.email ?? "",
      linkedin: formData?.linkedin ?? "",
      github: formData?.github ?? "",
      portfolio: formData?.portfolio ?? "",
      address: formData?.address ?? "",
      jobRole: formData?.jobRole ?? "",
      jobDescription: formData?.jobDescription ?? "",
    },
  });

  useEffect(() => {
    if (formData) {
      form.reset({
        name: formData.name ?? "",
        phone_no: formData.phone_no ?? "",
        email: formData.email ?? "",
        linkedin: formData.linkedin ?? "",
        github: formData.github ?? "",
        portfolio: formData.portfolio ?? "",
        address: formData.address ?? "",
        jobRole: formData.jobRole ?? "",
        jobDescription: formData.jobDescription ?? "",
      });
    }
  }, [formData, form]);

  const handlesave = values => {
    setIsLoading(true);

    updateForm(values);
    posthog.capture("builder_step_complete", {
      step: "basic_info",
      step_number: 2,
    });
    router.push("/dashboard/builder/education");
  };

  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />
      <div className="grid gap-2 md:gap-8 items-start">
        <div className="space-y-4 md:space-y-6" id="tour-resume-form">
          <div className="mb-2 pb-4 border-b border-[#E3E2DC]">
            <div className="font-mono text-[10px] tracking-widest mb-1 text-[#465B9E]">
              STEP 02 — BASIC DETAILS
            </div>
            <h2 className="font-display text-xl md:text-2xl font-medium text-[#17201C]">
              Basic Details
            </h2>
            <p className="text-xs md:text-sm mt-1 text-[#5B625C]">
              Start with your contact information and target role
            </p>
          </div>

          <Card className=" border border-[#E3E2DC] rounded-none shadow-[0_4px_20px_rgba(23,32,28,0.04)] bg-white overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <Form {...form}>
                <form className="space-y-4 md:space-y-5" onSubmit={form.handleSubmit(handlesave)}>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="font-mono text-[10px] md:text-xs tracking-widest "
                            style={{ color: "#6B7280" }}
                          >
                            FULL NAME
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
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
                      name="jobRole"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="font-mono text-[10px] md:text-xs tracking-widest"
                            style={{ color: "#6B7280" }}
                          >
                            JOB TITLE
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Frontend Developer"
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

                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="font-mono text-[10px] md:text-xs tracking-widest"
                            style={{ color: "#6B7280" }}
                          >
                            EMAIL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
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
                      name="phone_no"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="font-mono text-[10px] md:text-xs tracking-widest"
                            style={{ color: "#6B7280" }}
                          >
                            PHONE
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 98765 43210"
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

                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="font-mono text-[10px] md:text-xs tracking-widest"
                          style={{ color: "#6B7280" }}
                        >
                          ADDRESS
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            className={inputClass}
                            style={inputStyle}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                      </FormItem>
                    )}
                  />

                  <Collapsible open={openJd} onOpenChange={setOpenJd}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-0 p-4 rounded-none! hover:bg-transparent"
                        style={{ color: "#1C2333" }}
                      >
                        <span className="font-mono text-xs tracking-widest">
                          OPTIMIZE RESUME FOR A JOB (OPTIONAL)
                        </span>
                        <Plus
                          className="h-5 w-5 transition-transform"
                          style={{ transform: openJd ? "rotate(45deg)" : "none" }}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <FormField
                        name="jobDescription"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                rows={5}
                                placeholder="Paste only Requirements and Responsibilities.
                              Example:
                              • React.js, TypeScript, Redux
                              • Build responsive UI components
                              • Integrate REST APIs
                              • Collaborate with backend developers

                              Avoid company overview, perks, salary, and benefits."
                                {...field}
                                className="rounded-none! border resize-none text-xs md:text-sm placeholder:text-[10px] md:placeholder:text-sm"
                                style={inputStyle}
                              />
                            </FormControl>

                            <p className="text-[10px] md:text-xs" style={{ color: "#B7B5AC" }}>
                              AI can use this to align your summary, skills, and resume bullets with
                              the target job.
                            </p>

                            <FormMessage className="text-[10px]" style={{ color: "#B3382C" }} />
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible open={openSocial} onOpenChange={setOpenSocail}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-0 p-4 rounded-none! hover:bg-transparent"
                        style={{ color: "#1C2333" }}
                      >
                        <span className="font-mono text-xs tracking-widest">
                          SOCIAL LINKS (OPTIONAL)
                        </span>
                        <Plus
                          className="h-5 w-5 transition-transform"
                          style={{ transform: openJd ? "rotate(45deg)" : "none" }}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {" "}
                      <div className="pt-4 border-t" style={{ borderColor: "#E4E2DC" }}>
                        <h3
                          className="font-mono text-[10px] md:text-sm mb-4 flex items-center gap-2 uppercase tracking-widest"
                          style={{ color: "#1C2333" }}
                        >
                          <Globe className="w-3 md:w-4 h-3 md:h-4" style={{ color: "#B3382C" }} />
                          Social Links (Optional)
                        </h3>

                        <div className="space-y-3 md:space-y-4" id="tour-social-links">
                          <FormField
                            name="linkedin"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Linkedin
                                      className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5"
                                      style={{ color: "#B7B5AC" }}
                                    />
                                    <Input
                                      placeholder="LinkedIn URL"
                                      {...field}
                                      className="pl-9 md:pl-10 rounded-none! border transition-all h-8 md:h-11 text-[10px] md:text-sm"
                                      style={inputStyle}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="github"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Github
                                      className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5"
                                      style={{ color: "#B7B5AC" }}
                                    />
                                    <Input
                                      placeholder="GitHub URL"
                                      {...field}
                                      className="pl-9 md:pl-10 rounded-none! border transition-all h-8 md:h-11 text-[10px] md:text-sm"
                                      style={inputStyle}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="portfolio"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Globe
                                      className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5"
                                      style={{ color: "#B7B5AC" }}
                                    />
                                    <Input
                                      placeholder="Portfolio URL"
                                      {...field}
                                      className="pl-9 md:pl-10 rounded-none! border transition-all h-8 md:h-11 text-[10px] md:text-sm"
                                      style={inputStyle}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isloading}
                      className=" text-white shadow-xs h-10 md:h-11 px-5 md:px-7 font-sans text-xs md:text-sm font-medium tracking-wide bg-[#465B9E] hover:bg-[#344B93] transition-colors"
                    >
                      {isloading ? "Saving..." : "Next Step"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasicInfoStep);
