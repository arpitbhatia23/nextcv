import useResumeStore from "@/store/useResumeStore";
import axios from "axios";
import { toast } from "sonner";

export const useDraft = ({ setIsSubmit, selectedTemplate, formData, setIsFeedbackOpen }) => {
  const clearDraft = useResumeStore(s => s.clearStorage);

  const handleSaveDraft = async () => {
    try {
      setIsSubmit(true);
      const res = await axios.post("/api/resume/savedraft", {
        ResumeType: selectedTemplate,
        ...formData,
      });

      if (res.data.success) {
        toast.success("Draft saved successfully");
        clearDraft();
        setIsFeedbackOpen(true);
      } else {
        console.log(res.data);
        toast.error(res.data.message || "Failed to save draft");
      }
      setIsSubmit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
      toast.error("Error saving draft");
    }
  };

  return { handleSaveDraft };
};
