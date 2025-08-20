'use client';

import { Loader } from 'lucide-react';
import { Badge } from '@/core/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { useEvaluations } from '../../queries/use-evaluations';

type EvaluationTableProps = {
  currentPage: number;
  pageSize: number;
};

export function EvaluationTable({
  currentPage,
  pageSize,
}: EvaluationTableProps) {
  const { data, isLoading } = useEvaluations({
    page: currentPage,
    pageSize,
  });

  return (
    <div className="rounded-md border">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="h-10 w-10 animate-spin text-black" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Regional</TableHead>
              <TableHead>Jurados Vinculados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.evaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell className="font-medium">
                  {evaluation.regionalName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.juries.map((jury) => (
                      <div className="flex items-center gap-1" key={jury.id}>
                        <Badge className="text-xs" variant="outline">
                          {jury.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
