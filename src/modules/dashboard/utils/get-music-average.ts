import type { AveragesDTO } from '@/modules/rating/dtos/average-dto';
import type { RatingsListItem } from '@/modules/rating/dtos/rating-dto';

const calculateAverage = (values: number[], total: number) => {
  return total === 0 ? 0 : values.reduce((acc, curr) => acc + curr, 0) / total;
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
  private averages: AveragesDTO;

  constructor(ratings: RatingsListItem[]) {
    this.ratings = ratings;
    this.averages = {
      total: {
        average: 0,
        averageRegionalMusic: 0,
        averageOriginalMusic: 0,
      },
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

  getOriginalMusicAverage(): AveragesDTO['averageOriginalMusic'] {
    return this.averages.averageOriginalMusic;
  }

  getRegionalMusicAverage(): AveragesDTO['averageRegionalMusic'] {
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

    this.averages.total.average = overallAverage / 14;
  }

  getAverageRegionalMusic(): void {
    const overallAverage =
      Object.values(this.averages.averageRegionalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      ) +
      Object.values(this.averages.instrumentalCategoryRegionalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      );

    this.averages.total.averageRegionalMusic = Number(overallAverage / 7);
  }

  getAverageOriginalMusic(): void {
    const overallAverage =
      Object.values(this.averages.averageOriginalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      ) +
      Object.values(this.averages.instrumentalCategoryOriginalMusic).reduce(
        (acc, curr) => acc + curr,
        0
      );

    this.averages.total.averageOriginalMusic = Number(overallAverage / 7);
  }

  getAverages() {
    this.calculateAverage();
    this.getTotalAverage();
    this.getAverageRegionalMusic();
    this.getAverageOriginalMusic();
    return this.averages;
  }
}
