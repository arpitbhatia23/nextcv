import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// --- Configuration ---
// Public variables (prefixed with NEXT_PUBLIC_) are available on the client-side
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// Private variable is ONLY available on the server-side
const token = process.env.SANITY_API_READ_TOKEN;
const apiVersion = "2025-04-08"; // Use your current API version

// --- 1. Public Client (For general, read-only data fetching) ---
// This client is safe to use in Client Components as it omits the token.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for fast public delivery
});

// --- Image URL Builder Setup ---
const builder = createImageUrlBuilder(client);

/**
 * Helper function to generate image URLs using Sanity's image-url builder.
 * @param source The Sanity image object/reference.
 * @returns A SanityImageBuilder instance.
 */
export function urlFor(source) {
  return builder.image(source);
}
