import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route (except login)
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for auth token in cookies
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      // Redirect to login page if no token
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // If already on login page and has token, redirect to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('auth_token')?.value;
    
    if (token) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};