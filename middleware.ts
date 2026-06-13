import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.cookies.get('jwt')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  if (isAuthPage && token) {    return NextResponse.redirect(new URL('/', request.url));
  }

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile') ||
                           request.nextUrl.pathname.startsWith('/dashboard') ||
                           request.nextUrl.pathname.startsWith('/my-courses') ||
                           request.nextUrl.pathname.startsWith('/lessons') ||
                           (request.nextUrl.pathname.startsWith('/courses') && request.nextUrl.pathname.includes('/exam'));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/courses/:path*', '/profile/:path*', '/dashboard/:path*','/paths/:path*', '/lessons/:path*', '/my-courses/:path*'],
}