'use server';

import { sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { user } from '@/infra/database/schemas/auth';
import { rating, regional } from '@/infra/database/schemas/others';

export type EvaluationsListItem = {
  id: string;
  regionalName: string;
  juries: {
    id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type EvaluationsListResponse = {
  evaluations: EvaluationsListItem[];
  totalCount: number;
};

export type GetEvaluationsListParams = {
  page: number;
  pageSize?: number;
};

export async function getEvaluations({
  page,
  pageSize = 10,
}: GetEvaluationsListParams): Promise<EvaluationsListResponse> {
  const offset = (page - 1) * pageSize;

  const evaluationsRaw = await db
    .select({
      ratingId: rating.id,
      regionalId: regional.id,
      regionalName: regional.name,
      regionalCreatedAt: regional.createdAt,
      regionalUpdatedAt: regional.updatedAt,
      juryId: user.id,
      juryName: user.name,
    })
    .from(rating)
    .innerJoin(regional, sql`${rating.regionalId} = ${regional.id}`)
    .innerJoin(user, sql`${rating.judgeId} = ${user.id}`)
    .orderBy(regional.name)
    .limit(pageSize * 20)
    .offset(offset);

  const evaluationsMap = new Map<string, EvaluationsListItem>();

  for (const row of evaluationsRaw) {
    const existing = evaluationsMap.get(row.regionalId);

    if (existing) {
      const juryExists = existing.juries.some((jury) => jury.id === row.juryId);
      if (!juryExists) {
        existing.juries.push({
          id: row.juryId,
          name: row.juryName,
        });
      }
    } else {
      evaluationsMap.set(row.regionalId, {
        id: row.ratingId,
        regionalName: row.regionalName,
        juries: [
          {
            id: row.juryId,
            name: row.juryName,
          },
        ],
        createdAt: row.regionalCreatedAt,
        updatedAt: row.regionalUpdatedAt,
      });
    }
  }

  const allEvaluations = Array.from(evaluationsMap.values()).sort((a, b) =>
    a.regionalName.localeCompare(b.regionalName)
  );
  const evaluations = allEvaluations.slice(0, pageSize);

  const [totalCountResult] = await db
    .select({ count: sql<number>`count(distinct ${regional.id})` })
    .from(rating)
    .innerJoin(regional, sql`${rating.regionalId} = ${regional.id}`);

  const totalCount = totalCountResult.count;

  return {
    evaluations,
    totalCount,
  };
}
