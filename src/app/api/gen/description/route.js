import { createVertex } from "@ai-sdk/google-vertex";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { type, data } = await req.json();

  const strategy = PromptStrategies[type];

  const prompt = strategy(data);

  const result = streamText({
    model: createVertex({}),
    messages: [{ role: "user", content: prompt }],
  });

  return result.toDataStreamResponse();
}
