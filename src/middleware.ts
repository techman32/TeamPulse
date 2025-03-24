import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value
  const role = req.cookies.get('user_role')?.value
  const pathname = req.nextUrl.pathname
  const userAgent = req.headers.get('user-agent') || ''
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile|WPDesktop/i.test(userAgent)

  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile', req.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  if (role === 'admin' && pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (role === 'employee' && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
