import { deleteCoupon } from "../deleteCoupon";
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
    findByIdAndDelete: jest.fn(),
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

describe("deleteCoupon service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if user is not admin", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "user" } });

    await expect(deleteCoupon({ id: "mock_id" })).rejects.toThrow(/unauthorized/);
  });

  it("should delete coupon successfully if user is admin", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    Coupon.findByIdAndDelete.mockResolvedValue({ _id: "mock_id" });

    const response = await deleteCoupon({ id: "mock_id" });

    expect(Coupon.findByIdAndDelete).toHaveBeenCalledWith("mock_id");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Coupon deleted successfully");
  });
});
