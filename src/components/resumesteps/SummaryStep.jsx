"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrainCircuit } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SummaryStep = ({ next, previous, formData, updateForm }) => {
  const [summary, setSummary] = useState(formData.summary || "");
  const schema = z.object({
    summary: z.string().min(20, { message: "summary is reuired" }),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      summary: "",
    },
  });

  useEffect(() => {
    updateForm({ summary });
  }, [summary]);

  const onSubmit = (values) => {
    setSummary(values.summary);
    form.reset();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center justify-between bg-gradient-to-b from-indigo-600 to-purple-600 rounded-t-lg p-3">
            <CardTitle className="text-2xl font-bold text-white">
              Add Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Summary{" "}
                        <span className="text-xs text-muted-foreground">
                          (AI Generated or manual)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Write a short professional summary..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm text-indigo-600 border-indigo-500 hover:bg-indigo-50"
                  >
                    Generate using AI
                  </Button>
                </div>

                <div className="flex justify-end gap-2 items-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
                  >
                    Save Summary
                  </Button>
                  <Button
                    type="button"
                    className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
                    onClick={next}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="bg-white rounded-lg shadow-md p-0">
          <CardHeader className="flex items-center mb-6 bg-gradient-to-b from-indigo-600 to-purple-600 p-3 rounded-t-lg">
            <BrainCircuit className="w-6 h-6 text-white mr-2" />
            <CardTitle className="text-2xl font-bold text-white">
              Summary Preview
            </CardTitle>
          </CardHeader>

          <CardContent>
            {summary ? (
              <div className="border border-gray-200 rounded-lg p-4 text-gray-800 text-sm">
                {summary}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No summary added yet.</p>
                <p className="text-sm">Add your professional summary above.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryStep;
