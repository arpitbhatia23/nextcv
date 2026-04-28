/**
 * @jest-environment node
 */
import { saveResumeAsDraft } from "../saveResumeAsDraft";
import Resume from "../../models/resume.model";
import { User } from "../../../auth";
import { apiError, apiResponse } from "../../../../shared";
import { redis } from "../../../../shared/utils/Redis";
import { NextResponse } from "next/server";

jest.mock("../../../../shared", () => ({
  apiError: jest.fn().mockImplementation((status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  }),
  apiResponse: jest.fn().mockImplementation((status, message, data) => ({
    status,
    message,
    data,
  })),
}));

jest.mock("../../models/resume.model", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

jest.mock("../../../auth", () => ({
  User: {
    updateOne: jest.fn(),
  },
}));

jest.mock("../../../../shared/utils/Redis", () => ({
  redis: {
    del: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      body,
      status: init?.status || 200,
    })),
  },
}));

describe("saveResumeAsDraft service", () => {
  const mockData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    jobRole: "Developer",
    summary: "Hello",
    ResumeType: "elegant",
  };
  const userId = "user_123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if required fields are missing", async () => {
    const incompleteData = { ...mockData, name: "" };
    await expect(saveResumeAsDraft({ data: incompleteData, userId })).rejects.toThrow("All required fields must be filled");
  });

  it("should save draft successfully", async () => {
    const mockDraftId = "draft_123";
    Resume.create.mockResolvedValue({ _id: mockDraftId });
    User.updateOne.mockResolvedValue({});

    const response = await saveResumeAsDraft({ data: mockData, userId });

    expect(Resume.create).toHaveBeenCalled();
    expect(redis.del).toHaveBeenCalledWith(`resumes:user:${userId}`);
    expect(User.updateOne).toHaveBeenCalledWith({ _id: userId }, { $push: { resume: mockDraftId } });
    expect(response.body.message).toBe("Draft generated successfully");
    expect(response.body.data).toBe(mockDraftId);
  });
});
