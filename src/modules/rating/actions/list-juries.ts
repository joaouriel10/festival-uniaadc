'use server';

import { eq, sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { user } from '@/infra/database/schemas/auth';

export interface JuriesListItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JuriesListResponse {
  juries: JuriesListItem[];
  totalCount: number;
}

export interface GetJuriesListParams {
  page: number;
  pageSize?: number;
}

export async function getJuries({
  page,
  pageSize = 10,
}: GetJuriesListParams): Promise<JuriesListResponse> {
  const offset = (page - 1) * pageSize;

  const juries = await db.query.user.findMany({
    columns: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    where: eq(user.role, 'jury'),
    limit: pageSize,
    offset,
    orderBy: (juriesTable, { asc }) => [asc(juriesTable.name)],
  });

  const [totalCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user)
    .where(eq(user.role, 'jury'));
  const totalCount = totalCountResult.count;

  return {
    juries,
    totalCount,
  };
}
