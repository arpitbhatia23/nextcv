import dynamic from "next/dynamic";

export const templates = [
  {
    key: "classicTemplate",
    label: "Classic",
    component: () => import("../templates/resume-pdf/classic"),
    image: "/classic.webp",
  },
  {
    key: "MinimalistTemplate",
    label: "Minimalist",
    component: () => import("../templates/resume-pdf/Minimalist"),
    image: "/minalmalist.webp",
  },
  {
    key: "MordenBluesidebar",
    label: "Modern Blue Sidebar",
    component: () => import("../templates/resume-pdf/ModernBlueSideBar"),

    image: "/ModernSideBar.webp",
  },
  {
    key: "ModernFullStack",
    label: "Modern FullStack",
    component: () => import("../templates/resume-pdf/morden"),
    image: "/modern.webp",
  },

  // New Templates
  {
    key: "ProfessionalClean",
    label: "Professional Clean",
    component: () => import("../templates/resume-pdf/ProfessionalClean"),

    image: "/professional-clean.webp", // Placeholder
  },
  {
    key: "CreativeTeal",
    label: "Creative Teal",
    component: () => import("../templates/resume-pdf/CreativeTeal"),
    image: "/creative-teal.webp", // Placeholder
  },
  {
    key: "ExecutiveGray",
    label: "Executive Gray",
    component: () => import("../templates/resume-pdf/ExecutiveGray"),
    image: "/executive-gray.webp", // Placeholder
  },
  {
    key: "TechDark",
    label: "Tech Dark",
    component: () => import("../templates/resume-pdf/TechDark"),
    image: "/tech-dark.webp", // Placeholder
  },
  {
    key: "CompactModern",
    label: "Compact Modern",
    component: () => import("../templates/resume-pdf/CompactModern"),
    image: "/compact-modern.webp", // Placeholder
  },
  {
    key: "BoldHeader",
    label: "Bold Header",
    component: () => import("../templates/resume-pdf/BoldHeader"),
    image: "/bold-header.webp", // Placeholder
  },
  {
    key: "SidebarLeft",
    label: "Sidebar Left",
    component: () => import("../templates/resume-pdf/SidebarLeft"),
    image: "/sidebar-left.webp", // Placeholder
  },
  {
    key: "InfographicLite",
    label: "Infographic Lite",
    component: () => import("../templates/resume-pdf/InfographicLite"),
    image: "/infographich-lite.webp", // Placeholder
  },
];
