import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { JWT } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req, secret });
    const isLoginPage = pathname.startsWith('/login');

    const sensitiveRoutes = ['/Dashboard'];
    const isAccessingSensitiveRoute = sensitiveRoutes.some(route => pathname.startsWith(route));

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname === '/' && pathname !== "/") {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }, {
    callbacks: {
      async authorized({ token }: { token: JWT | null }) {
        // Add your authorization logic here
        // For example, you might check token against a list of allowed tokens
        // Or check for a specific claim or role within the token
        // Return true if authorized, false otherwise
        return true;
      }
    }
  }
)

export const config = {
  matcher: ['/', '/login', '/Dashboard/:path*',],

};
