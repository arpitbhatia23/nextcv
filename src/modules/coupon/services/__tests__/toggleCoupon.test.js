import { toogleCoupon } from "../toggleCoupon";
import { requiredAuth, apiError, apiResponse } from "../../../../shared";
import Coupon from "../../models/coupon";
import { NextResponse } from "next/server";

jest.mock("../../../../shared", () => ({
  requiredAuth: jest.fn(),
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

jest.mock("../../models/coupon", () => ({
  __esModule: true,
  default: {
    findByIdAndUpdate: jest.fn(),
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

describe("toggleCoupon service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if user is not admin", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "user" } });

    await expect(toogleCoupon({ id: "mock_id", isActive: true })).rejects.toThrow(/unauthorized/);
  });

  it("should throw error if id or isActive is missing", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });

    await expect(toogleCoupon({ id: "", isActive: "" })).rejects.toThrow("id and isactive is required");
  });

  it("should toggle coupon status successfully", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    const mockUpdatedCoupon = { _id: "mock_id", isActive: false };
    Coupon.findByIdAndUpdate.mockResolvedValue(mockUpdatedCoupon);

    const response = await toogleCoupon({ id: "mock_id", isActive: false });

    expect(Coupon.findByIdAndUpdate).toHaveBeenCalledWith(
      "mock_id",
      { $set: { isActive: false } },
      { new: true }
    );
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockUpdatedCoupon);
  });
});
