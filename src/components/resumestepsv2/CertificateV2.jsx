"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Edit2,
  Trash2,
  Award,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Building,
  ExternalLink,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const CertificateV2 = ({ next, previous, formData, updateForm }) => {
  const [certList, setCertList] = useState(formData.certificates || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const form = useForm({
    defaultValues: {
      title: "",
      organization: "",
      year: "",
      credentialUrl: "",
    },
  });

  useEffect(() => {
    updateForm({ certificates: certList });
  }, [certList]);

  const onSubmit = (values) => {
    if (isEditing) {
      setCertList((prev) =>
        prev.map((cert) =>
          cert.id === editingId ? { ...values, id: editingId } : cert,
        ),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      setCertList((prev) => [...prev, { ...values, id: Date.now() }]);
    }
    form.reset();
  };

  const handleEdit = (cert) => {
    form.reset(cert);
    setIsEditing(true);
    setEditingId(cert.id);
  };

  const handleDelete = (id) => {
    setCertList((prev) => prev.filter((cert) => cert.id !== id));
  };

  return (
    <div className="py-2">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
              Credentials & Awards
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-lg">
              Validate your skills with official certifications.
            </p>
          </div>

          <Card
            className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden"
            id="tour-certificates-form-v2"
          >
            <div className="bg-indigo-600/5 px-3 md:px-6 py-2 md:py-4 border-b border-indigo-100/50 flex items-center justify-between">
              <span className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />{" "}
                {isEditing ? "Modify Credential" : "New Achievement"}
              </span>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                  }}
                  className="h-8 text-xs font-bold text-slate-400"
                >
                  Cancel
                </Button>
              )}
            </div>
            <CardContent className="p-2 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold">
                          Certification Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. AWS Certified Solutions Architect"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500  rounded-lg md:rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                          <Building className="w-4 h-4 text-indigo-500" />{" "}
                          Issuing Organization
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Amazon Web Services"
                            {...field}
                            className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500  rounded-lg md:rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-indigo-500" />{" "}
                            Issue Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500  rounded-lg md:rounded-xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="credentialUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-900 font-bold flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-indigo-500" />{" "}
                            Verification URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              className="h-10 md:h-12 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500  rounded-lg md:rounded-xl transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-12 md:h-14 rounded-xl md:rounded-2xl transition-all group"
                  >
                    {isEditing ? "Save Credential" : "Add to Resume"}
                    <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* List Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold md:font-black text-slate-400 uppercase tracking-[0.35em]">
              Credential List
            </h3>
            <span className="text-xs font-semibold md:font-bold text-indigo-600 bg-indigo-50 px-1 md:px-3 py-1 rounded-lg md:rounded-full">
              {certList.length} Verified
            </span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            id="tour-certificates-list-v2"
          >
            <AnimatePresence initial={false}>
              {certList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full bg-white border-2 border-dashed border-slate-100 rounded-4xl p-16 text-center"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 font-black text-xl">
                    No certificates listed.
                  </p>
                  <p className="text-slate-300 font-medium text-sm mt-1">
                    Stand out by listing your professional accolades.
                  </p>
                </motion.div>
              ) : (
                certList.map((cert) => (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Card className="group relative border-none bg-white hover:bg-indigo-50/30 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl rounded-4xl transition-all overflow-hidden border-2 border-transparent hover:border-indigo-100">
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full justify-between gap-4">
                          <div className="space-y-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                              <Award className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h4 className="font-black text-slate-900 leading-snug">
                              {cert.title}
                            </h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              {cert.organization}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-2">
                            <span className="text-[10px] font-black text-slate-300">
                              {cert.year}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(cert)}
                                className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(cert.id)}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="pt-8 flex justify-between gap-4">
            <Button
              onClick={previous}
              variant="ghost"
              className="h-12 md:h-14 px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button
              onClick={next}
              className="h-12 md:h-14 px-6 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all"
            >
              Profile Summary <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateV2);
