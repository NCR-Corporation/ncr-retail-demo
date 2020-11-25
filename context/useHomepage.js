import useSWR from 'swr';

export default function useHomepage() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('/api', fetcher);
  return {
    catalog: data,
    isLoading: !error && !data,
    isError: error,
  };
}
