'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/infra/database';
import { schema } from '@/infra/database/schema';

export async function approveUser(userId: string) {
  await db
    .update(schema.user)
    .set({
      emailVerified: true,
      role: 'jury',
    })
    .where(eq(schema.user.id, userId));
}
