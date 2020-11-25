import useSWR from 'swr';
export default function useSite(id) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  let { data, error } = useSWR(`/api/sites/${id}`, fetcher);
  return {
    site: data,
    isLoading: !error && !data,
    isError: error,
  };
}
