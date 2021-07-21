import useSWR from 'swr';
import fetcher from './fetcher';
export default function useSiteCatalog(id) {
  let { data, error } = useSWR(`/api/sites/${id}/catalog`, fetcher);
  return {
    siteData: data,
    isLoading: !error && !data,
    isError: error
  };
}
