/** biome-ignore-all lint/suspicious/noExplicitAny: silence */
'use client';

import { Controller, type FieldPath, useFormContext } from 'react-hook-form';
import type { RatingFormData } from '@/modules/rating/forms/rating-form/rating-form.hook';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

const SliderComponent = ({
  name,
  label,
  description,
  errors,
}: {
  name: FieldPath<Omit<RatingFormData, 'regional'>>;
  label: string;
  description?: string;
  errors?: any;
}) => {
  const { control } = useFormContext<RatingFormData>();

  return (
    <div className="space-y-3">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <div className="flex items-center justify-between">
              <Label className="font-medium text-festival-brown">{label}</Label>
              <span className="font-bold text-festival-coral text-lg">
                {typeof field.value === 'number' ? field.value.toFixed(1) : 0}
                /10
              </span>
            </div>
            {description && (
              <p className="text-festival-brown/60 text-sm">{description}</p>
            )}
            <Slider
              className="w-full"
              max={10}
              min={1}
              onValueChange={(value) => field.onChange(value[0])}
              step={0.1}
              value={[typeof field.value === 'number' ? field.value : 0]}
            />
            <div className="flex justify-between text-festival-brown/50 text-xs">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </>
        )}
      />
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};

export { SliderComponent };
