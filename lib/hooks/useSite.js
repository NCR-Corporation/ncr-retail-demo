import useSWR from 'swr';
import fetcher from './fetcher';

export default function useSite(id) {
  let { data, error } = useSWR(`/api/sites/${id}`, fetcher);
  return {
    site: data,
    isLoading: !error && !data,
    isError: error
  };
}
