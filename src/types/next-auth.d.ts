import NextAuth, { DefaultSession } from "next-auth"
import { IUser } from "./user"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser & DefaultSession["user"]
  }
}