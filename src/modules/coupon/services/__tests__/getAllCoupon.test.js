import { getAllCoupon } from "../getAllCoupon";
import { requiredAuth, apiError, apiResponse } from "../../../../shared";
import Coupon from "../../models/coupon";
import { redis } from "../../../../shared/utils/Redis";
import { NextResponse } from "next/server";

// Mock the dependencies
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
    find: jest.fn(),
  },
}));

jest.mock("../../../../shared/utils/Redis", () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
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

describe("getAllCoupon service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw unauthorized access error if user is not admin", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "user" } });

    await expect(getAllCoupon()).rejects.toThrow("unauthorized access");
    expect(requiredAuth).toHaveBeenCalled();
  });

  it("should return cached coupons if available", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    const mockCachedCoupons = [{ couponCode: "DISCOUNT10", discount: 10 }];
    redis.get.mockResolvedValue(JSON.stringify(mockCachedCoupons));

    const response = await getAllCoupon();

    expect(redis.get).toHaveBeenCalledWith("allcoupon");
    expect(NextResponse.json).toHaveBeenCalled();
    expect(response.body.data).toEqual(mockCachedCoupons);
    expect(Coupon.find).not.toHaveBeenCalled();
  });

  it("should fetch coupons from DB if not cached", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    redis.get.mockResolvedValue(null);
    const mockCoupons = [{ couponCode: "DISCOUNT20", discount: 20 }];
    Coupon.find.mockResolvedValue(mockCoupons);

    const response = await getAllCoupon();

    expect(redis.get).toHaveBeenCalledWith("allcoupon");
    expect(Coupon.find).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalledWith(
      "allcoupon",
      JSON.stringify(mockCoupons),
      "EX",
      1200
    );
    expect(response.body.data).toEqual(mockCoupons);
  });

  it("should throw coupons not found error if DB returns empty list", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    redis.get.mockResolvedValue(null);
    Coupon.find.mockResolvedValue([]);

    await expect(getAllCoupon()).rejects.toThrow(" coupons not found");
  });

  it("should throw coupons not found error if DB returns null", async () => {
    requiredAuth.mockResolvedValue({ user: { role: "admin" } });
    redis.get.mockResolvedValue(null);
    Coupon.find.mockResolvedValue(null);

    await expect(getAllCoupon()).rejects.toThrow(" coupons not found");
  });
});
