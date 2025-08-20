'use client';

import { MapPin, Users } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import type { DistrictsListItem } from '@/modules/districts/actions/list-districts';
import type { JuriesListItem } from '../../actions/list-juries';
import { useEvaluationForm } from './evaluations-form.hook';

export type EvaluationFormProps = {
  juries: JuriesListItem[];
  districts: DistrictsListItem[];
  onClose: VoidFunction;
};

export function EvaluationForm({
  juries,
  districts,
  onClose,
}: EvaluationFormProps) {
  const { form, onSubmit, watchedRegional } = useEvaluationForm({ onClose });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form;

  const selectedJuries = watch('juryIds') || [];

  const handleJuryToggle = (juryId: string) => {
    const currentJuries = selectedJuries;
    const isSelected = currentJuries.includes(juryId);

    if (isSelected) {
      setValue(
        'juryIds',
        currentJuries.filter((id) => id !== juryId)
      );
    } else {
      setValue('juryIds', [...currentJuries, juryId]);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-festival-brown">
              <MapPin className="h-5 w-5" />
              Selecionar Regional
            </CardTitle>
            <CardDescription>
              Escolha a regional que será avaliada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-festival-brown">
                    Regional
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-festival-brown/20 focus:border-festival-coral focus:ring-festival-coral">
                        <SelectValue placeholder="Escolha uma regional..." />
                      </SelectTrigger>
                      <SelectContent>
                        {districts?.map((district) => (
                          <SelectItem
                            key={district.id}
                            value={district.id.toString()}
                          >
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-festival-brown">
              <Users className="h-5 w-5" />
              Selecionar Jurados
            </CardTitle>
            <CardDescription>
              Escolha os jurados que irão avaliar esta regional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={control}
              name="juryIds"
              render={() => (
                <FormItem>
                  <FormLabel className="font-medium text-festival-brown">
                    Jurados
                  </FormLabel>
                  <FormControl>
                    <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border border-festival-brown/20 p-3">
                      {juries?.map((jury) => (
                        <label
                          className={`flex cursor-pointer items-center justify-between rounded-md p-3 transition-all duration-200 ${
                            selectedJuries.includes(jury.id.toString())
                              ? 'border-festival-coral bg-festival-coral/10 shadow-sm'
                              : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm'
                          }`}
                          key={jury.id}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              checked={selectedJuries.includes(
                                jury.id.toString()
                              )}
                              className="h-4 w-4 rounded border-festival-brown/30 text-festival-coral focus:ring-festival-coral"
                              onChange={() =>
                                handleJuryToggle(jury.id.toString())
                              }
                              type="checkbox"
                            />
                            <div>
                              <p className="font-medium text-festival-brown text-sm">
                                {jury.name}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                      {(!juries || juries.length === 0) && (
                        <p className="py-4 text-center text-festival-brown/60 text-sm">
                          Nenhum jurado disponível
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          <Button
            className="flex-1 transform bg-festival-coral py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-festival-orange"
            disabled={
              isSubmitting || !watchedRegional || selectedJuries.length === 0
            }
            type="submit"
          >
            {isSubmitting ? 'Vinculando...' : 'Criar Vínculo'}
          </Button>
          {onClose && (
            <Button
              className="flex-1 border-festival-brown/20 text-festival-brown hover:bg-festival-brown/5"
              onClick={onClose}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
