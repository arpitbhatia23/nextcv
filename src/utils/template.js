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

// Batch 1: Tech Giants
import GoogleTech from "../templates/resume-pdf/GoogleTech";
import MicrosoftCorp from "../templates/resume-pdf/MicrosoftCorp";
import AmazonOperations from "../templates/resume-pdf/AmazonOperations";
import AppleCreative from "../templates/resume-pdf/AppleCreative";
import MetaSocial from "../templates/resume-pdf/MetaSocial";

// Batch 2: Indian MNCs
import TcsDigital from "../templates/resume-pdf/TcsDigital";
import InfosysSystem from "../templates/resume-pdf/InfosysSystem";
import WiproModern from "../templates/resume-pdf/WiproModern";
import HclTech from "../templates/resume-pdf/HclTech";
import MahindraRise from "../templates/resume-pdf/MahindraRise";

// Batch 3: Global Corporate
import IbmClassic from "../templates/resume-pdf/IbmClassic";
import AccentureConsult from "../templates/resume-pdf/AccentureConsult";
import DeloitteAudit from "../templates/resume-pdf/DeloitteAudit";
import CapgeminiFlow from "../templates/resume-pdf/CapgeminiFlow";
import CiscoNet from "../templates/resume-pdf/CiscoNet";

// Batch 4: Finance & Enterprise
import OracleDb from "../templates/resume-pdf/OracleDb";
import SapEnterprise from "../templates/resume-pdf/SapEnterprise";
import GoldmanFinance from "../templates/resume-pdf/GoldmanFinance";
import JpmorganChase from "../templates/resume-pdf/JpmorganChase";
import NetflixCulture from "../templates/resume-pdf/NetflixCulture";

// Batch 5: Role-Specific
import MedicalNurse from "../templates/resume-pdf/MedicalNurse";
import AcademicTeacher from "../templates/resume-pdf/AcademicTeacher";
import SalesGrowth from "../templates/resume-pdf/SalesGrowth";
import LegalProfessional from "../templates/resume-pdf/LegalProfessional";
import MarketingCreative from "../templates/resume-pdf/MarketingCreative";
import ClinicalTrial from "../templates/resume-pdf/ClinicalTrial";

