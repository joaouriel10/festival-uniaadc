'use client';

import { FormProvider } from 'react-hook-form';
import { Button } from '@/core/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { useDistrictForm } from './district-form.hook';

export type DistrictFormProps = {
  onClose: () => void;
};

export function DistrictForm({ onClose }: DistrictFormProps) {
  const { form, isLoading, onSubmit } = useDistrictForm({ onClose });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  return (
    <FormProvider {...form}>
      <form className="z-50" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-festival-brown">
                Nome da Regional
              </FormLabel>
              <FormControl>
                <Input
                  className="border-festival-brown/20 focus:border-festival-coral focus:ring-festival-coral"
                  placeholder="Ex: Regional Curitiba Centro"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 text-center">
          <Button
            className="transform bg-festival-coral px-8 py-4 font-medium text-lg text-white transition-all duration-200 hover:scale-[1.02] hover:bg-festival-orange"
            disabled={isSubmitting || isLoading}
            size="lg"
            type="submit"
          >
            {isSubmitting || isLoading
              ? 'Cadastrando regional...'
              : 'Cadastrar regional'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
