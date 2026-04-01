import resumeTemplateCatalog from "@/shared/utils/resumeTemplateCatlog";

const templateMap = new Map();

resumeTemplateCatalog.forEach(tier => {
  tier.templates.forEach(template => {
    templateMap.set(template.templateName.toLowerCase(), { ...template, tier: tier.tierName });
  });
});

export const getTemplateByName = templateName => {
  if (!templateName) return null;
  return templateMap.get(templateName.toLowerCase()) || null;
};
