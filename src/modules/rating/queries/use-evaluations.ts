import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getEvaluations } from '../actions/list-evaluations';

export type UseEvaluationsParams = {
  page: number;
  pageSize?: number;
};

export function useEvaluations({ page, pageSize }: UseEvaluationsParams) {
  return useQuery({
    queryKey: ['evaluations', page, pageSize],
    queryFn: getEvaluations.bind(null, { page, pageSize }),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
  });
}
