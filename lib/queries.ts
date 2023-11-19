import { useQuery, QueryClient } from '@tanstack/react-query';

const queryKeyFactory = () => {};

const useFoodListQuery = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => {},
  });
};
