"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  ArrowRight,
  User,
  Briefcase,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const BasicInfoStepV2 = ({ next, formData, updateForm }) => {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z.string().min(1, { message: "Address is required" }),
    jobRole: z.string().min(1, { message: "Job role is required" }),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
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

  const handlesave = values => {
    updateForm(values);
    next();
  };

  return (
    <div className="py-2 ">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Personal Branding
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg">
              Let's start with how employers can reach you.
            </p>
          </div>

          <div id="tour-resume-form-v2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlesave)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <User className="w-4 h-4 text-indigo-500" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Alex Rivera"
                            {...field}
                            className="h-10 md:h-14 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-base"
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
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-indigo-500" /> Target Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Product Designer"
                            {...field}
                            className="h-10 md:h-14 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Mail className="w-4 h-4 text-indigo-500" /> Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="alex@example.com"
                            type="email"
                            {...field}
                            className="h-10 md:h-14 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-base"
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
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Phone className="w-4 h-4 text-indigo-500" /> Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 000-0000"
                            {...field}
                            className="h-10 md:h-14 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-base"
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
                      <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500" /> Current Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="San Francisco, CA"
                          {...field}
                          className="h-10 md:h-14 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                    Digital Presence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="tour-social-links-v2">
                    <FormField
                      name="linkedin"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative group">
                              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="LinkedIn"
                                {...field}
                                className="pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
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
                            <div className="relative group">
                              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="GitHub"
                                {...field}
                                className="pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
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
                            <div className="relative group">
                              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="Portfolio"
                                {...field}
                                className="pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg md:rounded-xl transition-all"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 md:pt-8">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 px-5 md:px-10 h-10 md:h-14 rounded-xl md:rounded-2xl font-semibold md:font-bold text-sm md:text-lg group"
                    type="submit"
                    id="tour-next-button-v2"
                  >
                    Continue to Education{" "}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Dynamic Preview Section */}
          {/* <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="mb-4">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                  Live Document Preview
                </span>
              </div>

              <Card className="border-none shadow-[20px_40px_80px_rgba(0,0,0,0.05)] bg-white rounded-4xl overflow-hidden">
                <div className="h-3 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600" />
                <CardContent
                  className="p-4 md:p-10"
                  id="tour-resume-preview-v2"
                >
                  <div className="space-y-8">
                    <div className="border-b border-slate-100 pb-8 text-center sm:text-left">
                      <motion.h1
                        layout
                        className="text-lg md:text-4xl font-black text-slate-900 tracking-tight transition-all"
                      >
                        {watchedValues.name || "Your Name"}
                      </motion.h1>
                      <motion.p
                        layout
                        className="text-lg md:text-4xl text-indigo-600 font-bold mt-2"
                      >
                        {watchedValues.jobRole || "Target Job Title"}
                      </motion.p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Mail className="w-5 h-5 text-indigo-500" />
                        </div>
                        <span className="font-semibold truncate">
                          {watchedValues.email || "email@example.com"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 md:rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Phone className="w-5 h-5 text-indigo-500" />
                          </div>
                          <span className="font-semibold">
                            {watchedValues.phone || "Phone No"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                          </div>
                          <span className="font-semibold">
                            {watchedValues.address || "Location"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4">
                      {watchedValues.linkedin && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold">
                          <Linkedin className="w-4 h-4" /> Profile Linked
                        </div>
                      )}
                      {watchedValues.github && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">
                          <Github className="w-4 h-4" /> Code Ready
                        </div>
                      )}
                      {watchedValues.portfolio && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold">
                          <Globe className="w-4 h-4" /> Web Live
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 p-6 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl text-white shadow-lg shadow-indigo-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">ATS Optimized</h4>
                    <p className="text-white/70 text-sm">
                      Your contact info is being formatted for maximum
                      readability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default React.memo(BasicInfoStepV2);
