'use server';

import { db } from '@/infra/database';
import { schema } from '@/infra/database/schema';

type CreateDistrictData = {
  name: string;
};

export async function createDistrict({ name }: CreateDistrictData) {
  await db.insert(schema.regional).values({
    name,
  });
}
