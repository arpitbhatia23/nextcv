/**
 * @jest-environment node
 */
import { getAllResume } from "../getAllResume";
import { User } from "../../../auth";
import { apiError, dbConnect } from "../../../../shared";
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

jest.mock("../../../auth", () => ({
  User: {
    aggregate: jest.fn(),
  },
}));

jest.mock("../../../../shared/utils/Redis", () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

console.time = jest.fn();
console.timeEnd = jest.fn();

describe("getAllResume service", () => {
  const userId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached resumes if available", async () => {
    const mockResumes = { draft: [], paid: [] };
    redis.get.mockResolvedValue(JSON.stringify(mockResumes));

    const result = await getAllResume({ userId });

    expect(redis.get).toHaveBeenCalledWith(`resumes:user:${userId}`);
    expect(result).toEqual(mockResumes);
    expect(User.aggregate).not.toHaveBeenCalled();
  });

  it("should fetch from aggregation if not cached", async () => {
    redis.get.mockResolvedValue(null);
    const mockResumes = [{ draft: [{ resumedata: {} }], paid: [] }];
    User.aggregate.mockResolvedValue(mockResumes);

    const result = await getAllResume({ userId });

    expect(dbConnect).toHaveBeenCalled();
    expect(User.aggregate).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalled();
    expect(result).toEqual(mockResumes);
  });

  it("should throw 404 if no resumes found", async () => {
    redis.get.mockResolvedValue(null);
    User.aggregate.mockResolvedValue([]);

    await expect(getAllResume({ userId })).rejects.toThrow("No resumes found");
  });
});
