import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

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

export function useRatingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RatingFormData>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      regional: '',
      regionalMusic: {
        choralCategory: {
          vocalTuning: 5.0,
          vocalHarmony: 5.0,
          technicalLevel: 5.0,
          performanceCreatividade: 5.0,
        },
        instrumental: {
          musicTechnicalLevel: 5.0,
          arrangementCoherence: 5.0,
          overallPerformance: 5.0,
        },
        observations: '',
      },
      originalMusic: {
        choralCategory: {
          vocalTuning: 5.0,
          vocalHarmony: 5.0,
          technicalLevel: 5.0,
          performanceCreatividade: 5.0,
        },
        instrumental: {
          musicTechnicalLevel: 5.0,
          arrangementCoherence: 5.0,
          overallPerformance: 5.0,
        },
        observations: '',
      },
    },
  });

  const watchedRegional = form.watch('regional');

  const onSubmit = async (data: RatingFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Avaliação da ${data.regional} enviada com sucesso!`);
      form.reset();
    } catch {
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, watchedRegional, isLoading, form };
}
