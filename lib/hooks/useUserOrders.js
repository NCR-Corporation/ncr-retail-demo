import useSWR from 'swr';
import fetcher from './fetcher';
export default function useUserOrder(id) {
  let url = `/api/user/orders`;
  let { data, error } = useSWR(url, fetcher);
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
