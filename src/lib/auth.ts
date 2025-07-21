import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/database';
import { schema } from '@/database/schema';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24, // 1 day
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        enum: ['admin', 'jury', 'participant'],
        required: false,
      },
    },
  },
});
