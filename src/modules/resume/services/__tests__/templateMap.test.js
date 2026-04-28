import { getTemplateByName } from "../templateMap";

describe("templateMap utility", () => {
  it("should return null if templateName is not provided", () => {
    expect(getTemplateByName(null)).toBeNull();
    expect(getTemplateByName("")).toBeNull();
  });

  it("should return the correct template details by name (case-insensitive)", () => {
    const template = getTemplateByName("modernTemplate");
    expect(template).toBeDefined();
    expect(template.templateName).toBe("modernTemplate");
    expect(template.tier).toBe("Basic");

    const templateLower = getTemplateByName("moderntemplate");
    expect(templateLower).toEqual(template);
  });

  it("should return null for non-existent template", () => {
    expect(getTemplateByName("nonExistentTemplate")).toBeNull();
  });

  it("should find templates from different tiers", () => {
    const eliteTemplate = getTemplateByName("TechDark");
    expect(eliteTemplate.tier).toBe("Elite");
    
    const premiumTemplate = getTemplateByName("GoogleTech");
    expect(premiumTemplate.tier).toBe("Premium");
  });
});
