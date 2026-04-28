/**
 * @jest-environment node
 */
import { getResumeById } from "../getResumeById";
import { apiError, dbConnect } from "../../../../shared";
import Resume from "../../models/resume.model";
import { redis } from "../../../../shared/utils/Redis";
import mongoose from "mongoose";

jest.mock("../../../../shared", () => ({
  apiError: jest.fn().mockImplementation((status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  }),
  dbConnect: jest.fn(),
}));

jest.mock("../../models/resume.model", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

jest.mock("../../../../shared/utils/Redis", () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

// Mock console.time and console.timeEnd to avoid noise in tests
console.time = jest.fn();
console.timeEnd = jest.fn();

describe("getResumeById service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if id is invalid", async () => {
    await expect(getResumeById({ id: "invalid_id" })).rejects.toThrow("invalid resume id");
  });

  it("should return cached resume if available", async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const mockResume = { _id: mockId, name: "John Doe" };
    redis.get.mockResolvedValue(JSON.stringify(mockResume));

    const result = await getResumeById({ id: mockId });

    expect(redis.get).toHaveBeenCalledWith(`resumebyID:${mockId}`);
    expect(result).toEqual(mockResume);
    expect(Resume.findById).not.toHaveBeenCalled();
  });

  it("should fetch from DB if not cached", async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    const mockResume = { _id: mockId, name: "John Doe" };
    redis.get.mockResolvedValue(null);
    Resume.findById.mockResolvedValue(mockResume);

    const result = await getResumeById({ id: mockId });

    expect(dbConnect).toHaveBeenCalled();
    expect(Resume.findById).toHaveBeenCalledWith(mockId);
    expect(redis.set).toHaveBeenCalledWith(
      `resumebyID:${mockId}`,
      JSON.stringify(mockResume),
      "EX",
      1200
    );
    expect(result).toEqual(mockResume);
  });

  it("should throw 404 if resume not found in DB", async () => {
    const mockId = new mongoose.Types.ObjectId().toString();
    redis.get.mockResolvedValue(null);
    Resume.findById.mockResolvedValue(null);

    await expect(getResumeById({ id: mockId })).rejects.toThrow("resume not found");
  });
});
