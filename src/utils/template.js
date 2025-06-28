import ClassicTemplate from "../../templates/resume-pdf/classic";
import ModernPDFResumeTemplate from "../../templates/resume-pdf/morden";
import ClassicMinimalistPDFResume from "../../templates/resume-pdf/Minimalist";
import ModernBlueSidebarPDFResume from "../../templates/resume-pdf/ModernBlueSideBar";
import CleanBusinessAnalystPDFResume from "../../templates/resume-pdf/businessAnalistTemplate";

export const templates = [
  {
    key: "modernTemplate",
    label: "Modern",
    component: ModernPDFResumeTemplate,
  },
  {
    key: "classicTemplate",
    label: "Classic",
    component: ClassicTemplate,
  },
  {
    key: "MinimalistTemplate",
    label: "Minimalist",
    component: ClassicMinimalistPDFResume,
  },
  {
    key: "MordenBluesidebar",
    label: "Morden blue sidebar",
    component: ModernBlueSidebarPDFResume,
  },
  {
    key: "ModernFullStack",
    label: "MordenFullStack",
    component: ModernPDFResumeTemplate,
  },
  {
    key: "Businessanlayist",
    label: "BusinessAnalyst",
    component: CleanBusinessAnalystPDFResume,
  },
];
