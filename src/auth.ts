import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./libs/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Database Adapters are the bridge we use to connect Auth.js to your database
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
