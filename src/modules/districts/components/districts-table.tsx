'use client';

import { Loader } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { useDistricts } from '../queries/get-districts';

export function DistrictsTable() {
  const { data, isLoading } = useDistricts();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome da Regional</TableHead>
          <TableHead>Data de Criação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.districts.map((district) => (
          <TableRow key={district.id}>
            <TableCell className="font-medium">{district.name}</TableCell>
            <TableCell>
              {new Date(district.createdAt).toLocaleDateString('pt-BR')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
