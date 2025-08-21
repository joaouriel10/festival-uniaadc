import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRatingsByUserId } from '../actions';

export type UseGetRatingsByUserIdParams = {
  page: number;
  userId: string;
  pageSize?: number;
};

export function useGetRatingsByUserId({
  page,
  userId,
  pageSize,
}: UseGetRatingsByUserIdParams) {
  return useQuery({
    queryKey: [`evaluations-${userId}`, page, pageSize],
    queryFn: getRatingsByUserId.bind(null, { userId, page, pageSize }),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
  });
}
