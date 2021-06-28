import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCatalogItem(id, site = null) {
  if (id) {
    if (site !== null) {
      let { data, error } = useSWR(`/api/catalog/${site}/${id}`, fetcher);
      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    } else {
      let { data, error } = useSWR(`/api/catalog/${id}`, fetcher);
      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    }
  } else {
    return {
      data: null,
      isLoading: false,
      isError: false
    };
  }
}
