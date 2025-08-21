'use server';

import { db } from '@/infra/database';
import {
  calculateRatingStatistics,
  type RatingScores,
} from '../utils/calculate-rating-statistics';

export type RatingsListItem = {
  id: string;
  judgeName: string;
  judgeEmail: string;
  regionalName: string;
  regionalMusic: {
    choral_category: {
      vocal_tuning: number;
      vocal_harmony: number;
      technical_level: number;
      performanceCreativity: number;
    };
    instrumental_category: {
      music_technical_level: number;
      arrangement_coherence: number;
      overall_performance: number;
    };
    observations: string;
  };
  originalMusic: {
    choral_category: {
      vocal_tuning: number;
      vocal_harmony: number;
      technical_level: number;
      lyric_composition_coherence: number;
    };
    instrumental_category: {
      music_technical_level: number;
      arrangement_coherence: number;
      overall_performance: number;
    };
    observations: string;
  };
  statistics: {
    regionalMusicTotal: number;
    originalMusicTotal: number;
    overallTotal: number;
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
  description: {
    regionalMusic: string;
    originalMusic: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type RatingsListResponse = {
  ratings: RatingsListItem[];
  totalCount: number;
};

export type GetRatingsListParams = {
  page: number;
  pageSize?: number;
  judgeId?: string;
  regionalId?: string;
};

// export async function getRatingList({
//   page,
//   pageSize = 10,
//   judgeId,
//   regionalId,
// }: GetRatingsListParams): Promise<RatingsListResponse> {
//   const offset = (page - 1) * pageSize;

//   // Build where conditions
//   const whereConditions: SQL<unknown>[] = [];
//   if (judgeId) {
//     whereConditions.push(eq(rating.judgeId, judgeId));
//   }
//   if (regionalId) {
//     whereConditions.push(eq(rating.regionalId, regionalId));
//   }

//   const ratings = await db.query.rating.findMany({
//     columns: {
//       id: true,
//       regionalMusic: true,
//       originalMusic: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//     with: {
//       judge: {
//         columns: {
//           name: true,
//           email: true,
//         },
//       },
//       regional: {
//         columns: {
//           name: true,
//         },
//       },
//     },
//     where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
//     limit: pageSize,
//     offset,
//     orderBy: (ratingTable, { desc }) => [desc(ratingTable.createdAt)],
//   });

//   const [totalCountResult] = await db
//     .select({ count: sql<number>`count(*)` })
//     .from(rating)
//     .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);
//   const totalCount = totalCountResult.count;

//   const ratingList: RatingsListItem[] = ratings.map((ratingItem) => {
//     const scores: RatingScores = {
//       regionalMusic:
//         ratingItem.regionalMusic as RatingsListItem['regionalMusic'],
//       originalMusic:
//         ratingItem.originalMusic as RatingsListItem['originalMusic'],
//     };

//     const statistics = calculateRatingStatistics(scores);
//     const description = formatRatingDescription(scores);

//     return {
//       id: ratingItem.id,
//       judgeName: ratingItem.judge?.name || '',
//       judgeEmail: ratingItem.judge?.email || '',
//       regionalName: ratingItem.regional?.name || '',
//       regionalMusic:
//         ratingItem.regionalMusic as RatingsListItem['regionalMusic'],
//       originalMusic:
//         ratingItem.originalMusic as RatingsListItem['originalMusic'],
//       statistics,
//       description,
//       createdAt: ratingItem.createdAt,
//       updatedAt: ratingItem.updatedAt,
//     };
//   });

//   return {
//     ratings: ratingList,
//     totalCount,
//   };
// }

export type RatingStatsSummary = {
  totalRatings: number;
  averageOverallScore: number;
  averageRegionalScore: number;
  averageOriginalScore: number;
  topScoringRegional: {
    name: string;
    averageScore: number;
  } | null;
  ratingsPerJudge: {
    judgeName: string;
    ratingsCount: number;
  }[];
};

export async function getRatings(): Promise<RatingStatsSummary> {
  const allRatings = await db.query.rating.findMany({
    columns: {
      id: true,
      regionalMusic: true,
      originalMusic: true,
    },
    with: {
      judge: {
        columns: {
          name: true,
        },
      },
      regional: {
        columns: {
          name: true,
        },
      },
    },
  });

  if (allRatings.length === 0) {
    return {
      totalRatings: 0,
      averageOverallScore: 0,
      averageRegionalScore: 0,
      averageOriginalScore: 0,
      topScoringRegional: null,
      ratingsPerJudge: [],
    };
  }

  let totalOverallScore = 0;
  let totalRegionalScore = 0;
  let totalOriginalScore = 0;

  const regionalScores: Record<string, { total: number; count: number }> = {};
  const judgeRatings: Record<string, number> = {};

  for (const ratingItem of allRatings) {
    const scores: RatingScores = {
      regionalMusic:
        ratingItem.regionalMusic as RatingsListItem['regionalMusic'],
      originalMusic:
        ratingItem.originalMusic as RatingsListItem['originalMusic'],
    };

    const statistics = calculateRatingStatistics(scores);

    totalOverallScore += statistics.overallTotal;
    totalRegionalScore += statistics.regionalMusicTotal;
    totalOriginalScore += statistics.originalMusicTotal;

    const regionalName = ratingItem.regional?.name || 'Unknown';
    if (!regionalScores[regionalName]) {
      regionalScores[regionalName] = { total: 0, count: 0 };
    }
    regionalScores[regionalName].total += statistics.overallTotal;
    regionalScores[regionalName].count += 1;

    const judgeName = ratingItem.judge?.name || 'Unknown';
    judgeRatings[judgeName] = (judgeRatings[judgeName] || 0) + 1;
  }

  const averageOverallScore = Number(
    (totalOverallScore / allRatings.length).toFixed(2)
  );
  const averageRegionalScore = Number(
    (totalRegionalScore / allRatings.length).toFixed(2)
  );
  const averageOriginalScore = Number(
    (totalOriginalScore / allRatings.length).toFixed(2)
  );

  let topScoringRegional: {
    name: string;
    averageScore: number;
  } | null = null;
  let highestAverage = 0;

  for (const [name, data] of Object.entries(regionalScores)) {
    const average = data.total / data.count;
    if (average > highestAverage) {
      highestAverage = average;
      topScoringRegional = {
        name,
        averageScore: Number(average.toFixed(2)),
      };
    }
  }

  const ratingsPerJudge = Object.entries(judgeRatings).map(
    ([judgeName, count]) => ({
      judgeName,
      ratingsCount: count,
    })
  );

  return {
    totalRatings: allRatings.length,
    averageOverallScore,
    averageRegionalScore,
    averageOriginalScore,
    topScoringRegional,
    ratingsPerJudge,
  };
}

export type RegionalRatingsItem = {
  regionalId: string;
  name: string;
  ratings: RatingsListItem[];
  averages: {
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
};

export type RegionalRatingsResponse = RegionalRatingsItem[];

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

    regional.averages = {
      regionalMusicAverage: Number(
        (totalRegionalMusic / regional.ratings.length).toFixed(2)
      ),
      originalMusicAverage: Number(
        (totalOriginalMusic / regional.ratings.length).toFixed(2)
      ),
      overallAverage: Number(
        (totalOverall / regional.ratings.length).toFixed(2)
      ),
    };
  }
}

export async function getRatingsByRegional(): Promise<RegionalRatingsResponse> {
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
      regionalMap.set(regionalId, {
        regionalId,
        name: regionalName,
        ratings: [ratingData],
        averages: {
          regionalMusicAverage: 0,
          originalMusicAverage: 0,
          overallAverage: 0,
        },
      });
    }
  }

  // Calculate averages for each regional
  for (const regional of regionalMap.values()) {
    calculateRegionalAverages(regional);
  }

  return Array.from(regionalMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
