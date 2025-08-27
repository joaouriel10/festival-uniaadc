'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/infra/database';
import { regional } from '@/infra/database/schemas/others';

export type PenaltyData = {
  uniform: boolean;
  time_over: boolean;
  misconduct: boolean;
  ieadc_consuetude: boolean;
  musicians_is_not_sixty_percent_of_teens: boolean;
};

export type DesqualificationData = {
  members_are_invaders: boolean;
  no_recommendation_letter: boolean;
  singers_are_another_regional: boolean;
  musicians_are_is_another_regional: boolean;
  more_than_two_musicians_from_uniaadc_base: boolean;
  members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing: boolean;
};

export type UpdateRegionalPenaltyAndDesqualificationData = {
  regionalId: string;
  penalties: PenaltyData;
  desqualifications: DesqualificationData;
};

export async function updateRegionalPenaltyAndDesqualification({
  regionalId,
  penalties,
  desqualifications,
}: UpdateRegionalPenaltyAndDesqualificationData) {
  try {
    if (!regionalId) {
      throw new Error('ID da regional é obrigatório');
    }

    const existingRegional = await db.query.regional.findFirst({
      where: eq(regional.id, regionalId),
      columns: { id: true, name: true },
    });

    if (!existingRegional) {
      throw new Error(`Regional com ID ${regionalId} não encontrada`);
    }

    const penaltyData = {
      uniform: penalties.uniform ? 1 : 0,
      time_over: penalties.time_over ? 0.5 : 0,
      misconduct: penalties.misconduct ? 1 : 0,
      ieadc_consuetude: penalties.ieadc_consuetude ? 1 : 0,
      musicians_is_not_sixty_percent_of_teens:
        penalties.musicians_is_not_sixty_percent_of_teens ? 1 : 0,
    };

    await db
      .update(regional)
      .set({
        penalty: JSON.stringify(penaltyData),
        desqualification: JSON.stringify(desqualifications),
        updatedAt: new Date(),
      })
      .where(eq(regional.id, regionalId));

    revalidateTag('dashboard');
    return {
      success: true,
      message: `Penalidades e desqualificações atualizadas para ${existingRegional.name}`,
      data: {
        regionalId,
        penalties: penaltyData,
        desqualifications,
      },
    };
  } catch (error) {
    console.error('Erro ao atualizar penalidades e desqualificações:', error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Erro interno do servidor',
      data: null,
    };
  }
}

export async function getRegionalPenaltyAndDesqualification(
  regionalId: string
) {
  try {
    if (!regionalId) {
      throw new Error('ID da regional é obrigatório');
    }

    const regionalData = await db.query.regional.findFirst({
      where: eq(regional.id, regionalId),
      columns: {
        id: true,
        name: true,
        penalty: true,
        desqualification: true,
        updatedAt: true,
      },
    });

    if (!regionalData) {
      throw new Error(`Regional com ID ${regionalId} não encontrada`);
    }

    const penalties = (regionalData.penalty as Record<string, number>) || {};
    const desqualifications =
      (regionalData.desqualification as Record<string, boolean>) || {};

    return {
      success: true,
      data: {
        regionalId: regionalData.id,
        regionalName: regionalData.name,
        penalties: {
          uniform: Boolean(penalties.uniform),
          time_over: Boolean(penalties.time_over),
          misconduct: Boolean(penalties.misconduct),
          ieadc_consuetude: Boolean(penalties.ieadc_consuetude),
          musicians_is_not_sixty_percent_of_teens: Boolean(
            penalties.musicians_is_not_sixty_percent_of_teens
          ),
        },
        desqualifications: {
          members_are_invaders: Boolean(desqualifications.members_are_invaders),
          no_recommendation_letter: Boolean(
            desqualifications.no_recommendation_letter
          ),
          singers_are_another_regional: Boolean(
            desqualifications.singers_are_another_regional
          ),
          musicians_are_is_another_regional: Boolean(
            desqualifications.musicians_are_is_another_regional
          ),
          more_than_two_musicians_from_uniaadc_base: Boolean(
            desqualifications.more_than_two_musicians_from_uniaadc_base
          ),
          members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing:
            Boolean(
              desqualifications.members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing
            ),
        },
        isDesqualified: Boolean(desqualifications.is_desqualified),
        lastUpdated: regionalData.updatedAt,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar penalidades e desqualificações:', error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Erro interno do servidor',
      data: null,
    };
  }
}
