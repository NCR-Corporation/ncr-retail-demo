import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCatalog(id, query = null) {
  let url = `/api/catalog?id=${id}`;
  if (query != null) {
    url = `${url}&query=${query}`;
  }
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
