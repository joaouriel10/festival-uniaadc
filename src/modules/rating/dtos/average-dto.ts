export type AveragesDTO = {
  total: {
    average: number;
    averageRegionalMusic: number;
    averageOriginalMusic: number;
  };
  averageRegionalMusic: {
    technical_level: number;
    performanceCreativity: number;
    vocal_harmony: number;
    vocal_tuning: number;
  };
  instrumentalCategoryRegionalMusic: {
    arrangement_coherence: number;
    music_technical_level: number;
    overall_performance: number;
  };
  averageOriginalMusic: {
    technical_level: number;
    lyric_composition_coherence: number;
    vocal_harmony: number;
    vocal_tuning: number;
  };
  instrumentalCategoryOriginalMusic: {
    arrangement_coherence: number;
    music_technical_level: number;
    overall_performance: number;
  };
};
