/**
 * @jest-environment node
 */
import { deleteResumeById } from "../deleteResumeById";
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
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

jest.mock("../../../auth", () => ({
  User: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe("deleteResumeById service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if resume not found", async () => {
    Resume.findOne.mockResolvedValue(null);

    await expect(deleteResumeById({ id: "res_123", userId: "user_123" })).rejects.toThrow("Resume not found");
  });

  it("should delete resume and update user model successfully", async () => {
    Resume.findOne.mockResolvedValue({ _id: "res_123" });
    Resume.deleteOne.mockResolvedValue({ deletedCount: 1 });
    User.findByIdAndUpdate.mockResolvedValue({ _id: "user_123" });

    await deleteResumeById({ id: "res_123", userId: "user_123" });

    expect(Resume.findOne).toHaveBeenCalledWith({ _id: "res_123" });
    expect(Resume.deleteOne).toHaveBeenCalledWith({ _id: "res_123" });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("user_123", { $pull: { resume: "res_123" } });
  });
});
