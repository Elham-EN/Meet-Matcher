/**
 * which exports an object containing your Auth.js configuration options.
 * You can put all common configuration here which does not rely on the adapter.
 * Notice this is exporting a configuration object only, we’re not calling
 * NextAuth() here
 */

import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./libs/schemas/LoginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",
      // Validate login form
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);
        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          // Check if we got a user & check if password matches what they put
          // inside the form against the hased password.
          if (!user || !(await compare(password, user.passwordHash as string)))
            return null;
          return user;
        }
        // If validation falied, they are not authorized
        // and not logged in
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
