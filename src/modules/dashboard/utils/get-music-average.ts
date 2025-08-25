import type { RatingsListItem } from '@/modules/rating/actions';

const calculateAverage = (values: number[], total: number) => {
  return total === 0 ? 0 : values.reduce((acc, curr) => acc + curr, 0) / total;
};

type Averages = {
  totalAverage: number;
  averageOriginalMusic: {
    technical_level: number;
    lyric_composition_coherence: number;
    vocal_harmony: number;
    vocal_tuning: number;
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
  instrumentalCategoryOriginalMusic: {
    arrangement_coherence: number;
    music_technical_level: number;
    overall_performance: number;
  };
};

const choralCategoryOriginalMusicKeys = [
  'technical_level',
  'lyric_composition_coherence',
  'vocal_harmony',
  'vocal_tuning',
] as const;

const choralCategoryRegionalMusicKeys = [
  'technical_level',
  'performanceCreativity',
  'vocal_harmony',
  'vocal_tuning',
] as const;

const instrumentalCategoryRegionalMusicKeys = [
  'arrangement_coherence',
  'music_technical_level',
  'overall_performance',
] as const;

const instrumentalCategoryOriginalMusicKeys = [
  'arrangement_coherence',
  'music_technical_level',
  'overall_performance',
] as const;

export class GetMusicAverage {
  private ratings: RatingsListItem[];
  private averages: Averages;

  constructor(ratings: RatingsListItem[]) {
    this.ratings = ratings;
    this.averages = {
      totalAverage: 0,
      averageOriginalMusic: {
        technical_level: 0,
        lyric_composition_coherence: 0,
        vocal_harmony: 0,
        vocal_tuning: 0,
      },
      averageRegionalMusic: {
        technical_level: 0,
        performanceCreativity: 0,
        vocal_harmony: 0,
        vocal_tuning: 0,
      },
      instrumentalCategoryOriginalMusic: {
        arrangement_coherence: 0,
        music_technical_level: 0,
        overall_performance: 0,
      },
      instrumentalCategoryRegionalMusic: {
        arrangement_coherence: 0,
        music_technical_level: 0,
        overall_performance: 0,
      },
    };
  }

  getOriginalMusicAverage(): Averages['averageOriginalMusic'] {
    return this.averages.averageOriginalMusic;
  }

  getRegionalMusicAverage(): Averages['averageRegionalMusic'] {
    return this.averages.averageRegionalMusic;
  }

  private calculateAverage() {
    for (const key of choralCategoryOriginalMusicKeys) {
      this.averages.averageOriginalMusic[key] = calculateAverage(
        this.ratings.map((r) => r.originalMusic.choral_category[key]),
        this.ratings.length
      );
    }

    for (const key of choralCategoryRegionalMusicKeys) {
      this.averages.averageRegionalMusic[key] = calculateAverage(
        this.ratings.map((r) => r.regionalMusic.choral_category[key]),
        this.ratings.length
      );
    }

    for (const key of instrumentalCategoryOriginalMusicKeys) {
      this.averages.instrumentalCategoryOriginalMusic[key] = calculateAverage(
        this.ratings.map((r) => r.originalMusic.instrumental_category[key]),
        this.ratings.length
      );
    }

    for (const key of instrumentalCategoryRegionalMusicKeys) {
      this.averages.instrumentalCategoryRegionalMusic[key] = calculateAverage(
        this.ratings.map((r) => r.regionalMusic.instrumental_category[key]),
        this.ratings.length
      );
    }
  }

  getTotalAverage(): void {
    const overallAverage =
      Object.values(this.averages.averageOriginalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      ) +
      Object.values(this.averages.averageRegionalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      ) +
      Object.values(this.averages.instrumentalCategoryOriginalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      ) +
      Object.values(this.averages.instrumentalCategoryRegionalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      );

    this.averages.totalAverage = overallAverage / 14;
  }

  getAverages() {
    this.calculateAverage();
    this.getTotalAverage();
    return this.averages;
  }
}
