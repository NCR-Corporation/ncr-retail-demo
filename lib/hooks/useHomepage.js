import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHomepage() {
  const { data, error } = useSWR('/api', fetcher);
  return {
    catalog: data,
    isLoading: !error && !data,
    isError: error,
  };
}
