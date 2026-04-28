import { createCoupon } from "../createCoupon";
import Coupon from "../../models/coupon";
import { apiError, apiResponse } from "../../../../shared";
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

jest.mock("../../models/coupon", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
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

describe("createCoupon service", () => {
  const mockCouponData = {
    couponCode: "WELCOME10",
    discount: 10,
    expiry: "2025-12-31",
    type: "percentage",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if coupon already exists", async () => {
    Coupon.findOne.mockResolvedValue({ couponCode: "WELCOME10" });

    await expect(createCoupon(mockCouponData)).rejects.toThrow("Coupon already exists");
    expect(Coupon.findOne).toHaveBeenCalledWith({ couponCode: "WELCOME10" });
  });

  it("should create coupon successfully if it doesn't exist", async () => {
    Coupon.findOne.mockResolvedValue(null);
    Coupon.create.mockResolvedValue({ ...mockCouponData, _id: "mock_id" });

    const response = await createCoupon(mockCouponData);

    expect(Coupon.findOne).toHaveBeenCalledWith({ couponCode: "WELCOME10" });
    expect(Coupon.create).toHaveBeenCalledWith(mockCouponData);
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/coupon created/);
    expect(response.body.data.couponCode).toBe("WELCOME10");
  });

  it("should throw error if coupon creation fails", async () => {
    Coupon.findOne.mockResolvedValue(null);
    Coupon.create.mockResolvedValue(null);

    await expect(createCoupon(mockCouponData)).rejects.toThrow("Failed to create coupon");
  });
});
