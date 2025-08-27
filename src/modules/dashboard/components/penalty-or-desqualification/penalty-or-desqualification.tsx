'use client';

import { CircleMinus, Minus, X } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Checkbox } from '@/core/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/core/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import type {
  DesqualificationData,
  PenaltyData,
} from '@/modules/districts/dtos/districts-dto';
import { usePenaltyOrDesqualificationForm } from './penalty-or-desqualification.hook';

export type PenaltyOrDesqualificationProps = {
  regional: {
    id: string;
    name: string;
    penalties: Omit<PenaltyData, 'totalPenalty'>;
    desqualification: DesqualificationData;
  };
};

export function PenaltyOrDesqualification({
  regional,
}: PenaltyOrDesqualificationProps) {
  const { form, onSubmit, watchedValues, isOpen, setIsOpen } =
    usePenaltyOrDesqualificationForm({
      regional,
    });

  const { isSubmitting } = form.formState;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent" size="sm" variant="outline">
          <CircleMinus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-festival-brown text-xl">
            Ajustes de Pontuação - {regional?.name}
          </DialogTitle>
          <DialogDescription>
            Configure reduções de notas e cancelamentos de apresentação para
            esta regional
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs className="w-full" defaultValue="reducao">
              <TabsList className="mb-6 grid w-full grid-cols-2 bg-festival-light">
                <TabsTrigger
                  className="flex items-center gap-2 data-[state=active]:bg-festival-coral data-[state=active]:text-white"
                  value="reducao"
                >
                  <Minus className="h-4 w-4" />
                  Redução de Notas
                </TabsTrigger>
                <TabsTrigger
                  className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  value="cancelamento"
                >
                  <X className="h-4 w-4" />
                  Cancelamento
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reducao">
                <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-festival-brown">
                      Redução de Pontos
                    </CardTitle>
                    <CardDescription>
                      Configure os pontos a serem reduzidos da pontuação final
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="uniform"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-festival-brown leading-relaxed">
                              Coral não estiver 100% utilizando a camiseta
                              Revestidos (-1 ponto)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time_over"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-festival-brown">
                              Ultrapassar tempo de apresentação de 15 minutos
                              -(0,5)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="misconduct"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-festival-brown">
                              Tinta, brigas, foguetes e sinalizadores (-1 ponto)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ieadc_consuetude"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-festival-brown">
                              Usos e costumes da IEADC (-1 ponto)
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="musicians_is_not_sixty_percent_of_teens"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-medium text-festival-brown">
                              Acima de 40% dos músicos não adolescentes (-1
                              ponto)
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="rounded-lg bg-festival-light/20 p-4">
                      <h4 className="mb-2 font-semibold text-festival-brown">
                        Resumo da Redução:
                      </h4>
                      <p className="font-bold text-festival-coral text-lg">
                        Total:{' '}
                        {(watchedValues.uniform ? 1 : 0) +
                          (watchedValues.time_over ? 0.5 : 0) +
                          (watchedValues.misconduct ? 1 : 0) +
                          (watchedValues.ieadc_consuetude ? 1 : 0) +
                          (watchedValues.musicians_is_not_sixty_percent_of_teens
                            ? 1
                            : 0)}{' '}
                        pontos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cancelamento">
                <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-red-600">
                      Cancelamento de Apresentação
                    </CardTitle>
                    <CardDescription>
                      Marque os motivos que levam ao cancelamento da
                      apresentação (pontuação = 0)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="members_are_invaders"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown">
                              Membros de outras denominações
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="no_recommendation_letter"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown">
                              Músicos sem carta de recomendação
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="singers_are_another_regional"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown">
                              Cantores são de outra regional
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="musicians_are_is_another_regional"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown">
                              Músicos são de outra regional
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="more_than_two_musicians_from_uniaadc_base"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown">
                              Mais de dois músicos da Base da UNIAADC Geral
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-festival-brown leading-relaxed">
                              Membros da base geral não podem fazer solos ou
                              compor base regional
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    {(watchedValues.members_are_invaders ||
                      watchedValues.no_recommendation_letter ||
                      watchedValues.singers_are_another_regional ||
                      watchedValues.musicians_are_is_another_regional ||
                      watchedValues.more_than_two_musicians_from_uniaadc_base ||
                      watchedValues.members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing) && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-400">
                            <X className="text-white text-xs" />
                          </div>
                          <div>
                            <h4 className="mb-1 font-semibold text-red-800">
                              Atenção!
                            </h4>
                            <p className="text-red-700 text-sm">
                              A apresentação será cancelada e a pontuação será
                              zerada devido aos motivos selecionados.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-festival-coral py-3 font-medium text-white hover:bg-festival-orange"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Ajustes'}
              </Button>
              <Button
                className="flex-1 border-festival-coral text-festival-coral hover:bg-festival-coral/10"
                onClick={() => setIsOpen(false)}
                type="button"
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
