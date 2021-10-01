import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHeader() {
  const { data, error } = useSWR('/api/menu', fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
