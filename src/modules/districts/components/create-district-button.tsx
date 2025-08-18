'use client';

import { Plus } from 'lucide-react';
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
import { DistrictForm } from '../forms/district-form';

export function CreateDistrictButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="bg-festival-coral hover:bg-festival-orange">
          <Plus className="mr-2 h-4 w-4" />
          Nova Regional
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Regional</DialogTitle>
          <DialogDescription>
            Digite o nome da nova regional para o festival
          </DialogDescription>
        </DialogHeader>
        <DistrictForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
