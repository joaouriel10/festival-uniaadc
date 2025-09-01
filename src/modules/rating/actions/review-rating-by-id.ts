'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/infra/database';
import {
  excludeRating,
  rating,
  regional,
} from '@/infra/database/schemas/others';

type ReviewRatingByRegionalIdProps = {
  regionalId: string;
};

type RatingScore = {
  [key: string]: number;
};

type MusicRating = {
  choral_category?: RatingScore;
  instrumental_category?: RatingScore;
};

function calculateRatingAverage(
  regionalMusic: MusicRating,
  originalMusic: MusicRating
): number {
  const regionalScores = Object.values(
    regionalMusic.choral_category || {}
  ).concat(
    Object.values(regionalMusic.instrumental_category || {})
  ) as number[];

  const originalScores = Object.values(
    originalMusic.choral_category || {}
  ).concat(
    Object.values(originalMusic.instrumental_category || {})
  ) as number[];

  const allScores = [...regionalScores, ...originalScores];
  const total = allScores.reduce((sum, score) => sum + score, 0);

  return allScores.length > 0 ? total / allScores.length : 0;
}

export async function reviewRatingByRegionalId({
  regionalId,
}: ReviewRatingByRegionalIdProps) {
  const ratingsData = await db
    .select({
      id: rating.id,
      judgeId: rating.judgeId,
      regionalMusic: rating.regionalMusic,
      originalMusic: rating.originalMusic,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    })
    .from(rating)
    .where(eq(rating.regionalId, regionalId));

  if (ratingsData.length === 0) {
    throw new Error(`No ratings found for Regional ID ${regionalId}`);
  }

  const ratingsWithAverage = ratingsData.map((ratingItem) => {
    const average = calculateRatingAverage(
      ratingItem.regionalMusic as MusicRating,
      ratingItem.originalMusic as MusicRating
    );
    return {
      ...ratingItem,
      average,
      createdAt: new Date(ratingItem.createdAt),
      updatedAt: new Date(ratingItem.updatedAt),
    };
  });

  const overallAverage =
    ratingsWithAverage.reduce(
      (sum, ratingItem) => sum + ratingItem.average,
      0
    ) / ratingsWithAverage.length;

  const ratingsBelowAverage = ratingsWithAverage.filter(
    (ratingItem) => ratingItem.average < overallAverage - 2
  );

  const juryIdBelowAverage = ratingsBelowAverage.map(
    (ratingItem) => ratingItem.judgeId
  );

  if (ratingsBelowAverage.length > 0) {
    try {
      const excludeRatingData = ratingsBelowAverage.map((ratingItem) => ({
        regionalId,
        judgeId: ratingItem.judgeId,
        regionalMusic: ratingItem.regionalMusic,
        originalMusic: ratingItem.originalMusic,
        createdAt: ratingItem.createdAt,
        updatedAt: new Date(),
      }));

      const idsToDelete = ratingsBelowAverage.map((r) => r.id);

      await Promise.all([
        db.insert(excludeRating).values(excludeRatingData),
        ...idsToDelete.map((id) => db.delete(rating).where(eq(rating.id, id))),
      ]);
    } catch (error) {
      console.error('Error moving ratings to exclude_rating:', error);
      throw new Error('Failed to move ratings below average to exclude table');
    }
  }

  const remainingRatings = ratingsWithAverage.filter(
    (ratingItem) => ratingItem.average >= overallAverage
  );

  await db
    .update(regional)
    .set({
      verified: true,
    })
    .where(eq(regional.id, regionalId));

  revalidateTag('dashboard');

  return {
    ratings: remainingRatings,
    overallAverage,
    juryIdBelowAverage,
    movedToExclude: ratingsBelowAverage.length,
    remainingCount: remainingRatings.length,
    verified: true,
  };
}
