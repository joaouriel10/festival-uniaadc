import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { queryClient } from '@/infra/lib/react-query';
import { updateRating } from '../../actions';
import { getDefaultValues } from '../../utils/get-default-values-from-rating-form';

const ratingSchema = z.object({
  regional: z.string().min(1, 'Selecione uma avaliação'),
  regionalMusic: z.object({
    choralCategory: z.object({
      vocalTuning: z.number().min(1).max(10),
      vocalHarmony: z.number().min(1).max(10),
      technicalLevel: z.number().min(1).max(10),
      performanceCreatividade: z.number().min(1).max(10),
    }),
    instrumental: z.object({
      musicTechnicalLevel: z.number().min(1).max(10),
      arrangementCoherence: z.number().min(1).max(10),
      overallPerformance: z.number().min(1).max(10),
    }),
    observations: z.string().optional(),
  }),
  originalMusic: z.object({
    choralCategory: z.object({
      vocalTuning: z.number().min(1).max(10),
      vocalHarmony: z.number().min(1).max(10),
      technicalLevel: z.number().min(1).max(10),
      performanceCreatividade: z.number().min(1).max(10),
    }),
    instrumental: z.object({
      musicTechnicalLevel: z.number().min(1).max(10),
      arrangementCoherence: z.number().min(1).max(10),
      overallPerformance: z.number().min(1).max(10),
    }),
    observations: z.string().optional(),
  }),
});

export type RatingFormData = z.infer<typeof ratingSchema>;

export interface UseRatingFormProps {
  userId: string;
  ratingId: string;
  initialData?: Partial<RatingFormData>;
}

export function useRatingForm({
  userId,
  ratingId,
  initialData,
}: UseRatingFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: getDefaultValues(initialData),
  });

  const watchedRegional = form.watch('regional');

  const onSubmit = async (data: RatingFormData) => {
    setIsLoading(true);
    try {
      await updateRating({
        id: data.regional,
        regionalMusic: data.regionalMusic,
        originalMusic: data.originalMusic,
      });
      queryClient.invalidateQueries({ queryKey: [`evaluations-${userId}`] });
      toast.success('Avaliação atualizada com sucesso!');
      form.reset();
    } catch (error) {
      toast.error('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const isEditMode = Boolean(ratingId);

  return { onSubmit, watchedRegional, isLoading, form, isEditMode };
}
