'use client';

import { Music, Trophy } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { EvaluationCardData } from '../evaluation-cards';

type PDFReportProps = ComponentProps<'div'> & {
  evaluation: EvaluationCardData;
};

export function PDFRelatorio({ evaluation, ref }: PDFReportProps) {
  const evaluationsPerPage = 1;
  const totalEvaluations = evaluation.ratings?.length || 0;
  const totalPages = Math.ceil(totalEvaluations / evaluationsPerPage);

  const renderHeader = () => (
    <div className="mb-8 border-orange-400 border-b-4 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-3xl text-gray-800">
              FESTIVAL UNIAADC 2K25
            </h1>
            <p className="text-gray-600 text-lg">
              8ª Edição - Relatório de Avaliação
            </p>
            <p className="mt-2 font-semibold text-gray-800 text-lg">
              {evaluation.districtName}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">
            Data: {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-gray-500 text-sm">
            Hora: {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderEvaluationCard = (
    rating: (typeof evaluation.ratings)[0],
    evaluationIndex: number
  ) => (
    <div
      className="page-break-inside-avoid mb-8 overflow-hidden rounded-lg border-2 border-gray-300"
      key={evaluationIndex}
    >
      <div className="border-gray-300 border-b-2 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
        <h3 className="font-bold text-gray-800 text-xl">
          Jurado: {rating.judgeName}
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-blue-600 text-lg">
              <Music className="h-5 w-5" />
              Música Regional
            </h4>
            <div className="space-y-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="mb-3 font-medium text-base text-gray-700">
                  Quesitos Coral:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Afinação Vocal:</span>
                    <span className="font-bold text-lg">
                      {rating.regionalMusic.choral_category.vocal_tuning}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harmonia Vocal:</span>
                    <span className="font-bold text-lg">
                      {rating.regionalMusic.choral_category.vocal_harmony}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-lg">
                      {rating.regionalMusic.choral_category.technical_level}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.regionalMusic.choral_category
                          .performanceCreativity
                      }
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="mb-3 font-medium text-base text-gray-700">
                  Quesitos Instrumental:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.regionalMusic.instrumental_category
                          .music_technical_level
                      }
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência Arranjo:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.regionalMusic.instrumental_category
                          .arrangement_coherence
                      }
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Geral:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.regionalMusic.instrumental_category
                          .overall_performance
                      }
                      /10
                    </span>
                  </div>
                </div>
              </div>
              {rating.regionalMusic.observations && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="mb-2 font-medium text-gray-700">Observações:</p>
                  <p className="text-gray-600 text-sm">
                    {rating.regionalMusic.observations}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-lg text-purple-600">
              <Music className="h-5 w-5" />
              Música Autoral
            </h4>
            <div className="space-y-3">
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <p className="mb-3 font-medium text-base text-gray-700">
                  Quesitos Coral:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Afinação Vocal:</span>
                    <span className="font-bold text-lg">
                      {rating.originalMusic.choral_category.vocal_tuning}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harmonia Vocal:</span>
                    <span className="font-bold text-lg">
                      {rating.originalMusic.choral_category.vocal_harmony}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-lg">
                      {rating.originalMusic.choral_category.technical_level}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência Letra:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.originalMusic.choral_category
                          .lyric_composition_coherence
                      }
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="mb-3 font-medium text-base text-gray-700">
                  Quesitos Instrumental:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.originalMusic.instrumental_category
                          .music_technical_level
                      }
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência Arranjo:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.originalMusic.instrumental_category
                          .arrangement_coherence
                      }
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Geral:</span>
                    <span className="font-bold text-lg">
                      {
                        rating.originalMusic.instrumental_category
                          .overall_performance
                      }
                      /10
                    </span>
                  </div>
                </div>
              </div>
              {rating.originalMusic.observations && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="mb-2 font-medium text-gray-700">Observações:</p>
                  <p className="text-gray-600 text-sm">
                    {rating.originalMusic.observations}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Signature Area */}
        <div className="mt-8 border-gray-300 border-t-2 pt-6">
          <div className="text-center">
            <div className="mx-auto mb-3 h-16 max-w-md border-gray-400 border-b-2" />
            <p className="font-semibold text-gray-700 text-lg">
              Assinatura do Jurado
            </p>
            <p className="mt-1 text-gray-500 text-sm">{rating.judgeName}</p>
            <p className="text-gray-500 text-sm">Data: ___/___/______</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = (pageIndex: number) => {
    const startIndex = pageIndex * evaluationsPerPage;
    const endIndex = Math.min(
      startIndex + evaluationsPerPage,
      totalEvaluations
    );
    const pageEvaluations =
      evaluation.ratings?.slice(startIndex, endIndex) || [];

    return (
      <div className={pageIndex > 0 ? 'page-break-before' : ''} key={pageIndex}>
        {renderHeader()}
        {pageEvaluations.map((rating, index) =>
          renderEvaluationCard(rating, startIndex + index)
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-white"
      ref={ref}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <style jsx>{`
        @media print {
          .page-break-before {
            page-break-before: always;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>

      {Array.from({ length: totalPages }, (_, pageIndex) =>
        renderPage(pageIndex)
      )}
    </div>
  );
}
