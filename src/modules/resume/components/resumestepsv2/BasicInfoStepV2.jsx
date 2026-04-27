"use client";
import React, { useEffect } from "react";
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
import { Button } from "../../../../shared/components/ui/button";
import { useRouter } from "next/navigation";

const BasicInfoStepV2 = ({ next, formData, updateForm }) => {
  const router = useRouter();

  // OPTIMIZATION: Prefetch next step on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/education");
  }, [router]);

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
    <div className="py-2 md:py-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Form Section */}
        <div className="lg:col-span-8 space-y-4 md:space-y-8">
          <div className="mb-2">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Personal Branding
            </h2>
            <p className="text-slate-500 mt-1 text-xs md:text-lg">
              Set the foundation for your professional identity.
            </p>
          </div>

          <div id="tour-resume-form-v2" className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlesave)} className="space-y-4 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <User className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Alex Rivera"
                            {...field}
                            className="h-10 md:h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Briefcase className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Target Role
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Lead Engineer"
                            {...field}
                            className="h-10 md:h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-xs md:text-base placeholder:text-[10px]"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Mail className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="alex@example.com"
                            type="email"
                            {...field}
                            className="h-10 md:h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                          <Phone className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 000-0000"
                            {...field}
                            className="h-10 md:h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-xs md:text-base placeholder:text-[10px]"
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
                      <FormLabel className="text-slate-900 font-bold flex items-center gap-2 text-xs md:text-sm">
                        <MapPin className="w-3.5 md:w-4 h-3.5 md:h-4 text-indigo-500" /> Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City, State / Country"
                          {...field}
                          className="h-10 md:h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl md:rounded-2xl transition-all text-xs md:text-base placeholder:text-[10px]"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 md:pt-6 border-t border-slate-100">
                  <h3 className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest mb-4 md:mb-6">
                    Digital Nexus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" id="tour-social-links-v2">
                    <FormField
                      name="linkedin"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative group">
                              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="LinkedIn URL"
                                {...field}
                                className="pl-10 md:pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm placeholder:text-[10px]"
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
                              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="GitHub URL"
                                {...field}
                                className="pl-10 md:pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm placeholder:text-[10px]"
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
                              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                              <Input
                                placeholder="Portfolio URL"
                                {...field}
                                className="pl-10 md:pl-12 h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all text-xs md:text-sm placeholder:text-[10px]"
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
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 px-8 h-11 md:h-14 rounded-xl md:rounded-2xl font-black transition-all group text-xs md:text-sm"
                    type="submit"
                    id="tour-next-button-v2"
                  >
                    Education Path
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(BasicInfoStepV2);
