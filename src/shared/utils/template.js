export const getTemplateComponent = async (key, type = "resume") => {
  const resumeTemplates = {
    classicTemplate: async () => (await import("../../templates/resume-pdf/classic")).default,
    modernTemplate: async () => (await import("../../templates/resume-pdf/morden")).default,
    MinimalistTemplate: async () => (await import("../../templates/resume-pdf/Minimalist")).default,
    MordenBluesidebar: async () =>
      (await import("../../templates/resume-pdf/ModernBlueSideBar")).default,
    ProfessionalClean: async () =>
      (await import("../../templates/resume-pdf/ProfessionalClean")).default,
    CreativeTeal: async () => (await import("../../templates/resume-pdf/CreativeTeal")).default,
    ExecutiveGray: async () => (await import("../../templates/resume-pdf/ExecutiveGray")).default,
    TechDark: async () => (await import("../../templates/resume-pdf/TechDark")).default,
    CompactModern: async () => (await import("../../templates/resume-pdf/CompactModern")).default,
    BoldHeader: async () => (await import("../../templates/resume-pdf/BoldHeader")).default,
    SidebarLeft: async () => (await import("../../templates/resume-pdf/SidebarLeft")).default,
    InfographicLite: async () =>
      (await import("../../templates/resume-pdf/InfographicLite")).default,
    GoogleTech: async () => (await import("../../templates/resume-pdf/GoogleTech")).default,
    MicrosoftCorp: async () => (await import("../../templates/resume-pdf/MicrosoftCorp")).default,
    AmazonOperations: async () =>
      (await import("../../templates/resume-pdf/AmazonOperations")).default,
    AppleCreative: async () => (await import("../../templates/resume-pdf/AppleCreative")).default,
    MetaSocial: async () => (await import("../../templates/resume-pdf/MetaSocial")).default,
    TcsDigital: async () => (await import("../../templates/resume-pdf/TcsDigital")).default,
    InfosysSystem: async () => (await import("../../templates/resume-pdf/InfosysSystem")).default,
    WiproModern: async () => (await import("../../templates/resume-pdf/WiproModern")).default,
    HclTech: async () => (await import("../../templates/resume-pdf/HclTech")).default,
    MahindraRise: async () => (await import("../../templates/resume-pdf/MahindraRise")).default,
    IbmClassic: async () => (await import("../../templates/resume-pdf/IbmClassic")).default,
    AccentureConsult: async () =>
      (await import("../../templates/resume-pdf/AccentureConsult")).default,
    DeloitteAudit: async () => (await import("../../templates/resume-pdf/DeloitteAudit")).default,
    CapgeminiFlow: async () => (await import("../../templates/resume-pdf/CapgeminiFlow")).default,
    CiscoNet: async () => (await import("../../templates/resume-pdf/CiscoNet")).default,
    OracleDb: async () => (await import("../../templates/resume-pdf/OracleDb")).default,
    SapEnterprise: async () => (await import("../../templates/resume-pdf/SapEnterprise")).default,
    GoldmanFinance: async () => (await import("../../templates/resume-pdf/GoldmanFinance")).default,
    JpmorganChase: async () => (await import("../../templates/resume-pdf/JpmorganChase")).default,
    NetflixCulture: async () => (await import("../../templates/resume-pdf/NetflixCulture")).default,
    MedicalNurse: async () => (await import("../../templates/resume-pdf/MedicalNurse")).default,
    AcademicTeacher: async () =>
      (await import("../../templates/resume-pdf/AcademicTeacher")).default,
    SalesGrowth: async () => (await import("../../templates/resume-pdf/SalesGrowth")).default,
    LegalProfessional: async () =>
      (await import("../../templates/resume-pdf/LegalProfessional")).default,
    MarketingCreative: async () =>
      (await import("../../templates/resume-pdf/MarketingCreative")).default,
    ClinicalTrial: async () => (await import("../../templates/resume-pdf/ClinicalTrial")).default,
    NavyEdge: async () => (await import("../../templates/resume-pdf/NavyEdge")).default,
  };

  const coverLetterTemplates = {
    classic: async () => (await import("../../templates/cover-letter/classic")).default,
  };

  const templates = type === "cover-letter" ? coverLetterTemplates : resumeTemplates;

  const templateLoader = templates[key];
  console.log(templateLoader);
  if (!templateLoader) {
    if (type === "cover-letter") {
      return (await import("../../templates/cover-letter/classic")).default;
    }

    return (await import("../../templates/resume-pdf/classic")).default;
  }

  return await templateLoader();
  // switch (
  //   key
  //   // case "classicTemplate":
  //   //   return (await import("../../templates/resume-pdf/classic")).default;
  //   // case "modernTemplate":
  //   //   return (await import("../../templates/resume-pdf/morden")).default;
  //   // case "MinimalistTemplate":
  //   //   return (await import("../../templates/resume-pdf/Minimalist")).default;
  //   // case "MordenBluesidebar":
  //   //   return (await import("../../templates/resume-pdf/ModernBlueSideBar")).default;
  //   // case "ProfessionalClean":
  //   //   return (await import("../../templates/resume-pdf/ProfessionalClean")).default;
  //   // case "CreativeTeal":
  //   //   return (await import("../../templates/resume-pdf/CreativeTeal")).default;
  //   // case "ExecutiveGray":
  //   //   return (await import("../../templates/resume-pdf/ExecutiveGray")).default;
  //   // case "TechDark":
  //   //   return (await import("../../templates/resume-pdf/TechDark")).default;
  //   // case "CompactModern":
  //   //   return (await import("../../templates/resume-pdf/CompactModern")).default;
  //   // case "BoldHeader":
  //   //   return (await import("../../templates/resume-pdf/BoldHeader")).default;
  //   // case "SidebarLeft":
  //   //   return (await import("../../templates/resume-pdf/SidebarLeft")).default;
  //   // case "InfographicLite":
  //   //   return (await import("../../templates/resume-pdf/InfographicLite")).default;
  //   // case "GoogleTech":
  //   //   return (await import("../../templates/resume-pdf/GoogleTech")).default;
  //   // case "MicrosoftCorp":
  //   //   return (await import("../../templates/resume-pdf/MicrosoftCorp")).default;
  //   // case "AmazonOperations":
  //   //   return (await import("../../templates/resume-pdf/AmazonOperations")).default;
  //   // case "AppleCreative":
  //   //   return (await import("../../templates/resume-pdf/AppleCreative")).default;
  //   // case "MetaSocial":
  //   //   return (await import("../../templates/resume-pdf/MetaSocial")).default;
  //   // case "TcsDigital":
  //   //   return (await import("../../templates/resume-pdf/TcsDigital")).default;
  //   // case "InfosysSystem":
  //   //   return (await import("../../templates/resume-pdf/InfosysSystem")).default;
  //   // case "WiproModern":
  //   //   return (await import("../../templates/resume-pdf/WiproModern")).default;
  //   // case "HclTech":
  //   //   return (await import("../../templates/resume-pdf/HclTech")).default;
  //   // case "MahindraRise":
  //   //   return (await import("../../templates/resume-pdf/MahindraRise")).default;
  //   // case "IbmClassic":
  //   //   return (await import("../../templates/resume-pdf/IbmClassic")).default;
  //   // case "AccentureConsult":
  //   //   return (await import("../../templates/resume-pdf/AccentureConsult")).default;
  //   // case "DeloitteAudit":
  //   //   return (await import("../../templates/resume-pdf/DeloitteAudit")).default;
  //   // case "CapgeminiFlow":
  //   //   return (await import("../../templates/resume-pdf/CapgeminiFlow")).default;
  //   // case "CiscoNet":
  //   //   return (await import("../../templates/resume-pdf/CiscoNet")).default;
  //   // case "OracleDb":
  //   //   return (await import("../../templates/resume-pdf/OracleDb")).default;
  //   // case "SapEnterprise":
  //   //   return (await import("../../templates/resume-pdf/SapEnterprise")).default;
  //   // case "GoldmanFinance":
  //   //   return (await import("../../templates/resume-pdf/GoldmanFinance")).default;
  //   // case "JpmorganChase":
  //   //   return (await import("../../templates/resume-pdf/JpmorganChase")).default;
  //   // case "NetflixCulture":
  //   //   return (await import("../../templates/resume-pdf/NetflixCulture")).default;
  //   // case "MedicalNurse":
  //   //   return (await import("../../templates/resume-pdf/MedicalNurse")).default;
  //   // case "AcademicTeacher":
  //   //   return (await import("../../templates/resume-pdf/AcademicTeacher")).default;
  //   // case "SalesGrowth":
  //   //   return (await import("../../templates/resume-pdf/SalesGrowth")).default;
  //   // case "LegalProfessional":
  //   //   return (await import("../../templates/resume-pdf/LegalProfessional")).default;
  //   // case "MarketingCreative":
  //   //   return (await import("../../templates/resume-pdf/MarketingCreative")).default;
  //   // case "ClinicalTrial":
  //   // //   return (await import("../../templates/resume-pdf/ClinicalTrial")).default;
  //   // case "NavyEdge":
  //   //   return (await import("../../templates/resume-pdf/NavyEdge")).default;
  //   // default:
  //   //   return (await import("../../templates/resume-pdf/classic")).default;
  // ) {
};
