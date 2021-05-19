import useSWR from 'swr';
import fetcher from './fetcher';
export default function useUserOrder() {
  let url = `/api/user/orders`;
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
