import Cookies from 'js-cookie';

/**
 * Check if user is authenticated by checking for auth token
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = Cookies.get('auth_token');
  return !!token;
};

/**
 * Get auth token from cookies
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return Cookies.get('auth_token') || null;
};

/**
 * Clear auth token and redirect to home if on admin page
 */
export const clearAuth = (): void => {
  Cookies.remove('auth_token');
  
  // Redirect to home page if on admin page
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    window.location.href = '/';
  }
};

/**
 * Redirect to admin dashboard if authenticated, otherwise to login
 */
export const redirectToAdmin = (): void => {
  if (typeof window === 'undefined') return;
  
  if (isAuthenticated()) {
    window.location.href = '/admin/dashboard';
  } else {
    window.location.href = '/admin/login';
  }
};