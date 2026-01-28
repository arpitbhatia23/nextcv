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
    image: "/modern.webp",
  },
  {
    key: "classicTemplate",
    label: "Classic",
    component: ClassicTemplate,
    image: "/classic.webp",
  },
  {
    key: "MinimalistTemplate",
    label: "Minimalist",
    component: ClassicMinimalistPDFResume,
    image: "/classic.webp", // Fallback to classic if no specific image found
  },
  {
    key: "MordenBluesidebar",
    label: "Modern Blue Sidebar",
    component: ModernBlueSidebarPDFResume,
    image: "/ModernSideBar.webp",
  },
  {
    key: "ModernFullStack",
    label: "Modern FullStack",
    component: ModernPDFResumeTemplate,
    image: "/modern.webp",
  },
];
