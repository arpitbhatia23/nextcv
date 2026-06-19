export default function cloudflareLoader({ src, width, quality }) {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  // Prevent double Cloudflare wrapping
  if (src.includes("/cdn-cgi/image/")) {
    return src;
  }

  // In development, keep local images normal
  if (process.env.NODE_ENV === "development" && !src.startsWith("http")) {
    return src;
  }

  // Optional: keep Sanity CDN untouched
  if (src.includes("cdn.sanity.io")) {
    return src;
  }

  const siteOrigin = "https://www.nextcv.in";
  const safeWidth = Math.min(Number(width) || 768, 1280);

  const params = [
    `width=${safeWidth}`,
    `quality=${quality || 75}`,
    "format=auto",
    "fit=scale-down",
  ].join(",");

  let imagePath = src;

  // ✅ If image is absolute URL of same domain, convert to relative path
  if (src.startsWith(siteOrigin)) {
    imagePath = src.replace(siteOrigin, "");
  }

  // ✅ Internal image
  if (!imagePath.startsWith("http")) {
    const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${siteOrigin}/cdn-cgi/image/${params}${path}`;
  }

  // ✅ External image
  return `${siteOrigin}/cdn-cgi/image/${params}/${encodeURI(imagePath)}`;
}
