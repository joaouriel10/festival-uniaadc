'use client';

import { Award, Loader, Medal, Star, Trophy } from 'lucide-react';
import { Fragment } from 'react';
import { Card, CardContent } from '@/core/components/ui/card';
import { useDistricts } from '@/modules/districts/queries/get-districts';
import type {
  RatingsListItem,
  RegionalRatingsResponse,
} from '@/modules/rating/actions';
import { EvaluationCard } from './evaluation-card';

type ListEvaluationsProps = {
  data: RegionalRatingsResponse;
};

const getPosicaoIcon = (posicao: number) => {
  switch (posicao) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-500" />;
    case 2:
      return <Medal className="h-8 w-8 text-gray-400" />;
    case 3:
      return <Award className="h-8 w-8 text-amber-600" />;
    default:
      return <Star className="h-6 w-6 text-festival-coral" />;
  }
};

const getPosicaoColor = (posicao: number) => {
  switch (posicao) {
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

export type EvaluationCardData = {
  districtId: string;
  districtName: string;
  averages: {
    regionalMusicAverage: number;
    originalMusicAverage: number;
    overallAverage: number;
  };
  ratings: RatingsListItem[];
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

  const calculateRatingWhenDistrictIdIsSame = (districtId: string) => {
    return data.find((rating) => rating.regionalId === districtId)?.ratings
      .length;
  };

  const generateCardsData = () => {
    const generateData = new Map<string, EvaluationCardData>();

    for (const district of districts?.districts || []) {
      const districtId = district.id;
      const districtName = district.name;

      const ratings = data.filter((rating) => rating.regionalId === districtId);

      const averages = ratings.reduce(
        (acc, rating) => {
          acc.regionalMusicAverage += rating.averages.regionalMusicAverage;
          acc.originalMusicAverage += rating.averages.originalMusicAverage;
          acc.overallAverage += rating.averages.overallAverage;
          return acc;
        },
        {
          regionalMusicAverage: 0,
          originalMusicAverage: 0,
          overallAverage: 0,
        }
      );

      if (ratings.length > 0) {
        averages.regionalMusicAverage /= ratings.length;
        averages.originalMusicAverage /= ratings.length;
        averages.overallAverage /= ratings.length;
      }

      generateData.set(districtId, {
        districtId,
        districtName,
        averages,

        ratings: ratings.flatMap((rating) => rating.ratings),
      });
    }

    return Array.from(generateData.values()).sort(
      (a, b) => b.averages.overallAverage - a.averages.overallAverage
    );
  };

  const generatedCardsData = generateCardsData();

  return (
    <>
      {generatedCardsData.map((district, index) => (
        <div key={district.districtId}>
          <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${getPosicaoColor(index + 1)} flex items-center justify-center`}
                  >
                    {getPosicaoIcon(index + 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-festival-brown text-lg">
                      {district.districtName}
                    </h3>
                    <p className="text-festival-brown/70 text-sm">
                      {calculateRatingWhenDistrictIdIsSame(
                        district.districtId
                      ) ? (
                        <>
                          {calculateRatingWhenDistrictIdIsSame(
                            district.districtId
                          )}{' '}
                          avaliações realizadas
                        </>
                      ) : (
                        'Nenhuma avaliação realizada'
                      )}
                    </p>
                  </div>
                </div>
                {generatedCardsData?.map((rating) => (
                  <Fragment key={rating.districtId}>
                    {district.districtId === rating.districtId && (
                      <EvaluationCard rating={rating} />
                    )}
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
