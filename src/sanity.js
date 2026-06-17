import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// --- Configuration ---
// Public variables (prefixed with NEXT_PUBLIC_) are available on the client-side
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// Private variable is ONLY available on the server-side
const apiVersion = "2025-04-08"; // Use your current API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  useCdn: true, // Use CDN for fast public delivery
});

// --- Image URL Builder Setup ---
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
