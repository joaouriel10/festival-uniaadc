'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/infra/database';
import { rating } from '@/infra/database/schemas/others';

export interface UpdateRatingData {
  id: string;
  regionalMusic: {
    choralCategory: {
      vocalTuning: number;
      vocalHarmony: number;
      technicalLevel: number;
      performanceCreatividade: number;
    };
    instrumental: {
      musicTechnicalLevel: number;
      arrangementCoherence: number;
      overallPerformance: number;
    };
    observations?: string;
  };
  originalMusic: {
    choralCategory: {
      vocalTuning: number;
      vocalHarmony: number;
      technicalLevel: number;
      performanceCreatividade: number;
    };
    instrumental: {
      musicTechnicalLevel: number;
      arrangementCoherence: number;
      overallPerformance: number;
    };
    observations?: string;
  };
}

export async function updateRating(data: UpdateRatingData): Promise<void> {
  const { id, regionalMusic, originalMusic } = data;

  const regionalMusicData = {
    choral_category: {
      vocal_tuning: regionalMusic.choralCategory.vocalTuning,
      vocal_harmony: regionalMusic.choralCategory.vocalHarmony,
      technical_level: regionalMusic.choralCategory.technicalLevel,
      performanceCreativity:
        regionalMusic.choralCategory.performanceCreatividade,
    },
    instrumental_category: {
      music_technical_level: regionalMusic.instrumental.musicTechnicalLevel,
      arrangement_coherence: regionalMusic.instrumental.arrangementCoherence,
      overall_performance: regionalMusic.instrumental.overallPerformance,
    },
    observations: regionalMusic.observations || '',
  };

  const originalMusicData = {
    choral_category: {
      vocal_tuning: originalMusic.choralCategory.vocalTuning,
      vocal_harmony: originalMusic.choralCategory.vocalHarmony,
      technical_level: originalMusic.choralCategory.technicalLevel,
      lyric_composition_coherence:
        originalMusic.choralCategory.performanceCreatividade,
    },
    instrumental_category: {
      music_technical_level: originalMusic.instrumental.musicTechnicalLevel,
      arrangement_coherence: originalMusic.instrumental.arrangementCoherence,
      overall_performance: originalMusic.instrumental.overallPerformance,
    },
    observations: originalMusic.observations || '',
  };

  await db
    .update(rating)
    .set({
      regionalMusic: JSON.stringify(regionalMusicData),
      originalMusic: JSON.stringify(originalMusicData),
      updatedAt: new Date(),
    })
    .where(eq(rating.id, id));

  revalidateTag('dashboard');
}
