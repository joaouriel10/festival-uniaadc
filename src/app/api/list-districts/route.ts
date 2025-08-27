import { NextResponse } from 'next/server';
import { db } from '@/infra/database';
import { GetMusicAverage } from '@/modules/dashboard/utils/get-music-average';
import type {
  DesqualificationData,
  PenaltyData,
} from '@/modules/districts/dtos/districts-dto';
import type {
  RatingsListItem,
  UnifiedRankingItem,
} from '@/modules/rating/dtos/rating-dto';
import {
  calculateRatingStatistics,
  type RatingScores,
} from '@/modules/rating/utils/calculate-rating-statistics';

type RegionalRatingsItem = {
  regionalId: string;
  name: string;
  ratings: RatingsListItem[];
  averages: {
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
  penalty: PenaltyData;
  desqualification: DesqualificationData;
  isDesqualified?: boolean;
  finalScore?: number;
};

type RegionalRatingsResponse = RegionalRatingsItem[];

function calculateRegionalPenalties(
  penaltyData: Record<string, unknown> | null
): {
  uniform: number;
  time_over: number;
  misconduct: number;
  ieadc_consuetude: number;
  musicians_is_not_sixty_percent_of_teens: number;
  totalPenalty: number;
} {
  if (!penaltyData) {
    return {
      uniform: 0,
      time_over: 0,
      misconduct: 0,
      ieadc_consuetude: 0,
      musicians_is_not_sixty_percent_of_teens: 0,
      totalPenalty: 0,
    };
  }

  const penalties = {
    uniform: Number(penaltyData.uniform) || 0,
    time_over: Number(penaltyData.time_over) || 0,
    misconduct: Number(penaltyData.misconduct) || 0,
    ieadc_consuetude: Number(penaltyData.ieadc_consuetude) || 0,
    musicians_is_not_sixty_percent_of_teens:
      Number(penaltyData.musicians_is_not_sixty_percent_of_teens) || 0,
  };

  const totalPenalty = Object.values(penalties).reduce(
    (sum, penalty) => sum + penalty,
    0
  );

  return {
    ...penalties,
    totalPenalty,
  };
}

function isRegionalDisqualified(
  desqualificationData: Record<string, boolean> | null
): boolean {
  if (!desqualificationData) {
    return false;
  }

  const desqualifications = [
    'members_are_invaders',
    'no_recommendation_letter',
    'singers_are_another_regional',
    'musicians_are_is_another_regional',
    'more_than_two_musicians_from_uniaadc_base',
    'members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing',
  ];

  return desqualifications.some((key) => Boolean(desqualificationData[key]));
}

function calculateRegionalAverages(regional: RegionalRatingsItem): void {
  if (regional.ratings.length > 0) {
    let totalRegionalMusic = 0;
    let totalOriginalMusic = 0;
    let totalOverall = 0;

    for (const rating of regional.ratings) {
      totalRegionalMusic += rating.statistics?.regionalMusicAverage || 0;
      totalOriginalMusic += rating.statistics?.originalMusicAverage || 0;
      totalOverall += rating.statistics?.overallAverage || 0;
    }

    const baseOverallAverage = totalOverall / regional.ratings.length;

    let finalScore = baseOverallAverage;
    if (regional.penalty) {
      finalScore = Math.max(
        0,
        baseOverallAverage - regional.penalty.totalPenalty
      );
    }

    if (regional.isDesqualified) {
      finalScore = 0;
    }

    regional.averages = {
      regionalMusicAverage: Number(
        (totalRegionalMusic / regional.ratings.length).toFixed(1)
      ),
      originalMusicAverage: Number(
        (totalOriginalMusic / regional.ratings.length).toFixed(1)
      ),
      overallAverage: Number(baseOverallAverage.toFixed(1)),
    };

    regional.finalScore = Number(finalScore.toFixed(1));
  }
}

async function getRatingsByRegional(): Promise<RegionalRatingsResponse> {
  const allRatings = await db.query.rating.findMany({
    columns: {
      id: true,
      regionalMusic: true,
      originalMusic: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      judge: {
        columns: {
          name: true,
          email: true,
        },
      },
      regional: {
        columns: {
          id: true,
          name: true,
          penalty: true,
          desqualification: true,
        },
      },
    },
    orderBy: (ratingTable, { desc }) => [desc(ratingTable.createdAt)],
  });

  const regionalMap = new Map<string, RegionalRatingsItem>();

  for (const ratingItem of allRatings) {
    const regionalId = ratingItem.regional?.id || '';
    const regionalName = ratingItem.regional?.name || '';

    const scores: RatingScores = {
      regionalMusic:
        ratingItem.regionalMusic as RatingsListItem['regionalMusic'],
      originalMusic:
        ratingItem.originalMusic as RatingsListItem['originalMusic'],
    };

    const statistics = calculateRatingStatistics(scores);

    const description = {
      regionalMusic: (
        ratingItem.regionalMusic as RatingsListItem['regionalMusic']
      ).observations,
      originalMusic: (
        ratingItem.originalMusic as RatingsListItem['originalMusic']
      ).observations,
    };

    const ratingData: RatingsListItem = {
      id: ratingItem.id,
      judgeName: ratingItem.judge?.name || '',
      judgeEmail: ratingItem.judge?.email || '',
      regionalName,
      regionalMusic:
        ratingItem.regionalMusic as RatingsListItem['regionalMusic'],
      originalMusic:
        ratingItem.originalMusic as RatingsListItem['originalMusic'],
      statistics,
      description,
      createdAt: ratingItem.createdAt,
      updatedAt: ratingItem.updatedAt,
    };

    if (regionalMap.has(regionalId)) {
      const existingRegional = regionalMap.get(regionalId);
      if (existingRegional) {
        existingRegional.ratings.push(ratingData);
      }
    } else {
      const penalties = calculateRegionalPenalties(
        ratingItem.regional?.penalty as Record<string, unknown> | null
      );
      const isDesqualified = isRegionalDisqualified(
        ratingItem.regional?.desqualification as Record<string, boolean> | null
      );

      const desqualifications =
        (ratingItem.regional?.desqualification as Record<string, boolean>) ||
        {};

      regionalMap.set(regionalId, {
        regionalId,
        name: regionalName,
        ratings: [ratingData],
        averages: {
          regionalMusicAverage: 0,
          originalMusicAverage: 0,
          overallAverage: 0,
        },
        penalty: {
          uniform: penalties.uniform,
          timeOver: penalties.time_over,
          misconduct: penalties.misconduct,
          ieadcConsuetude: penalties.ieadc_consuetude,
          musiciansIsNotSixtyPercentOfTeens:
            penalties.musicians_is_not_sixty_percent_of_teens,
          totalPenalty: penalties.totalPenalty,
        },
        desqualification: {
          membersAreInvaders: desqualifications.members_are_invaders,
          noRecommendationLetter: desqualifications.no_recommendation_letter,
          singersAreAnotherRegional:
            desqualifications.singers_are_another_regional,
          musiciansAreIsAnotherRegional:
            desqualifications.musicians_are_is_another_regional,
          moreThanTwoMusiciansFromUniaadcBase:
            desqualifications.more_than_two_musicians_from_uniaadc_base,
          membersOfGeneralBackingWillBeAblePerformSolosOrComposeRegionalBacking:
            desqualifications.members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing,
        },
        isDesqualified,
        finalScore: 0,
      });
    }
  }

  for (const regional of regionalMap.values()) {
    calculateRegionalAverages(regional);
  }

  const resultArray = Array.from(regionalMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const orderedResultByOverallAverage = resultArray.sort(
    (a, b) => b.averages.overallAverage - a.averages.overallAverage
  );

  return orderedResultByOverallAverage;
}

async function getUnifiedRankingByScore(): Promise<UnifiedRankingItem[]> {
  const ratingsData = await getRatingsByRegional();

  const allDistricts = await db.query.regional.findMany({
    columns: {
      id: true,
      name: true,
      penalty: true,
      desqualification: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const unifiedRanking: UnifiedRankingItem[] = [];

  const ratingsMap = new Map(
    ratingsData.map((item) => [item.regionalId, item])
  );

  for (const district of allDistricts) {
    const ratingData = ratingsMap.get(district.id);

    const penalties = calculateRegionalPenalties(
      district.penalty as Record<string, number> | null
    );

    const isDesqualified = isRegionalDisqualified(
      district.desqualification as Record<string, boolean> | null
    );

    const desqualifications =
      (district.desqualification as Record<string, boolean>) || {};

    let finalScore = 0;
    let averages: UnifiedRankingItem['averages'];
    let ratingsCount = 0;

    if (ratingData) {
      const getMusicAverage = new GetMusicAverage(ratingData.ratings);
      averages = getMusicAverage.getAverages();
      ratingsCount = ratingData.ratings.length;

      if (isDesqualified) {
        finalScore = 0;
      } else {
        finalScore = Math.max(
          0,
          ratingData.averages.overallAverage - penalties.totalPenalty
        );
      }
    } else {
      finalScore = 0;
    }

    const unifiedItem: UnifiedRankingItem = {
      id: district.id,
      name: district.name,
      averages,
      penalty: {
        uniform: penalties.uniform,
        timeOver: penalties.time_over,
        misconduct: penalties.misconduct,
        ieadcConsuetude: penalties.ieadc_consuetude,
        musiciansIsNotSixtyPercentOfTeens:
          penalties.musicians_is_not_sixty_percent_of_teens,
        totalPenalty: penalties.totalPenalty,
      },
      desqualification: {
        membersAreInvaders: Boolean(desqualifications.members_are_invaders),
        noRecommendationLetter: Boolean(
          desqualifications.no_recommendation_letter
        ),
        singersAreAnotherRegional: Boolean(
          desqualifications.singers_are_another_regional
        ),
        musiciansAreIsAnotherRegional: Boolean(
          desqualifications.musicians_are_is_another_regional
        ),
        moreThanTwoMusiciansFromUniaadcBase: Boolean(
          desqualifications.more_than_two_musicians_from_uniaadc_base
        ),
        membersOfGeneralBackingWillBeAblePerformSolosOrComposeRegionalBacking:
          Boolean(
            desqualifications.members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing
          ),
      },
      isDesqualified,
      finalScore: Number(finalScore.toFixed(2)),
      ratings: ratingData?.ratings as RatingsListItem[],
      ratingsCount,
      verified: district.verified,
      createdAt: district.createdAt,
      updatedAt: district.updatedAt,
    };

    unifiedRanking.push(unifiedItem);
  }

  return unifiedRanking.sort((a, b) => b.finalScore - a.finalScore);
}

export async function GET() {
  const unifiedRanking = await getUnifiedRankingByScore();
  return NextResponse.json(unifiedRanking);
}
