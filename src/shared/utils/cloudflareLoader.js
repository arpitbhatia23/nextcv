// src/shared/utils/cloudflareLoader.js

/**
 * Custom loader for Cloudflare Image Resizing
 * Documentation: https://developers.cloudflare.com/images/image-resizing/url-format/
 */
export default function cloudflareLoader({ src, width, quality }) {
  if (src.startsWith('data:')) return src;

  // Cloudflare Image Resizing parameters
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto',
    'fit=scale-down'
  ];

  const paramsString = params.join(',');

  // If the src is an external URL, use it as is
  if (src.startsWith('http')) {
    return `https://www.nextcv.in/cdn-cgi/image/${paramsString}/${src}`;
  }
  
  // For internal images, use the relative path (starting with /)
  // Cloudflare handles relative paths on the same domain more efficiently
  const relativeSrc = src.startsWith('/') ? src : `/${src}`;
  return `/cdn-cgi/image/${paramsString}${relativeSrc}`;
}
