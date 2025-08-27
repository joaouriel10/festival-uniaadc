import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateRegionalPenaltyAndDesqualification } from '../../actions/update-regional-penalty-desqualification';
import type { PenaltyOrDesqualificationProps } from './penalty-or-desqualification';

const penaltyOrDesqualificationSchema = z.object({
  uniform: z.boolean(),
  time_over: z.boolean(),
  misconduct: z.boolean(),
  ieadc_consuetude: z.boolean(),
  musicians_is_not_sixty_percent_of_teens: z.boolean(),

  members_are_invaders: z.boolean(),
  no_recommendation_letter: z.boolean(),
  singers_are_another_regional: z.boolean(),
  musicians_are_is_another_regional: z.boolean(),
  more_than_two_musicians_from_uniaadc_base: z.boolean(),
  members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing:
    z.boolean(),
});

type PenaltyOrDesqualificationFormData = z.infer<
  typeof penaltyOrDesqualificationSchema
>;

type UsePenaltyOrDesqualificationFormProps = PenaltyOrDesqualificationProps;

export function usePenaltyOrDesqualificationForm({
  regional,
}: UsePenaltyOrDesqualificationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(regional);
  const form = useForm<PenaltyOrDesqualificationFormData>({
    resolver: zodResolver(penaltyOrDesqualificationSchema),
    defaultValues: {
      uniform: !!regional.penalties.uniform,
      time_over: !!regional.penalties.timeOver,
      misconduct: !!regional.penalties.misconduct,
      ieadc_consuetude: !!regional.penalties.misconduct,
      musicians_is_not_sixty_percent_of_teens:
        !!regional.penalties.musiciansIsNotSixtyPercentOfTeens,
      members_are_invaders: regional.desqualification.membersAreInvaders,
      no_recommendation_letter:
        regional.desqualification.noRecommendationLetter,
      singers_are_another_regional:
        regional.desqualification.singersAreAnotherRegional,
      musicians_are_is_another_regional:
        regional.desqualification.musiciansAreIsAnotherRegional,
      more_than_two_musicians_from_uniaadc_base:
        regional.desqualification.moreThanTwoMusiciansFromUniaadcBase,
      members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing:
        regional.desqualification
          .membersOfGeneralBackingWillBeAblePerformSolosOrComposeRegionalBacking,
    },
  });

  const watchedValues = form.watch();

  const onSubmit = async (data: PenaltyOrDesqualificationFormData) => {
    try {
      if (!regional?.id) {
        toast.error('Nenhuma regional selecionada');
        return;
      }

      const penalties = {
        uniform: data.uniform,
        time_over: data.time_over,
        misconduct: data.misconduct,
        ieadc_consuetude: data.ieadc_consuetude,
        musicians_is_not_sixty_percent_of_teens:
          data.musicians_is_not_sixty_percent_of_teens,
      };

      const desqualifications = {
        members_are_invaders: data.members_are_invaders,
        no_recommendation_letter: data.no_recommendation_letter,
        singers_are_another_regional: data.singers_are_another_regional,
        musicians_are_is_another_regional:
          data.musicians_are_is_another_regional,
        more_than_two_musicians_from_uniaadc_base:
          data.more_than_two_musicians_from_uniaadc_base,
        members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing:
          data.members_of_general_backing_will_be_able_perform_solos_or_compose_regional_backing,
      };

      const result = await updateRegionalPenaltyAndDesqualification({
        regionalId: regional.id,
        penalties,
        desqualifications,
      });

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }

      form.reset();
    } catch {
      toast.error('Erro inesperado ao salvar os ajustes');
    }
  };

  return {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    watchedValues,
  };
}
