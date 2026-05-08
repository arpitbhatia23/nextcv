// src/shared/utils/cloudflareLoader.js

/**
 * Custom loader for Cloudflare Image Resizing
 * Documentation: https://developers.cloudflare.com/images/image-resizing/url-format/
 */
export default function cloudflareLoader({ src, width, quality }) {
  // If the src is already a full URL (like from Sanity), we use it as is
  // If it's a data URL, we don't transform it
  if (src.startsWith('data:')) return src;

  const isExternal = src.startsWith('http');
  
  // Normalize the source URL
  const normalizedSrc = isExternal 
    ? src 
    : `https://www.nextcv.in${src.startsWith('/') ? '' : '/'}${src}`;

  // Cloudflare Image Resizing parameters
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto',
    'fit=scale-down'
  ];

  // Return the Cloudflare transformation URL
  // Note: /cdn-cgi/image/ is the standard path for Cloudflare Image Resizing
  return `https://www.nextcv.in/cdn-cgi/image/${params.join(',')}/${normalizedSrc}`;
}
