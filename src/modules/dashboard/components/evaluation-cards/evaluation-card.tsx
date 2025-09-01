'use client';

import { Eye, FileText, RefreshCw } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
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
import { reviewRatingByRegionalId } from '@/modules/rating/actions';
import type { UnifiedRankingItem } from '@/modules/rating/dtos/rating-dto';
import { PDFRelatorio } from '../pdf-report/pdf-report';
import { PenaltyOrDesqualification } from '../penalty-or-desqualification';
import { JuryEvaluationSection } from './jury-evaluation-section';

type EvaluationCardProps = {
  evaluation: UnifiedRankingItem;
};

export function EvaluationCard({ evaluation }: EvaluationCardProps) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `Relatório de Avaliação - ${evaluation.name}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        .page-break-before {
          page-break-before: always;
        }
        .page-break-inside-avoid {
          page-break-inside: avoid;
        }
      }
    `,
  });

  const handleGeneratePDF = () => {
    handlePrint();
  };

  const handleReviewRatings = async () => {
    await reviewRatingByRegionalId({ regionalId: evaluation.id });
    toast.success('Avaliações revisadas com sucesso!', {
      description: 'As avaliações foram atualizadas com sucesso.',
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 text-center md:text-right">
        <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge className="text-xs" variant="outline">
              Música Regional:{' '}
              {evaluation.averages?.total.averageRegionalMusic.toFixed(1)}
            </Badge>
            <Badge className="text-xs" variant="outline">
              Música Autoral:{' '}
              {evaluation.averages?.total.averageOriginalMusic.toFixed(1)}
            </Badge>
            <Badge className="text-xs" variant="outline">
              Punições: {evaluation.penalty.totalPenalty}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent" size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    Revisão de Avaliações - {evaluation.name}
                  </DialogTitle>
                  <DialogDescription>
                    Detalhes das avaliações realizadas para esta regional
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
                              {evaluation.averages?.averageRegionalMusic.vocal_tuning.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Harmonia Vocal:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageRegionalMusic.vocal_harmony.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nível Técnico:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageRegionalMusic.technical_level.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Performance:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageRegionalMusic.performanceCreativity.toFixed(
                                1
                              )}
                              /10
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
                              {evaluation.averages?.averageOriginalMusic.vocal_tuning.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Harmonia Vocal:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageOriginalMusic.vocal_harmony.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nível Técnico:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageOriginalMusic.technical_level.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coerência Letra:</span>
                            <span className="font-bold">
                              {evaluation.averages?.averageOriginalMusic.lyric_composition_coherence.toFixed(
                                1
                              )}
                              /10
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
                      {evaluation.ratings?.map((review) => (
                        <JuryEvaluationSection
                          key={review.id}
                          review={review}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
            <PenaltyOrDesqualification
              regional={{
                id: evaluation.id,
                name: evaluation.name,
                penalties: evaluation.penalty,
                desqualification: evaluation.desqualification,
              }}
            />
            <Button
              className="bg-transparent"
              onClick={handleGeneratePDF}
              size="sm"
              variant="outline"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              className="border-festival-coral bg-festival-coral/10 text-festival-coral hover:bg-festival-coral/20"
              disabled={evaluation.verified}
              onClick={handleReviewRatings}
              size="sm"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        <PDFRelatorio evaluation={evaluation} ref={pdfRef} />
      </div>
    </>
  );
}
