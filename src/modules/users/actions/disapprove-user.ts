'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/infra/database';
import { schema } from '@/infra/database/schema';

export async function disapproveUser(userId: string) {
  await db.delete(schema.user).where(eq(schema.user.id, userId));
}
