import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

export const authConfig = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/login",
    newUser: "/dashboard",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.passwordHash) {
          console.log("User not found or no password hash");
          throw new Error("Invalid email or password");
        }

        console.log("Comparing passwords for user:", user.email);
        const isPasswordValid = await compare(
          credentials.password as string,
          user.passwordHash
        );
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          console.log("Password comparison failed");
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute =
        request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/reviews") ||
        request.nextUrl.pathname.startsWith("/goals") ||
        request.nextUrl.pathname.startsWith("/documents") ||
        request.nextUrl.pathname.startsWith("/interviews") ||
        request.nextUrl.pathname.startsWith("/settings");

      if (isOnProtectedRoute && !isLoggedIn) {
        return false; // Redirect to login page
      }
      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
