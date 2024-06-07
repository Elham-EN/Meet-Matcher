/**
 * which exports an object containing your Auth.js configuration options.
 * You can put all common configuration here which does not rely on the adapter.
 * Notice this is exporting a configuration object only, we’re not calling
 * NextAuth() here
 */

import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default { providers: [GitHub] } satisfies NextAuthConfig;
