import useSWR from 'swr';
export default function useSiteCatalog(id) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  let { data, error } = useSWR(`/api/sites/${id}/catalog`, fetcher);
  console.log('heere');
  return {
    siteData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
