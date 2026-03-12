import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // Mechanic routes: only MECHANIC role
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/interventions') || pathname.startsWith('/clients')) {
      if (token?.role !== 'MECHANIC') {
        return NextResponse.redirect(new URL('/suivi', req.url))
      }
    }

    // Client routes: only CLIENT role
    if (pathname.startsWith('/suivi')) {
      if (token?.role !== 'CLIENT') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/interventions/:path*', '/clients/:path*', '/suivi/:path*'],
}
