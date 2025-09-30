/**
 * Transforms image URLs from localhost to the correct backend URL
 * This handles cases where database contains localhost URLs but we're in production
 */
export function transformImageUrl(url: string): string {
  if (!url) return url;
  
  // Get the API base URL without '/api' suffix
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendBaseUrl = apiBaseUrl.replace('/api', '');
  
  // If URL starts with localhost:5000, replace it with the backend base URL
  if (url.startsWith('http://localhost:5000') || url.startsWith('localhost:5000')) {
    return url
      .replace('http://localhost:5000', backendBaseUrl)
      .replace('localhost:5000', backendBaseUrl);
  }
  
  // If URL starts with '/uploads' or '/api/uploads', prepend the backend base URL
  if (url.startsWith('/uploads') || url.startsWith('/api/uploads')) {
    return `${backendBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  
  // Return URL as-is if it's already a full URL (external or correct backend URL)
  return url;
}

/**
 * Transform image URLs in project objects
 */
export function transformProjectImages<T extends { images?: Array<{ url: string; [key: string]: any }> }>(project: T): T {
  if (!project || !project.images) return project;
  
  return {
    ...project,
    images: project.images.map(img => ({
      ...img,
      url: transformImageUrl(img.url)
    }))
  };
}

/**
 * Transform image URLs in an array of projects
 */
export function transformProjectsImages<T extends { images?: Array<{ url: string; [key: string]: any }> }>(projects: T[]): T[] {
  return projects.map(project => transformProjectImages(project));
}