'use server';

import { db } from '@/infra/database';
import { schema } from '@/infra/database/schema';

type LinkEvaluationData = {
  districtId: string;
  juryIds: string[];
};

export async function linkEvaluation({
  districtId,
  juryIds,
}: LinkEvaluationData) {
  await Promise.all(
    juryIds.map(async (juryId) => {
      await db.insert(schema.rating).values({
        judgeId: juryId,
        regionalId: districtId,
      });
    })
  );
}
