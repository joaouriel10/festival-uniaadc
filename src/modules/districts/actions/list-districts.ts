'use server';

import { sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { regional } from '@/infra/database/schemas/others';

export type DistrictsListItem = {
  id: string;
  name: string;
  penalty: {
    uniform: number;
    timeOver: number;
    misconduct: number;
    ieadcConsuetude: number;
    musiciansIsNotSixtyPercentOfTeens: number;
    totalPenalty: number;
  };
  desqualification: {
    membersAreInvaders: boolean;
    noRecommendationLetter: boolean;
    singersAreAnotherRegional: boolean;
    musiciansAreIsAnotherRegional: boolean;
    moreThanTwoMusiciansFromUniaadcBase: boolean;
    membersOfGeneralBackingWillBeAblePerformSolosOrComposeRegionalBacking: boolean;
  };
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DistrictsListResponse = {
  districts: DistrictsListItem[];
  totalCount: number;
};

export type GetDistrictsListParams = {
  page: number;
  pageSize?: number;
};

export async function getDistricts({
  page,
  pageSize = 10,
}: GetDistrictsListParams): Promise<DistrictsListResponse> {
  const offset = (page - 1) * pageSize;

  const districtss = await db.query.regional.findMany({
    columns: {
      id: true,
      name: true,
      desqualification: true,
      penalty: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
    limit: pageSize,
    offset,
    orderBy: (districtsTable, { asc }) => [asc(districtsTable.name)],
  });

  const [totalCountResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(regional);
  const totalCount = totalCountResult.count;

  const districtsList = districtss.map((districtsItem) => {
    const penalties = (districtsItem.penalty as Record<string, number>) || {};
    const desqualifications =
      (districtsItem.desqualification as Record<string, boolean>) || {};

    return {
      id: districtsItem.id,
      name: districtsItem.name,
      verified: districtsItem.verified,
      penalty: {
        uniform: penalties.uniform,
        timeOver: penalties.time_over,
        misconduct: penalties.misconduct,
        ieadcConsuetude: penalties.ieadc_consuetude,
        musiciansIsNotSixtyPercentOfTeens:
          penalties.musicians_is_not_sixty_percent_of_teens,
        totalPenalty:
          penalties.uniform +
          penalties.time_over +
          penalties.misconduct +
          penalties.ieadc_consuetude +
          penalties.musicians_is_not_sixty_percent_of_teens,
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
      createdAt: districtsItem.createdAt,
      updatedAt: districtsItem.updatedAt,
    };
  });

  return {
    districts: districtsList,
    totalCount,
  };
}
