/**
 * @jest-environment node
 */
import { createResume } from "../createResume";
import Resume from "../../models/resume.model";
import { User } from "../../../auth";
import { apiError } from "../../../../shared";

jest.mock("../../../../shared", () => ({
  apiError: jest.fn().mockImplementation((status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  }),
}));

jest.mock("../../models/resume.model", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

jest.mock("../../../auth", () => ({
  User: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("createResume service", () => {
  const mockResumeData = {
    ResumeType: "modern",
    phone: "1234567890",
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    summary: "Experienced developer",
    userId: "user_123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create resume and update user model successfully", async () => {
    const mockResumeId = "resume_456";
    Resume.create.mockResolvedValue({ _id: mockResumeId, ...mockResumeData });
    User.findByIdAndUpdate.mockResolvedValue({ _id: "user_123" });

    const result = await createResume(mockResumeData);

    expect(Resume.create).toHaveBeenCalled();
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user_123",
      { $push: { resume: mockResumeId } },
      { returnDocument: "after" }
    );
    expect(result).toBe(mockResumeId);
  });

  it("should throw error if resume creation fails", async () => {
    Resume.create.mockResolvedValue(null);

    await expect(createResume(mockResumeData)).rejects.toThrow("something wrong went while saving resume");
  });

  it("should throw error if user mapping fails", async () => {
    Resume.create.mockResolvedValue({ _id: "res_1" });
    User.findByIdAndUpdate.mockResolvedValue(null);

    await expect(createResume(mockResumeData)).rejects.toThrow("something went wrong while add resuem id to user model");
  });
});
