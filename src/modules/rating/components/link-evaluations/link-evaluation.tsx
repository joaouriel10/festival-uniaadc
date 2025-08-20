'use client';

import { LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import {
  EvaluationForm,
  type EvaluationFormProps,
} from '../../forms/evaluation-form';

type LinkEvaluationProps = Omit<EvaluationFormProps, 'onClose'>;

export function LinkEvaluation({ districts, juries }: LinkEvaluationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="bg-festival-coral hover:bg-festival-orange">
          <LinkIcon className="mr-2 h-4 w-4" />
          Vincular Avaliação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Vincular Avaliação</DialogTitle>
          <DialogDescription>
            Selecione uma regional e os jurados para criar um novo vínculo de
            avaliação
          </DialogDescription>
        </DialogHeader>
        <EvaluationForm
          districts={districts}
          juries={juries}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
