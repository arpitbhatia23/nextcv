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
import { Card, CardContent } from "@/shared/components/ui/card";
import { Linkedin, Github, Globe, ArrowRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../shared/components/ui/button";
import React, { useEffect } from "react";
import useResumeStore from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

const BasicInfoStep = () => {
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);
  const router = useRouter();
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z.string().min(1, { message: "Address is required" }),
    jobRole: z.string().min(1, { message: "Job role is required" }),
  });

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
      });
    }
  }, [formData, form]);

  const watchedValues = useWatch({ control: form.control });

  const handlesave = () => {
    updateForm(watchedValues);
    router.push("/dashboard/builder/education");
  };
  return (
    <div className="py-8">
      <div className="grid  gap-2 md:gap-8 items-start">
        {/* Form Section */}
        <div className="space-y-6" id="tour-resume-form">
          <div className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Basic Details</h2>
            <p className=" text-sm md: text-slate-500">Start with your contact information</p>
          </div>
          <Card className="border border-slate-200 shadow-sm bg-white rounded-lg md:rounded-xl overflow-hidden">
            <CardContent className="p-2 md:p-6">
              <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(handlesave)}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="jobRole"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 98765 43210"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-500" /> Social Links (Optional)
                    </h3>
                    <div className="space-y-4" id="tour-social-links">
                      <FormField
                        name="linkedin"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Linkedin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input
                                  placeholder="LinkedIn URL"
                                  {...field}
                                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
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
                                <Github className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input
                                  placeholder="GitHub URL"
                                  {...field}
                                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
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
                                <Globe className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                <Input
                                  placeholder="Portfolio URL"
                                  {...field}
                                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-9 md:h-11"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-4 md:px-8 h-9 md:h-11 rounded-lg font-semibold"
                      type="submit"
                      id="tour-next-button"
                    >
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
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
