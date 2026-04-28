import { getCouponById } from "../getCouponById";
import { requiredAuth, apiError, apiResponse } from "../../../../shared";
import Coupon from "../../models/coupon";
import Payment from "../../../payment/model/payment.model";
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
    findOne: jest.fn(),
  },
}));

jest.mock("../../../payment/model/payment.model", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
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

describe("getCouponById service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if coupon code is missing", async () => {
    await expect(getCouponById({ couponCode: "" })).rejects.toThrow("coupon code is required");
  });

  it("should throw 404 if coupon not found", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_1" } });
    Coupon.findOne.mockResolvedValue(null);

    await expect(getCouponById({ couponCode: "NOTFOUND" })).rejects.toThrow("coupon not found");
  });

  it("should throw error if first20 is already used", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_1" } });
    Coupon.findOne.mockResolvedValue({
      couponCode: "first20",
      isActive: true,
      expiry: new Date(Date.now() + 86400000).toISOString(),
    });
    Payment.findOne.mockResolvedValue({ userId: "user_1", couponCode: "first20" });

    await expect(getCouponById({ couponCode: "FIRST20" })).rejects.toThrow("You have already used this coupon");
  });

  it("should throw error if coupon is expired", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_1" } });
    Coupon.findOne.mockResolvedValue({
      couponCode: "expired",
      isActive: true,
      expiry: new Date(Date.now() - 86400000).toISOString(),
    });

    await expect(getCouponById({ couponCode: "EXPIRED" })).rejects.toThrow("coupon code is expiry");
  });

  it("should throw error if coupon is inactive", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_1" } });
    Coupon.findOne.mockResolvedValue({
      couponCode: "inactive",
      isActive: false,
      expiry: new Date(Date.now() + 86400000).toISOString(),
    });

    await expect(getCouponById({ couponCode: "INACTIVE" })).rejects.toThrow("coupon code deactivate");
  });

  it("should return coupon successfully", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_1" } });
    const mockCoupon = {
      couponCode: "valid",
      isActive: true,
      expiry: new Date(Date.now() + 86400000).toISOString(),
      discount: 10,
    };
    Coupon.findOne.mockResolvedValue(mockCoupon);

    const response = await getCouponById({ couponCode: "VALID" });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockCoupon);
  });
});
