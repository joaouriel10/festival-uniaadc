import { LinkIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { CURRENT_PAGE, PAGE_SIZE } from '@/core/constants';
import { getDistricts } from '@/modules/districts/actions/list-districts';
import { getJuries } from '../actions';
import { EvaluationTable } from '../components/evaluations-table';
import { LinkEvaluation } from '../components/link-evaluations';

export async function EvaluationsScreen() {
  const [{ juries }, { districts }] = await Promise.all([
    getJuries({ page: CURRENT_PAGE, pageSize: PAGE_SIZE }),
    getDistricts({ page: CURRENT_PAGE, pageSize: PAGE_SIZE }),
  ]);

  return (
    <div className="relative mx-auto max-w-6xl p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-white lg:text-5xl">
          LISTAGEM DE AVALIAÇÕES
        </h1>
      </div>

      <Card className="border-0 bg-white/95 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-festival-brown">
              <LinkIcon className="h-5 w-5" />
              Vínculos Criados
            </CardTitle>
            <LinkEvaluation districts={districts} juries={juries} />
          </div>
        </CardHeader>
        <CardContent>
          <EvaluationTable currentPage={CURRENT_PAGE} pageSize={PAGE_SIZE} />
        </CardContent>
      </Card>
    </div>
  );
}
