'use server';

import { sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { rating, regional } from '@/infra/database/schemas/others';

export type RatingListItem = {
  id: string;
  regionalName: string;
  regionalId: string;
  regionalMusic: unknown;
  originalMusic: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type RatingListResponse = {
  ratings: RatingListItem[];
  totalCount: number;
};

export type GetRatingListParams = {
  userId: string;
  page: number;
  pageSize?: number;
};

export async function getRatingsByUserId({
  userId,
  page,
  pageSize = 10,
}: GetRatingListParams): Promise<RatingListResponse> {
  const offset = (page - 1) * pageSize;

  const ratingsRaw = await db
    .select({
      id: rating.id,
      regionalId: rating.regionalId,
      regionalName: regional.name,
      regionalMusic: rating.regionalMusic,
      originalMusic: rating.originalMusic,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    })
    .from(rating)
    .innerJoin(regional, sql`${rating.regionalId} = ${regional.id}`)
    .where(
      sql`${rating.judgeId} = ${userId} AND 
        ${rating.createdAt} = ${rating.updatedAt}
      `
    )
    .orderBy(regional.name)
    .limit(pageSize)
    .offset(offset);

  const [totalCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(rating)
    .where(
      sql`${rating.judgeId} = ${userId} AND
        ${rating.createdAt} = ${rating.updatedAt}`
    );

  const totalCount = totalCountResult.count;

  const ratingsList = ratingsRaw.map((ratingItem) => ({
    id: ratingItem.id,
    regionalName: ratingItem.regionalName,
    regionalId: ratingItem.regionalId,
    regionalMusic: ratingItem.regionalMusic,
    originalMusic: ratingItem.originalMusic,
    createdAt: ratingItem.createdAt,
    updatedAt: ratingItem.updatedAt,
  }));

  return {
    ratings: ratingsList,
    totalCount,
  };
}
