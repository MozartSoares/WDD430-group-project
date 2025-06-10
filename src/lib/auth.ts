// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { AuthService } from '@/server';
// import dbConnect from './mongodb';

//https://authjs.dev/getting-started/authentication/credentials?framework=Next.js

// TODO: Uncomment this section when MongoDB and AuthService are ready
/* 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com', required: true },
        password: { label: 'Password', type: 'password', placeholder: '********', required: true },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          await dbConnect();

          return await AuthService.authenticate(credentials.email as string, credentials.password as string);
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
*/

// DEMO AUTH - For frontend development (remove when MongoDB auth is ready)
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
          required: true,
        },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          // Demo users for testing - UPDATE THIS SECTION
          const demoUsers = [
            {
              id: "1",
              email: "demo@example.com",
              password: "password",
              name: "Demo User",
            },
            {
              id: "2",
              email: "artisan1@example.com",
              password: "password",
              name: "Sarah Chen",
            },
            {
              id: "3",
              email: "artisan2@example.com",
              password: "password",
              name: "Marcus Rodriguez",
            },
          ];

          const user = demoUsers.find(
            (u) =>
              u.email === credentials.email &&
              u.password === credentials.password
          );

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "demo-secret-key-for-development",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
