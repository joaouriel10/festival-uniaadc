'use client';

import { MapPin, Music, Star, Users, Volume2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { SliderComponent } from '@/core/components/slider-component';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import { Textarea } from '@/core/components/ui/textarea';
import { useGetRatingsByUserId } from '../../queries/use-ratings';
import { RatingFormConfirmationDialog } from './fragments/rating-form-confirmation-dialog';
import { useRatingForm } from './rating-form.hook';

type RatingFormProps = {
  userId: string;
};

export function RatingForm({ userId }: RatingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { form, onSubmit } = useRatingForm({
    userId,
    ratingId: '',
    initialData: {
      regionalMusic: {
        choralCategory: {
          vocalTuning: 0,
          vocalHarmony: 0,
          technicalLevel: 0,
          performanceCreatividade: 0,
        },
        instrumental: {
          musicTechnicalLevel: 0,
          arrangementCoherence: 0,
          overallPerformance: 0,
        },
        observations: '',
      },
      originalMusic: {
        choralCategory: {
          vocalTuning: 0,
          vocalHarmony: 0,
          technicalLevel: 0,
          performanceCreatividade: 0,
        },
        instrumental: {
          musicTechnicalLevel: 0,
          arrangementCoherence: 0,
          overallPerformance: 0,
        },
        observations: '',
      }
    },
  });

  const { data, isLoading } = useGetRatingsByUserId({
    userId,
    page: 1,
    pageSize: 10,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const forceFormSubmit = () => {
    formRef.current?.requestSubmit();
    setIsOpen(false);
  };

  return (
    <FormProvider {...form}>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div className="mb-8">
          <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-festival-brown">
                <MapPin className="h-5 w-5" />
                Selecionar Avaliação
              </CardTitle>
              <CardDescription>
                Escolha a avaliação que será realizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                control={control}
                name="regional"
                render={({ field }) => (
                  <Select
                    disabled={isLoading || !data?.ratings.length}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:border-festival-coral focus:ring-festival-coral">
                      <SelectValue placeholder="Selecione uma avaliação..." />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.ratings?.map((rating) => (
                        <SelectItem key={rating.id} value={rating.id}>
                          {rating.regionalName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.regional && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.regional.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs className="w-full" defaultValue="musica1">
          <TabsList className="mb-6 grid w-full grid-cols-2 bg-festival-light">
            <TabsTrigger
              className="flex items-center gap-2 data-[state=active]:bg-festival-coral data-[state=active]:text-white"
              value="musica1"
            >
              <Music className="h-4 w-4" />
              Musica Regional
            </TabsTrigger>
            <TabsTrigger
              className="flex items-center gap-2 data-[state=active]:bg-festival-coral data-[state=active]:text-white"
              value="musica2"
            >
              <Music className="h-4 w-4" />
              Musica Autoral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="musica1">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Users className="h-5 w-5" />
                    Quesitos Coral
                  </CardTitle>
                  <CardDescription>
                    Avalie os aspectos vocais da apresentação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SliderComponent
                    errors={errors.regionalMusic?.choralCategory?.vocalTuning}
                    label="Afinação Vocal"
                    name="regionalMusic.choralCategory.vocalTuning"
                  />
                  <SliderComponent
                    description="Divisão de vozes"
                    errors={errors.regionalMusic?.choralCategory?.vocalHarmony}
                    label="Harmonia Vocal"
                    name="regionalMusic.choralCategory.vocalHarmony"
                  />
                  <SliderComponent
                    description="Inovar além da divisão básica"
                    errors={
                      errors.regionalMusic?.choralCategory?.technicalLevel
                    }
                    label="Nível Técnico"
                    name="regionalMusic.choralCategory.technicalLevel"
                  />
                  <SliderComponent
                    description="Desenvoltura (apresentação da peça faz parte, mas não acrescenta bônus)"
                    errors={
                      errors.regionalMusic?.choralCategory
                        ?.performanceCreatividade
                    }
                    label="Performance e Criatividade"
                    name="regionalMusic.choralCategory.performanceCreatividade"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Volume2 className="h-5 w-5" />
                    Quesitos Instrumental
                  </CardTitle>
                  <CardDescription>
                    Avalie os aspectos instrumentais da apresentação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SliderComponent
                    description="Frases, Convenções e ataques da Base/Orquestra"
                    errors={
                      errors.regionalMusic?.instrumental?.musicTechnicalLevel
                    }
                    label="Nível Técnico da Música"
                    name="regionalMusic.instrumental.musicTechnicalLevel"
                  />
                  <SliderComponent
                    description="Estrutura da música deve fazer sentido entre vocal e base"
                    errors={
                      errors.regionalMusic?.instrumental?.arrangementCoherence
                    }
                    label="Coerência no Arranjo"
                    name="regionalMusic.instrumental.arrangementCoherence"
                  />
                  <SliderComponent
                    description="Sincronia de base/orquestra, ataques bem definidos"
                    errors={
                      errors.regionalMusic?.instrumental?.overallPerformance
                    }
                    label="Performance Geral"
                    name="regionalMusic.instrumental.overallPerformance"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Star className="h-5 w-5" />
                    Observações Gerais - Música 1
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    control={control}
                    name="regionalMusic.observations"
                    render={({ field }) => (
                      <Textarea
                        className="min-h-[100px] border-gray-300 focus:border-festival-coral focus:ring-festival-coral"
                        onChange={field.onChange}
                        placeholder="Adicione suas observações sobre a Música 1..."
                        value={field.value}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="musica2">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Users className="h-5 w-5" />
                    Quesitos Coral
                  </CardTitle>
                  <CardDescription>
                    Avalie os aspectos vocais da apresentação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SliderComponent
                    errors={errors.originalMusic?.choralCategory?.vocalTuning}
                    label="Afinação Vocal"
                    name="originalMusic.choralCategory.vocalTuning"
                  />
                  <SliderComponent
                    description="Divisão de vozes"
                    errors={errors.originalMusic?.choralCategory?.vocalHarmony}
                    label="Harmonia Vocal"
                    name="originalMusic.choralCategory.vocalHarmony"
                  />
                  <SliderComponent
                    description="Inovar além da divisão básica"
                    errors={
                      errors.originalMusic?.choralCategory?.technicalLevel
                    }
                    label="Nível Técnico"
                    name="originalMusic.choralCategory.technicalLevel"
                  />
                  <SliderComponent
                    errors={
                      errors.originalMusic?.choralCategory
                        ?.performanceCreatividade
                    }
                    label="Coerência de Letra/Composição"
                    name="originalMusic.choralCategory.performanceCreatividade"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Volume2 className="h-5 w-5" />
                    Quesitos Instrumental
                  </CardTitle>
                  <CardDescription>
                    Avalie os aspectos instrumentais da apresentação
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SliderComponent
                    description="Frases, Convenções e ataques da Base/Orquestra"
                    errors={
                      errors.originalMusic?.instrumental?.musicTechnicalLevel
                    }
                    label="Nível Técnico da Música"
                    name="originalMusic.instrumental.musicTechnicalLevel"
                  />
                  <SliderComponent
                    description="Estrutura da música deve fazer sentido entre vocal e base"
                    errors={
                      errors.originalMusic?.instrumental?.arrangementCoherence
                    }
                    label="Coerência no Arranjo"
                    name="originalMusic.instrumental.arrangementCoherence"
                  />
                  <SliderComponent
                    description="Sincronia de base/orquestra, ataques bem definidos"
                    errors={
                      errors.originalMusic?.instrumental?.overallPerformance
                    }
                    label="Performance Geral"
                    name="originalMusic.instrumental.overallPerformance"
                  />
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-xl backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-festival-brown">
                    <Star className="h-5 w-5" />
                    Observações Gerais - Música 2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    control={control}
                    name="originalMusic.observations"
                    render={({ field }) => (
                      <Textarea
                        className="min-h-[100px] border-gray-300 focus:border-festival-coral focus:ring-festival-coral"
                        onChange={field.onChange}
                        placeholder="Adicione suas observações sobre a Música 2..."
                        value={field.value}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <RatingFormConfirmationDialog
            forceFormSubmit={forceFormSubmit}
            isOpen={isOpen}
            ratings={data?.ratings}
            setIsOpen={setIsOpen}
          />
        </div>
      </form>
    </FormProvider>
  );
}
