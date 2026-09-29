import { createSharedResume } from "../createSharedResuem";
import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "../../model/shared-resume";
import { requiredAuth } from "@/shared";
import { getTemplateByName } from "@/modules/resume/services/templateMap";

jest.mock("@/modules/resume/models/resume.model");
jest.mock("../../model/shared-resume");
jest.mock("@/shared", () => ({
  apiError: class extends Error {
    constructor(status, message) {
      super(message);
      this.status = status;
    }
  },
  apiResponse: class {
    constructor(status, message, data) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  },
  requiredAuth: jest.fn(),
  dbConnect: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/modules/resume/services/templateMap");

describe("createSharedResume service", () => {
  const mockUserId = "user123";
  const mockResumeId = "resume123";

  beforeEach(() => {
    jest.clearAllMocks();
    requiredAuth.mockResolvedValue({ user: { id: mockUserId } });
  });

  it("should throw error if req is missing", async () => {
    await expect(createSharedResume({})).rejects.toThrow("request is required");
  });

  it("should throw error if resumeId is missing", async () => {
    const req = { json: jest.fn().mockResolvedValue({}) };
    await expect(createSharedResume({ req })).rejects.toThrow("resumeId is required");
  });

  it("should throw 404 if resume is not found", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await expect(createSharedResume({ req })).rejects.toThrow("resume not found");
  });

  it("should throw 400 if template is missing in resume", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "John Doe",
        ResumeType: null,
      }),
    });

    await expect(createSharedResume({ req })).rejects.toThrow("Resume template is missing");
  });

  it("should throw 404 if template is not in catalog", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "John Doe",
        ResumeType: "unknownTemplate",
      }),
    });
    getTemplateByName.mockReturnValue(null);

    await expect(createSharedResume({ req })).rejects.toThrow("Template not found in catalog");
  });

  it("should reject Basic and Standard tier templates", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "John Doe",
        ResumeType: "modernTemplate",
      }),
    });

    // Basic tier
    getTemplateByName.mockReturnValue({
      templateName: "modernTemplate",
      tier: "Basic",
    });
    await expect(createSharedResume({ req })).rejects.toThrow(
      "Public sharing is only available for Premium or Elite resumes"
    );

    // Standard tier
    getTemplateByName.mockReturnValue({
      templateName: "TcsDigital",
      tier: "Standard",
    });
    await expect(createSharedResume({ req })).rejects.toThrow(
      "Public sharing is only available for Premium or Elite resumes"
    );
  });

  it("should allow Premium tier and create shared resume", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "John Doe",
        ResumeType: "MordenBluesidebar",
      }),
    });
    getTemplateByName.mockReturnValue({
      templateName: "MordenBluesidebar",
      tier: "Premium",
    });
    SharedResume.findOne.mockResolvedValue(null);
    SharedResume.create.mockResolvedValue({
      _id: "shared123",
      slug: "john-doe-abc123",
      userId: mockUserId,
      resumeId: mockResumeId,
      isPublic: true,
    });

    const response = await createSharedResume({ req });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.data._id).toBe("shared123");
  });

  it("should allow Elite tier and return existing shared resume if already present", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "Jane Smith",
        ResumeType: "GoogleTech",
      }),
    });
    getTemplateByName.mockReturnValue({
      templateName: "GoogleTech",
      tier: "Elite",
    });
    const existing = {
      _id: "existingSharedId",
      slug: "jane-smith-xyz789",
      userId: mockUserId,
      resumeId: mockResumeId,
      isPublic: true,
    };
    SharedResume.findOne.mockResolvedValue(existing);

    const response = await createSharedResume({ req });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data._id).toBe("existingSharedId");
  });

  it("should generate a new slug if generated slug already exists", async () => {
    const req = { json: jest.fn().mockResolvedValue({ resumeId: mockResumeId }) };
    Resume.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: mockResumeId,
        name: "John Doe",
        ResumeType: "GoogleTech",
      }),
    });
    getTemplateByName.mockReturnValue({
      templateName: "GoogleTech",
      tier: "Elite",
    });

    // First call: check existing resume for user -> null
    // Second call: check if first generated slug exists -> exists
    // Third call: check if second generated slug exists -> null (unique)
    SharedResume.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ slug: "existing-slug" })
      .mockResolvedValueOnce(null);

    SharedResume.create.mockResolvedValue({
      _id: "shared456",
      slug: "john-doe-new123",
      userId: mockUserId,
      resumeId: mockResumeId,
      isPublic: true,
    });

    const response = await createSharedResume({ req });
    expect(response.status).toBe(201);
    expect(SharedResume.findOne).toHaveBeenCalledTimes(3);
    expect(SharedResume.create).toHaveBeenCalledTimes(1);
  });
});
