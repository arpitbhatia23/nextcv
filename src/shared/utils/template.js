// Core Templates
import ClassicTemplate from "../../templates/resume-pdf/classic";
import ModernPDFResumeTemplate from "../../templates/resume-pdf/morden";
import ClassicMinimalistPDFResume from "../../templates/resume-pdf/Minimalist";
import ModernBlueSidebarPDFResume from "../../templates/resume-pdf/ModernBlueSideBar";

// New Templates
import ProfessionalClean from "../../templates/resume-pdf/ProfessionalClean";
import CreativeTeal from "../../templates/resume-pdf/CreativeTeal";
import ExecutiveGray from "../../templates/resume-pdf/ExecutiveGray";
import TechDark from "../../templates/resume-pdf/TechDark";
import CompactModern from "../../templates/resume-pdf/CompactModern";
import BoldHeader from "../../templates/resume-pdf/BoldHeader";
import SidebarLeft from "../../templates/resume-pdf/SidebarLeft";
import InfographicLite from "../../templates/resume-pdf/InfographicLite";

// Tech Giants
import GoogleTech from "../../templates/resume-pdf/GoogleTech";
import MicrosoftCorp from "../../templates/resume-pdf/MicrosoftCorp";
import AmazonOperations from "../../templates/resume-pdf/AmazonOperations";
import AppleCreative from "../../templates/resume-pdf/AppleCreative";
import MetaSocial from "../../templates/resume-pdf/MetaSocial";

// Indian MNCs
import TcsDigital from "../../templates/resume-pdf/TcsDigital";
import InfosysSystem from "../../templates/resume-pdf/InfosysSystem";
import WiproModern from "../../templates/resume-pdf/WiproModern";
import HclTech from "../../templates/resume-pdf/HclTech";
import MahindraRise from "../../templates/resume-pdf/MahindraRise";

// Global Corporate
import IbmClassic from "../../templates/resume-pdf/IbmClassic";
import AccentureConsult from "../../templates/resume-pdf/AccentureConsult";
import DeloitteAudit from "../../templates/resume-pdf/DeloitteAudit";
import CapgeminiFlow from "../../templates/resume-pdf/CapgeminiFlow";
import CiscoNet from "../../templates/resume-pdf/CiscoNet";

// Finance & Enterprise
import OracleDb from "../../templates/resume-pdf/OracleDb";
import SapEnterprise from "../../templates/resume-pdf/SapEnterprise";
import GoldmanFinance from "../../templates/resume-pdf/GoldmanFinance";
import JpmorganChase from "../../templates/resume-pdf/JpmorganChase";
import NetflixCulture from "../../templates/resume-pdf/NetflixCulture";

// Role-Specific
import MedicalNurse from "../../templates/resume-pdf/MedicalNurse";
import AcademicTeacher from "../../templates/resume-pdf/AcademicTeacher"; // ✅ FIXED
import SalesGrowth from "../../templates/resume-pdf/SalesGrowth";
import LegalProfessional from "../../templates/resume-pdf/LegalProfessional";
import MarketingCreative from "../../templates/resume-pdf/MarketingCreative";
import ClinicalTrial from "../../templates/resume-pdf/ClinicalTrial";

