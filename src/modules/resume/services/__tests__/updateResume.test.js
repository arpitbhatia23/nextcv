/**
 * @jest-environment node
 */
import { updateResume } from "../updateResuem";
import Resume from "../../models/resume.model";
import { apiError } from "../../../../shared";
import { redis } from "../../../../shared/utils/Redis";

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
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock("../../../../shared/utils/Redis", () => ({
  redis: {
    set: jest.fn(),
  },
}));

describe("updateResume service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if resume not found", async () => {
    Resume.findByIdAndUpdate.mockResolvedValue(null);

    await expect(updateResume({ id: "res_123", updateData: {} })).rejects.toThrow("Resume not found");
  });

  it("should update resume and set cache successfully", async () => {
    const mockUpdatedResume = { _id: "res_123", name: "New Name" };
    Resume.findByIdAndUpdate.mockResolvedValue(mockUpdatedResume);

    const result = await updateResume({ id: "res_123", updateData: { name: "New Name" } });

    expect(Resume.findByIdAndUpdate).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalledWith(`resumebyID:res_123`, JSON.stringify(mockUpdatedResume), "EX", 1200);
    expect(result).toEqual(mockUpdatedResume);
  });
});
