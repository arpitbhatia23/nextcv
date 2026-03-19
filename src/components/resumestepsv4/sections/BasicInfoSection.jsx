"use client";
import React, { useEffect, useImperativeHandle, forwardRef } from "react";
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
  User,
  Briefcase,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useResumeStore from "@/store/useResumeStore";

const BasicInfoSection = forwardRef(({}, ref) => {
  const formData = useResumeStore((s) => s.formData);
  const updateForm = useResumeStore((s) => s.updateForm);

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

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    // Auto-save basic info as user types
    updateForm(watchedValues);
  }, [watchedValues]);

  useImperativeHandle(ref, () => ({
    validate: async () => {
      const isValid = await form.trigger();
      return isValid;
    },
  }));

  return (
    <div className="space-y-6">
      <div id="tour-resume-form-v4">
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="h-12 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl transition-all"
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
                      <Briefcase className="w-4 h-4 text-indigo-500" /> Target
                      Role
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Product Designer"
                        {...field}
                        className="h-12 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-500" /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="alex@example.com"
                        type="email"
                        {...field}
                        className="h-12 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl transition-all"
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
                      <Phone className="w-4 h-4 text-indigo-500" /> Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        {...field}
                        className="h-12 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl transition-all"
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
                    <MapPin className="w-4 h-4 text-indigo-500" /> Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="San Francisco, CA"
                      {...field}
                      className="h-12 bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                Digital Presence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormField
                  name="linkedin"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                          <Input
                            placeholder="LinkedIn"
                            {...field}
                            className="pl-10 h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all"
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
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                          <Input
                            placeholder="GitHub"
                            {...field}
                            className="pl-10 h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all"
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
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                          <Input
                            placeholder="Portfolio"
                            {...field}
                            className="pl-10 h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-lg transition-all"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
});

export default React.memo(BasicInfoSection);
