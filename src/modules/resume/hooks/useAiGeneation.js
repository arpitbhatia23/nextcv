import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useAiGeneration = ({
  form = null,
  jobDescription = "",
  type = "general",
  field = "description",
  getPayload,
  onSuccess,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGeneration = async () => {
    try {
      let payloadData = {};

      if (getPayload) {
        payloadData = getPayload();
      } else if (form) {
        const formData = form.getValues();

        const isValid = Object.entries(formData)
          .filter(([key]) => key !== field)
          .some(([, val]) => {
            if (Array.isArray(val)) return val.length > 0;
            return val && String(val).trim() !== "";
          });

        if (!isValid) {
          toast(`Please fill required fields before generating ${type}`);
          return;
        }

        payloadData = formData;
      } else {
        toast("No data provided for AI generation");
        return;
      }

      setIsGenerating(true);

      const res = await axios.post("/api/gen/description", {
        type,
        data: {
          ...payloadData,
          jobDescription: jobDescription || payloadData.jobDescription || "",
        },
      });

      const result = res.data?.data;

      console.log(result);

      if (!result) {
        toast("No response from AI");
        return;
      }

      if (onSuccess) {
        onSuccess(result);
      } else if (form) {
        form.setValue(field, String(result), {
          shouldDirty: true,
          shouldValidate: true,
        });
      }

      toast("✨ AI content generated!");
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || "Something went wrong while generating 😓"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleAiGeneration,
    isGenerating,
  };
};
