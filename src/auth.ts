import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./libs/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Get executed based on events happening with authentication, such as
  // we refesh the page or when we log in as a user
  callbacks: {
    // To populate the user's ID inside the session data
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  // Database Adapters are the bridge we use to connect Auth.js to your database
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
