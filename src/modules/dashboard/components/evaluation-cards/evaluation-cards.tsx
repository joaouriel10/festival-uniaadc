'use client';

import { Award, Eye, Loader, Medal, Star, Trophy } from 'lucide-react';
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
import { useDistricts } from '@/modules/districts/queries/get-districts';
import type { RegionalRatingsResponse } from '@/modules/rating/actions';

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

export function EvaluationCards({ data }: ListEvaluationsProps) {
  const { data: districts, isLoading } = useDistricts();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <>
      {districts?.districts.map((district) => (
        <>
          <div key={district.id}>
            <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-12 w-12 rounded-full bg-gradient-to-br ${getPosicaoColor(4)} flex items-center justify-center`}
                    >
                      {getPosicaoIcon(4)}
                    </div>
                    <div>
                      <h3 className="font-bold text-festival-brown text-lg">
                        {district.name}
                      </h3>
                      {/* <p className="text-festival-brown/70 text-sm">
                        {district.avaliacoes} avaliações realizadas
                      </p> */}
                    </div>
                  </div>
                  {data?.map((rating) => {
                    if (rating.regionalId === district.id) {
                      return (
                        <div className="text-right" key={rating.name}>
                          {/* <p className="font-bold text-3xl text-festival-coral">
                      {resultado.pontuacaoTotal}
                    </p> */}
                          <div className="mt-1 flex items-center gap-2">
                            <Badge className="text-xs" variant="outline">
                              M1:{' '}
                              {rating.averages.regionalMusicAverage.toFixed(1)}
                            </Badge>
                            <Badge className="text-xs" variant="outline">
                              M2:{' '}
                              {rating.averages.originalMusicAverage.toFixed(1)}
                            </Badge>
                            <div className="ml-2 flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    className="bg-transparent"
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Revisão de Avaliações - {district.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detalhes das avaliações realizadas para
                                      esta regional
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="max-h-96 space-y-4 overflow-y-auto">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                      <Card className="gap-2">
                                        <CardHeader>
                                          <CardTitle className="text-lg">
                                            Música Regional
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-2">
                                            <div className="flex justify-between">
                                              <span>Afinação Vocal:</span>
                                              <span className="font-bold">
                                                8.5/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Harmonia Vocal:</span>
                                              <span className="font-bold">
                                                9.0/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Nível Técnico:</span>
                                              <span className="font-bold">
                                                8.2/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Performance:</span>
                                              <span className="font-bold">
                                                9.5/10
                                              </span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                      <Card className="gap-2">
                                        <CardHeader>
                                          <CardTitle className="text-lg">
                                            Música Autoral
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="space-y-2">
                                            <div className="flex justify-between">
                                              <span>Afinação Vocal:</span>
                                              <span className="font-bold">
                                                8.8/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Harmonia Vocal:</span>
                                              <span className="font-bold">
                                                8.7/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Nível Técnico:</span>
                                              <span className="font-bold">
                                                8.0/10
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Coerência Letra:</span>
                                              <span className="font-bold">
                                                9.2/10
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
                                            <div
                                              className="space-y-3 py-3"
                                              key={review.id}
                                            >
                                              <div className="border-festival-coral border-l-4 pl-4">
                                                <p className="font-semibold">
                                                  Jurado: {review.judgeName}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                  Musica Regional:{' '}
                                                  {
                                                    review.description
                                                      .regionalMusic
                                                  }
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                  Musica Autoral:{' '}
                                                  {
                                                    review.description
                                                      .originalMusic
                                                  }
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
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ))}
    </>
  );
}
