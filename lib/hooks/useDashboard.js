import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHomepage() {
  const { data, error } = useSWR('/api/dashboard', fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