export const templates = [
  {
    key: "modernTemplate",
    label: "Modern",
    component: ModernPDFResumeTemplate,
    image: "/modern.webp",
  },

  {
    key: "MarketingCreative",
    label: "Marketing / Creative",
    component: MarketingCreative,
    image: "/marketing.webp", // Placeholder
  },
  {
    key: "ClinicalTrial",
    label: "Clinical Trial / Research",
    component: ClinicalTrial,
    image: "/clinincal.webp", // Placeholder
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
    image: "/milimalist.webp",
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
  {
    key: "ProfessionalClean",
    label: "Professional Clean",
    component: ProfessionalClean,
    image: "/professionalclean.webp",
  },
  {
    key: "CreativeTeal",
    label: "Creative Teal",
    component: CreativeTeal,
    image: "/creativeteal.webp",
  },
  {
    key: "ExecutiveGray",
    label: "Executive Gray",
    component: ExecutiveGray,
    image: "/executivegray.webp",
  },
  {
    key: "TechDark",
    label: "Tech Dark",
    component: TechDark,
    image: "/techdark.webp",
  },
  {
    key: "CompactModern",
    label: "Compact Modern",
    component: CompactModern,
    image: "/compactmodern.webp",
  },
  {
    key: "BoldHeader",
    label: "Bold Header",
    component: BoldHeader,
    image: "/boldheader.webp",
  },
  {
    key: "SidebarLeft",
    label: "Sidebar Left",
    component: SidebarLeft,
    image: "/sidebarleft.webp",
  },
  {
    key: "InfographicLite",
    label: "Infographic Lite",
    component: InfographicLite,
    image: "/infografhic.webp",
  },

  // Batch 1: Tech Giants
  {
    key: "GoogleTech",
    label: "Google Tech",
    component: GoogleTech,
    image: "/googletech.webp", // Placeholder
  },
  {
    key: "MicrosoftCorp",
    label: "Microsoft Corp",
    component: MicrosoftCorp,
    image: "/microsoft.webp", // Placeholder
  },
  {
    key: "AmazonOperations",
    label: "Amazon Ops",
    component: AmazonOperations,
    image: "/amazon.webp", // Placeholder
  },
  {
    key: "AppleCreative",
    label: "Apple Creative",
    component: AppleCreative,
    image: "/applecreative.webp", // Placeholder
  },
  {
    key: "MetaSocial",
    label: "Meta Social",
    component: MetaSocial,
    image: "/metasocial.webp", // Placeholder
  },

  // Batch 2: Indian MNCs
  {
    key: "TcsDigital",
    label: "TCS Digital",
    component: TcsDigital,
    image: "/tcs.webp", // Placeholder
  },
  {
    key: "InfosysSystem",
    label: "Infosys System",
    component: InfosysSystem,
    image: "/infosys.webp", // Placeholder
  },
  {
    key: "WiproModern",
    label: "Wipro Modern",
    component: WiproModern,
    image: "/wipro.webp", // Placeholder
  },
  {
    key: "HclTech",
    label: "HCL Tech",
    component: HclTech,
    image: "/hcl.webp", // Placeholder
  },
  {
    key: "MahindraRise",
    label: "Mahindra Rise",
    component: MahindraRise,
    image: "/mahindra.webp", // Placeholder
  },

  // Batch 3: Global Corporate
  {
    key: "IbmClassic",
    label: "IBM Classic",
    component: IbmClassic,
    image: "/ibm.webp", // Placeholder
  },
  {
    key: "AccentureConsult",
    label: "Accenture Consult",
    component: AccentureConsult,
    image: "/accenture.webp", // Placeholder
  },
  {
    key: "DeloitteAudit",
    label: "Deloitte Audit",
    component: DeloitteAudit,
    image: "/deloitte.webp", // Placeholder
  },
  {
    key: "CapgeminiFlow",
    label: "Capgemini Flow",
    component: CapgeminiFlow,
    image: "/capgenine.webp", // Placeholder
  },
  {
    key: "CiscoNet",
    label: "Cisco Net",
    component: CiscoNet,
    image: "/cisco.webp", // Placeholder
  },

  // Batch 4: Finance & Enterprise
  {
    key: "OracleDb",
    label: "Oracle DB",
    component: OracleDb,
    image: "/oracle.webp", // Placeholder
  },
  {
    key: "SapEnterprise",
    label: "SAP Enterprise",
    component: SapEnterprise,
    image: "/sap.webp", // Placeholder
  },
  {
    key: "GoldmanFinance",
    label: "Goldman Finance",
    component: GoldmanFinance,
    image: "/goldman.webp", // Placeholder
  },
  {
    key: "JpmorganChase",
    label: "JPMorgan Chase",
    component: JpmorganChase,
    image: "/jpmorgan.webp", // Placeholder
  },
  {
    key: "NetflixCulture",
    label: "Netflix Culture",
    component: NetflixCulture,
    image: "/netflix.webp", // Placeholder
  },

  // Batch 5: Role-Specific
  {
    key: "MedicalNurse",
    label: "Medical / Nurse",
    component: MedicalNurse,
    image: "/medical.webp", // Placeholder
  },
  {
    key: "AcademicTeacher",
    label: "Academic / Teacher",
    component: AcademicTeacher,
    image: "/teacher.webp", // Placeholder
  },
  {
    key: "SalesGrowth",
    label: "Sales / Business",
    component: SalesGrowth,
    image: "/sales.webp", // Placeholder
  },
  {
    key: "LegalProfessional",
    label: "Legal / Attorney",
    component: LegalProfessional,
    image: "/legal.webp", // Placeholder
  },
];
