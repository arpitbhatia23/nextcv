// src/shared/utils/cloudflareLoader.js

/**
 * Custom loader for Cloudflare Image Resizing
 * Documentation: https://developers.cloudflare.com/images/image-resizing/url-format/
 */
export default function cloudflareLoader({ src, width, quality }) {
  if (src.startsWith('data:')) return src;

  // In development, return the local path so images show up on localhost
  if (process.env.NODE_ENV === 'development' && !src.startsWith('http')) {
    return src;
  }

  // Cloudflare Image Resizing parameters
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto',
    'fit=scale-down'
  ];

  const paramsString = params.join(',');

  // Normalize the source URL for Cloudflare
  // If it's internal, we MUST provide the full production URL so Cloudflare can fetch it
  const isExternal = src.startsWith('http');
  const normalizedSrc = isExternal 
    ? src 
    : `https://www.nextcv.in${src.startsWith('/') ? '' : '/'}${src}`;

  // Return the full Cloudflare transformation URL
  // We use the absolute domain to ensure it works regardless of where the app is hosted
  return `https://www.nextcv.in/cdn-cgi/image/${paramsString}/${normalizedSrc}`;
}
