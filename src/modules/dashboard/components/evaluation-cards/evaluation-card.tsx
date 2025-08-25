'use client';

import { Eye, FileText } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
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
import { GetMusicAverage } from '../../utils/get-music-average';
import { PDFRelatorio } from '../pdf-report/pdf-report';
import type { EvaluationCardData } from './evaluation-cards';
import { JuryEvaluationSection } from './jury-evaluation-section';

type EvaluationCardProps = {
  evaluation: EvaluationCardData;
};

export function EvaluationCard({ evaluation }: EvaluationCardProps) {
  const getMusicAverage = new GetMusicAverage(evaluation.ratings);
  const musicAverage = getMusicAverage.getAverages();
  const pdfRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `Relatório de Avaliação - ${evaluation.districtName}`,
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

  return (
    <>
      <div className="text-right">
        <p className="font-bold text-3xl text-festival-coral">
          {evaluation.averages.overallAverage.toFixed(1)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Badge className="text-xs" variant="outline">
            Música Regional:{' '}
            {evaluation.averages.regionalMusicAverage.toFixed(1)}
          </Badge>
          <Badge className="text-xs" variant="outline">
            Música Autoral:{' '}
            {evaluation.averages.originalMusicAverage.toFixed(1)}
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
                    Revisão de Avaliações - {evaluation.districtName}
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
                              {musicAverage.averageRegionalMusic.vocal_tuning.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Harmonia Vocal:</span>
                            <span className="font-bold">
                              {musicAverage.averageRegionalMusic.vocal_harmony.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nível Técnico:</span>
                            <span className="font-bold">
                              {musicAverage.averageRegionalMusic.technical_level.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Performance:</span>
                            <span className="font-bold">
                              {musicAverage.averageRegionalMusic.performanceCreativity.toFixed(
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
                              {musicAverage.averageOriginalMusic.vocal_tuning.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Harmonia Vocal:</span>
                            <span className="font-bold">
                              {musicAverage.averageOriginalMusic.vocal_harmony.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nível Técnico:</span>
                            <span className="font-bold">
                              {musicAverage.averageOriginalMusic.technical_level.toFixed(
                                1
                              )}
                              /10
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coerência Letra:</span>
                            <span className="font-bold">
                              {musicAverage.averageOriginalMusic.lyric_composition_coherence.toFixed(
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
                      {evaluation.ratings.map((review) => (
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
            <Button
              className="bg-transparent"
              onClick={handleGeneratePDF}
              size="sm"
              variant="outline"
            >
              <FileText className="h-4 w-4" />
            </Button>
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

      {/* PDF Component for printing - hidden from view */}
      <div style={{ display: 'none' }}>
        <PDFRelatorio evaluation={evaluation} ref={pdfRef} />
      </div>
    </>
  );
}
