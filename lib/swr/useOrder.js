import useSWR from 'swr';
import fetcher from './fetcher';
export default function useOrder(id) {
  let url = `/api/order/${id}`;
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
