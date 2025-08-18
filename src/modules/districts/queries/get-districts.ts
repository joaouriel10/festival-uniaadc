import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDistricts } from '../actions/list-districts';

export function useDistricts() {
  return useQuery({
    queryKey: ['districts'],
    queryFn: getDistricts.bind(null, { page: 1, pageSize: 20 }),
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
  });
}
