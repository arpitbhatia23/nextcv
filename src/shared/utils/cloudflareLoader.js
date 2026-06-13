export default function cloudflareLoader({ src, width, quality }) {
  if (!src || src.startsWith("data:")) return src;

  if (process.env.NODE_ENV === "development" && !src.startsWith("http")) {
    return src;
  }

  if (src.includes("cdn.sanity.io")) {
    return src;
  } 
  const safeWidth = Math.min(width || 768, 1280);


  const params = [
    `width=${safeWidth}`,
    `quality=${quality || 75}`,
    "format=auto",
    "fit=scale-down",
  ].join(",");
  const isExternal = src.startsWith("http");

  // Internal image
  if (!isExternal) {
    const path = src.startsWith("/") ? src : `/${src}`;
    return `https://www.nextcv.in/cdn-cgi/image/${params}${path}`;
  }

  // External image like Sanity CDN
  return `https://www.nextcv.in/cdn-cgi/image/${params}/${encodeURIComponent(src)}`;
}
