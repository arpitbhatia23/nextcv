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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Your Resume
          </h1>
          <p className="text-gray-600">
            Fill in your basic information to get started
          </p>
        </div> */}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm p-0">
              <CardHeader className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    className="space-y-6 p-4"
                    onSubmit={form.handleSubmit(handlesave)}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                              <User className="w-4 h-4" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                            <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                              <Phone className="w-4 h-4" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              type="email"
                              {...field}
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        name="linkedin"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                              <Linkedin className="w-4 h-4" />
                              LinkedIn Profile {"(optional)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://linkedin.com/in/..."
                                {...field}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="github"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                              <Github className="w-4 h-4" />
                              GitHub Profile {"(optional)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://github.com/..."
                                {...field}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="portfolio"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                            <Globe className="w-4 h-4" />
                            Portfolio Website {"(optional)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://yourportfolio.com"
                              {...field}
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="address"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                            <MapPin className="w-4 h-4" />
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              {...field}
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                          <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                            <Briefcase className="w-4 h-4" />
                            Job Role/Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Software Developer, Designer"
                              {...field}
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end items-center">
                      <Button
                        className={
                          "bg-linear-to-b from-indigo-600 to-purple-600 text-white relative "
                        }
                        type="submit"
                      >
                        next
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Resume Preview Section */}
          <div className=" space-y-6 p-4">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm p-0">
              <CardHeader className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg p-3">
                <CardTitle
                  className={
                    "flex items-center justify-center gap-2 text-black"
                  }
                >
                  <Logo2 />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white border rounded-lg p-6 min-h-37.5 shadow-inner">
                  {/* Resume Template */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="text-center border-b pb-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {watchedValues.name || formData?.name || "Your Name"}
                      </h2>
                      <p className="text-lg text-gray-600 mt-1">
                        {watchedValues.jobRole ||
                          formData?.jobRole ||
                          "Your Job Role"}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
                        {watchedValues.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {watchedValues.email || formData.email}
                          </span>
                        )}
                        {watchedValues.phone ||
                          (formData?.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {watchedValues.phone || formData?.phone}
                            </span>
                          ))}
                        {watchedValues.address ||
                          (formData?.address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {watchedValues?.address || formData?.address}
                            </span>
                          ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
                        {(watchedValues.linkedin || formData?.linkedin) && (
                          <a
                            href="#"
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Linkedin className="w-3 h-3" />
                            LinkedIn
                          </a>
                        )}
                        {(watchedValues.github || formData?.github) && (
                          <a
                            href="#"
                            className="flex items-center gap-1 text-gray-700 hover:underline"
                          >
                            <Github className="w-3 h-3" />
                            GitHub
                          </a>
                        )}
                        {(watchedValues.portfolio || formData?.portfolio) && (
                          <a
                            href="#"
                            className="flex items-center gap-1 text-green-600 hover:underline"
                          >
                            <Globe className="w-3 h-3" />
                            Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BasicInfoStep);
