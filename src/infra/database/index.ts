/** biome-ignore-all lint/style/noNonNullAssertion: silence biome */
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from './schema';

const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

export { db };
