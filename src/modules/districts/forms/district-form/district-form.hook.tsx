import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { queryClient } from '@/infra/lib/react-query';
import { createDistrict } from '../../actions';
import type { DistrictFormProps } from './district-form';

const districtSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
});

export type DistrictFormData = z.infer<typeof districtSchema>;

export type UseDistrictFormProps = DistrictFormProps;

export function useDistrictForm({ onClose }: UseDistrictFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DistrictFormData>({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async ({ name }: DistrictFormData) => {
    setIsLoading(true);
    try {
      await createDistrict({ name });
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ['districts'] });
      toast.success(`Regional da ${name} enviada com sucesso!`);
    } catch {
      toast.error('Erro ao enviar regional. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, form };
}
