import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/projects', '/profile', '/admin']

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('supabase-auth-token')
  
  if (!session && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    const absoluteUrl = new URL('/auth', request.nextUrl.origin)
    return NextResponse.redirect(absoluteUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/profile/:path*', '/admin/:path*'],
}
