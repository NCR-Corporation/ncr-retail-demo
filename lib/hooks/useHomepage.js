import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHomepage(siteId) {
  const { data, error } = useSWR(`/api?site=${siteId}`, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
