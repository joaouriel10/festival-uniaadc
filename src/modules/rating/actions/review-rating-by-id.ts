import { eq } from 'drizzle-orm';
import { db } from '@/infra/database';
import { rating } from '@/infra/database/schemas/others';

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

  const juryIdBelowAverage = ratingsWithAverage
    .filter((ratingItem) => ratingItem.average < overallAverage)
    .map((ratingItem) => ratingItem.judgeId);

  return {
    ratings: ratingsWithAverage,
    overallAverage,
    juryIdBelowAverage,
  };
}
