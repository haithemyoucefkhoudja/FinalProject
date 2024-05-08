import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { JWT } from 'next-auth/jwt';
import { IUser } from './types/user';
const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const Token = await getToken({ req, secret });
    const isLoginPage = pathname.startsWith('/login');
    const sensitiveRoutes = ['/Dashboard'];
    const isAccessingSensitiveRoute = sensitiveRoutes.some(route => pathname.startsWith(route));
    // check if the user is Authenticated
    if (isLoginPage) {
      if (Token) {
        return NextResponse.redirect(new URL('/Dashboard', req.url));
      }
      // rdirect the `Visitor` to The Login Page
      return NextResponse.next();
    }

    if (!Token && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    type InferJWT = JWT & {user:IUser}; // infer type for TypeScript 

    // Check if the user has access to worker-level sensitive routes (e.g. /Dashboard/Tables)
    const workerLevelSensitiveRoutes = ['/Dashboard/Tables']
    const isWorkerLevelSensitiveRoutes = workerLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    
    
    if(Token && isWorkerLevelSensitiveRoutes){
      const Role = (Token as InferJWT).user.role
      if(Role === 'Admin' || Role === 'Observer' || Role === 'Worker')
        {
          return NextResponse.next();
        }
      // Redirect `Driver` to the Dashboard
      return NextResponse.redirect(new URL('/Dashboard', req.url));
    }
    // Check if the user has access to observer-level sensitive routes (e.g. /Dashboard/Stats, /Dashboard/Reports)
    const observerLevelSensitiveRoutes = ['/Dashboard/Stats', '/Dashboard/Reports']
    const isObserverLevelSensitiveRoutes = observerLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    
    
    if(Token && isObserverLevelSensitiveRoutes){
      const Role = (Token as InferJWT).user.role
      if(Role === 'Admin' || Role === 'Observer')
        {
          return NextResponse.next();
        }
      // Hide the stats and reports for other roles
      return NextResponse.redirect(new URL('/Dashboard', req.url));
    }
    // Check if the user has access to admin-level sensitive routes (e.g. /Dashboard/Management)
    const adminLevelSensitiveRoutes = ['/Dashboard/Management'];
    const isAdminLevelSensitiveRoutes = adminLevelSensitiveRoutes.some(route => pathname.startsWith(route));
    if(Token && isAdminLevelSensitiveRoutes){
      const Role = (Token as InferJWT).user.role
      if(Role === 'Admin')
        {
          return NextResponse.next();
        }
      // Hide management page and subpages for all other roles
      return NextResponse.redirect(new URL('/Dashboard', req.url));
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
  matcher: ['/', '/login', '/Dashboard/:path*',],

};
