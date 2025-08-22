'use client';

import { Award, Loader, Medal, Star, Trophy } from 'lucide-react';
import { Fragment } from 'react';
import { Card, CardContent } from '@/core/components/ui/card';
import type { DistrictsListItem } from '@/modules/districts/actions/list-districts';
import { useDistricts } from '@/modules/districts/queries/get-districts';
import type {
  RatingsListItem,
  RegionalRatingsItem,
  RegionalRatingsResponse,
} from '@/modules/rating/actions';
import { EvaluationCard } from './evaluation-card';

type ListEvaluationsProps = {
  data: RegionalRatingsResponse;
};

export type EvaluationCardData = {
  districtId: string;
  districtName: string;
  averages: {
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
  ratings: RatingsListItem[];
  totalEvaluations: number;
};

const getRankIcon = (position: number) => {
  const iconProps = 'h-8 w-8';

  switch (position) {
    case 1:
      return <Trophy className={`${iconProps} text-yellow-500`} />;
    case 2:
      return <Medal className={`${iconProps} text-gray-400`} />;
    case 3:
      return <Award className={`${iconProps} text-amber-600`} />;
    default:
      return <Star className="h-6 w-6 text-festival-coral" />;
  }
};

const getRankGradient = (position: number) => {
  switch (position) {
    case 1:
      return 'from-yellow-400 to-yellow-600';
    case 2:
      return 'from-gray-300 to-gray-500';
    case 3:
      return 'from-amber-400 to-amber-600';
    default:
      return 'from-festival-coral to-festival-orange';
  }
};

const calculateAverages = (ratings: RegionalRatingsItem[]) => {
  if (ratings.length === 0) {
    return {
      regionalMusicAverage: 0,
      originalMusicAverage: 0,
      overallAverage: 0,
    };
  }

  const totals = ratings.reduce(
    (acc, rating) => ({
      regionalMusicAverage:
        acc.regionalMusicAverage + rating.averages.regionalMusicAverage,
      originalMusicAverage:
        acc.originalMusicAverage + rating.averages.originalMusicAverage,
      overallAverage: acc.overallAverage + rating.averages.overallAverage,
    }),
    { regionalMusicAverage: 0, originalMusicAverage: 0, overallAverage: 0 }
  );

  return {
    regionalMusicAverage: totals.regionalMusicAverage / ratings.length,
    originalMusicAverage: totals.originalMusicAverage / ratings.length,
    overallAverage: totals.overallAverage / ratings.length,
  };
};

const generateDistrictData = (
  districts: DistrictsListItem[],
  ratingsData: RegionalRatingsResponse
): EvaluationCardData[] => {
  return districts
    .map((district) => {
      const districtRatings = ratingsData.filter(
        (rating) => rating.regionalId === district.id
      );
      const averages = calculateAverages(districtRatings);
      const allRatings = districtRatings.flatMap((rating) => rating.ratings);

      return {
        districtId: district.id,
        districtName: district.name,
        averages,
        ratings: allRatings,
        totalEvaluations: allRatings.length,
      };
    })
    .sort((a, b) => b.averages.overallAverage - a.averages.overallAverage);
};

export function EvaluationCards({ data }: ListEvaluationsProps) {
  const { data: districts, isLoading } = useDistricts();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  if (!districts?.districts) {
    return <Fragment />;
  }

  const districtData = generateDistrictData(districts.districts, data);

  return (
    <>
      {districtData.map((district, index) => {
        const position = index + 1;

        return (
          <Card
            className="border-0 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
            key={district.districtId}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${getRankGradient(position)} flex items-center justify-center`}
                  >
                    {getRankIcon(position)}
                  </div>
                  <div>
                    <h3 className="font-bold text-festival-brown text-lg">
                      {district.districtName}
                    </h3>
                    <p className="text-festival-brown/70 text-sm">
                      {district.totalEvaluations > 0
                        ? `${district.totalEvaluations} avaliações realizadas`
                        : 'Nenhuma avaliação realizada'}
                    </p>
                  </div>
                </div>
                <EvaluationCard evaluation={district} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
