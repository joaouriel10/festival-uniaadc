/** biome-ignore-all lint/style/noNonNullAssertion: silence biome */

import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
});

export const { signIn, signUp, useSession } = createAuthClient();
