import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/types/user"; // Make sure this is the correct import path for your IUser interface
import isUser from "@/actions/FetchUser"; // Adjust the import path to where your isUser function is defined

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: " " },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
       // Ensure that both email and password are provided
       if (credentials) {
        try {
          // Adjust your isUser function to match this signature if needed
          const user: IUser | null = await isUser({ credentials });
          if (user) {
            // Cast the user to the correct type for next-auth
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
          }
        } catch (error) {
          console.error("Error: ", error);
          // Throw a specific error for next-auth to catch
          throw new Error("Authentication failed");
        }
      }
      // Return null to indicate failed authentication
      return null;
    },
  }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cast the user object to your IUser interface
            const typedUser = user as IUser;
        token.user = {
          id: typedUser.id,
          name: typedUser.name,
          email: typedUser.email,
          role: typedUser.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
