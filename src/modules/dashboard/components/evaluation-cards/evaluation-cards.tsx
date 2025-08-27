'use client';

import { Award, Medal, Star, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/core/components/ui/card';
import type { UnifiedRankingItem } from '@/modules/rating/dtos/rating-dto';
import { EvaluationCard } from './evaluation-card';

type ListEvaluationsProps = {
  data: UnifiedRankingItem[];
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

export function EvaluationCards({ data }: ListEvaluationsProps) {
  return (
    <>
      {data.map((unifiedDistrict, index) => {
        const position = index + 1;

        return (
          <Card
            className="border-0 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
            key={unifiedDistrict.id}
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
                      {unifiedDistrict.name}
                    </h3>
                    <p className="text-festival-brown/70 text-sm">
                      {unifiedDistrict.ratingsCount > 0
                        ? `${unifiedDistrict.ratingsCount} avaliações realizadas`
                        : 'Nenhuma avaliação realizada'}
                    </p>
                  </div>
                </div>
                <EvaluationCard evaluation={unifiedDistrict} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
