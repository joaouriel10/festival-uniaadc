'use client';

import { Eye } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import type { EvaluationCardData } from './evaluation-cards';

type EvaluationCardProps = {
  rating: EvaluationCardData;
};

const calculateAverage = (values: number[], total: number) => {
  return total === 0 ? 0 : values.reduce((acc, curr) => acc + curr, 0) / total;
};

export function EvaluationCard({ rating }: EvaluationCardProps) {
  const getMusicAverage = () => {
    if (!rating.ratings || rating.ratings.length === 0) {
      return {
        averageOriginalMusic: {
          technical: 0,
          lyric: 0,
          harmony: 0,
          tuning: 0,
        },
        averageRegionalMusic: {
          technical: 0,
          performance: 0,
          harmony: 0,
          tuning: 0,
        },
      };
    }

    const calculateAverageOfOriginalMusic = () => {
      const technical = calculateAverage(
        rating.ratings.map(
          (r) => r.originalMusic.choral_category.technical_level
        ),

        rating.ratings.length
      );

      const lyric = calculateAverage(
        rating.ratings.map(
          (r) => r.originalMusic.choral_category.lyric_composition_coherence
        ),

        rating.ratings.length
      );

      const harmony = calculateAverage(
        rating.ratings.map(
          (r) => r.originalMusic.choral_category.vocal_harmony
        ),

        rating.ratings.length
      );

      const tuning = calculateAverage(
        rating.ratings.map((r) => r.originalMusic.choral_category.vocal_tuning),

        rating.ratings.length
      );

      return {
        lyric,
        tuning,
        harmony,
        technical,
      };
    };

    const calculateAverageOfRegionalMusic = () => {
      const technical = calculateAverage(
        rating.ratings.map(
          (r) => r.regionalMusic.choral_category.technical_level
        ),
        rating.ratings.length
      );

      const performance = calculateAverage(
        rating.ratings.map(
          (r) => r.regionalMusic.choral_category.performanceCreativity
        ),
        rating.ratings.length
      );

      const harmony = calculateAverage(
        rating.ratings.map(
          (r) => r.regionalMusic.choral_category.vocal_harmony
        ),
        rating.ratings.length
      );

      const tuning = calculateAverage(
        rating.ratings.map((r) => r.regionalMusic.choral_category.vocal_tuning),
        rating.ratings.length
      );

      return {
        tuning,
        harmony,
        technical,
        performance,
      };
    };

    return {
      averageOriginalMusic: calculateAverageOfOriginalMusic(),
      averageRegionalMusic: calculateAverageOfRegionalMusic(),
    };
  };

  return (
    <div className="text-right">
      <p className="font-bold text-3xl text-festival-coral">
        {rating.averages.overallAverage.toFixed(1)}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <Badge className="text-xs" variant="outline">
          M1: {rating.averages.regionalMusicAverage.toFixed(1)}
        </Badge>
        <Badge className="text-xs" variant="outline">
          M2: {rating.averages.originalMusicAverage.toFixed(1)}
        </Badge>
        <div className="ml-2 flex gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-transparent" size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  Revisão de Avaliações - {rating.districtName}
                </DialogTitle>
                <DialogDescription>
                  Detalhes das avaliações realizadas para esta regional
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-96 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className="gap-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Música Regional</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Afinação Vocal:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageRegionalMusic.tuning}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Harmonia Vocal:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageRegionalMusic.harmony}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nível Técnico:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageRegionalMusic.technical}
                            /10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Performance:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageRegionalMusic.performance}
                            /10
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="gap-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Música Autoral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Afinação Vocal:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageOriginalMusic.tuning}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Harmonia Vocal:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageOriginalMusic.harmony}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nível Técnico:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageOriginalMusic.technical}
                            /10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coerência Letra:</span>
                          <span className="font-bold">
                            {getMusicAverage().averageOriginalMusic.lyric}/10
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="gap-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Observações dos Jurados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="divide-y-3 divide-festival-coral">
                    {rating.ratings.map((review) => {
                      return (
                        <div className="space-y-3 py-3" key={review.id}>
                          <div className="border-festival-coral border-l-4 pl-4">
                            <p className="font-semibold">
                              Jurado: {review.judgeName}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Musica Regional:{' '}
                              {review.description.regionalMusic}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Musica Autoral: {review.description.originalMusic}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Button
                          className="border-festival-coral bg-festival-coral/10 text-festival-coral hover:bg-festival-coral/20"
                          disabled={revisaoSolicitada === resultado.id}
                          onClick={() =>
                            handleSolicitarRevisao(resultado.id, resultado.nome)
                          }
                          size="sm"
                          variant="outline"
                        >
                          {revisaoSolicitada === resultado.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-festival-coral border-t-transparent" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button> */}
        </div>
      </div>
    </div>
  );
}
