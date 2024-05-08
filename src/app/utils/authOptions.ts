import  {NextAuthOptions, Session} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/types/user"; 
import isUser from "@/actions/FetchUser"; 
import { JWT } from 'next-auth/jwt';


// authOptions Object
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          // `name` of the type of the authentication 
          name: "Credentials",
          // `credentials` to specifies the types of credentials that NextAuht will accept
          credentials: {
            email: { label: "Email", type: "email", placeholder: " " },
            password: { label: "Password", type: "password" }
          },
          // `authorize` handler function that accept `credentials` provided by the user via req
          async authorize(credentials, req) {
         // Ensure that both email and password are provided
         if (credentials) {
          try {
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
          // Cast the user object to  IUser interface
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
      async session({ session, token }:{session:Session, token:JWT}) {
        if (token && token.user) {
          session.user = token.user as IUser
        }
        return session;
      },
    },
    pages: {
      signIn: '/login',
    }
  };