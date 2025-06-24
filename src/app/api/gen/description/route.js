import { createVertex } from "@ai-sdk/google-vertex";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: createVertex({}),
    messages,
  });

  return result.toDataStreamResponse();
}
