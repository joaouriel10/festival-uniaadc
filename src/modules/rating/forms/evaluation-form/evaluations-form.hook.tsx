import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { queryClient } from '@/infra/lib/react-query';
import { linkEvaluation } from '../../actions';

const evaluationSchema = z.object({
  districtId: z.string().min(1, 'Selecione uma regional'),
  juryIds: z.array(z.string()).min(1, 'Selecione pelo menos um jurado'),
});

export type EvaluationFormData = z.infer<typeof evaluationSchema>;

export type UseEvaluationFormProps = {
  onClose: VoidFunction;
};

export function useEvaluationForm({ onClose }: UseEvaluationFormProps) {
  const form = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      districtId: '',
      juryIds: [],
    },
  });

  const watchedRegional = form.watch('districtId');

  const onSubmit = async (data: EvaluationFormData) => {
    try {
      await linkEvaluation(data);
      toast.success('Avaliação vinculada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['evaluations'] });
      onClose();
    } catch {
      toast.error('Erro ao vincular avaliação. Tente novamente.');
    }
  };

  return { onSubmit, watchedRegional, form };
}
