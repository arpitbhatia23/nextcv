jest.mock("../../../ai/utils/aiConfig", () => ({
  ai: {},
  groq: {},
}));

jest.mock("../../../../helper/resend", () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: "mock-id" }, error: null }),
    },
  },
}));

import { evaluateUserCampaign, isPremiumOrElite } from "../sendReminder";
import { CAMPAIGN_TEMPLATES } from "@/templates/email/remiderEmail";

describe("Smart Reminder Campaigns - evaluateUserCampaign", () => {
  const mockUser = {
    _id: "user-123",
    name: "Alex Doe",
    email: "alex@example.com",
    reminderCount: 0,
  };

  describe("isPremiumOrElite helper", () => {
    it("should correctly identify Premium and Elite templates", () => {
      // Basic / Standard
      expect(isPremiumOrElite("modernTemplate")).toBe(false); // Basic
      expect(isPremiumOrElite("TcsDigital")).toBe(false); // Standard
      expect(isPremiumOrElite("InfosysSystem")).toBe(false); // Standard

      // Premium / Elite
      expect(isPremiumOrElite("MordenBluesidebar")).toBe(true); // Premium
      expect(isPremiumOrElite("WiproModern")).toBe(true); // Premium
      expect(isPremiumOrElite("TechDark")).toBe(true); // Elite
      expect(isPremiumOrElite("GoogleTech")).toBe(true); // Elite
      expect(isPremiumOrElite("CreativeTeal")).toBe(true); // Elite

      // Invalid / Missing
      expect(isPremiumOrElite(null)).toBe(false);
      expect(isPremiumOrElite("")).toBe(false);
      expect(isPremiumOrElite("unknownTemplate")).toBe(false);
    });
  });

  describe("Priority 6: No resume", () => {
    it("should select create_resume when user has an empty resume array", () => {
      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [],
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("create_resume");
      expect(decision.priority).toBe(6);
      expect(decision.subject).toBe("Create your professional resume");
      expect(decision.ctaText).toBe("Build My Resume");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/builder");
    });

    it("should select create_resume when resumes parameter is null or undefined", () => {
      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: null,
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("create_resume");
      expect(decision.priority).toBe(6);
    });
  });

  describe("Priority 1: Paid Premium/Elite resume without a shared resume", () => {
    it("should select resume_sharing when a paid Premium resume has no SharedResume record", () => {
      const paidResume = {
        _id: "resume-paid-1",
        name: "My Tech Resume",
        status: "paid",
        ResumeType: "MordenBluesidebar", // Premium
      };

      const sharedResumesMap = new Map();
      const portfoliosMap = new Map();

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidResume],
        sharedResumesMap,
        portfoliosMap,
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("resume_sharing");
      expect(decision.priority).toBe(1);
      expect(decision.subject).toBe("Your resume is ready to share!");
      expect(decision.ctaText).toBe("Share My Resume");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/my-resume");
      expect(decision.resumeId).toBe("resume-paid-1");
    });
  });

  describe("Priority 2: Paid Premium/Elite resume without a portfolio", () => {
    it("should select portfolio_creation when paid Premium resume is shared but has no portfolio", () => {
      const paidResume = {
        _id: "resume-paid-2",
        name: "Elite Engineering Resume",
        status: "paid",
        ResumeType: "TechDark", // Elite
      };

      const sharedResumesMap = new Map([
        ["resume-paid-2", { resumeId: "resume-paid-2", isPublic: true, slug: "elite-eng" }],
      ]);
      const portfoliosMap = new Map();

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidResume],
        sharedResumesMap,
        portfoliosMap,
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("portfolio_creation");
      expect(decision.priority).toBe(2);
      expect(decision.subject).toBe("Complete your professional portfolio");
      expect(decision.ctaText).toBe("Create My Portfolio");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/my-resume");
      expect(decision.resumeId).toBe("resume-paid-2");
    });
  });

  describe("Priority 3: Existing portfolio that is unpublished", () => {
    it("should select portfolio_publish when portfolio exists but isPublic is false", () => {
      const paidResume = {
        _id: "resume-paid-3",
        name: "Product Resume",
        status: "paid",
        ResumeType: "WiproModern", // Premium
      };

      const sharedResumesMap = new Map([
        ["resume-paid-3", { resumeId: "resume-paid-3", isPublic: true, slug: "prod-res" }],
      ]);
      const portfoliosMap = new Map([
        ["resume-paid-3", { resumeId: "resume-paid-3", isPublic: false, slug: "prod-port" }],
      ]);

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidResume],
        sharedResumesMap,
        portfoliosMap,
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("portfolio_publish");
      expect(decision.priority).toBe(3);
      expect(decision.subject).toBe("Your portfolio is waiting to go live");
      expect(decision.ctaText).toBe("Publish My Portfolio");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/my-resume");
      expect(decision.resumeId).toBe("resume-paid-3");
    });

    it("should NOT select portfolio_publish if the portfolio is already public", () => {
      const paidResume = {
        _id: "resume-paid-3",
        name: "Product Resume",
        status: "paid",
        ResumeType: "WiproModern", // Premium
      };

      const sharedResumesMap = new Map([
        ["resume-paid-3", { resumeId: "resume-paid-3", isPublic: true, slug: "prod-res" }],
      ]);
      const portfoliosMap = new Map([
        ["resume-paid-3", { resumeId: "resume-paid-3", isPublic: true, slug: "prod-port" }],
      ]);

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidResume],
        sharedResumesMap,
        portfoliosMap,
      });

      // No reminder should be triggered because everything is completed and public
      expect(decision).toBeNull();
    });
  });

  describe("Priority 4: Draft Premium/Elite resume", () => {
    it("should select premium_draft when user has a draft Premium/Elite resume", () => {
      const draftPremiumResume = {
        _id: "resume-draft-prem",
        name: "My Unfinished Elite Resume",
        status: "draft",
        ResumeType: "TechDark", // Elite
      };

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [draftPremiumResume],
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("premium_draft");
      expect(decision.priority).toBe(4);
      expect(decision.subject).toBe("Finish your professional resume");
      expect(decision.ctaText).toBe("Finish My Resume");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/resume/resume-draft-prem");
      expect(decision.resumeId).toBe("resume-draft-prem");
    });
  });

  describe("Priority 5: Other draft resume", () => {
    it("should select draft_resume when user has a non-premium draft resume", () => {
      const draftStandardResume = {
        _id: "resume-draft-std",
        name: "Standard Draft",
        status: "draft",
        ResumeType: "TcsDigital", // Standard
      };

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [draftStandardResume],
      });

      expect(decision).toBeDefined();
      expect(decision.campaign).toBe("draft_resume");
      expect(decision.priority).toBe(5);
      expect(decision.subject).toBe("Your resume is waiting for you");
      expect(decision.ctaText).toBe("Continue My Resume");
      expect(decision.ctaUrl).toBe("https://www.nextcv.in/dashboard/resume/resume-draft-std");
      expect(decision.resumeId).toBe("resume-draft-std");
    });
  });

  describe("Multi-resume Priority Waterfall", () => {
    it("Priority 1 overrides Priority 5: Paid Premium unshared beats standard draft", () => {
      const paidUnshared = {
        _id: "paid-1",
        status: "paid",
        ResumeType: "MordenBluesidebar", // Premium
      };
      const standardDraft = {
        _id: "draft-1",
        status: "draft",
        ResumeType: "modernTemplate", // Basic
      };

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidUnshared, standardDraft],
        sharedResumesMap: new Map(), // No share
        portfoliosMap: new Map(),
      });

      expect(decision.campaign).toBe("resume_sharing");
      expect(decision.priority).toBe(1);
    });

    it("Priority 2 overrides Priority 4: Paid Premium missing portfolio beats draft Elite", () => {
      const paidSharedNoPortfolio = {
        _id: "paid-2",
        status: "paid",
        ResumeType: "TechDark", // Elite
      };
      const draftElite = {
        _id: "draft-2",
        status: "draft",
        ResumeType: "CreativeTeal", // Elite
      };

      const sharedResumesMap = new Map([
        ["paid-2", { resumeId: "paid-2", isPublic: true }],
      ]);

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidSharedNoPortfolio, draftElite],
        sharedResumesMap,
        portfoliosMap: new Map(), // No portfolio
      });

      expect(decision.campaign).toBe("portfolio_creation");
      expect(decision.priority).toBe(2);
    });

    it("Priority 4 overrides Priority 5: Draft Premium beats Draft Standard", () => {
      const draftPremium = {
        _id: "draft-p",
        status: "draft",
        ResumeType: "MordenBluesidebar", // Premium
      };
      const draftBasic = {
        _id: "draft-b",
        status: "draft",
        ResumeType: "modernTemplate", // Basic
      };

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [draftPremium, draftBasic],
      });

      expect(decision.campaign).toBe("premium_draft");
      expect(decision.priority).toBe(4);
    });

    it("Falls back to draft_resume if all paid Premium resumes are fully shared and public", () => {
      const fullyCompletedPaid = {
        _id: "paid-complete",
        status: "paid",
        ResumeType: "TechDark", // Elite
      };
      const draftBasic = {
        _id: "draft-b",
        status: "draft",
        ResumeType: "modernTemplate", // Basic
      };

      const sharedResumesMap = new Map([
        ["paid-complete", { resumeId: "paid-complete", isPublic: true }],
      ]);
      const portfoliosMap = new Map([
        ["paid-complete", { resumeId: "paid-complete", isPublic: true }],
      ]);

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [fullyCompletedPaid, draftBasic],
        sharedResumesMap,
        portfoliosMap,
      });

      expect(decision.campaign).toBe("draft_resume");
      expect(decision.priority).toBe(5);
    });

    it("Returns null if user only has a paid Standard resume and no drafts", () => {
      const paidStandard = {
        _id: "paid-std",
        status: "paid",
        ResumeType: "TcsDigital", // Standard
      };

      const decision = evaluateUserCampaign({
        user: mockUser,
        resumes: [paidStandard],
      });

      expect(decision).toBeNull();
    });
  });

  describe("Campaign Templates Dictionary", () => {
    it("should have valid definitions for all 6 campaigns in CAMPAIGN_TEMPLATES", () => {
      const campaigns = [
        "resume_sharing",
        "portfolio_creation",
        "portfolio_publish",
        "premium_draft",
        "draft_resume",
        "create_resume",
      ];

      campaigns.forEach(c => {
        const config = CAMPAIGN_TEMPLATES[c];
        expect(config).toBeDefined();
        expect(typeof config.subject).toBe("string");
        expect(typeof config.badge).toBe("string");
        expect(typeof config.ctaText).toBe("string");
        expect(typeof config.ctaUrl).toBe("string");
        expect(Array.isArray(config.benefits)).toBe(true);
        expect(config.benefits.length).toBeGreaterThan(0);
      });
    });
  });
});

