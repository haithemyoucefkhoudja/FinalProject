import  {NextAuthOptions, Session, User} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import isUser from "@/actions/isUser"; 
import { JWT } from 'next-auth/jwt';


// authOptions Object
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          // `name` of the type of the authentication 
          name: "Credentials",
          // `credentials` to specifies the types of credentials that NextAuht will accept
          credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" }
          },
          // `authorize` handler function that accept `credentials` provided by the user via req
          async authorize(credentials) {
         // Ensure that both email and password are provided
         if (credentials) {
          const user: User | null = await isUser({ credentials });
          return user;
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
      async jwt({token, user, trigger, session }) {
        if(trigger==='update' && session.update)
          {
            console.log('update:',session.update)
            token.user.role = session.update.role
            token.user.company = session.update.company
            token.user.warehouse = session.update.warehouse
          }
        if (user) {
          // assign the user object to the JWT TOKEN
          token.user = user;
        }
        return token;
      },
      async session({ session, token }:{session:Session, token:JWT}) {
        
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