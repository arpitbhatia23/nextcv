"use client";

import { useForm, useWatch } from "react-hook-form";
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

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  jobRole: z.string().min(1, { message: "Job role is required" }),

  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
  jobDescription: z.string().optional(),
});

const BasicInfoStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const [openJd, setOpenJd] = useState(false);
  const [openSocial, setOpenSocail] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard/builder/education");
  }, [router]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formData?.name ?? "",
      phone: formData?.phone ?? "",
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
        phone: formData.phone ?? "",
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

  const watchedValues = useWatch({ control: form.control });

  const handlesave = values => {
    setIsLoading(true);

    updateForm(values);

    router.push("/dashboard/builder/education");
  };

  return (
    <div className="py-4 md:py-8">
      <div className="grid gap-2 md:gap-8 items-start">
        <div className="space-y-4 md:space-y-6" id="tour-resume-form">
          <div className="mb-2">
            <h2 className="text-lg md:text-2xl font-bold text-slate-900">Basic Details</h2>
            <p className="text-[10px] md:text-sm text-slate-500 font-medium">
              Start with your contact information and target role
            </p>
          </div>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg md:rounded-xl overflow-hidden">
            <CardContent className="p-3 md:p-6">
              <Form {...form}>
                <form className="space-y-4 md:space-y-5" onSubmit={form.handleSubmit(handlesave)}>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="jobRole"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Frontend Developer"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
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
                          <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 98765 43210"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11 text-xs md:text-base placeholder:text-[10px] md:placeholder:text-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <Collapsible open={openJd} onOpenChange={setOpenJd}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-0 p-4 font-semibold"
                      >
                        <span className="text-sm">✨ Optimize Resume for a Job (Optional)</span>
                        <Plus
                          className={`h-6 w-6  font-bold transition-transform ${openJd ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <FormField
                        name="jobDescription"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-xs md:text-sm">
                              Target Job Description{" "}
                              <span className="text-slate-400 font-normal">(Optional)</span>
                            </FormLabel>

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
                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all resize-none text-xs md:text-sm placeholder:text-[10px] md:placeholder:text-sm"
                              />
                            </FormControl>

                            <p className="text-[10px] md:text-xs text-slate-400">
                              AI can use this to align your summary, skills, and resume bullets with
                              the target job.
                            </p>

                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible open={openSocial} onOpenChange={setOpenSocail}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-0 p-4 font-semibold"
                      >
                        <span className="text-sm">✨ Social Links (Optional)</span>
                        <Plus
                          className={`h-6 w-6  font-bold transition-transform ${openJd ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {" "}
                      <div className="pt-4 border-t border-slate-100">
                        <h3 className="text-[10px] md:text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                          <Globe className="w-3 md:w-4 h-3 md:h-4 text-indigo-500" />
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
                                    <Linkedin className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5 text-slate-400" />
                                    <Input
                                      placeholder="LinkedIn URL"
                                      {...field}
                                      className="pl-9 md:pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-8 md:h-11 text-[10px] md:text-sm"
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
                                    <Github className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5 text-slate-400" />
                                    <Input
                                      placeholder="GitHub URL"
                                      {...field}
                                      className="pl-9 md:pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-8 md:h-11 text-[10px] md:text-sm"
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
                                    <Globe className="absolute left-3 top-2.5 md:top-3 w-4 md:w-5 h-4 md:h-5 text-slate-400" />
                                    <Input
                                      placeholder="Portfolio URL"
                                      {...field}
                                      className="pl-9 md:pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-8 md:h-11 text-[10px] md:text-sm"
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
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 h-10 md:h-11 px-6 md:px-8 text-xs md:text-sm font-bold"
                    >
                      {isloading ? "Saving..." : "Next"}
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
