import { readFile } from "node:fs/promises";

export const dynamic = "force-static";

export async function GET() {
  const content = await readFile(new URL("../../shared/content/llms.txt", import.meta.url), "utf8");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