export const templates = [
  // ========================
  // 🟢 Basic Tier
  // ========================
  {
    key: "modernTemplate",
    label: "Modern",
    component: ModernPDFResumeTemplate,
    image: "/modern.webp",
  },
  {
    key: "MordenBluesidebar",
    label: "Modern Blue Sidebar",
    component: ModernBlueSidebarPDFResume,
    image: "/ModernSideBar.webp",
  },
  {
    key: "classicTemplate",
    label: "Classic",
    component: ClassicTemplate,
    image: "/classic.webp",
  },

  // ========================
  // 🔵 Standard Tier
  // ========================
  { key: "TcsDigital", label: "TCS Digital", component: TcsDigital, image: "/tcs.webp" },
  {
    key: "InfosysSystem",
    label: "Infosys System",
    component: InfosysSystem,
    image: "/infosys.webp",
  },
  { key: "WiproModern", label: "Wipro Modern", component: WiproModern, image: "/wipro.webp" },
  {
    key: "AmazonOperations",
    label: "Amazon Ops",
    component: AmazonOperations,
    image: "/amazon.webp",
  },
  {
    key: "AccentureConsult",
    label: "Accenture Consult",
    component: AccentureConsult,
    image: "/accenture.webp",
  },
  { key: "HclTech", label: "HCL Tech", component: HclTech, image: "/hcl.webp" },
  { key: "IbmClassic", label: "IBM Classic", component: IbmClassic, image: "/ibm.webp" },
  {
    key: "DeloitteAudit",
    label: "Deloitte Audit",
    component: DeloitteAudit,
    image: "/deloitte.webp",
  },
  { key: "OracleDb", label: "Oracle DB", component: OracleDb, image: "/oracle.webp" },
  { key: "MahindraRise", label: "Mahindra Rise", component: MahindraRise, image: "/mahindra.webp" },

  {
    key: "MedicalNurse",
    label: "Medical / Nurse",
    component: MedicalNurse,
    image: "/medical.webp",
  },
  {
    key: "ClinicalTrial",
    label: "Clinical Trial",
    component: ClinicalTrial,
    image: "/clinincal.webp",
  },
  {
    key: "AcademicTeacher",
    label: "Academic / Teacher",
    component: AcademicTeacher,
    image: "/teacher.webp",
  },
  {
    key: "LegalProfessional",
    label: "Legal / Attorney",
    component: LegalProfessional,
    image: "/legal.webp",
  },

  { key: "SalesGrowth", label: "Sales / Business", component: SalesGrowth, image: "/sales.webp" },
  {
    key: "MarketingCreative",
    label: "Marketing / Creative",
    component: MarketingCreative,
    image: "/marketing.webp",
  },
  {
    key: "CompactModern",
    label: "Compact Modern",
    component: CompactModern,
    image: "/compactmodern.webp",
  },
  { key: "SapEnterprise", label: "SAP Enterprise", component: SapEnterprise, image: "/sap.webp" },
  {
    key: "MinimalistTemplate",
    label: "Minimalist",
    component: ClassicMinimalistPDFResume,
    image: "/milimalist.webp",
  },
  {
    key: "ProfessionalClean",
    label: "Professional Clean",
    component: ProfessionalClean,
    image: "/professionalclean.webp",
  },
  {
    key: "AppleCreative",
    label: "Apple Creative",
    component: AppleCreative,
    image: "/applecreative.webp",
  },

  // ========================
  // 🟣 Premium Tier
  // ========================
  { key: "SidebarLeft", label: "Sidebar Left", component: SidebarLeft, image: "/sidebarleft.webp" },
  { key: "GoogleTech", label: "Google Tech", component: GoogleTech, image: "/googletech.webp" },
  {
    key: "MicrosoftCorp",
    label: "Microsoft Corp",
    component: MicrosoftCorp,
    image: "/microsoft.webp",
  },
  { key: "MetaSocial", label: "Meta Social", component: MetaSocial, image: "/metasocial.webp" },
  {
    key: "JpmorganChase",
    label: "JPMorgan Chase",
    component: JpmorganChase,
    image: "/jpmorgan.webp",
  },
  {
    key: "GoldmanFinance",
    label: "Goldman Finance",
    component: GoldmanFinance,
    image: "/goldman.webp",
  },
  {
    key: "CapgeminiFlow",
    label: "Capgemini Flow",
    component: CapgeminiFlow,
    image: "/capgenine.webp",
  },
  { key: "CiscoNet", label: "Cisco Net", component: CiscoNet, image: "/cisco.webp" },
  {
    key: "ExecutiveGray",
    label: "Executive Gray",
    component: ExecutiveGray,
    image: "/executivegray.webp",
  },
  { key: "BoldHeader", label: "Bold Header", component: BoldHeader, image: "/boldheader.webp" },

  // ========================
  // 🔴 Elite Tier
  // ========================
  { key: "TechDark", label: "Tech Dark", component: TechDark, image: "/techdark.webp" },
  {
    key: "InfographicLite",
    label: "Infographic Lite",
    component: InfographicLite,
    image: "/infografhic.webp",
  },
  {
    key: "NetflixCulture",
    label: "Netflix Culture",
    component: NetflixCulture,
    image: "/netflix.webp",
  },
  {
    key: "CreativeTeal",
    label: "Creative Teal",
    component: CreativeTeal,
    image: "/creativeteal.webp",
  },
];
