/**
 * @jest-environment node
 */
import { createResuemOrder } from "../createResumeorder";
import Resume from "../../../resume/models/resume.model";
import { createResume } from "../../../resume/services/createResume";
import { getTemplateByName } from "../../../resume/services/templateMap";
import { requiredAuth, apiError, apiResponse } from "../../../../shared";
import { order } from "../order";
import Coupon from "../../../coupon/models/coupon";
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

jest.mock("../../../resume/models/resume.model", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

jest.mock("../../../resume/services/createResume", () => ({
  createResume: jest.fn(),
}));

jest.mock("../../../resume/services/templateMap", () => ({
  getTemplateByName: jest.fn(),
}));

jest.mock("../../../coupon/models/coupon", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

jest.mock("../order", () => ({
  order: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      body,
      status: init?.status || 200,
    })),
  },
}));

describe("createResumeorder service", () => {
  const mockReqData = {
    name: "John",
    email: "john@example.com",
    ResumeType: "modern",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create order without coupon successfully", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_123" } });
    createResume.mockResolvedValue("res_new");
    getTemplateByName.mockReturnValue({ priceDiscounted: 100 });
    order.mockResolvedValue({ url: "payment_url" });

    const response = await createResuemOrder({ reqData: mockReqData });

    expect(createResume).toHaveBeenCalled();
    expect(order).toHaveBeenCalledWith(expect.objectContaining({
      amount: 10000, // 100 * 100
      resumeId: "res_new",
      userId: "user_123",
    }));
    expect(response.body.message).toBe("Order initiated");
  });

  it("should apply percentage coupon correctly", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_123" } });
    createResume.mockResolvedValue("res_new");
    getTemplateByName.mockReturnValue({ priceDiscounted: 100 });
    Coupon.findOne.mockResolvedValue({ type: "percentage", discount: 10 });
    order.mockResolvedValue({ url: "payment_url" });

    const response = await createResuemOrder({ reqData: { ...mockReqData, couponCode: "DISC10" } });

    expect(order).toHaveBeenCalledWith(expect.objectContaining({
      amount: 9000, // 90 * 100
      discountAmount: 10,
    }));
  });

  it("should throw error if invalid resume type", async () => {
    requiredAuth.mockResolvedValue({ user: { id: "user_123" } });
    createResume.mockResolvedValue("res_new");
    getTemplateByName.mockReturnValue(null);

    await expect(createResuemOrder({ reqData: mockReqData })).rejects.toThrow("Invalid Resume Type");
  });
});
