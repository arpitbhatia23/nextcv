import ClassicTemplate from "../templates/resume-pdf/classic";
import ModernPDFResumeTemplate from "../templates/resume-pdf/morden";
import ClassicMinimalistPDFResume from "../templates/resume-pdf/Minimalist";
import ModernBlueSidebarPDFResume from "../templates/resume-pdf/ModernBlueSideBar";

// New Templates
import ProfessionalClean from "../templates/resume-pdf/ProfessionalClean";
import CreativeTeal from "../templates/resume-pdf/CreativeTeal";
import ExecutiveGray from "../templates/resume-pdf/ExecutiveGray";
import TechDark from "../templates/resume-pdf/TechDark";
import CompactModern from "../templates/resume-pdf/CompactModern";
import BoldHeader from "../templates/resume-pdf/BoldHeader";
import SidebarLeft from "../templates/resume-pdf/SidebarLeft";
import InfographicLite from "../templates/resume-pdf/InfographicLite";

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
    image: "/minalmalist.webp",
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

  // New Templates
  {
    key: "ProfessionalClean",
    label: "Professional Clean",
    component: ProfessionalClean,
    image: "/professional-clean.webp", // Placeholder
  },
  {
    key: "CreativeTeal",
    label: "Creative Teal",
    component: CreativeTeal,
    image: "/creative-teal.webp", // Placeholder
  },
  {
    key: "ExecutiveGray",
    label: "Executive Gray",
    component: ExecutiveGray,
    image: "/executive-gray.webp", // Placeholder
  },
  {
    key: "TechDark",
    label: "Tech Dark",
    component: TechDark,
    image: "/tech-dark.webp", // Placeholder
  },
  {
    key: "CompactModern",
    label: "Compact Modern",
    component: CompactModern,
    image: "/compact-modern.webp", // Placeholder
  },
  {
    key: "BoldHeader",
    label: "Bold Header",
    component: BoldHeader,
    image: "/bold-header.webp", // Placeholder
  },
  {
    key: "SidebarLeft",
    label: "Sidebar Left",
    component: SidebarLeft,
    image: "/sidebar-left.webp", // Placeholder
  },
  {
    key: "InfographicLite",
    label: "Infographic Lite",
    component: InfographicLite,
    image: "/infographich-lite.webp", // Placeholder
  },
];
