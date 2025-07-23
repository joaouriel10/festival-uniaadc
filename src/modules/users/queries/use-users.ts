import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUserList } from '../actions';

export interface UseUsersParams {
  page: number;
  pageSize?: number;
}

export function useUsers({ page, pageSize }: UseUsersParams) {
  return useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: getUserList.bind(null, { page, pageSize }),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
  });
}
