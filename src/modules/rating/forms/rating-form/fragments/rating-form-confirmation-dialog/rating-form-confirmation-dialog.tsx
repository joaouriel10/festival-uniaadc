/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: Silence */
import { Music, Users, Volume2 } from 'lucide-react';
import type { Dispatch } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/core/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import type { RatingListItem } from '@/modules/rating/actions';
import type { RatingFormData } from '../../rating-form.hook';

type RatingFormConfirmationDialogProps = {
  isOpen: boolean;
  ratings: RatingListItem[] | undefined;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  forceFormSubmit: VoidFunction;
};

export function RatingFormConfirmationDialog({
  isOpen,
  ratings,
  setIsOpen,
  forceFormSubmit,
}: RatingFormConfirmationDialogProps) {
  const form = useFormContext<RatingFormData>();
  const watchedRegional = form.watch('regional');

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="transform bg-festival-coral px-8 py-4 font-medium text-lg text-white transition-all duration-200 hover:scale-[1.02] hover:bg-festival-orange"
          disabled={!watchedRegional}
          size="lg"
          type="button"
        >
          Enviar Avaliação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-festival-brown text-xl">
            Confirmar Envio da Avaliação
          </DialogTitle>
          <DialogDescription>
            Revise suas avaliações antes de enviar. Lembre-se: após o envio, não
            será possível fazer alterações.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg bg-festival-light/20 p-4">
            <h3 className="mb-2 font-semibold text-festival-brown">
              Regional Avaliada:
            </h3>
            <p className="font-medium text-festival-coral">
              {
                ratings?.find(
                  (rating) => rating.id === form.getValues('regional')
                )?.regionalName
              }
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-festival-brown">
              <Music className="h-5 w-5" />
              Música Regional - Resumo das Notas
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-medium text-festival-brown">
                  <Users className="h-4 w-4" />
                  Quesitos Coral
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Afinação Vocal:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues('regionalMusic.choralCategory.vocalTuning')
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harmonia Vocal:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues('regionalMusic.choralCategory.vocalHarmony')
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'regionalMusic.choralCategory.technicalLevel'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance e Criatividade:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'regionalMusic.choralCategory.performanceCreatividade'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-medium text-festival-brown">
                  <Volume2 className="h-4 w-4" />
                  Quesitos Instrumental
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nível Técnico da Música:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'regionalMusic.instrumental.musicTechnicalLevel'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência no Arranjo:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'regionalMusic.instrumental.arrangementCoherence'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Geral:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'regionalMusic.instrumental.overallPerformance'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {form.getValues('regionalMusic.observations') && (
              <div className="mt-4 rounded bg-gray-50 p-3">
                <h5 className="mb-1 font-medium text-festival-brown">
                  Observações:
                </h5>
                <p className="text-gray-700 text-sm">
                  {form.getValues('regionalMusic.observations')}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-festival-brown">
              <Music className="h-5 w-5" />
              Música Autoral - Resumo das Notas
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-medium text-festival-brown">
                  <Users className="h-4 w-4" />
                  Quesitos Coral
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Afinação Vocal:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues('originalMusic.choralCategory.vocalTuning')
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harmonia Vocal:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues('originalMusic.choralCategory.vocalHarmony')
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nível Técnico:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'originalMusic.choralCategory.technicalLevel'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência de Letra/Composição:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'originalMusic.choralCategory.performanceCreatividade'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-medium text-festival-brown">
                  <Volume2 className="h-4 w-4" />
                  Quesitos Instrumental
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nível Técnico da Música:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'originalMusic.instrumental.musicTechnicalLevel'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coerência no Arranjo:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'originalMusic.instrumental.arrangementCoherence'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Performance Geral:</span>
                    <span className="font-bold text-festival-coral">
                      {form
                        .getValues(
                          'originalMusic.instrumental.overallPerformance'
                        )
                        ?.toFixed(1) || '0.0'}
                      /10
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {form.getValues('originalMusic.observations') && (
              <div className="mt-4 rounded bg-gray-50 p-3">
                <h5 className="mb-1 font-medium text-festival-brown">
                  Observações:
                </h5>
                <p className="text-gray-700 text-sm">
                  {form.getValues('originalMusic.observations')}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
                <span className="font-bold text-white text-xs">!</span>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-yellow-800">Atenção!</h4>
                <p className="text-sm text-yellow-700">
                  Confirme que você avaliou as duas músicas corretamente. Após o
                  envio, não será possível fazer alterações na avaliação.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button
                className="flex-1 border-festival-coral text-festival-coral hover:bg-festival-coral/10"
                type="button"
                variant="outline"
              >
                Revisar Avaliação
              </Button>
            </DialogClose>
            <Button
              className="flex-1 bg-festival-coral py-3 font-medium text-white hover:bg-festival-orange"
              disabled={form.formState.isSubmitting}
              onClick={forceFormSubmit}
              type="button"
            >
              {form.formState.isSubmitting
                ? 'Enviando Avaliação...'
                : 'Confirmar e Enviar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
