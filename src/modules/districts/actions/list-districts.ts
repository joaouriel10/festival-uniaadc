'use server';

import { sql } from 'drizzle-orm';
import { db } from '@/infra/database';
import { regional } from '@/infra/database/schemas/others';

export interface DistrictsListItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DistrictsListResponse {
  districts: DistrictsListItem[];
  totalCount: number;
}

export interface GetDistrictsListParams {
  page: number;
  pageSize?: number;
}

export async function getDistricts({
  page,
  pageSize = 10,
}: GetDistrictsListParams): Promise<DistrictsListResponse> {
  const offset = (page - 1) * pageSize;

  const districtss = await db.query.regional.findMany({
    columns: {
      id: true,
      name: true,
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

  const districtsList = districtss.map((districtsItem) => ({
    id: districtsItem.id,
    name: districtsItem.name,
    createdAt: districtsItem.createdAt,
    updatedAt: districtsItem.updatedAt,
  }));

  return {
    districts: districtsList,
    totalCount,
  };
}
