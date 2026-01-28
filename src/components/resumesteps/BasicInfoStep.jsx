import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Briefcase,
  ArrowRight
} from "lucide-react";
import Logo2 from "../Logo2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import React, { useEffect } from "react";

const BasicInfoStep = ({ next, previous, formData, updateForm }) => {
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

  const watchedValues = form.watch();

  const handlesave = () => {
    updateForm(watchedValues);
    next();
  };
  console.log("render");
  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <div className="space-y-6">
           <div className="mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Basic Details</h2>
              <p className="text-slate-500">Start with your contact information</p>
           </div>
          <Card className="border border-slate-200 shadow-sm bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(handlesave)}
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                          <FormLabel className="text-slate-700 font-semibold">
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Software Engineer"
                              {...field}
                              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@example.com"
                                type="email"
                                {...field}
                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+91 98765 43210"
                                {...field}
                                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                        <FormLabel className="text-slate-700 font-semibold">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                      <div className="space-y-4">
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
                                      className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                                      className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                                      className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all h-11"
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
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8 h-11 rounded-lg font-semibold"
                      type="submit"
                    >
                      Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Section */}
        <div className="sticky top-24">
           <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Live Preview</h3>
           </div>
          <Card className="border border-slate-200 shadow-xl shadow-slate-200/50 bg-white rounded-xl overflow-hidden min-h-[500px]">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-4">
               <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-400" />
                     <div className="w-3 h-3 rounded-full bg-amber-400" />
                     <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-8">
                <div className="text-center space-y-4">
                   <div>
                       <h1 className="text-3xl font-bold text-slate-900 break-words">
                         {watchedValues.name || formData?.name || "Your Name"}
                       </h1>
                       <p className="text-xl text-indigo-600 font-medium mt-1 break-words">
                         {watchedValues.jobRole || formData?.jobRole || "Job Title"}
                       </p>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                      {(watchedValues.email || formData?.email) && (
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{watchedValues.email || formData?.email}</span>
                         </div>
                      )}
                      {(watchedValues.phone || formData?.phone) && (
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{watchedValues.phone || formData?.phone}</span>
                         </div>
                      )}
                      {(watchedValues.address || formData?.address) && (
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{watchedValues.address || formData?.address}</span>
                         </div>
                      )}
                   </div>

                   <div className="flex flex-wrap justify-center gap-4 text-sm pt-2 border-t border-slate-100 mt-4">
                      {(watchedValues.linkedin || formData?.linkedin) && (
                         <span className="flex items-center gap-1 text-slate-600">
                            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                         </span>
                      )}
                      {(watchedValues.github || formData?.github) && (
                         <span className="flex items-center gap-1 text-slate-600">
                            <Github className="w-3.5 h-3.5" /> GitHub
                         </span>
                      )}
                      {(watchedValues.portfolio || formData?.portfolio) && (
                         <span className="flex items-center gap-1 text-slate-600">
                            <Globe className="w-3.5 h-3.5" /> Portfolio
                         </span>
                      )}
                   </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasicInfoStep);
