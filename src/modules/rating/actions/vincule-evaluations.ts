'use server';

import { db } from '@/infra/database';
import { schema } from '@/infra/database/schema';

type VinculeEvaluationData = {
  districtId: string;
  juryIds: string[];
};

export async function vinculeEvaluation({
  districtId,
  juryIds,
}: VinculeEvaluationData) {
  await Promise.all(
    juryIds.map(async (juryId) => {
      await db.insert(schema.rating).values({
        judgeId: juryId,
        regionalId: districtId,
      });
    })
  );
}
