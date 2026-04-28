/**
 * @jest-environment node
 */
import { aiResuemGenerator } from "../aiResume";
import { ai } from "../../utils/aiConfig";
import { encode } from "@toon-format/toon";
import { apiResponse } from "../../../../shared/utils/apiResponse";
import { NextResponse } from "next/server";

jest.mock("@toon-format/toon", () => ({
  encode: jest.fn().mockImplementation(text => `encoded_${text}`),
}));

jest.mock("../../utils/aiConfig", () => ({
  ai: {
    models: {
      generateContent: jest.fn(),
    },
  },
  ai_model: "mock-model",
}));

jest.mock("../../../../shared/utils/apiResponse", () => ({
  apiResponse: jest.fn().mockImplementation((status, message, data) => ({
    status,
    message,
    data,
  })),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      body,
      status: init?.status || 200,
    })),
  },
}));

describe("aiResuemGenerator service", () => {
  it("should generate enhanced resume successfully", async () => {
    const mockResumeData = { name: "John" };
    const mockAiResponse = {
      text: '{"name": "John Enhanced", "status": "draft"}'
    };
    ai.models.generateContent.mockResolvedValue(mockAiResponse);

    const response = await aiResuemGenerator({ resumeData: mockResumeData });

    expect(encode).toHaveBeenCalled();
    expect(ai.models.generateContent).toHaveBeenCalled();
    expect(response.body.data.name).toBe("John Enhanced");
    expect(response.status).toBe(200);
  });

  it("should handle mixed backticks in AI response", async () => {
    const mockResumeData = { name: "John" };
    const mockAiResponse = {
      text: '```json\n{"name": "John Clean"}\n```'
    };
    ai.models.generateContent.mockResolvedValue(mockAiResponse);

    const response = await aiResuemGenerator({ resumeData: mockResumeData });

    expect(response.body.data.name).toBe("John Clean");
  });
});
