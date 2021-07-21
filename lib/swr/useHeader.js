import useSWR from 'swr';
import fetcher from './fetcher';
export default function useHeader() {
  const { data, error } = useSWR('/api/category', fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error
  };
}
