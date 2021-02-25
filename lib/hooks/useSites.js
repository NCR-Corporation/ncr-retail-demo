import useSWR from 'swr';
import fetcher from './fetcher';

export default function useSite(id) {
  let { data, error } = useSWR(`/api/findSites`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
