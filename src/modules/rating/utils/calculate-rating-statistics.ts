export type RatingScores = {
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
  };
};

export type RatingStatistics = {
  regionalMusicTotal: number;
  originalMusicTotal: number;
  overallTotal: number;
  regionalMusicAverage: number;
  originalMusicAverage: number;
  overallAverage: number;
};

export function calculateRatingStatistics(
  scores: RatingScores
): RatingStatistics {
  const regionalChoralTotal =
    scores.regionalMusic.choral_category.vocal_tuning +
    scores.regionalMusic.choral_category.vocal_harmony +
    scores.regionalMusic.choral_category.technical_level +
    scores.regionalMusic.choral_category.performanceCreativity;

  const regionalInstrumentalTotal =
    scores.regionalMusic.instrumental_category.music_technical_level +
    scores.regionalMusic.instrumental_category.arrangement_coherence +
    scores.regionalMusic.instrumental_category.overall_performance;

  const regionalMusicTotal = regionalChoralTotal + regionalInstrumentalTotal;

  const originalChoralTotal =
    scores.originalMusic.choral_category.vocal_tuning +
    scores.originalMusic.choral_category.vocal_harmony +
    scores.originalMusic.choral_category.technical_level +
    scores.originalMusic.choral_category.lyric_composition_coherence;

  const originalInstrumentalTotal =
    scores.originalMusic.instrumental_category.music_technical_level +
    scores.originalMusic.instrumental_category.arrangement_coherence +
    scores.originalMusic.instrumental_category.overall_performance;

  const originalMusicTotal = originalChoralTotal + originalInstrumentalTotal;

  const overallTotal = regionalMusicTotal + originalMusicTotal;

  const regionalMusicAverage = regionalMusicTotal / 7;
  const originalMusicAverage = originalMusicTotal / 7;
  const overallAverage = overallTotal / 14;

  return {
    regionalMusicTotal,
    originalMusicTotal,
    overallTotal,
    regionalMusicAverage: Number(regionalMusicAverage.toFixed(2)),
    originalMusicAverage: Number(originalMusicAverage.toFixed(2)),
    overallAverage: Number(overallAverage.toFixed(2)),
  };
}

export function formatRatingDescription(scores: RatingScores): string {
  const stats = calculateRatingStatistics(scores);

  return (
    `Avaliação com pontuação total de ${stats.overallTotal} pontos. ` +
    `Música Regional: ${stats.regionalMusicTotal} pts (média: ${stats.regionalMusicAverage}). ` +
    `Música Original: ${stats.originalMusicTotal} pts (média: ${stats.originalMusicAverage}). ` +
    `Média geral: ${stats.overallAverage} pontos.`
  );
}
