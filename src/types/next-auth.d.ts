import NextAuth, { DefaultSession, getServerSession } from "next-auth"
declare module 'next-auth/jwt' {
  export interface JWT extends Record<string, unknown> {
    user:User
}
}
declare module "next-auth" {
  /**
   * Overrite the User Interface in next-auth library
   */

  export interface User  {
    id:number,
    username:string ,
    email:string ,
    company:string,
    warehouse:string,
    role:"admin" | "observer" | "driver" | "worker"
  }
  interface Session {
    user: User & DefaultSession["user"]
  } 
}
