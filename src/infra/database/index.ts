/** biome-ignore-all lint/style/noNonNullAssertion: silence biome */
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export { db };
