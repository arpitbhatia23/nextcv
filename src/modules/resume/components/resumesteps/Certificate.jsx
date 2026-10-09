"use client";

import React, { useEffect, useState } from "react";
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
import { FontImports } from "../fontImport";

/*
 * Fonts:
 * Fraunces for section titles
 * IBM Plex Mono for labels / eyebrow text
 */

const inputClass =
  "border rounded-none transition-all h-10 md:h-11 text-xs md:text-sm placeholder:text-xs focus-visible:ring-1 focus-visible:ring-[#465B9E]";

const inputStyle = {
  backgroundColor: "#F8F7F3",
  borderColor: "#E3E2DC",
  color: "#17201C",
};

const EMPTY_FORM = {
  title: "",
  organization: "",
  year: "",
  credentialUrl: "",
};

const CertificateStep = () => {
  const formData = useResumeStore(state => state.formData);
  const updateForm = useResumeStore(state => state.updateForm);

  const router = useRouter();

  const [certList, setCertList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /*
   * Validation
   */
  const schema = z.object({
    title: z.string().min(2, {
      message: "Certificate name is required",
    }),

    organization: z.string().min(2, {
      message: "Issuing organization is required",
    }),

    year: z.string().optional(),

    credentialUrl: z.string().url().optional().or(z.literal("")),
  });

  /*
   * React Hook Form
   */
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    if (formData?.certificates?.length > 0) {
      setCertList(
        (formData.certificates || []).map((c, i) => ({ ...c, id: c.id ?? Date.now() + i }))
      );
    }
  }, [formData?.certificates]);

  /*
   * ---------------------------------------------------------
   * INITIAL PAGE SETUP
   * ---------------------------------------------------------
   */
  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "certifications",
      step_number: 7,
    });

    router.prefetch("/dashboard/builder/summary");
  }, [router]);

  /*
   * ---------------------------------------------------------
   * SAVE CERTIFICATES
   * ---------------------------------------------------------
   *
   * Keep local state and Zustand synchronized explicitly.
   *
   * We do NOT use a useEffect like:
   *
   * useEffect(() => {
   *   updateForm({ certificates: certList });
   * }, [certList]);
   *
   * because that can overwrite asynchronously loaded data.
   */
  const saveCertificates = nextCertificates => {
    setCertList(nextCertificates);

    updateForm({
      certificates: nextCertificates,
    });
  };

  /*
   * ---------------------------------------------------------
   * RESET FORM
   * ---------------------------------------------------------
   */
  const resetForm = () => {
    form.reset(EMPTY_FORM);
  };

  /*
   * ---------------------------------------------------------
   * ADD / UPDATE CERTIFICATE
   * ---------------------------------------------------------
   */
  const onSubmit = values => {
    let nextCertificates;

    if (isEditing && editingId) {
      /*
       * UPDATE EXISTING CERTIFICATE
       */
      nextCertificates = certList.map(certificate => {
        if (certificate._id === editingId) {
          return {
            ...certificate,
            ...values,
            _id: editingId,
          };
        }

        return certificate;
      });
    } else {
      /*
       * ADD NEW CERTIFICATE
       */
      nextCertificates = [
        ...certList,
        {
          ...values,
          _id: Date.now(),
        },
      ];
    }

    /*
     */
    saveCertificates(nextCertificates);

    /*
     * Exit edit mode
     */
    setIsEditing(false);
    setEditingId(null);

    resetForm();
  };

  /*
   * ---------------------------------------------------------
   * EDIT CERTIFICATE
   * ---------------------------------------------------------
   */
  const handleEdit = certificate => {
    form.reset({
      title: certificate?.title || "",
      organization: certificate?.organization || "",
      year: certificate?.year || "",
      credentialUrl: certificate?.credentialUrl || "",
    });

    setEditingId(certificate?._id);
    setIsEditing(true);

    /*
     * Scroll to form on mobile / smaller screens
     */
    setTimeout(() => {
      document.getElementById("tour-certificates-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  /*
   * ---------------------------------------------------------
   * DELETE CERTIFICATE
   * ---------------------------------------------------------
   */
  const handleDelete = id => {
    if (!id) return;
    console.log(id);
    const nextCertificates = certList.filter(certificate => certificate._id !== id);

    saveCertificates(nextCertificates);

    /*
     * If user deletes the certificate currently being edited,
     * leave edit mode.
     */
    if (editingId === id) {
      setIsEditing(false);
      setEditingId(null);
      resetForm();
    }
  };

  /*
   * ---------------------------------------------------------
   * CANCEL EDIT
   * ---------------------------------------------------------
   */
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);

    resetForm();
  };

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */
  return (
    <div className="py-4 md:py-8 bg-[#F8F7F3]">
      <FontImports />

      {/* Header */}
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
        {/* =====================================================
            FORM
        ====================================================== */}
        <Card
          id="tour-certificates-form"
          className="border rounded-none border-[#E3E2DC] shadow-[0_4px_20px_rgba(23,32,28,0.04)] py-0 overflow-hidden bg-white"
        >
          <CardHeader className="border-b border-[#E3E2DC] p-4 flex flex-row justify-between items-center">
            <CardTitle
              className="font-mono text-[10px] md:text-xs tracking-widest"
              style={{ color: "#6B7280" }}
            >
              {isEditing ? "EDIT CERTIFICATE" : "ADD CERTIFICATE"}
            </CardTitle>

            {isEditing && (
              <Button
                type="button"
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
                {/* Certificate Name */}
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

                {/* Issuing Organization */}
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

                {/* Year + URL */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {/* Year */}
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

                  {/* Credential URL */}
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

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full text-white shadow-xs h-10 md:h-11 font-sans text-xs md:text-sm font-medium tracking-wide bg-[#465B9E] hover:bg-[#344B93] transition-colors"
                  >
                    {isEditing ? "Update Certificate" : "Save Certificate"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* =====================================================
            CERTIFICATE LIST
        ====================================================== */}
        <div className="space-y-6">
          <div
            id="tour-certificates-list"
            className="border p-4 md:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)] bg-white"
            style={{ borderColor: "#E3E2DC" }}
          >
            <h3 className="font-mono text-[10px] md:text-xs font-medium uppercase tracking-widest flex items-center gap-2 mb-4 text-[#5B625C]">
              <Award className="w-4 h-4 text-[#465B9E]" />
              Verified Credentials
            </h3>

            {certList.length === 0 ? (
              <div
                className="text-center py-8 md:py-10 border border-dashed"
                style={{
                  borderColor: "#E4E2DC",
                  backgroundColor: "#F7F7F5",
                }}
              >
                <p className="text-xs" style={{ color: "#B7B5AC" }}>
                  No certifications added.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {certList?.map(cert => (
                  <div
                    key={cert?._id}
                    className="p-3 md:p-4 border flex flex-col gap-2 group transition-colors"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E4E2DC",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-display font-medium text-xs md:text-sm truncate"
                          style={{ color: "#1C2333" }}
                        >
                          {cert?.title}
                        </h4>

                        <div
                          className="font-mono text-[10px] md:text-xs truncate mt-0.5"
                          style={{ color: "#B3382C" }}
                        >
                          {cert?.organization}

                          {cert.year && (
                            <span style={{ color: "#B7B5AC" }} className="ml-1 font-normal">
                              ({cert?.year})
                            </span>
                          )}
                        </div>

                        {cert?.credentialUrl && (
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

                      {/* Actions */}
                      <div className="flex flex-col gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        {/* Edit */}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleEdit(cert)}
                          aria-label={`Edit ${cert.title}`}
                        >
                          <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        </Button>

                        {/* Delete */}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 md:h-8 md:w-8 rounded-none hover:bg-transparent"
                          style={{ color: "#B7B5AC" }}
                          onClick={() => handleDelete(cert._id)}
                          aria-label={`Delete ${cert.title}`}
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

          {/* Tips */}
          <Tips section="certificates" />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            {/* Previous */}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                router.push("/dashboard/builder/projects");
              }}
              className="h-10 px-4 md:px-5 font-sans text-xs md:text-sm font-medium border-[#E3E2DC] text-[#17201C] bg-white hover:bg-[#F1F0EB]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {/* Next */}
            <Button
              type="button"
              onClick={() => {
                posthog.capture("builder_step_complete", {
                  step: "certifications",
                  step_number: 7,
                });

                router.push("/dashboard/builder/summary");
              }}
              className="text-white shadow-xs h-10 px-5 md:px-6 font-sans text-xs md:text-sm font-medium bg-[#465B9E] hover:bg-[#344B93] transition-colors"
              id="tour-next-button"
            >
              Summary Info
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CertificateStep);
