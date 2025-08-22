import type { RatingsListItem } from '@/modules/rating/actions';

const calculateAverage = (values: number[], total: number) => {
  return total === 0 ? 0 : values.reduce((acc, curr) => acc + curr, 0) / total;
};

type Averages = {
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

export class GetMusicAverage {
  private ratings: RatingsListItem[];
  private averages: Averages;

  constructor(ratings: RatingsListItem[]) {
    this.ratings = ratings;
    this.averages = {
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
  }

  getAverages() {
    this.calculateAverage();
    return this.averages;
  }
}
