import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { JWT } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const Token = await getToken({ req, secret });
    const isLoginPage = pathname.startsWith('/login');
    
    const isRegisterPage = pathname.startsWith('/register');
    const sensitiveRoutes = ['/Dashboard'];

    const isAccessingSensitiveRoute = sensitiveRoutes.some(route => pathname.startsWith(route));
    // check if the user is Authenticated
    if (isLoginPage || isRegisterPage) {
      if (Token) {
        return NextResponse.redirect(new URL('/Dashboard/Map/Inventories', req.url));
      }
      // rdirect the `Visitor` to The Login Page
      return NextResponse.next();
    }

    if (!Token && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    } // infer type for TypeScript 

    // Check if the user has access to worker-level sensitive routes (e.g. /Dashboard/Tables)
    const workerLevelSensitiveRoutes = ['/Dashboard/Tables/Warehouses']
    const isWorkerLevelSensitiveRoutes = workerLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    
    
    if(Token && isWorkerLevelSensitiveRoutes){
      const Role = Token.user.role
      if(Role === 'admin' || Role === 'Observer' || Role === 'Worker')
        {
          return NextResponse.next();
        }
      // Redirect `Driver` to the Dashboard
      return NextResponse.redirect(new URL('/Dashboard/Map/Inventories', req.url));
    }
    // Check if the user has access to observer-level sensitive routes (e.g. /Dashboard/Stats, /Dashboard/Reports)
    const observerLevelSensitiveRoutes = ['/Dashboard/Stats', '/Dashboard/Reports', '/Dashboard/Tables/Company']
    const isObserverLevelSensitiveRoutes = observerLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    
    
    if(Token && isObserverLevelSensitiveRoutes){
      const Role = Token.user.role
      if(Role === 'admin' || Role === 'Observer')
        {
          return NextResponse.next();
        }
      // Hide the stats and reports for other roles
      return NextResponse.redirect(new URL('/Dashboard/Map/Inventories', req.url));
    }
    // Check if the user has access to admin-level sensitive routes (e.g. /Dashboard/Management)
    const adminLevelSensitiveRoutes = ['/Dashboard/Management'];
    const isAdminLevelSensitiveRoutes = adminLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    if(Token && isAdminLevelSensitiveRoutes){
      const Role = Token.user.role
      if(Role === 'admin')
        {
          return NextResponse.next();
        }
      // Hide management page and subpages for all other roles
      return NextResponse.redirect(new URL('/Dashboard/Map/Inventories', req.url));
    }

    
  }, {
    callbacks: {
      async authorized({ token }: { token: JWT | null }) {
        return true;
      }
    }
  }
)

export const config = {
  matcher: ['/', '/login', '/register' ,'/Dashboard/:path*',],

};
