/** biome-ignore-all lint/style/noNonNullAssertion: silence biome */

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: ['admin', 'jury', 'participant'],
        },
      },
    }),
  ],
});

export const { signIn, signUp, useSession } = authClient;
