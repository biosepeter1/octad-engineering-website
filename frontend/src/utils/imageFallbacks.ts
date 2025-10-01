/**
 * Image fallback utilities using inline SVG to avoid external dependencies
 */

// Base64 encoded SVG placeholders
export const imageFallbacks = {
  // Default image placeholder (400x300)
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iMzAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE2MCAyMDBMMTgwIDE4MEwyMjAgMjIwTDI2MCAxODBMMjgwIDIwMEwyMjAgMjYwTDE2MCAyNjBMMTYwIDIwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR5eHQgeD0iMjAwIiB5PSIyOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY3NzQ4RiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==',
  
  // Large project image (800x600) 
  project: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI4MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTM2MCAzNjBMMzgwIDM0MEw0MjAgMzgwTDQ2MCAzNDBMNDgwIDM2MEw0MjAgNDIwTDM2MCA0MjBMMzYwIDM2MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR5eHQgeD0iNDAwIiB5PSI1MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY3NzQ4RiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+',
  
  // Hero image (1200x800)
  hero: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjYwMCIgY3k9IjM2MCIgcj0iNjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTUyMCA0ODBMNTUwIDQ1MEw2MzAgNTMwTDcwMCA0NjBMNzMwIDQ5MEw2MzAgNTkwTDUyMCA1OTBMNTIWNDQ4MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR5eHQgeD0iNjAwIiB5PSI2ODUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzY3NzQ4RiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+',
  
  // Thumbnail (64x48)
  thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMjAiIHI9IjgiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDMyTDI4IDI4TDM2IDM2TDQ0IDI4TDQ4IDMyTDM2IDQ0TDI0IDQ0TDI0IDMyWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
  
  // Small image (200x150)
  small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjYwIiByPSIyMCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNODAgMTAwTDkwIDkwTDExMCAxMTBMMTMwIDkwTDE0MCAxMDBMMTEwIDEzMEw4MCAxMzBMODAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjc3NDhGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+',
  
  // Avatar/square (48x48)
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjE2IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg=='
};

/**
 * Get an appropriate image fallback based on dimensions
 */
export const getImageFallback = (width?: number, height?: number): string => {
  if (!width && !height) return imageFallbacks.default;
  
  const aspectRatio = width && height ? width / height : 1;
  const area = (width || 400) * (height || 300);
  
  // Choose fallback based on size and aspect ratio
  if (area > 500000) return imageFallbacks.hero;  // Large hero images
  if (area > 200000) return imageFallbacks.project; // Project images
  if (area < 5000) return imageFallbacks.thumbnail; // Thumbnails
  if (aspectRatio < 0.8 || aspectRatio > 1.2) return imageFallbacks.avatar; // Square-ish images
  
  return imageFallbacks.small;
};

/**
 * Create an onError handler that sets a fallback image
 */
export const createImageErrorHandler = (fallbackType: keyof typeof imageFallbacks = 'default') => {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = imageFallbacks[fallbackType];
  };
};

/**
 * Enhanced onError handler that tries to determine the best fallback
 */
export const createSmartImageErrorHandler = () => {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const width = img.width || img.offsetWidth;
    const height = img.height || img.offsetHeight;
    img.src = getImageFallback(width, height);
  };
};