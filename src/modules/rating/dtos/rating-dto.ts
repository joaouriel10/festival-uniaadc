import type {
  DesqualificationData,
  PenaltyData,
} from '@/modules/districts/dtos/districts-dto';
import type { AveragesDTO } from './average-dto';

export type RatingDTO = {
  id: string;
  regionalMusic: string;
  originalMusic: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UnifiedRankingItem = {
  id: string;
  name: string;
  averages?: AveragesDTO;
  penalty: PenaltyData;
  desqualification: DesqualificationData;
  isDesqualified: boolean;
  finalScore: number;
  ratings: RatingsListItem[];
  ratingsCount: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RatingsListItem = {
  id: string;
  judgeName: string;
  judgeEmail: string;
  regionalName: string;
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
    observations: string;
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
    observations: string;
  };
  statistics: {
    regionalMusicTotal: number;
    originalMusicTotal: number;
    overallTotal: number;
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
  description: {
    regionalMusic: string;
    originalMusic: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
